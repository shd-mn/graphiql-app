'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { SignUpData } from '@/interfaces/auth.interface';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  TextField,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';
import { signUpValidationSchema } from '@/validation/signup.validation';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from '@firebase/auth';
import { auth, logout } from '@/firebase';
import { routes } from '@/constants/routes';
import { FirebaseError } from '@firebase/util';
import { toast } from 'sonner';
import { toastMessages } from '@/constants/toastMessages';

function FormSignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<SignUpData>({
    resolver: yupResolver(signUpValidationSchema),
  });

  const onFormSubmit = async (data: SignUpData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.login, data.password);
      await logout();
      await updateProfile(userCredential.user, { displayName: data.name });
      toast.warning(toastMessages.confirmEmail);
      await sendEmailVerification(userCredential.user);
      router.push(routes.home);
      setTimeout(() => toast.success(toastMessages.successSignUp), 4000);
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
        toast.warning(toastMessages.userAlreadyExist);
        router.push(routes.signin);
      } else {
        toast.error(toastMessages.errorSignUp);
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex w-full max-w-sm flex-col gap-4 p-3">
      <h1 className="text-3xl font-bold">Create Account</h1>
      <div className="flex items-center gap-1">
        <p className="m-0">Already have an account?</p>
        <Link href={routes.signin} className="text-blue-500 hover:text-blue-700">
          Sign in here
        </Link>
      </div>
      <TextField
        error={!!errors.name}
        id="name"
        label="Name"
        helperText={errors.name ? errors.name.message : ' '}
        {...register('name')}
      />
      <TextField
        error={!!errors.login}
        id="login"
        label="Email"
        helperText={errors.login ? errors.login.message : ' '}
        {...register('login')}
      />
      <FormControl variant="outlined" error={!!errors.password}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          autoComplete="current-password"
          {...register('password')}
        />
        <FormHelperText>{errors.password ? errors.password.message : ' '}</FormHelperText>
      </FormControl>
      <FormControl variant="outlined" error={!!errors.confirmPassword}>
        <InputLabel htmlFor="confirm-password">Confirm password</InputLabel>
        <OutlinedInput
          id="confirm-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm password"
          autoComplete="current-password"
          {...register('confirmPassword')}
        />
        <FormHelperText>{errors.confirmPassword ? errors.confirmPassword.message : ' '}</FormHelperText>
      </FormControl>
      <Button type="submit" variant="contained" disabled={!isValid && isSubmitted}>
        Sign up
      </Button>
    </form>
  );
}

export default FormSignUp;
