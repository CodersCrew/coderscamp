import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { env } from '@/common/env';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(cookieParser(env.COOKIE_SECRET));

  await app.listen(env.PORT);
}

bootstrap();
