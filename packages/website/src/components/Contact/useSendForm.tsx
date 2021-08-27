import { useState } from 'react';

import { useToast, UseToastOptions } from '@coderscamp/ui/hooks/useToast';

import type { FormValues } from './Form';

const toastSharedOptions: Partial<UseToastOptions> = {
  duration: 15 * 1000,
  isClosable: true,
  position: 'top',
};

export const useSendForm = () => {
  const [isSending, setIsSending] = useState(false);
  const toast = useToast();

  const send = async (values: FormValues, onSuccess: () => void) => {
    toast.closeAll();

    setIsSending(true);

    try {
      const response = await fetch('/api/contact-form', {
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
        title: `Twoja wiadomość została wysłana. Odpowiedź prześlemy na podany adres e-mail (${values.email})`,
        ...toastSharedOptions,
      });

      onSuccess();
    } catch {
      toast({
        status: 'error',
        title:
          'Nie udało się wysłać wiadomości. Spróbuj ponownie lub skontaktuj się z nami poprzez jeden z linków nad formularzem',
        ...toastSharedOptions,
      });
    } finally {
      setIsSending(false);
    }
  };

  return { send, isSending };
};
