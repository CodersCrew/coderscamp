import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const { PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(PORT ? Number(PORT) : 4000);
}

bootstrap();
