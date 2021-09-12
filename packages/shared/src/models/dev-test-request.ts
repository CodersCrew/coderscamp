import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DevTestRequest {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsNumber()
  counter: number;
}
