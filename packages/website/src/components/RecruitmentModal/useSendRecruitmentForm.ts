import { useState } from 'react';

import { useToast, UseToastOptions } from '@coderscamp/ui/hooks/useToast';

import type { RecruitmentModalData } from './RecruitmentModalForm';

const toastSharedOptions: Partial<UseToastOptions> = {
  duration: 15 * 1000,
  isClosable: true,
  position: 'top',
};

export const useSendRecruitmentForm = () => {
  const [isSending, setIsSending] = useState(false);
  const toast = useToast();

  const send = async (values: RecruitmentModalData, onSuccess: () => void) => {
    toast.closeAll();

    setIsSending(true);

    try {
      const response = await fetch('/api/recruitment-form', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw Error(response.statusText);
      }

      toast({
        status: 'success',
        title: `Twój adres e-mail (${values.email}) został dodany do naszej listy mailingowej`,
        ...toastSharedOptions,
      });

      onSuccess();
    } catch {
      toast({
        status: 'error',
        title: 'Nie udało się zapisać Cię na listę mailingową. Spróbuj ponownie później',
        ...toastSharedOptions,
      });
    } finally {
      setIsSending(false);
    }
  };

  return { send, isSending };
};
