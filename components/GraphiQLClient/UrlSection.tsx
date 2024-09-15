'use client';

import { TextField } from '@mui/material';
import { selectAll, setSdlUrl, setUrl } from '@/redux/features/graphiqlSlice';
import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { FormState, UseFormRegister } from 'react-hook-form';
import { UrlGraphql } from '@/types/url-graphql.types';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { setBrowserUrl } from '@/utils/setBrowserUrl';
import { useRouter } from '@/i18n/routing';

interface UrlFormInterface {
  errors: FormState<UrlGraphql>['errors'];
  register: UseFormRegister<UrlGraphql>;
}

const UrlSection = ({ register, errors }: UrlFormInterface) => {
  const router = useRouter();
  const t = useTranslations('GraphQLClient');
  const tToast = useTranslations('ToastMessages');
  const urlErrorMessage = useMemo(() => tToast('general.urlNotProvided'), [tToast]);
  const sdlErrorMessage = useMemo(() => tToast('general.sdlNotProvided'), [tToast]);
  const { url, sdlUrl, headers, query } = useAppSelector(selectAll);
  const dispatch = useAppDispatch();

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUrl(e.target.value));
    router.push(setBrowserUrl(url, query, headers));
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
          value: url,
          onBlur: changeUrl,
        })}
      />
      <TextField
        error={!!errors.sdl}
        label={t('sdl')}
        variant="outlined"
        value={sdlUrl || url + '?sdl'}
        size="small"
        {...register('sdl', {
          required: true,
          onChange: (e) => dispatch(setSdlUrl(e.target.value)),
        })}
      />
    </div>
  );
};

export default UrlSection;
