'use client';

import React from 'react';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import type { SignInData } from '@/types/auth.types';
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
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth, logout } from '@/firebase';
import { routes } from '@/constants/routes';
import { FirebaseError } from '@firebase/util';
import { toast } from 'sonner';

function FormSignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const t = useTranslations('SignInPage');
  const tToast = useTranslations('ToastMessages');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<SignInData>({
    resolver: yupResolver(signInValidationSchema),
  });

  const onFormSubmit = async (data: SignInData) => {
    try {
      const user = await signInWithEmailAndPassword(auth, data.email, data.password);
      if (!user.user.emailVerified) {
        await logout();
        toast.info(tToast('auth.confirmEmail'));
        router.push(routes.signin);
      } else {
        toast.success(tToast('auth.successSignIn'));
        router.push(routes.home);
      }
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 'auth/invalid-credential') {
        toast.error(tToast('auth.userNotFound'));
      } else {
        toast.error(tToast('auth.errorSignIn'));
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
        <p className="m-0">{t('noAccount')}</p>
        <Link href={routes.signup} className="text-blue-500 hover:text-blue-700">
          {t('signUpLink')}
        </Link>
      </div>
      <TextField
        error={!!errors.email}
        id="email"
        label={t('email')}
        helperText={errors.email ? errors.email.message : ' '}
        autoComplete="email"
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
      <Button type="submit" variant="contained" disabled={!isValid && isSubmitted}>
        {t('signInButton')}
      </Button>
    </form>
  );
}

export default FormSignIn;
