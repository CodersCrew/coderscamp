import { AbstractApplicationCommand } from '@/module/application-command-events';

export type RegisterCourseUser = {
  type: 'RegisterCourseUser';
  data: {
    userId: string;
    courseUserId: string;
    courseId: string;
  };
};

export const RegisterCourseUserCommand = (data: RegisterCourseUser['data']): RegisterCourseUser => ({
  type: 'RegisterCourseUser',
  data,
});

export class RegisterCourseUserApplicationCommand extends AbstractApplicationCommand<RegisterCourseUser> {}
