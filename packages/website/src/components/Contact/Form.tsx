import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@coderscamp/ui/components/Button';
import { FormField } from '@coderscamp/ui/components/FormField';
import { Input } from '@coderscamp/ui/components/Input';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Textarea } from '@coderscamp/ui/components/Textarea';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';

import { useSendForm } from './useSendForm';

export interface FormValues {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface Honeypot {
  category: string;
}

const EMAIL_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const requiredValidator = { required: 'To pole jest wymagane' };
const emailValidator = { pattern: { value: EMAIL_REGEX, message: 'Niepoprawny adres e-mail' } };

export const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues & Honeypot>();
  const { send, isSending } = useSendForm();
  const size = useBreakpointValue({ base: 'md', sm: 'lg' } as const);

  const onSubmit = handleSubmit(({ category, ...values }) => {
    if (!category) {
      send(values, reset);
    }
  });

  return (
    <VStack spacing="24px" width="min(640px, 100%)" as="form" onSubmit={onSubmit}>
      <VStack spacing="16px" width="100%">
        <FormField size={size} label="Imię i nazwisko" error={errors.fullName?.message}>
          <Input {...register('fullName', requiredValidator)} disabled={isSending} />
        </FormField>
        <FormField size={size} label="Adres e-mail" error={errors.email?.message}>
          <Input {...register('email', { ...requiredValidator, ...emailValidator })} disabled={isSending} />
        </FormField>
        <FormField
          size={size}
          label="Kategoria"
          error={errors.category?.message}
          position="absolute"
          visibility="hidden"
        >
          <Input {...register('category')} disabled={isSending} />
        </FormField>
        <FormField size={size} label="Temat" error={errors.subject?.message}>
          <Input {...register('subject', requiredValidator)} disabled={isSending} />
        </FormField>
        <FormField size={size} label="Wiadomość" error={errors.message?.message}>
          <Textarea {...register('message', requiredValidator)} disabled={isSending} rows={6} />
        </FormField>
      </VStack>
      <Button
        type="submit"
        color="brand"
        variant="solid"
        size={size}
        width="100%"
        isLoading={isSending}
        loadingText="Wysyłanie formularza"
      >
        Wyślij wiadomość
      </Button>
    </VStack>
  );
};
