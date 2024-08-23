'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { SignInData } from '@/interfaces/signin.interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '@/validation';
import {
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

function FormSignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<SignInData>({
    resolver: yupResolver(validationSchema),
  });

  const onFormSubmit = (data: SignInData) => {
    console.log(data);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div>
        <TextField
          error={!!errors.login}
          required
          id="login"
          label="Login"
          type="email"
          helperText={errors.login ? errors.login.message : ''}
          {...register('login')}
        />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" error={!!errors.password}>
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
      </div>
      <button type="submit" disabled={!isValid && isSubmitted}>
        Sign in
      </button>
      <p>If you do not have an account, please Sign up</p>
    </form>
  );
}

export default FormSignIn;
