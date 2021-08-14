import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@coderscamp/ui/components/Button';
import { Checkbox } from '@coderscamp/ui/components/Checkbox';
import { Flex } from '@coderscamp/ui/components/Flex';
import { FormField } from '@coderscamp/ui/components/FormField';
import { Grid } from '@coderscamp/ui/components/Grid';

import { FormFooter } from '../FormFooter';
import { FormHeader } from '../FormHeader';
import { StorageHelper } from '../helpers/storageHelper';
import { validationSchemaStepThree } from '../validationSchemas';
import { FormProps } from './types';

export const FormStepThree: React.FC<FormProps> = ({ setCurrentStep }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchemaStepThree),
    defaultValues: {
      regulationAccept: false,
      rodoAccept: false,
      marketingAccept: false,
    },
  });

  const onSubmit = (data: any) => console.log({ ...data });

  const goBack = () => {
    setCurrentStep(1);
    StorageHelper.setValue('formStepNumber', 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader step={3} title="Zgody" subtitle="Kilka zgód związanych z uczestnictwen w CodersCamp " />
      <Grid gap="32px" padding="32px 24px">
        <Controller
          name="regulationAccept"
          control={control}
          render={({ field }) => (
            <FormField label="Akceptacja regulaminu" required error={errors.regulationAccept?.message}>
              <Checkbox onChange={(event) => field.onChange(event.target.checked)} checked={field.value}>
                Akceptuję regulamin 6. edycji kursu CodersCamp
              </Checkbox>
            </FormField>
          )}
        />

        <Controller
          name="rodoAccept"
          control={control}
          render={({ field }) => (
            <FormField label="Zgoda RODO" required error={errors.rodoAccept?.message}>
              <Checkbox onChange={(event) => field.onChange(event.target.checked)} checked={field.value}>
                Wyrażam zgodę na przetwarzanie moich danych osobowych w zakresie imienia, nazwiska, wieku, telefonu oraz
                adresu e-mail przez Stowarzyszenie CodersCrew z siedzibą we Wrocławiu (53–311) przy ul. Drukarskiej 37,
                lok. 78, zgodnie z art. 6 ust. 1 lit. a ogólnego rozporządzenia o ochronie danych osobowych z dnia 27
                kwietnia 2016 r. (RODO), do celów uczestnictwa w CodersCamp 2020 - otwartym kursie programowania
                webowego i sprawozdawczości Stowarzyszenia.
              </Checkbox>
            </FormField>
          )}
        />

        <Controller
          name="marketingAccept"
          control={control}
          render={({ field }) => (
            <FormField label="Zgoda marketingowa" error={errors.marketingAccept?.message}>
              <Checkbox onChange={(event) => field.onChange(event.target.checked)} checked={field.value}>
                Wyrażam zgodę na przetwarzanie moich danych osobowych w zakresie imienia, nazwiska, wieku, telefonu oraz
                adresu e-mail przez Stowarzyszenie CodersCrew z siedzibą we Wrocławiu, wpisane do rejestru stowarzyszeń
                Krajowego Rejestru Sądowego pod numerem KRS 0000744745 (dalej: „Stowarzyszenie”), w celach
                marketingowych, w tym do przesyłania mi informacji o wydarzeniach organizowanych przez Stowarzyszenie.
              </Checkbox>
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
            Wyślij formularz
          </Button>
        </Flex>
      </FormFooter>
    </form>
  );
};
