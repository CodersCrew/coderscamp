import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { setupMiddlewares } from './app.middlewares';
import { AppModule } from './app.module';
import { setupSwagger } from './app.swagger';
import { env, validateEnv } from './shared/env';

const logger = new Logger('bootstrap');

async function bootstrap() {
  try {
    await validateEnv();

    const app = await NestFactory.create(AppModule);

    setupMiddlewares(app);
    setupSwagger(app);

    await app.listen(env.PORT);
  } catch (ex) {
    logger.error(ex);
    process.exit(1);
  }
}

bootstrap();
