import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { RegisterBody } from '@coderscamp/shared/models/auth/register';
import { Button } from '@coderscamp/ui/components/Button';
import { Center } from '@coderscamp/ui/components/Center';
import { FormField } from '@coderscamp/ui/components/FormField';
import { Input } from '@coderscamp/ui/components/Input';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';

import { useUserActions } from '@/modules/user';

const resolver = classValidatorResolver(RegisterBody);

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterBody>({ resolver });
  const authActions = useUserActions();

  const onSubmit: SubmitHandler<RegisterBody> = (values) => {
    authActions.register({ body: values });
  };

  return (
    <Center width="100vw" height="100vh">
      <VStack spacing="40px">
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
            <FormField size="lg" label="Imię i nazwisko" error={errors.fullName?.message}>
              <Input {...register('fullName')} />
            </FormField>
            <FormField size="lg" label="Adres e-mail" error={errors.email?.message}>
              <Input {...register('email')} />
            </FormField>
            <FormField size="lg" label="Hasło" error={errors.password?.message}>
              <Input type="password" {...register('password')} />
            </FormField>
          </VStack>
          <Button type="submit" color="brand" size="lg" width="100%">
            Zarejestruj się
          </Button>
        </VStack>
        <Typography>
          Posiadasz już konto na platformie?{' '}
          <Button as={Link} to="/login" color="brand" variant="link">
            Zaloguj się
          </Button>
        </Typography>
      </VStack>
    </Center>
  );
};
