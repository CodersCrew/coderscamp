export type UserRegistrationWasCompleted = {
  type: 'UserRegistrationWasCompleted';
  data: {
    userId: string;
    fullName: string;
    emailAddress: string;
    hashedPassword: string;
  };
};

export const userRegistrationWasCompletedEvent = (
  data: UserRegistrationWasCompleted['data'],
): UserRegistrationWasCompleted => ({
  type: 'UserRegistrationWasCompleted',
  data,
});
