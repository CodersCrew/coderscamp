import { UserId } from '@/shared/domain.types';

import { AbstractApplicationCommand } from '../application-command-events';

export type CompleteUserRegistration = {
  type: 'CompleteUserRegistration';
  data: {
    userId: UserId;
  };
};

export const completeUserRegistrationCommand = (data: CompleteUserRegistration['data']): CompleteUserRegistration => ({
  type: 'CompleteUserRegistration',
  data,
});

export class CompleteUserRegistrationApplicationCommand extends AbstractApplicationCommand<CompleteUserRegistration> {}
