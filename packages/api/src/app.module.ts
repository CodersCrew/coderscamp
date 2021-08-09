import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { env } from '@/common/env';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { SurveyModule } from './surveys/survey.module';
import { UsersModule } from './users/users.module';

const isProduction = env.NODE_ENV === 'production';

const productionImports = [
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../../../../panel/dist'),
    exclude: ['/api/*'],
  }),
];

const modules = [PrismaModule, UsersModule, AuthModule, SurveyModule];

@Module({
  imports: [...(isProduction ? productionImports : []), ...modules],
})
export class AppModule {}
