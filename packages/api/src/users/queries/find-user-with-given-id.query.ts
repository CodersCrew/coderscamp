import { UserId } from '@coderscamp/shared/models';

export class FindUserWithGivenIdQuery {
  constructor(readonly userId: UserId) {}
}
