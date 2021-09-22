export type UserRegistrationWasStarted = {
  type: 'UserRegistrationWasStarted';
  data: {
    userId: string;
    fullName: string;
    emailAddress: string;
    hashedPassword: string;
  };
};

export const userRegistrationWasStartedEvent = (
  data: UserRegistrationWasStarted['data'],
): UserRegistrationWasStarted => ({
  type: 'UserRegistrationWasStarted',
  data,
});
