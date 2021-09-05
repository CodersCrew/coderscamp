import { requestEmailConfirmationCommand } from '@/module/commands/request-email-conformation';
import { emailConfirmationWasRequestedEvent } from '@/module/events/email-confirmation-was-requested.domain-event';

import { requestEmailConfirmation } from './requestEmailConfirmation';

describe('Request email confirmation', () => {
  it('create event EmailConfirmationWasRequested when requestEmailConfirmation is invoked', () => {
    // given
    const userId = 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab';
    const confirmationToken = 'sbAPITNMsl2wW6j2cg1H2A';
    const confirmationFor = 'user-registration';

    const command = requestEmailConfirmationCommand({
      userId,
      confirmationToken,
      confirmationFor,
    });

    // when
    const result = requestEmailConfirmation(command)();

    // then
    const event = emailConfirmationWasRequestedEvent(command.data);

    expect(result).toEqual([event]);
  });
});
