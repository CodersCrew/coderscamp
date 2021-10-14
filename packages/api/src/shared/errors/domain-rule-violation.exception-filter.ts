import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { DomainRuleViolationException } from '@/shared/errors/domain-rule-violation.exception';

@Catch(DomainRuleViolationException)
export class DomainRuleViolationExceptionFilter implements ExceptionFilter {
  catch(exception: DomainRuleViolationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      message: exception.message,
    });
  }
}
