import { IsString } from 'class-validator';

export class RequestEmailConfirmationBody {
  @IsString()
  confirmationFor: string;
}
