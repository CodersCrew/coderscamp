import { EventStreamName } from '../../common/application/event-stream-name.valueboject';

export const learningMaterialsUrlEventStreamName = (props: { userId: string }) =>
  EventStreamName.from('LearningMaterialsUrl', props.userId);
