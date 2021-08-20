import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@coderscamp/ui/components/Button';
import { FormControl } from '@coderscamp/ui/components/FormControl';
import { HelperText } from '@coderscamp/ui/components/HelperText';
import { Input } from '@coderscamp/ui/components/Input';
import { Label } from '@coderscamp/ui/components/Label';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Textarea } from '@coderscamp/ui/components/Textarea';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { useToast, UseToastOptions } from '@coderscamp/ui/hooks/useToast';

type FormValues = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

const EMAIL_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const requiredValidator = { required: 'To pole jest wymagane' };
export const emailValidator = { pattern: { value: EMAIL_REGEX, message: 'Niepoprawny adres e-mail' } };

const toastSharedOptions: Partial<UseToastOptions> = {
  duration: 15 * 1000,
  isClosable: true,
  position: 'top',
};

export const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const toast = useToast();
  const size = useBreakpointValue({ base: 'md', sm: 'lg' } as const);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);

    const isSubmitted = Math.random() < 0.5;

    toast.closeAll();

    if (isSubmitted) {
      toast({
        status: 'success',
        title: `Twoja wiadomość została wysłana. Odpowiedź prześlemy na podany adres e-mail (${data.email})`,
        ...toastSharedOptions,
      });
      reset();
    } else {
      toast({
        status: 'error',
        title:
          'Nie udało się wysłać wiadomości. Spróbuj ponownie lub skontaktuj się z nami poprzez jeden z linków nad formularzem',
        ...toastSharedOptions,
      });
    }
  };

  return (
    <VStack spacing="24px" width="min(640px, 100%)" as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="16px" width="100%">
        <FormControl size={size}>
          <Label>Imię i nazwisko</Label>
          <Input {...register('fullName', requiredValidator)} invalid={Boolean(errors.fullName)} />
          {errors.fullName && <HelperText variant="error">{errors.fullName.message}</HelperText>}
        </FormControl>
        <FormControl size={size}>
          <Label>Adres e-mail</Label>
          <Input {...register('email', { ...requiredValidator, ...emailValidator })} invalid={Boolean(errors.email)} />
          {errors.email && <HelperText variant="error">{errors.email.message}</HelperText>}
        </FormControl>
        <FormControl size={size}>
          <Label>Temat</Label>
          <Input {...register('subject', requiredValidator)} invalid={Boolean(errors.subject)} />
          {errors.subject && <HelperText variant="error">{errors.subject.message}</HelperText>}
        </FormControl>
        <FormControl size={size}>
          <Label>Wiadomość</Label>
          <Textarea {...register('message', requiredValidator)} invalid={Boolean(errors.message)} rows={6} />
          {errors.message && <HelperText variant="error">{errors.message.message}</HelperText>}
        </FormControl>
      </VStack>
      <Button type="submit" color="brand" variant="solid" size={size} width="100%">
        Wyślij wiadomość
      </Button>
    </VStack>
  );
};
