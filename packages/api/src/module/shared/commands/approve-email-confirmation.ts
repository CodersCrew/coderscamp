import { AbstractApplicationCommand } from '@/module/application-command-events';
import { UserId } from '@/shared/domain.types';

export type ApproveEmailConfirmation = {
  type: 'ApproveEmailConfirmation';
  data: { confirmationToken: string; userId: UserId; confirmationFor: string };
};

export const approveEmailConfirmationCommand = (data: ApproveEmailConfirmation['data']): ApproveEmailConfirmation => ({
  type: 'ApproveEmailConfirmation',
  data,
});

export class ApproveEmailConfirmationApplicationCommand extends AbstractApplicationCommand<ApproveEmailConfirmation> {}
