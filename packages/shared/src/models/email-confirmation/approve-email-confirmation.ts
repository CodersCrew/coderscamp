import { IsString } from 'class-validator';

export const APPROVE_ENDPOINT = '/approval';

export class ApproveEmailConfirmationBody {
  @IsString()
  confirmationToken: string;
}
