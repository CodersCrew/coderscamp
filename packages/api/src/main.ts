import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { env } from '@/common/env';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(cookieParser(env.COOKIE_SECRET));

  const config = new DocumentBuilder()
    .setTitle('CodersCamp REST API')
    .setDescription('Lorem ipsum - api description')
    .setVersion('1.0')
    .addTag('coderscamp')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(env.PORT);
}

bootstrap();
