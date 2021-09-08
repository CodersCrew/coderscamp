import { REGISTER_ENDPOINT, RegisterBody, RegisterResponse } from '@coderscamp/shared/models/auth/register';

import { httpClient } from '@/services/api';

export const registerRequest = ({ body }: { body: RegisterBody }) =>
  httpClient.post<RegisterResponse>(REGISTER_ENDPOINT, body);
