import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { env } from '@/common/env';

import { SendEmailWhenLearningMaterialsUrlWasGeneratedAutomationModule } from './module/automation/send-email-when-learning-materials-url-was-generated/send-email-when-learning-materials-url-was-generated-automation.module';
import { LearningMaterialsReadModule } from './module/read/learning-materials/learning-materials.read-module';
import { LearningMaterialsUrlWriteModule } from './module/write/learning-materials-url/learning-materials-url.write-module';
import { PrismaModule } from './prisma/prisma.module';

const isProduction = env.NODE_ENV === 'production';

const writeModules = [LearningMaterialsUrlWriteModule];
const readModules = [LearningMaterialsReadModule];
const automationModules = [SendEmailWhenLearningMaterialsUrlWasGeneratedAutomationModule];
const eventModelingModules = [...writeModules, ...readModules, ...automationModules];

const productionImports = [
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../../../../panel/dist'),
    exclude: ['/api/*'],
  }),
  PrismaModule,
  // UsersModule,
  // AuthModule,
  ...eventModelingModules,
];

@Module({
  imports: [...(isProduction ? productionImports : []), LearningMaterialsUrlWriteModule],
})
export class AppModule {}
