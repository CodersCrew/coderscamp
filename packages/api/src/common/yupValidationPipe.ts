import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import type { SchemaOf } from 'yup';

const VALIDATION_OPTIONS = {
  strict: false,
  abortEarly: false,
  stripUnknown: true,
  recursive: true,
};

@Injectable()
export class YupValidationPipe<Input extends Record<string, any>> implements PipeTransform<Input> {
  constructor(private schema: SchemaOf<Input>) {}

  transform(value: Input, _metadata: ArgumentMetadata) {
    const result = this.schema.validateSync(value, VALIDATION_OPTIONS);
    if (result.errors) {
      throw new BadRequestException(result.errors);
    }
    return result;
  }
}
