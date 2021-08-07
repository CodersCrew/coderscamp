import { AggregateRoot } from '@nestjs/cqrs';

import { Survey } from '@coderscamp/shared/models/survey';

type SurveyState = 'CREATED' | 'SAVED';

export class SurveyEntity extends AggregateRoot {
  readonly userId?: number;

  readonly description?: string;

  readonly alreadyTookCourse?: boolean;

  readonly reasonForRetakingCourse?: string | null;

  readonly expectations?: string;

  readonly experience?: string;

  readonly uniques?: string;

  readonly plans?: string;

  readonly unavailability?: string;

  readonly averageTime?: number;

  readonly associatedWords?: string[];

  readonly courseInformationSource?: string;

  state: SurveyState = 'CREATED';

  constructor(input: Survey) {
    super();
    Object.assign(this, input);
  }

  // async save(data: Survey) {
  //   Object.assign(await this.repository.save(data), this);
  // }

  // async findByUserId(id: number) {
  //   return this.repository.findByUserId(id);
  // }

  toPlain(): Survey {
    return {
      userId: this.userId,
      description: this.description,
      alreadyTookCourse: this.alreadyTookCourse,
      reasonForRetakingCourse: this.reasonForRetakingCourse,
      expectations: this.expectations,
      experience: this.experience,
      uniques: this.uniques,
      plans: this.plans,
      unavailability: this.unavailability,
      averageTime: this.averageTime,
      associatedWords: this.associatedWords,
      courseInformationSource: this.courseInformationSource,
    };
  }
}
