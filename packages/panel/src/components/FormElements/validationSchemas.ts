import * as yup from 'yup';

// TODO Extract constants
const requiredMessage = 'To pole jest wymagane';

export const validationSchemaStepOne = yup.object({
  fullName: yup.string().required(requiredMessage),
  email: yup.string().email('Wpisz poprawny adres e-mail').required(requiredMessage),
  town: yup.string().required(requiredMessage),
  birthYear: yup
    .number()
    .typeError(requiredMessage)
    .min(1920, 'Rok musi być między 1920 a 2006')
    .max(2006, 'Rok musi być między 1920 a 2006')
    .required(requiredMessage),
  gender: yup.string().required(requiredMessage),
  educationStatus: yup.string().required(requiredMessage),
  fromWhere: yup.array().of(yup.string()).min(1, 'Zaznacz conajmniej jedno pole').required(requiredMessage),
  fromWhereSource: yup
    .string()
    .notRequired()
    .when('fromWhere', {
      is: (values: string[]) => values && values.includes('Z innego źródła'),
      then: yup.string().required(requiredMessage),
    }),
  associatedWords: yup
    .array()
    .of(yup.string())
    .typeError(requiredMessage)
    .min(1, requiredMessage)
    .required(requiredMessage),
});

export const validationSchemaStepTwo = yup.object({
  description: yup.string().required(requiredMessage),
  prevParticipation: yup.string().required(requiredMessage),
  reasonForRetakingCourse: yup
    .string()
    .notRequired()
    .when('prevParticipation', {
      is: (value: string) => value === 'Tak, ukończyłem/am kurs' || value === 'Tak, ale nie ukończyłem/am kursu',
      then: yup.string().required(requiredMessage),
    }),
  expectations: yup.string().required(requiredMessage),
  experience: yup.string(),
  reasonToAccept: yup.string().required(requiredMessage),
  plans: yup.string().required(requiredMessage),
  absencePeriod: yup.string().required(requiredMessage),
  averageTime: yup
    .number()
    .min(0, 'Nieprawidłowa wartość')
    .max(120, 'Nieprawidłowa wartość')
    .typeError(requiredMessage)
    .required(requiredMessage),
});

export const validationSchemaStepThree = yup.object({
  regulationAccept: yup.boolean().oneOf([true], requiredMessage).required(requiredMessage),
  rodoAccept: yup.boolean().oneOf([true], requiredMessage).required(requiredMessage),
  marketingAccept: yup.boolean(),
});
