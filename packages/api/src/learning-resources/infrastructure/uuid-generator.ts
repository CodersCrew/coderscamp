import { v4 as uuid } from 'uuid';

import { IdGenerator } from '../core/id-generator';

export class UuidGenerator implements IdGenerator {
  async generate(): Promise<string> {
    return uuid();
  }
}
