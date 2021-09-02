import { Body, ConflictException, Controller, HttpCode, InternalServerErrorException, Post } from '@nestjs/common';

import { RegisterBody, registerError, RegisterResponse } from '@coderscamp/shared/models/auth/register';

import { isUniqueConstraintError } from '@/prisma/prisma.errors';

import { UserRegistrationService } from './user-registration.service';

@Controller('user-registration')
export class UserRegistrationController {
  constructor(private readonly userRegistrationService: UserRegistrationService) {}

  @Post('')
  @HttpCode(204)
  async register(@Body() body: RegisterBody): Promise<RegisterResponse> {
    try {
      await this.userRegistrationService.register(body);
    } catch (ex) {
      if (isUniqueConstraintError(ex)) {
        throw new ConflictException(registerError.REGISTRATION_FORM_ALREADY_EXISTS);
      }

      throw new InternalServerErrorException(ex);
    }
  }
}
