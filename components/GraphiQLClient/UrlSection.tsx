'use client';

import { TextField } from '@mui/material';
import { selectAll, setSdlUrl, setUrl } from '@/redux/features/graphiqlSlice';
import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { FormState, UseFormRegister } from 'react-hook-form';
import { UrlGraphql } from '@/types/url-graphql.types';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface UrlFormInterface {
  errors: FormState<UrlGraphql>['errors'];
  register: UseFormRegister<UrlGraphql>;
  urlinput?: string;
}

const UrlSection = ({ register, errors, urlinput }: UrlFormInterface) => {
  const t = useTranslations('GraphQLClient');
  const tToast = useTranslations('ToastMessages');
  const urlErrorMessage = useMemo(() => tToast('general.urlNotProvided'), [tToast]);
  const sdlErrorMessage = useMemo(() => tToast('general.sdlNotProvided'), [tToast]);
  const { url, sdlUrl } = useAppSelector(selectAll);
  const dispatch = useAppDispatch();

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUrl(e.target.value));
  };

  useEffect(() => {
    if (errors.endpoint?.type === 'required') {
      toast.error(urlErrorMessage);
    } else if (errors.sdl?.type === 'required') {
      toast.error(sdlErrorMessage);
    }
  }, [errors.endpoint, errors.sdl, urlErrorMessage, sdlErrorMessage]);

  return (
    <div className="mb-3 flex flex-col gap-3">
      <TextField
        error={!!errors.endpoint}
        id="endpoint"
        label={t('endpoint')}
        variant="outlined"
        size="small"
        {...register('endpoint', {
          required: true,
          value: url || urlinput,
          onChange: changeUrl,
        })}
      />
      <TextField
        error={!!errors.sdl}
        label={t('sdl')}
        variant="outlined"
        value={sdlUrl || url + '?sdl'}
        size="small"
        {...register('sdl', { required: true, onChange: (e) => dispatch(setSdlUrl(e.target.value)) })}
      />
    </div>
  );
};

export default UrlSection;
