import { AbstractApplicationCommand } from '@/module/application-command-events';

export type RegisterUser = {
  type: 'RegisterUser';
  data: {
    userId: string;
    fullName: string;
    email: string;
    plainPassword: string;
  };
};

export class RegisterUserApplicationCommand extends AbstractApplicationCommand<RegisterUser> {}
