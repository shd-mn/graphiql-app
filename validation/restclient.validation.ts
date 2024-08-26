import * as yup from 'yup';

export const restClientValidationSchema = yup.object().shape({
  method: yup
    .string()
    .oneOf(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'])
    .required('Method is required'),
  url: yup.string().required('URL is required'),
  queryParams: yup
    .array()
    .of(
      yup.object().shape({
        isChecked: yup.boolean(),
        key: yup.string(),
        value: yup.string(),
      }),
    )
    .optional(),
  headerParams: yup
    .array()
    .of(
      yup.object().shape({
        isChecked: yup.boolean(),
        key: yup.string(),
        value: yup.string(),
      }),
    )
    .optional(),
  body: yup.string(),
});
