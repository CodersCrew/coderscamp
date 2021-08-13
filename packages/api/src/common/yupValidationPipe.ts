import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import type { ObjectSchema } from 'yup';
import type { ObjectShape } from 'yup/lib/object';

const VALIDATION_OPTIONS = {
  strict: false,
  abortEarly: false,
  stripUnknown: true,
  recursive: true,
};

@Injectable()
export class YupValidationPipe<Input extends ObjectShape> implements PipeTransform {
  constructor(private schema: ObjectSchema<Input>) {}

  transform(input: Record<string, any>, _metadata: ArgumentMetadata) {
    try {
      const result = this.schema.validateSync(input, VALIDATION_OPTIONS);

      return result;
    } catch (err) {
      throw new BadRequestException(err.errors);
    }
  }
}
