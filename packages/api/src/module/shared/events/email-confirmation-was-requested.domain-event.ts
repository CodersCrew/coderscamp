import type { UserId } from '@/shared/domain.types';

export type EmailConfirmationWasRequested = {
  type: 'EmailConfirmationWasRequested';
  data: { userId: UserId; confirmationToken: string; confirmationFor: string };
};
