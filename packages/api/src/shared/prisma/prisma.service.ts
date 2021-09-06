import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: { close: () => Promise<void> }) {
    this.$on('beforeExit', async () => {
      console.error('PRISMA DISCONNECTING BEFORE EXIT');
      await app.close();
    });
  }
}
