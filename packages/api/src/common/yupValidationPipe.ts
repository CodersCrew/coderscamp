import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import type { ObjectSchema } from 'yup';
import type { ObjectShape } from 'yup/lib/object';

const VALIDATION_OPTIONS = {
  strict: false,
  abortEarly: false,
  stripUnknown: false, // TODO change to true
  recursive: true,
};

@Injectable()
export class YupValidationPipe<Input extends ObjectShape> implements PipeTransform {
  constructor(private schema: ObjectSchema<Input>) {}

  transform(input: Record<string, any>, _metadata: ArgumentMetadata) {
    try {
      this.schema.validateSync(input, VALIDATION_OPTIONS);

      return input; // ! change to result
    } catch (err) {
      throw new BadRequestException(err.errors);
    }
  }
}
