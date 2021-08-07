import { PopulatedUser } from '@coderscamp/shared/models/user';

export type UserFromJwt = Pick<PopulatedUser, 'id'>;
