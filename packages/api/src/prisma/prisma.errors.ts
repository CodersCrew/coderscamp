import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const prismaErrors = {
  UNIQUE_CONSTRAINT: 'P2002',
};

const isPrismaClientKnownError = (error: unknown): error is PrismaClientKnownRequestError => {
  return error instanceof PrismaClientKnownRequestError;
};

const createErrorChecker =
  (code: keyof typeof prismaErrors) =>
  (error: unknown): error is PrismaClientKnownRequestError => {
    return isPrismaClientKnownError(error) && error.code === prismaErrors[code];
  };

export const isUniqueConstraintError = createErrorChecker('UNIQUE_CONSTRAINT');
