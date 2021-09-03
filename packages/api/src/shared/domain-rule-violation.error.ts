import { ApplicationCommand } from '@/module/application-command-events';

export type DomainErrorDetails = Partial<{ readonly cause: Error; readonly command: ApplicationCommand }>;
export class DomainRuleViolationError extends Error {
  constructor(message: string, readonly details?: DomainErrorDetails) {
    super(message);
  }
}

export function isDomainRuleViolation(ex: unknown): ex is DomainRuleViolationError {
  return ex instanceof DomainRuleViolationError;
}
