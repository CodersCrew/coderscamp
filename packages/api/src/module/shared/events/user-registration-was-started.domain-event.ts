export type UserRegistrationWasStarted = {
  type: 'UserRegistrationWasStarted';
  data: {
    userId: string;
    fullName: string;
    emailAddress: string;
    hashedPassword: string;
  };
};
