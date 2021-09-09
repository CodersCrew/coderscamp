import type { UserId } from '@/shared/domain.types';

export type CourseUserWasRegistered = {
  type: 'CourseUserWasRegistered';
  data: { userId: UserId; courseUserId: string; courseId: string };
};
