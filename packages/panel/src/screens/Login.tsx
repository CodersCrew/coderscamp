import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { LoginBody } from '@coderscamp/shared/models/auth/login';
import { Button } from '@coderscamp/ui/components/Button';
import { Center } from '@coderscamp/ui/components/Center';
import { FormField } from '@coderscamp/ui/components/FormField';
import { Input } from '@coderscamp/ui/components/Input';
import { VStack } from '@coderscamp/ui/components/Stack';

import { useUserActions } from '@/modules/user';

const resolver = classValidatorResolver(LoginBody);

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBody>({ resolver });
  const authActions = useUserActions();

  const onSubmit: SubmitHandler<LoginBody> = (values) => {
    authActions.login({ body: values });
  };

  return (
    <Center width="100vw" height="100vh">
      <VStack
        spacing="32px"
        as="form"
        p="40px"
        bg="white"
        borderRadius="8px"
        boxShadow="base"
        width="400px"
        onSubmit={handleSubmit(onSubmit)}
      >
        <VStack spacing="16px" width="100%">
          <FormField size="lg" label="Adres e-mail" error={errors.email?.message}>
            <Input {...register('email')} />
          </FormField>
          <FormField size="lg" label="Hasło" error={errors.password?.message}>
            <Input {...register('password')} />
          </FormField>
        </VStack>
        <Button type="submit" color="brand" size="lg" width="100%">
          Zaloguj się
        </Button>
      </VStack>
    </Center>
  );
};
