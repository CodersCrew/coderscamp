import { requestEmailConfirmationCommand } from '@/module/commands/request-email-conformation';

import { requestEmailConfirmation } from './requestEmailConfirmation';

describe('Request email confirmation', () => {
  it('create event EmailConfirmationWasRequested when requestEmailConfirmation is invoked', () => {
    const userId = 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab';
    const confirmationToken = 'sbAPITNMsl2wW6j2cg1H2A';
    const confirmationFor = 'user-registration';

    const command = requestEmailConfirmationCommand({
      userId,
      confirmationToken,
      confirmationFor,
    });
    const result = requestEmailConfirmation(command)();

    expect(result).toHaveLength(1);
    expect(result[0].data).toEqual(command.data);
    expect(result[0].type).toEqual('EmailConfirmationWasRequested');
  });
});
