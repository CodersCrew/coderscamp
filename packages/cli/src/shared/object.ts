import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import type { AnyObject, UnknownObject } from '@coderscamp/shared/types';

import { createLogger } from './logger';

const logger = createLogger('Object utils');

export const transformToMatchClass =
  <ClassInstance extends AnyObject>(cls: ClassConstructor<ClassInstance>) =>
  async <Obj extends UnknownObject | ClassInstance>(obj: Obj): Promise<ClassInstance> => {
    logger.debug(`Transforming object to match the ${cls.name} class`, obj);

    const result = plainToClass(cls, obj, { excludeExtraneousValues: true, enableImplicitConversion: true });

    logger.debug(`Validating if transformed object matches the ${cls.name} class`);

    await validateOrReject(result);

    logger.debug(`Object successfully transformed to match the ${cls.name} class`, result);

    return result;
  };
