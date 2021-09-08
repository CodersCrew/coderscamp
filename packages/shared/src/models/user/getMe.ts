import type { User } from '.';

export const GET_ME_ENDPOINT = '/users/me';

export type GetMeResponse = User | null;
