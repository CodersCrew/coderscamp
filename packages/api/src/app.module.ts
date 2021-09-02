import { Module } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { env } from './shared/env';

import { AuthModule } from './crud/auth/auth.module';
import { CoursesModule } from './crud/courses/courses.module';
import { SendEmailWhenLearningMaterialsUrlWasGeneratedAutomationModule } from './module/automation/send-email-when-learning-materials-url-was-generated/send-email-when-learning-materials-url-was-generated-automation.module';
import { CourseProgressReadModule } from './module/read/course-progress/course-progress.read-module';
import { LearningMaterialsReadModule } from './module/read/learning-materials/learning-materials.read-module';
import { LearningMaterialsUrlWriteModule } from './module/write/learning-materials-url/learning-materials-url.write-module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { UsersModule } from './crud/users/users.module';

const isProduction = env.NODE_ENV === 'production';

const writeModules = [LearningMaterialsUrlWriteModule];
const readModules = [LearningMaterialsReadModule, CourseProgressReadModule];
const automationModules = [SendEmailWhenLearningMaterialsUrlWasGeneratedAutomationModule];
const eventModelingModules = [...writeModules, ...readModules, ...automationModules];

const imports: ModuleMetadata['imports'] = [
  EventEmitterModule.forRoot({
    wildcard: true,
    delimiter: '.',
    newListener: false,
    removeListener: false,
    maxListeners: 40,
    verboseMemoryLeak: false,
    ignoreErrors: false,
  }),
  PrismaModule,
  UsersModule,
  CoursesModule,
  AuthModule,
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
