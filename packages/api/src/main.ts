import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { PrismaService } from '@/prisma/prisma.service';

import { AppModule } from './app.module';
import { env, validateEnv } from './shared/env';

const logger = new Logger('bootstrap');

async function bootstrap() {
  try {
    await validateEnv();

    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.use(cookieParser(env.COOKIE_SECRET));
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    const prismaService: PrismaService = app.get(PrismaService);

    await prismaService.enableShutdownHooks(app);
    await app.listen(env.PORT);
  } catch (ex) {
    logger.error(ex);
    process.exit(1);
  }
}

bootstrap();
