import { NestFactory } from '@nestjs/core';

import { env } from '@/common/env';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  await app.listen(env.PORT);
}

bootstrap();
