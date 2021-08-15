import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@coderscamp/ui/components/Button';
import { Checkbox } from '@coderscamp/ui/components/Checkbox';
import { CheckboxGroup } from '@coderscamp/ui/components/CheckboxGroup';
import { Flex } from '@coderscamp/ui/components/Flex';
import { FormField } from '@coderscamp/ui/components/FormField';
import { Grid } from '@coderscamp/ui/components/Grid';
import { Input } from '@coderscamp/ui/components/Input';
import { NumberInput } from '@coderscamp/ui/components/NumberInput';
import { Radio } from '@coderscamp/ui/components/Radio';
import { RadioGroup } from '@coderscamp/ui/components/RadioGroup';

import { StorageHelper } from '../../../helpers/storageHelper';
import { FormProps } from '../../../types/formTypes';
import { FormFooter } from '../../FormUI/FormFooter';
import { FormHeader } from '../../FormUI/FormHeader';
import { validationSchemaStepOne } from '../validationSchemas';

export const FormStepOne: React.FC<FormProps> = ({ setCurrentStep }) => {
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
    resolver: yupResolver(validationSchemaStepOne),
  });

  // TODO Refactor
  useEffect(() => {
    window.scrollTo(0, 0);
    StorageHelper.getValue('formStepOne').then((res) => {
      if (res) {
        const values = getValues();

        Object.keys(JSON.parse(res)).forEach((key) => {
          setValue(key as keyof typeof values, JSON.parse(res)[key]);
        });
      }
    });

    const saveInterval = setInterval(() => {
      StorageHelper.setValue('formStepOne', JSON.stringify(getValues()));
    }, 1000 * 60);

    return () => {
      clearInterval(saveInterval);
    };
  }, []);

  const watchSource: string[] = watch('fromWhere');

  const onSubmit = (data: any) => {
    setCurrentStep(1);
    StorageHelper.setValue('formStepNumber', 1);
    StorageHelper.setValue('formStepOne', JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        step={1}
        title="Informacje do statystyk"
        subtitle="Dzięki znajomości najczęściej występujących sylwetek kandydatów możemy lepiej zaplanować nasz marketing oraz przebieg kursu."
      />
      <Grid gap="32px" padding="32px 24px">
        <FormField label="Imię i nazwisko" required error={errors.name?.message}>
          <Input {...register('name')} />
        </FormField>
        <FormField label="Adres e-mail" required error={errors.email?.message}>
          <Input {...register('email')} />
        </FormField>
        <FormField label="Miasto" required error={errors.town?.message}>
          <Input {...register('town')} />
        </FormField>
        <Controller
          control={control}
          name="yearOfBirth"
          render={({ field }) => (
            <FormField label="Rok urodzenia" required error={errors.yearOfBirth?.message}>
              <NumberInput {...field} />
            </FormField>
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <FormField label="Płeć" required error={errors.gender?.message}>
              <RadioGroup direction="row" name={field.name} value={field.value} onChange={field.onChange}>
                <Radio value="male">Mężczyzna</Radio>
                <Radio value="female">Kobieta</Radio>
              </RadioGroup>
            </FormField>
          )}
        />
        <Controller
          name="educationStatus"
          control={control}
          render={({ field }) => (
            <FormField label="Czy jesteś studentem?" required error={errors.educationStatus?.message}>
              <RadioGroup direction="column" name={field.name} value={field.value} onChange={field.onChange}>
                <Radio value="Tak, studiuję">Tak, studiuję</Radio>
                <Radio value="Nie, ukończyłem studia">Nie, ukończyłem studia</Radio>
                <Radio value="Nie, dopiero planuję iść na studia">Nie, dopiero planuję iść na studia</Radio>
                <Radio value="Nie, nie studiowałem">Nie, nie studiowałem</Radio>
              </RadioGroup>
            </FormField>
          )}
        />
        <Controller
          name="fromWhere"
          control={control}
          render={({ field }) => (
            <FormField label="Skąd dowiedziełeś się o CodersCamp?" required error={errors.fromWhere?.message}>
              <CheckboxGroup value={field.value} onChange={field.onChange} onBlur={field.onBlur}>
                <Checkbox value="Od uczestnika jednej z poprzednich edycji">
                  Od uczestnika jednej z poprzednich edycji
                </Checkbox>
                <Checkbox value="Od mentora kursu CodersCamp">Od mentora kursu CodersCamp</Checkbox>
                <Checkbox value="Od znajomego">Od znajomego</Checkbox>
                <Checkbox value="Z grupy na Facebooku">Z grupy na Facebooku</Checkbox>
                <Checkbox value="Z wydarzenia na Facebooku">Z wydarzenia na Facebooku</Checkbox>
                <Checkbox value="Z fanpage CodersCrew">Z fanpage CodersCrew</Checkbox>
                <Checkbox value="Z Instagrama CodersCrew">Z Instagrama CodersCrew</Checkbox>
                <Checkbox value="Z LinkedIna CodersCrew">Z LinkedIna CodersCrew</Checkbox>
                <Checkbox value="Z social media uczelni">Z social media uczelni</Checkbox>
                <Checkbox value="Z social media partnerów kursu">Z social media partnerów kursu</Checkbox>
                <Checkbox value="Z innego źródła">Z innego źródła</Checkbox>
              </CheckboxGroup>
            </FormField>
          )}
        />
        {watchSource?.includes('Z innego źródła') && (
          <FormField
            label="Podaj źródło, z którego dowiedziałeś się o CodersCamp"
            required
            error={errors.source?.message}
          >
            <Input {...register('source')} isInvalid={errors.source} />
          </FormField>
        )}

        <FormField
          label="Wymień 5 skojarzeń z CodersCamp, które przychodzą Ci do głowy"
          required
          error={errors.thoughts?.message}
        >
          <Input
            {...register('thoughts')}
            placeholder="Oddziel poszczególne skojarzenia za pomocą przecinków"
            isInvalid={errors.name}
          />
        </FormField>
      </Grid>
      <FormFooter>
        <Flex justifyContent="flex-end">
          <Button type="submit" size="lg" bgColor="brand.500" textColor="white">
            Kolejny krok
          </Button>
        </Flex>
      </FormFooter>
    </form>
  );
};
