import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';
import { FormControl } from '@coderscamp/ui/components/FormControl';
import { HelperText } from '@coderscamp/ui/components/HelperText';
import { Input } from '@coderscamp/ui/components/Input';
import { useToast } from '@coderscamp/ui/hooks/useToast';

type FormValues = {
  name: string;
  email: string;
};

const EMAIL_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const requiredValidator = { required: 'To pole jest wymagane' };
const emailValidator = { pattern: { value: EMAIL_REGEX, message: 'Niepoprawny adres e-mail' } };

export const ModalUserDataForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const toast = useToast();

  return (
    <Flex w="100%" justify="space-between">
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
