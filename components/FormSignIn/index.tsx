'use client';

import { useForm } from 'react-hook-form';
import { SignInData } from '@/interfaces/signin.interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '@/validation';

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

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <label htmlFor="email">Login</label>
      <input type="email" id="login" {...register('login')} />
      {errors.login && <div className="error">{errors.login.message}</div>}
      <label htmlFor="password">Password</label>
      <input type="password" id="password" {...register('password')} />
      {errors.password && <div className="error">{errors.password.message}</div>}
      <button type="submit" disabled={!isValid && isSubmitted}>
        Sign in
      </button>
      <p>If you do not have an account, please Sign up</p>
    </form>
  );
}

export default FormSignIn;
