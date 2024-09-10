'use client';

import { TextField } from '@mui/material';
import { selectAll, setSdlUrl, setUrl } from '@/redux/features/graphiqlClient/graphiqlSlice';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UrlGraphql } from '@/interfaces/url-graphql.interfase';
import { urlValidationSchema } from '@/validation/url-graphql.validation';

const UrlForm = () => {
  const { url, sdlUrl } = useAppSelector(selectAll);
  const dispatch = useAppDispatch();

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    void trigger('endpoint');
    console.log(e.target.value, 'target');
    console.log('submitted', isSubmitted);
    dispatch(setUrl(e.target.value));
  };

  const {
    register,
    trigger,
    formState: { errors, isSubmitted },
  } = useForm<UrlGraphql>({
    resolver: yupResolver(urlValidationSchema),
  });

  return (
    <form className="flex flex-col gap-2">
      <TextField
        error={!!errors.endpoint}
        helperText={errors.endpoint ? errors.endpoint.message : ' '}
        id="endpoint"
        label="Endpoint"
        variant="outlined"
        value={url}
        {...register('endpoint', {
          onChange: changeUrl,
        })}
      />
      <TextField
        error={!!errors.sdl}
        helperText={errors.sdl ? errors.sdl.message : ' '}
        label="SDL"
        variant="outlined"
        value={sdlUrl || url + '?sdl'}
        {...register('sdl', { onChange: (e) => dispatch(setSdlUrl(e.target.value)) })}
      />
    </form>
  );
};

export default UrlForm;
