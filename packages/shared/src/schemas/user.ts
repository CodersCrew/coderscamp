import * as yup from 'yup';

export const userSchema = yup.object().shape({
  id: yup.number().typeError('Id must be a number').required('Id must be defined'),
  githubId: yup.number().typeError('Github Id must be a number'),
  fullName: yup.string().typeError('Full name must be a string').required('Full name is required'),
  email: yup.string().typeError('Email must be a string').email('Invalid email address').required('Email is required'),
  image: yup.string().typeError('Image must be a string'),
});

export const userInformationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  town: yup.string().required(),
  yearOfBirth: yup.number().min(1920).max(2006).required(),
  gender: yup.string().required(),
  educationStatus: yup.string().required(),
  fromWhere: yup.array().of(yup.string()).min(1).required(),
  source: yup
    .string()
    .notRequired()
    .when('fromWhere', { is: (values: string[]) => values.includes('Z innego źródła'), then: yup.string().required() }),
  thoughts: yup.string().required(),
});

export const user = yup.object({
  aboutYourself: yup.string().required(),
  prevParticipation: yup.string().required(),
  againParticipationReason: yup
    .string()
    .notRequired()
    .when('prevParticipation', {
      is: (value: string) => value !== 'Nie',
      then: yup.string().required(),
    }),
  campExpectations: yup.string().required(),
  programmingExp: yup.string(),
  reasonToAccept: yup.string().required(),
  furtherStepsAfterCamp: yup.string().required(),
  absencePeriod: yup.string().required(),
  avgTimeForCamp: yup.number().min(0).max(120).required(),
});

export const agreementsSchema = yup.object({
  regulationAccept: yup.array().of(yup.string()).required(),
  rodoAccept: yup.array().of(yup.string()).required(),
  marketingAccept: yup.array().of(yup.string()),
});
