import { UserId } from '../../shared/user-id';
import { ResourcesUrl } from '../api/learning-resources-was-generated.event';

export class LearningResources {
  constructor(readonly userId: UserId, readonly resourcesUrl: ResourcesUrl, readonly generatedAt: Date) {}
}
