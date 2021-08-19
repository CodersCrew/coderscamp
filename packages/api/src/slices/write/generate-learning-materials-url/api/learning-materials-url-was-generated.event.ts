import { DefaultEventMetadata, DomainEvent } from '../../../shared/core/slices';
import { UserId } from '../../../shared/core/user-id';

export type LearningMaterialsUrlWasGeneratedData = { userId: UserId; materialsUrl: string };

export class LearningMaterialsUrlWasGenerated implements DomainEvent<LearningMaterialsUrlWasGeneratedData> {
  readonly type: string = 'LearningMaterialsUrlWasGenerated';

  readonly id: string;

  readonly occurredAt: Date;

  readonly data: LearningMaterialsUrlWasGeneratedData;

  readonly metadata: DefaultEventMetadata;

  static event(props: Omit<LearningMaterialsUrlWasGenerated, 'type'>) {
    return new LearningMaterialsUrlWasGenerated(props.id, props.occurredAt, props.data, props.metadata);
  }

  private constructor(
    id: string,
    occurredAt: Date,
    data: LearningMaterialsUrlWasGeneratedData,
    metadata: DefaultEventMetadata,
  ) {
    this.id = id;
    this.occurredAt = occurredAt;
    this.data = data;
    this.metadata = metadata;
  }
}
