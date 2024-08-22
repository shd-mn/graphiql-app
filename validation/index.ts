import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  login: yup.string().email('Invalid email address').required('Login is required'),
  password: yup
    .string()
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[\W_]/, 'Password must contain at least one special character')
    .required('Password is required'),
});
