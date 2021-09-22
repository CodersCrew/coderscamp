import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

import type { AnyObject, UnknownObject } from '../types';

export function IsAfter(property: string, validationOptions?: ValidationOptions) {
  return (object: AnyObject, propertyName: string) => {
    registerDecorator({
      name: 'IsAfter',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: {
        message: `${propertyName} should be later date than ${property}`,
        ...validationOptions,
      },
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as UnknownObject)[relatedPropertyName];

          return value instanceof Date && relatedValue instanceof Date && value > relatedValue;
        },
      },
    });
  };
}
