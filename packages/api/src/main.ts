import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import YAML from 'yamljs';

import { AppModule } from './app.module';
import { env, validateEnv } from './shared/env';

const logger = new Logger('bootstrap');

function setupSwagger(app: INestApplication) {
  const swaggerUiOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'CodersCamp App REST API docs',
  };

  SwaggerModule.setup('swagger', app, YAML.load('./rest-api-docs.yaml'), swaggerUiOptions);
}

async function bootstrap() {
  try {
    await validateEnv();

    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.use(cookieParser(env.COOKIE_SECRET));
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    setupSwagger(app);

    await app.listen(env.PORT);
  } catch (ex) {
    logger.error(ex);
    process.exit(1);
  }
}

bootstrap();
