import type { RegisterBody, RegisterResponse } from '@coderscamp/shared/models/auth/register';

import { httpClient } from '.';

export const registerRequest = ({ body }: { body: RegisterBody }) =>
  httpClient.post<RegisterResponse>('/auth/register', body);
