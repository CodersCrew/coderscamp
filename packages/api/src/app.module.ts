import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { env } from '@/common/env';

import { AuthModule } from './auth/auth.module';
import { CourseModule } from './courses/course.module';
import { LearningMaterialsModule } from './learning-materials/learning-materials.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

const isProduction = env.NODE_ENV === 'production';

const productionImports = [
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../../../../panel/dist'),
    exclude: ['/api/*'],
  }),
];

@Module({
  imports: [
    ...(isProduction ? productionImports : []),
    PrismaModule,
    UsersModule,
    CourseModule,
    AuthModule,
    LearningMaterialsModule,
    CqrsModule,
  ],
})
export class AppModule {}
