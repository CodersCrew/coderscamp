export type UserRegistrationWasStarted = {
  type: 'UserRegistrationWasStarted';
  data: {
    userId: string;
    fullName: string;
    email: string;
    password: string;
  };
};
