import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UserRegistrationEmails {
  constructor(private readonly prisma: PrismaService) {}

  async lockEmailAddress(data: { userId: string; emailAddress: string }): Promise<void> {
    await this.prisma.registeredEmails.create({ data: { userId: data.userId, email: data.emailAddress } });
  }

  async unlockEmailAddress(data: { emailAddress: string }): Promise<void> {
    await this.prisma.registeredEmails.delete({ where: { email: data.emailAddress } });
  }
}
