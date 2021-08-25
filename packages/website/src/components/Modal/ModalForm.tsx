import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@coderscamp/ui/components/Button';
import { FormControl } from '@coderscamp/ui/components/FormControl';
import { HelperText } from '@coderscamp/ui/components/HelperText';
import { Input } from '@coderscamp/ui/components/Input';
import { Stack } from '@coderscamp/ui/components/Stack';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';

import { emailValidator, requiredValidator } from '../Contact/Form';
import { ModalFormValues } from './Modal.data';

export const ModalForm = () => {
  const size = useBreakpointValue({ base: 'md', sm: 'lg' } as const);
  const flexDirection = useBreakpointValue({ base: 'column', lg: 'row' } as const);
  const inputMaxWidth = useBreakpointValue({ base: '100%', lg: '264px' } as const);
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
    <Stack spacing="16px" w="100%" direction={flexDirection} onSubmit={handleSubmit(onSubmit)} as="form">
      <FormControl size={size} maxW={inputMaxWidth}>
        <Input {...register('name', requiredValidator)} invalid={Boolean(errors.name)} placeholder="Imię" />
        {errors.name && <HelperText variant="error">{errors.name.message}</HelperText>}
      </FormControl>
      <FormControl size={size} maxW={inputMaxWidth}>
        <Input
          {...register('email', { ...requiredValidator, ...emailValidator })}
          invalid={Boolean(errors.email)}
          placeholder="Adres e-mail"
        />
        {errors.email && <HelperText variant="error">{errors.email.message}</HelperText>}
      </FormControl>
      <Button type="submit" color="brand" variant="solid" size={size}>
        Wyślij
      </Button>
    </Stack>
  );
};
