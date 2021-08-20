import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { setFormValues } from 'src/helpers/getFormValue';

import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';
import { FormField } from '@coderscamp/ui/components/FormField';
import { Grid } from '@coderscamp/ui/components/Grid';
import { Input } from '@coderscamp/ui/components/Input';
import { NumberInput } from '@coderscamp/ui/components/NumberInput';
import { Radio } from '@coderscamp/ui/components/Radio';
import { RadioGroup } from '@coderscamp/ui/components/RadioGroup';
import { Textarea } from '@coderscamp/ui/components/Textarea';

import { StorageHelper } from '../../../helpers/storageHelper';
import { FormProps, FormStepTwoData } from '../../../types/formTypes';
import { FormFooter } from '../../FormUI/FormFooter';
import { FormHeader } from '../../FormUI/FormHeader';
import { validationSchemaStepTwo } from '../validationSchemas';

export const FormStepTwo: React.FC<FormProps> = ({ setCurrentStep }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
    getValues,
    setValue,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchemaStepTwo),
  });

  const watchPrevParticipation = watch('prevParticipation');
  const watchHours = watch('averageTime');

  // TODO Refactor
  useEffect(() => {
    window.scrollTo(0, 0);

    setFormValues('formStepTwo', setValue);

    const saveInterval = setInterval(() => {
      StorageHelper.setValue('formStepTwo', getValues() as FormStepTwoData);
    }, 1000 * 60);

    return () => {
      clearInterval(saveInterval);
    };
  }, []);

  const onSubmit = (data: FormStepTwoData) => {
    setCurrentStep(2);
    StorageHelper.setValue('formStepTwo', data);
  };

  const goBack = () => {
    setCurrentStep(0);
    StorageHelper.setValue('formStepNumber', 0);
    StorageHelper.setValue('formStepTwo', getValues() as FormStepTwoData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        step={2}
        title="Ty i Twój plan na CodersCamp"
        subtitle="W tej sekcji znajdziesz pytania dotyczące Ciebie oraz Twoich planów odnośnie CodersCamp. Odpowiedzi nie mają wpływu na dostanie się na kurs, jednak będą brane pod uwagę przez mentorów podczas kompletowania zespołów. "
      />
      <Grid gap="32px" padding="32px 24px">
        <FormField label="Napisz kilka zdań o sobie" required error={errors.description?.message}>
          <Textarea {...register('description')} />
        </FormField>

        <Controller
          name="prevParticipation"
          control={control}
          render={({ field }) => (
            <FormField
              label="Czy brałeś/aś już udział w CodersCamp?"
              required
              error={errors.prevParticipation?.message}
            >
              <RadioGroup name={field.name} value={field.value} onChange={field.onChange}>
                <Radio value="Tak, ukończyłem/am kurs">Tak, ukończyłem/am kurs</Radio>
                <Radio value="Tak, ale nie ukończyłem/am kursu">Tak, ale nie ukończyłem/am kursu</Radio>
                <Radio value="Nie">Nie</Radio>
              </RadioGroup>
            </FormField>
          )}
        />

        {(watchPrevParticipation === 'Tak, ukończyłem/am kurs' ||
          watchPrevParticipation === 'Tak, ale nie ukończyłem/am kursu') && (
          <FormField
            label="Dlaczego chciałbyś/aś ponownie wziąć udział w kursie?"
            required
            error={errors.reasonForRetakingCourse?.message}
          >
            <Input {...register('reasonForRetakingCourse')} />
          </FormField>
        )}

        <FormField label="Jakie są Twoje oczekiwania wobec CodersCamp?" required error={errors.expectations?.message}>
          <Textarea {...register('expectations')} invalid={errors.expectations} />
        </FormField>

        <FormField
          label="Jeśli masz już jakieś doświadczenia z programowaniem, opisz je poniżej"
          error={errors.experience?.message}
        >
          <Textarea {...register('programmingExp')} invalid={errors.experience} />
        </FormField>

        <FormField
          label="Dlaczego właśnie Ciebie powinniśmy przyjąć na CodersCamp?"
          required
          error={errors.reasonToAccept?.message}
        >
          <Textarea {...register('reasonToAccept')} invalid={errors.reasonToAccept} />
        </FormField>

        <FormField
          label="Jakie kolejne kroki planujesz podjąć po ukończeniu kursu?"
          required
          error={errors.plans?.message}
        >
          <Textarea {...register('plans')} />
        </FormField>

        <Controller
          name="absencePeriod"
          control={control}
          render={({ field }) => (
            <FormField
              label="Czy w trakcie kursu pojawi się ponad 5-dniowy okres, w którym nie dasz rady przerabiać żadnych materiałów?"
              required
              error={errors.absencePeriod?.message}
            >
              <RadioGroup name={field.name} value={field.value} onChange={field.onChange}>
                <Radio value="Na pewno tak">Na pewno tak</Radio>
                <Radio value="Możliwe, że tak">Możliwe, że tak</Radio>
                <Radio value="Nie">Nie</Radio>
              </RadioGroup>
            </FormField>
          )}
        />

        <Controller
          control={control}
          name="averageTime"
          render={({ field }) => (
            <FormField
              label="Ile średnio czasu (w godzinach) będziesz w stanie poświęcić w ciągu tygodnia na naukę i realizację
              projektów w ramach CodersCamp?"
              required
              error={errors.averageTime?.message}
              warning={
                watchHours < 20
                  ? 'CodersCamp jest intensywnym kursem i może być Ci ciężko go ukończyć jeśli nie przeznaczysz na niego co najmniej 20 godzin tygodniowo'
                  : null
              }
            >
              <NumberInput {...field} />
            </FormField>
          )}
        />
      </Grid>
      <FormFooter>
        <Flex justifyContent="space-between">
          <Button size="lg" onClick={goBack}>
            Poprzedni krok
          </Button>
          <Button type="submit" size="lg" bgColor="brand.500" textColor="white">
            Kolejny krok
          </Button>
        </Flex>
      </FormFooter>
    </form>
  );
};
