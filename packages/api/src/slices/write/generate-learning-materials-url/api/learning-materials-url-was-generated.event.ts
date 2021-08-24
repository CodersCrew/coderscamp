import { DefaultEventMetadata, ApplicationEvent } from '../../../shared/core/slices';
import { UserId } from '../../../shared/core/user-id';

export type LearningMaterialsUrlWasGeneratedData = { userId: UserId; materialsUrl: string };

export const LEARNING_MATERIALS_URL_WAS_GENERATED = 'LearningMaterialsUrlWasGenerated';
export class LearningMaterialsUrlWasGenerated implements ApplicationEvent<LearningMaterialsUrlWasGeneratedData> {
  readonly type: string = LEARNING_MATERIALS_URL_WAS_GENERATED;

  readonly id: string;

  readonly occurredAt: Date;

  readonly data: LearningMaterialsUrlWasGeneratedData;

  readonly metadata: DefaultEventMetadata;

  static event(props: Omit<LearningMaterialsUrlWasGenerated, 'type'>) {
    return new LearningMaterialsUrlWasGenerated(props.id, props.occurredAt, props.data, props.metadata);
  }

  constructor(
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

export function isLearningMaterialsUrlWasGenerated(event: ApplicationEvent): event is LearningMaterialsUrlWasGenerated{
  return event.type === LEARNING_MATERIALS_URL_WAS_GENERATED;
}
