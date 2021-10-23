import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import type { AnyObject } from '@coderscamp/shared/types';

import { createLogger } from './logger';

const logger = createLogger('Object utils');

export const transformAndValidate =
  <ClassInstance extends AnyObject>(cls: ClassConstructor<ClassInstance>) =>
  async <Obj extends AnyObject | ClassInstance>(obj: Obj): Promise<ClassInstance> => {
    logger.debug(`Transforming object to match the ${cls.name} class`, obj);

    const result = plainToClass(cls, obj, { excludeExtraneousValues: true, enableImplicitConversion: true });

    logger.debug(`Validating if transformed object matches the ${cls.name} class`);

    await validateOrReject(result);

    logger.debug(`Object successfully transformed to match the ${cls.name} class`, result);

    return result;
  };

export const transformToMatchClass =
  <ClassInstance extends AnyObject>(cls: ClassConstructor<ClassInstance>) =>
  <Obj extends AnyObject | ClassInstance>(obj: Obj): ClassInstance => {
    logger.debug(`Transforming object to match the ${cls.name} class`, obj);

    const result = plainToClass(cls, obj, { excludeExtraneousValues: true, enableImplicitConversion: true });

    logger.debug(`Object successfully transformed to match the ${cls.name} class`, result);

    return result;
  };

export const filterInvalid =
  <ClassInstance extends AnyObject>(cls: ClassConstructor<ClassInstance>) =>
  async <Obj extends AnyObject | ClassInstance>(obj: Obj): Promise<boolean> => {
    try {
      await transformAndValidate(cls)(obj);

      logger.debug(`Item matches the ${cls.name} class`, obj);

      return true;
    } catch (ex) {
      logger.debug(`Item has been filtered as it doesn't match the ${cls.name} class`, obj);

      return false;
    }
  };
