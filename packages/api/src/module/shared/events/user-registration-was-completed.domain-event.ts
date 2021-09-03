export type UserRegistrationWasCompleted = {
  type: 'UserRegistrationWasCompleted';
  data: {
    userId: string;
    fullName: string;
    emailAddress: string;
    hashedPassword: string;
  };
};
