import * as yup from 'yup';

// TODO Extract constants
const requiredMessage = 'To pole jest wymagane';

export const validationSchemaStepOne = yup.object({
  name: yup.string().required(requiredMessage),
  email: yup.string().email('Wpisz poprawny adres e-mail').required(requiredMessage),
  town: yup.string().required(requiredMessage),
  yearOfBirth: yup
    .number()
    .typeError(requiredMessage)
    .min(1920, 'Rok musi być między 1920 a 2006')
    .max(2006, 'Rok musi być między 1920 a 2006')
    .required(requiredMessage),
  gender: yup.string().required(requiredMessage),
  educationStatus: yup.string().required(requiredMessage),
  fromWhere: yup.array().of(yup.string()).min(1, 'Zaznacz conajmniej jedno pole').required(requiredMessage),
  source: yup
    .string()
    .notRequired()
    .when('fromWhere', {
      is: (values: string[]) => values && values.includes('Z innego źródła'),
      then: yup.string().required(requiredMessage),
    }),
  thoughts: yup.string().required(requiredMessage),
});

export const validationSchemaStepTwo = yup.object({
  aboutYourself: yup.string().required(requiredMessage),
  prevParticipation: yup.string().required(requiredMessage),
  againParticipationReason: yup
    .string()
    .notRequired()
    .when('prevParticipation', {
      is: (value: string) => value === 'Tak, ukończyłem/am kurs' || value === 'Tak, ale nie ukończyłem/am kursu',
      then: yup.string().required(requiredMessage),
    }),
  campExpectations: yup.string().required(requiredMessage),
  programmingExp: yup.string(),
  reasonToAccept: yup.string().required(requiredMessage),
  furtherStepsAfterCamp: yup.string().required(requiredMessage),
  absencePeriod: yup.string().required(requiredMessage),
  avgTimeForCamp: yup
    .number()
    .min(0, 'Mniej się nie da xD')
    .max(120, 'Nie ma nawet tylu godzin w tygodniu roboczym :O')
    .required(requiredMessage),
});

export const validationSchemaStepThree = yup.object({
  regulationAccept: yup.boolean().oneOf([true], requiredMessage).required(requiredMessage),
  rodoAccept: yup.boolean().oneOf([true], requiredMessage).required(requiredMessage),
  marketingAccept: yup.boolean(),
});
