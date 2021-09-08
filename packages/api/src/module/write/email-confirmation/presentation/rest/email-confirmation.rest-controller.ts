import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { EmailConfirmationBody } from '@coderscamp/shared/models/email-confirmation';

import { JwtUserId } from '@/crud/auth/jwt/jwt-user-id.decorator';
import {
  RequestEmailConfirmationApplicationCommand,
  requestEmailConfirmationCommand,
} from '@/module/commands/request-email-conformation';
import { UserId } from '@/shared/domain.types';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';

@Controller('email-confirmation')
export class EmailConfirmationRestController {
  constructor(private readonly commandBus: CommandBus, private readonly commandFactory: ApplicationCommandFactory) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  @HttpCode(204)
  async emailConfirmation(
    @JwtUserId() userId: UserId,
    @Body() { confirmationFor }: EmailConfirmationBody,
  ): Promise<void> {
    const command = this.commandFactory.applicationCommand((idGenerator) => ({
      class: RequestEmailConfirmationApplicationCommand,
      ...requestEmailConfirmationCommand({ userId, confirmationToken: idGenerator.generate(), confirmationFor }),
    }));

    await this.commandBus.execute(command);
  }
}
