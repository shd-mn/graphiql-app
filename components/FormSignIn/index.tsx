'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { SignInData } from '@/interfaces/auth.interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInValidationSchema } from '@/validation/signin.validation';
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
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '@/firebase';
import { routes } from '@/constants/routes';

function FormSignIn() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<SignInData>({
    resolver: yupResolver(signInValidationSchema),
  });

  const onFormSubmit = async (data: SignInData) => {
    try {
      await signInWithEmailAndPassword(auth, data.login, data.password);
      router.push(routes.home);
    } catch (error) {
      console.log(error);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex w-full max-w-sm flex-col gap-4 p-3">
      <TextField
        error={!!errors.login}
        id="login"
        label="Login"
        helperText={errors.login ? errors.login.message : ''}
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
        <FormHelperText>{errors.password ? errors.password.message : ''}</FormHelperText>
      </FormControl>
      <Button type="submit" variant="contained" disabled={!isValid && isSubmitted}>
        Sign in
      </Button>
      <div className="flex flex-col items-center">
        <p className="m-0">If you don&apos;t have an account, please</p>
        <Button href={routes.signup}>Sign up</Button>
      </div>
    </form>
  );
}

export default FormSignIn;
