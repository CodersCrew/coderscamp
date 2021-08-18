import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { env, validateEnv } from '@/common/env';

import { AppModule } from './app.module';

const logger = new Logger('bootstrap');

async function bootstrap() {
  try {
    await validateEnv();

    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.use(cookieParser(env.COOKIE_SECRET));

    await app.listen(env.PORT);
  } catch (ex) {
    logger.error(ex);
    process.exit(1);
  }
}

bootstrap();
