import type { UserId } from '@/shared/domain.types';

export type EmailConfirmationWasApproved = {
  type: 'EmailConfirmationWasApproved';
  data: { userId: UserId; confirmationFor: string };
};

export const emailConfirmationWasApprovedEvent = (
  data: EmailConfirmationWasApproved['data'],
): EmailConfirmationWasApproved => ({
  type: 'EmailConfirmationWasApproved',
  data,
});
