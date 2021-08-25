import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { env } from '@/common/env';

import { AuthModule } from './auth/auth.module';
import { LearningMaterialsModule } from './learning-materials/learning-materials.module';
import { AutomationModule } from './module/automation/automation.module';
import { LearningMaterialsUrlWriteModule } from './module/write/learning-materials-url/learning-materials-url.write-module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

const isProduction = env.NODE_ENV === 'production';

const productionImports = [
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../../../../panel/dist'),
    exclude: ['/api/*'],
  }),
  PrismaModule,
  UsersModule,
  AuthModule,
  LearningMaterialsModule,
  AutomationModule,
];

@Module({
  imports: [...(isProduction ? productionImports : []), LearningMaterialsUrlWriteModule],
})
export class AppModule {}
