import { PrismaService } from '@/prisma/prisma.service';

export async function cleanupDatabase(prismaService: PrismaService) {
  await prismaService.learningMaterials.deleteMany({});
  await prismaService.event.deleteMany({});
  await prismaService.user.deleteMany({});
  await prismaService.courseProgress.deleteMany({});
}
