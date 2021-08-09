import * as yup from 'yup';

export const userSchema = yup.object().shape({
  id: yup.number().typeError('Id must be a number').required('Id must be defined'),
  githubId: yup.number().typeError('Github Id must be a number'),
  fullName: yup.string().typeError('Full name must be a string').required('Full name is required'),
  email: yup.string().typeError('Email must be a string').email('Invalid email address').required('Email is required'),
  image: yup.string().typeError('Image must be a string'),
});
