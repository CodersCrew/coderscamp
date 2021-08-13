import * as yup from 'yup';

export const surveySchema = yup.object({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  town: yup.string().required(),
  birthYear: yup.number().min(1920).max(2006).required(),
  gender: yup.string().required(),
  educationStatus: yup.string().required(),
  courseInformationSource: yup.array().of(yup.string()).min(1).required(),
  associatedWords: yup.array().of(yup.string()).required(),
  description: yup.string().required(),
  prevParticipation: yup.bool().required(),
  reasonForRetakingCourse: yup.string().notRequired(),
  expectations: yup.string().required(),
  experience: yup.string(),
  reasonToAccept: yup.string().required(),
  plans: yup.string().required(),
  absencePeriod: yup.string().required(),
  averageTime: yup.number().min(0).max(120).required(),
  marketingAccept: yup.array().of(yup.bool()),
});
