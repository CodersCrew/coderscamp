import { AbstractApplicationCommand } from '@/module/application-command-events';

export type RegisterCourseUser = {
  type: 'RegisterCourseUser';
  data: {
    userId: string;
    courseUserId: string;
    courseId: string;
  };
};

export class RegisterCourseUserApplicationCommand extends AbstractApplicationCommand<RegisterCourseUser> {}
