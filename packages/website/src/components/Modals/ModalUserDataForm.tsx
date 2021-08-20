import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';
import { FormControl } from '@coderscamp/ui/components/FormControl';
import { HelperText } from '@coderscamp/ui/components/HelperText';
import { Input } from '@coderscamp/ui/components/Input';

import { emailValidator } from '../Contact/Form';

type ModalFormValues = {
  name: string;
  email: string;
};

const requiredValidator = {
  required: 'To pole nie może być puste',
};

export const ModalUserDataForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ModalFormValues>();

  const onSubmit: SubmitHandler<ModalFormValues> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
    reset();
  };

  return (
    <Flex w="100%" justify="space-between" onSubmit={handleSubmit(onSubmit)} as="form">
      <FormControl size="lg" maxW="264px">
        <Input {...register('name', requiredValidator)} invalid={Boolean(errors.name)} placeholder="Imię" />
        {errors.name && <HelperText variant="error">{errors.name.message}</HelperText>}
      </FormControl>
      <FormControl size="lg" maxW="264px">
        <Input
          {...register('email', { ...requiredValidator, ...emailValidator })}
          invalid={Boolean(errors.email)}
          placeholder="Adres e-mail"
        />
        {errors.email && <HelperText variant="error">{errors.email.message}</HelperText>}
      </FormControl>
      <Button type="submit" color="brand" variant="solid" size="lg" weight="medium" p="10px 24px">
        Wyślij
      </Button>
    </Flex>
  );
};
