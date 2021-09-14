import { ApplicationCommand } from '@/module/application-command-events';

export type DomainErrorDetails = Partial<{ readonly cause: Error; readonly command: ApplicationCommand }>;
export class DomainRuleViolationException extends Error {
  constructor(message: string, readonly details?: DomainErrorDetails) {
    super(message);
  }
}

export function isDomainRuleViolation(ex: unknown): ex is DomainRuleViolationException {
  return ex instanceof DomainRuleViolationException;
}
