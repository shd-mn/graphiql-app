import * as yup from 'yup';

export const urlValidationSchema = yup.object().shape({
  endpoint: yup.string().required('Endpoint is required'),
  sdl: yup.string().required('SDL is required'),
});
