import { AbstractApplicationCommand } from '@/module/application-command-events';
import { UserId } from '@/shared/domain.types';

export type RequestEmailConfirmation = {
  type: 'RequestEmailConfirmation';
  data: { userId: UserId; confirmationToken: string; confirmationFor: string };
};

export const requestEmailConfirmationCommand = (data: RequestEmailConfirmation['data']): RequestEmailConfirmation => ({
  type: 'RequestEmailConfirmation',
  data,
});

export class RequestEmailConfirmationApplicationCommand extends AbstractApplicationCommand<RequestEmailConfirmation> {}
