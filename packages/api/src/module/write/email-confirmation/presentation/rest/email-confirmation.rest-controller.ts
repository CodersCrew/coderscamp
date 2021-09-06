import { Body, Controller, HttpCode, Inject, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { JwtUserId } from '@/crud/auth/jwt/jwt-user-id.decorator';
import {
  RequestEmailConfirmationApplicationCommand,
  requestEmailConfirmationCommand,
} from '@/module/commands/request-email-conformation';
import { UserId } from '@/shared/domain.types';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';
import { ID_GENERATOR, IdGenerator } from '@/write/shared/application/id-generator';

@Controller('email-confirmation')
export class EmailConfirmationRestController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly commandFactory: ApplicationCommandFactory,
    @Inject(ID_GENERATOR)
    private readonly idGenerator: IdGenerator,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  @HttpCode(204)
  async emailConfirmation(@JwtUserId() userId: UserId, @Body() body: { confirmationFor: string }): Promise<void> {
    const confirmationToken = this.idGenerator.generate();
    const command = this.commandFactory.applicationCommand(() => ({
      class: RequestEmailConfirmationApplicationCommand,
      ...requestEmailConfirmationCommand({ userId, confirmationToken, confirmationFor: body.confirmationFor }),
    }));

    await this.commandBus.execute(command);
  }
}
