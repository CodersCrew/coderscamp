export type UserRegistrationCompleted = {
  type: 'UserRegistrationCompleted';
  data: {
    userId: string;
    fullName: string;
    email: string;
  };
};
