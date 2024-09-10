'use client';

import { TextField } from '@mui/material';
import { selectAll, setSdlUrl, setUrl } from '@/redux/features/graphiqlClient/graphiqlSlice';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { FormState, UseFormRegister } from 'react-hook-form';
import { UrlGraphql } from '@/interfaces/url-graphql.interfase';

interface UrlFormInterface {
  errors: FormState<UrlGraphql>['errors'];
  register: UseFormRegister<UrlGraphql>;
}

const UrlSection = ({ register, errors }: UrlFormInterface) => {
  const { url, sdlUrl } = useAppSelector(selectAll);
  const dispatch = useAppDispatch();

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUrl(e.target.value));
  };

  return (
    <div className="flex flex-col gap-2">
      <TextField
        error={!!errors.endpoint}
        helperText={errors.endpoint ? errors.endpoint.message : ' '}
        id="endpoint"
        label="Endpoint"
        variant="outlined"
        value={url}
        size="small"
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
        size="small"
        {...register('sdl', { onChange: (e) => dispatch(setSdlUrl(e.target.value)) })}
      />
    </div>
  );
};

export default UrlSection;
