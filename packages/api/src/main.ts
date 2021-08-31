import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { env, validateEnv } from '@/common/env';
import { PrismaService } from '@/prisma/prisma.service';

import { AppModule } from './app.module';

const logger = new Logger('bootstrap');

async function bootstrap() {
  try {
    await validateEnv();

    const app = await NestFactory.create(AppModule);

    const prismaService: PrismaService = app.get(PrismaService);

    await prismaService.enableShutdownHooks(app);

    app.setGlobalPrefix('api');
    app.use(cookieParser(env.COOKIE_SECRET));
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    await app.listen(env.PORT);
  } catch (ex) {
    logger.error(ex);
    process.exit(1);
  }
}

bootstrap();
