import { approveEmailConfirmationCommand } from '@/module/commands/approve-email-confirmation';
import { emailConfirmationWasApprovedEvent } from '@/module/events/email-confirmation-was-approved.domain.event';
import { emailConfirmationWasRequestedEvent } from '@/module/events/email-confirmation-was-requested.domain-event';

import { approveEmailConfirmation } from './approve-email-confirmation';
import { EmailConfirmationDomainEvent } from './events';

describe('Approve email confirmation', () => {
  it('create event EmailConfirmationWasApproved when ApproveEmailConfirmation is invoked after requestEmailConfirmation', () => {
    // given
    const userId = 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab';
    const confirmationToken = 'sbAPITNMsl2wW6j2cg1H2A';
    const confirmationFor = 'user-registration';

    const emailConfirmationWasRequested = emailConfirmationWasRequestedEvent({
      userId,
      confirmationToken,
      confirmationFor,
    });

    const emailConfirmation = approveEmailConfirmationCommand({
      userId,
      confirmationToken,
      confirmationFor,
    });

    const pastEvents: EmailConfirmationDomainEvent[] = [emailConfirmationWasRequested];

    // when
    const result = approveEmailConfirmation(emailConfirmation)(pastEvents);

    // then
    const event = emailConfirmationWasApprovedEvent(emailConfirmation.data);

    expect(result).toEqual([event]);
  });

  it('throws exception if correspond requestEmailConfirmation does not exists', () => {
    // given
    const userId = 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab';
    const confirmationToken = 'sbAPITNMsl2wW6j2cg1H2A';
    const confirmationFor = 'user-registration';

    const emailConfirmation = approveEmailConfirmationCommand({
      userId,
      confirmationToken,
      confirmationFor,
    });

    const pastEvents: EmailConfirmationDomainEvent[] = [];

    // when - then
    expect(() => approveEmailConfirmation(emailConfirmation)(pastEvents)).toThrow(
      "Couldn't find request which could be approved",
    );
  });

  it('throws exception if last published requestEmailConfirmation does not correspond with invoked approveEmailConfirmation', () => {
    // givem
    const userId = 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab';
    const confirmationFor = 'user-registration';

    const oldConfirmationToken = 'sbAPITNMsl2wW6j2cg1H2A';
    const newConfirmationToken = 'kljawAKJJIJslKJjijlhjd';

    const oldEmailConfirmationWasRequested = emailConfirmationWasRequestedEvent({
      userId,
      confirmationToken: oldConfirmationToken,
      confirmationFor,
    });
    const newEmailConfirmationWasRequested = emailConfirmationWasRequestedEvent({
      userId,
      confirmationToken: newConfirmationToken,
      confirmationFor,
    });

    const pastEvents: EmailConfirmationDomainEvent[] = [
      oldEmailConfirmationWasRequested,
      newEmailConfirmationWasRequested,
    ];

    const emailConfirmationWithOldToken = approveEmailConfirmationCommand({
      userId,
      confirmationToken: oldConfirmationToken,
      confirmationFor,
    });

    // when - them
    expect(() => approveEmailConfirmation(emailConfirmationWithOldToken)(pastEvents)).toThrow(
      'An attempt was made on obsolete token',
    );
  });

  it('throws exception if email has been already confirmed', () => {
    // givem
    const userId = 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab';
    const confirmationFor = 'user-registration';
    const confirmationToken = 'kljawAKJJIJslKJjijlhjd';

    const newEmailConfirmationWasRequested = emailConfirmationWasRequestedEvent({
      userId,
      confirmationToken,
      confirmationFor,
    });

    const emailHasBeenConfirmed = emailConfirmationWasApprovedEvent({
      userId,
      confirmationFor,
    });

    const pastEvents: EmailConfirmationDomainEvent[] = [newEmailConfirmationWasRequested, emailHasBeenConfirmed];

    const emailConfirmation = approveEmailConfirmationCommand({
      userId,
      confirmationToken,
      confirmationFor,
    });

    // when - them
    expect(() => approveEmailConfirmation(emailConfirmation)(pastEvents)).toThrow(
      'Email confirmation has been already approved',
    );
  });
});
