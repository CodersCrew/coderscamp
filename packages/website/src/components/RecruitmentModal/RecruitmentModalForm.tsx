import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@coderscamp/ui/components/Button';
import { FormField } from '@coderscamp/ui/components/FormField';
import { Input } from '@coderscamp/ui/components/Input';
import { Stack } from '@coderscamp/ui/components/Stack';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';

import { emailValidator, requiredValidator } from '@/components/Contact/Form';

import type { ModalType } from './RecruitmentModalProvider';
import { useSendRecruitmentForm } from './useSendRecruitmentForm';

interface FormValues {
  name: string;
  email: string;
}

interface Honeypot {
  repeat: string;
}

export interface RecruitmentModalData extends FormValues {
  type: ModalType;
}

interface RecruitmentModalFormProps {
  modalType: ModalType;
  onClose: () => void;
}

export const RecruitmentModalForm = ({ modalType, onClose }: RecruitmentModalFormProps) => {
  const size = useBreakpointValue({ base: 'md', sm: 'lg' } as const);
  const flexDirection = useBreakpointValue({ base: 'column', lg: 'row' } as const);
  const inputMaxWidth = useBreakpointValue({ base: '100%', lg: '264px' } as const);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues & Honeypot>();
  const { send, isSending } = useSendRecruitmentForm();

  const onSubmit: SubmitHandler<FormValues & Honeypot> = ({ repeat, ...values }) => {
    if (!repeat) {
      send({ ...values, type: modalType }, () => {
        onClose();
        reset();
      });
    }
  };

  return (
    <Stack spacing="16px" w="100%" direction={flexDirection} onSubmit={handleSubmit(onSubmit)} as="form">
      <FormField size={size} maxW={inputMaxWidth} error={errors.name?.message}>
        <Input
          {...register('name', requiredValidator)}
          disabled={isSending}
          invalid={Boolean(errors.name)}
          placeholder="Imię"
        />
      </FormField>
      <FormField size={size} maxW={inputMaxWidth} error={errors.email?.message}>
        <Input
          {...register('email', { ...requiredValidator, ...emailValidator })}
          disabled={isSending}
          placeholder="Adres e-mail"
        />
      </FormField>
      <FormField size={size} maxW={inputMaxWidth} error={errors.email?.message} position="absolute" visibility="hidden">
        <Input {...register('repeat')} disabled={isSending} placeholder="Powtórz adres e-mail" />
      </FormField>
      <Button type="submit" color="brand" variant="solid" size={size} isLoading={isSending}>
        Wyślij
      </Button>
    </Stack>
  );
};
