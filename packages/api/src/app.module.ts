import { Module } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { SendEmailWhenLearningMaterialsUrlWasGeneratedAutomationModule } from '@/automation/send-email-when-learning-materials-url-was-generated/send-email-when-learning-materials-url-was-generated-automation.module';
import { WhenEmailConfirmationWasApprovedThenCompleteUserRegistrationAutomationModule } from '@/automation/when-email-confirmation-was-approved-then-complete-user-registration/when-email-confirmation-was-approved-then-complete-user-registration-automation.module';
import { WhenUserRegistrationWasStartedThenRequestEmailConfirmationAutomationModule } from '@/automation/when-user-registration-was-started-then-request-email-confirmation/when-user-registration-was-started-then-request-email-confirmation-automation.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { CourseProgressReadModule } from '@/read/course-progress/course-progress.read-module';
import { LearningMaterialsReadModule } from '@/read/learning-materials/learning-materials.read-module';
import { UserProfileReadModule } from '@/read/user-profile/user-profile.read-module';
import { env } from '@/shared/env';
import { EmailConfirmationWriteModule } from '@/write/email-confirmation/email-confirmation.write-module';
import { LearningMaterialsTasksModule } from '@/write/learning-materials-tasks/learning-materials-tasks.write-module';
import { LearningMaterialsUrlWriteModule } from '@/write/learning-materials-url/learning-materials-url.write-module';
import { RegisterCourseUserWriteModule } from '@/write/register-course-user/register-course-user.write-module';
import { UserRegistrationWriteModule } from '@/write/user-registration/user-registration.write-module';

import { AuthModule } from './crud/auth/auth.module';
import { CoursesModule } from './crud/courses/courses.module';
import { eventEmitterRootModule } from './event-emitter.root-module';

const isProduction = env.NODE_ENV === 'production';

const writeModules = [
  LearningMaterialsUrlWriteModule,
  UserRegistrationWriteModule,
  LearningMaterialsTasksModule,
  EmailConfirmationWriteModule,
  RegisterCourseUserWriteModule,
];
const readModules = [LearningMaterialsReadModule, CourseProgressReadModule, UserProfileReadModule];
const automationModules = [
  SendEmailWhenLearningMaterialsUrlWasGeneratedAutomationModule,
  WhenUserRegistrationWasStartedThenRequestEmailConfirmationAutomationModule,
  WhenEmailConfirmationWasApprovedThenCompleteUserRegistrationAutomationModule,
];
const eventModelingModules = [...writeModules, ...readModules, ...automationModules];
const crudModules = [CoursesModule, AuthModule];

const imports: ModuleMetadata['imports'] = [
  eventEmitterRootModule,
  PrismaModule,
  ...crudModules,
  ...eventModelingModules,
];

const productionImports: ModuleMetadata['imports'] = [
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../../../../panel/dist'),
    exclude: ['/api/*'],
  }),
  ...imports,
];

@Module({
  imports: isProduction ? productionImports : imports,
})
export class AppModule {}
