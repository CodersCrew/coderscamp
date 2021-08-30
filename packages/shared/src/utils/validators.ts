/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function isAfter(property: string, validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isAfter',
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
          const relatedValue = (args.object as any)[relatedPropertyName];

          return value instanceof Date && relatedValue instanceof Date && value > relatedValue;
        },
      },
    });
  };
}
