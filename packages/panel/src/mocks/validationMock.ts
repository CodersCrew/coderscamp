import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import type { AnyObject } from '@coderscamp/shared/types';

export const validationMock = async <Value extends AnyObject>(
  cls: ClassConstructor<Value>,
  plain: AnyObject,
): Promise<Value> => {
  const transformed = plainToClass(cls, plain, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
  });

  await validateOrReject(transformed);

  return transformed;
};
