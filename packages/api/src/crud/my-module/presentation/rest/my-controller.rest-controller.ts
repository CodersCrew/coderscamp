import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { MyCommandRequestBody } from '@coderscamp/shared/models/crud/myCommandRequestBody';

import { myCommand, MyCommandApplicationCommand } from '@/module/commands/my-command';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';

@Controller('')
export class MyControllerRestController {
  constructor(private readonly commandBus: CommandBus, private readonly commandFactory: ApplicationCommandFactory) {}

  @Post('')
  @HttpCode(200)
  async myMethod(@Body() body: MyCommandRequestBody): Promise<void> {
    const command = this.commandFactory.applicationCommand(() => ({
      class: MyCommandApplicationCommand,
      ...myCommand({}),
    }));

    await this.commandBus.execute(command);
  }
}
