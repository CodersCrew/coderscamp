import { AsyncReturnType } from 'type-fest';

import { registerError } from '@coderscamp/shared/models/auth/register';

import { RegisterUserApplicationCommand } from '@/commands/register-user';
import { initWriteTestModule } from '@/shared/test-utils';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { PASSWORD_ENCODER, PasswordEncoder } from '@/write/shared/application/password-encoder';
import { UserRegistrationDomainEvent } from '@/write/user-registration/domain/events';

const sampleHashedPassword = 'a47b21f855a558b9.8d9358adfea8a0a11fcff814eb957ee75b44620d0bae45069d83083ea7bb20f3';

async function initUserRegistrationTestModule() {
  const fakePasswordEncoder: PasswordEncoder = {
    encode: async () => sampleHashedPassword,
    matches: async () => true,
  };

  return initWriteTestModule((app) => app.overrideProvider(PASSWORD_ENCODER).useValue(fakePasswordEncoder));
}

describe('User Registration', () => {
  let moduleUnderTest: AsyncReturnType<typeof initUserRegistrationTestModule>;

  beforeEach(async () => {
    moduleUnderTest = await initUserRegistrationTestModule();
  });

  afterEach(async () => {
    await moduleUnderTest.close();
  });

  it('when register user, then registration should started and completed', async () => {
    // Given
    const userId = moduleUnderTest.randomUserId();
    const fullName = 'Jan Nowak';
    const plainPassword = 'pusia123!';
    const emailAddress = `${userId}@email.com`;

    // When
    await moduleUnderTest.executeCommand(() => ({
      class: RegisterUserApplicationCommand,
      type: 'RegisterUser',
      data: {
        userId,
        fullName,
        emailAddress,
        plainPassword,
      },
    }));

    // Then
    await moduleUnderTest.expectEventsPublishedLastly<UserRegistrationDomainEvent>([
      {
        type: 'UserRegistrationWasStarted',
        data: {
          userId,
          fullName,
          emailAddress,
          hashedPassword: sampleHashedPassword,
        },
        streamName: EventStreamName.from('UserRegistration', userId),
      },
      {
        type: 'UserRegistrationWasCompleted',
        data: {
          userId,
          fullName,
          emailAddress,
          hashedPassword: sampleHashedPassword,
        },
        streamName: EventStreamName.from('UserRegistration', userId),
      },
    ]);
  });

  it('given user was registered, when register user with same email address, then registration should fail', async () => {
    // Given
    const userId = moduleUnderTest.randomUserId();
    const fullName = 'Jan Nowak';
    const plainPassword = 'pusia123!';
    const emailAddress = `${userId}@email.com`;

    await moduleUnderTest.executeCommand(() => ({
      class: RegisterUserApplicationCommand,
      type: 'RegisterUser',
      data: {
        userId,
        fullName,
        emailAddress,
        plainPassword,
      },
    }));

    // When
    const anotherUserId = moduleUnderTest.randomUserId();
    const command = () =>
      moduleUnderTest.executeCommand(() => ({
        class: RegisterUserApplicationCommand,
        type: 'RegisterUser',
        data: {
          userId: anotherUserId,
          fullName,
          emailAddress,
          plainPassword,
        },
      }));

    await expect(command).rejects.toEqual(new Error(registerError.REGISTRATION_FORM_ALREADY_EXISTS));
  });
});
