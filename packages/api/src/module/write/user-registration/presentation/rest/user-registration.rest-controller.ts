import { BadRequestException, Body, Controller, HttpCode, InternalServerErrorException, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { REGISTER_ENDPOINT, RegisterBody, RegisterResponse } from '@coderscamp/shared/models/auth/register';

import { RegisterUserApplicationCommand } from '@/commands/register-user';
import { isDomainRuleViolation } from '@/shared/domain-rule-violation.error';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';

@Controller()
export class UserRegistrationRestController {
  constructor(private readonly commandBus: CommandBus, private readonly commandFactory: ApplicationCommandFactory) {}

  @Post(REGISTER_ENDPOINT)
  @HttpCode(204)
  async register(@Body() body: RegisterBody): Promise<RegisterResponse> {
    const command = this.commandFactory.applicationCommand((idGenerator) => ({
      class: RegisterUserApplicationCommand,
      type: 'RegisterUser',
      data: {
        userId: idGenerator.generate(),
        fullName: body.fullName,
        emailAddress: body.email,
        plainPassword: body.password,
      },
    }));

    try {
      await this.commandBus.execute(command);
    } catch (ex) {
      if (isDomainRuleViolation(ex)) {
        throw new BadRequestException(ex);
      }

      throw new InternalServerErrorException(ex);
    }
  }
}
