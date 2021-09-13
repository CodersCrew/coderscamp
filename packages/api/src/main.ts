import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerCustomOptions } from '@nestjs/swagger/dist/interfaces';
import cookieParser from 'cookie-parser';
import YAML from 'yamljs';

import { DomainRuleViolationExceptionFilter } from '@/shared/errors/domain-rule-violation.exception-filter';

import { AppModule } from './app.module';
import { env, validateEnv } from './shared/env';

const logger = new Logger('bootstrap');

export function setupMiddlewares(app: INestApplication) {
  app.setGlobalPrefix('api');
  app.use(cookieParser(env.COOKIE_SECRET));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new DomainRuleViolationExceptionFilter());
}

async function bootstrap() {
  try {
    await validateEnv();

    const app = await NestFactory.create(AppModule);

    setupMiddlewares(app);

    const swaggerUiOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: 'CodersCamp App REST API docs',
    };

    SwaggerModule.setup('swagger', app, YAML.load('./rest-api-docs.yaml'), swaggerUiOptions);

    await app.listen(env.PORT);
  } catch (ex) {
    logger.error(ex);
    process.exit(1);
  }
}

bootstrap();
