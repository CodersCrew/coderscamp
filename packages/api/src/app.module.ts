import { Module } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { SendEmailWhenLearningMaterialsUrlWasGeneratedAutomationModule } from '@/automation/send-email-when-learning-materials-url-was-generated/send-email-when-learning-materials-url-was-generated-automation.module';
import { UserProfileModule } from '@/crud/user-profile/user-profile.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { CourseProgressReadModule } from '@/read/course-progress/course-progress.read-module';
import { LearningMaterialsReadModule } from '@/read/learning-materials/learning-materials.read-module';
import { env } from '@/shared/env';
import { LearningMaterialsUrlWriteModule } from '@/write/learning-materials-url/learning-materials-url.write-module';
import { UserRegistrationWriteModule } from '@/write/user-registration/user-registration.write-module';

import { AuthModule } from './crud/auth/auth.module';
import { CoursesModule } from './crud/courses/courses.module';

const isProduction = env.NODE_ENV === 'production';

const writeModules = [LearningMaterialsUrlWriteModule, UserRegistrationWriteModule];
const readModules = [LearningMaterialsReadModule, CourseProgressReadModule];
const automationModules = [SendEmailWhenLearningMaterialsUrlWasGeneratedAutomationModule];
const eventModelingModules = [...writeModules, ...readModules, ...automationModules];
const crudModules = [UserProfileModule, CoursesModule, AuthModule];

const imports: ModuleMetadata['imports'] = [
  EventEmitterModule.forRoot({
    wildcard: true,
    delimiter: '.',
    newListener: false,
    removeListener: false,
    maxListeners: 40,
    verboseMemoryLeak: true,
    ignoreErrors: false,
  }),
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
