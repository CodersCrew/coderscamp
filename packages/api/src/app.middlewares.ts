import { INestApplication, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

import { env } from '@/shared/env';
import { DomainRuleViolationExceptionFilter } from '@/shared/errors/domain-rule-violation.exception-filter';

export function setupMiddlewares(app: INestApplication) {
  app.setGlobalPrefix('api');
  app.use(cookieParser(env.COOKIE_SECRET));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new DomainRuleViolationExceptionFilter());
}
