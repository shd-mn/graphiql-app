'use client';

import React from 'react';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import type { SignUpData } from '@/types/auth.types';
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
import { signUpValidationSchema } from '@/validation/signup.validation';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from '@firebase/auth';
import { auth, logout } from '@/firebase';
import { routes } from '@/constants/routes';
import { FirebaseError } from '@firebase/util';
import { toast } from 'sonner';

function FormSignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const t = useTranslations('SignUpPage');
  const tToast = useTranslations('ToastMessages');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<SignUpData>({
    resolver: yupResolver(signUpValidationSchema),
  });

  const onFormSubmit = async (data: SignUpData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await logout();
      await updateProfile(userCredential.user, { displayName: data.name });
      toast.warning(tToast('auth.confirmEmail'));
      await sendEmailVerification(userCredential.user);
      router.push(routes.home);
      setTimeout(() => toast.success(tToast('auth.successSignUp')), 4000);
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
        toast.warning(tToast('auth.userAlreadyExist'));
        router.push(routes.signin);
      } else {
        toast.error(tToast('auth.errorSignUp'));
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex w-full max-w-sm flex-col gap-4 p-3">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <div className="flex items-center gap-1">
        <p className="m-0">{t('haveAccount')}</p>
        <Link href={routes.signin} className="text-blue-500 hover:text-blue-700">
          {t('signInLink')}
        </Link>
      </div>
      <TextField
        error={!!errors.name}
        id="name"
        label={t('name')}
        helperText={errors.name ? errors.name.message : ' '}
        {...register('name')}
      />
      <TextField
        error={!!errors.email}
        id="email"
        label={t('email')}
        helperText={errors.email ? errors.email.message : ' '}
        {...register('email')}
      />
      <FormControl variant="outlined" error={!!errors.password}>
        <InputLabel htmlFor="password">{t('password')}</InputLabel>
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
          label={t('password')}
          autoComplete="current-password"
          {...register('password')}
        />
        <FormHelperText>{errors.password ? errors.password.message : ' '}</FormHelperText>
      </FormControl>
      <FormControl variant="outlined" error={!!errors.confirmPassword}>
        <InputLabel htmlFor="confirm-password">{t('confirmPassword')}</InputLabel>
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
          label={t('confirmPassword')}
          autoComplete="current-password"
          {...register('confirmPassword')}
        />
        <FormHelperText>{errors.confirmPassword ? errors.confirmPassword.message : ' '}</FormHelperText>
      </FormControl>
      <Button type="submit" variant="contained" disabled={!isValid && isSubmitted}>
        {t('signUpButton')}
      </Button>
    </form>
  );
}

export default FormSignUp;
