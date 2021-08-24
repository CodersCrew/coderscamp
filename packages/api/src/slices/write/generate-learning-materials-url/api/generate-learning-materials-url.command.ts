import { DefaultCommandMetadata, DomainCommand } from '../../../shared/core/slices';
import { UserId } from '../../../shared/core/user-id';

export type GenerateLearningMaterialsData = { userId: UserId };

export class GenerateLearningMaterialsUrl implements DomainCommand<GenerateLearningMaterialsData> {
  readonly type: string = 'GenerateLearningMaterialsUrl';

  readonly id: string;

  readonly issuedAt: Date;

  readonly data: GenerateLearningMaterialsData;

  readonly metadata: DefaultCommandMetadata;

  static command(props: Omit<GenerateLearningMaterialsUrl, 'type'>) {
    return new GenerateLearningMaterialsUrl(props.id, props.issuedAt, props.data, props.metadata);
  }

  constructor(
    id: string,
    issuedAt: Date,
    data: GenerateLearningMaterialsData,
    metadata: DefaultCommandMetadata,
  ) {
    this.id = id;
    this.issuedAt = issuedAt;
    this.data = data;
    this.metadata = metadata;
  }
}
