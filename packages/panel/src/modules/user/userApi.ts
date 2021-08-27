import type { LogoutResponse } from '@coderscamp/shared/models/auth';
import type { LoginBody, LoginResponse } from '@coderscamp/shared/models/auth/login';
import type { RegisterBody, RegisterResponse } from '@coderscamp/shared/models/auth/register';
import type { GetMeResponse } from '@coderscamp/shared/models/user';

import { httpClient } from '@/services/api';

export const getMeRequest = () => httpClient.get<GetMeResponse>('/users/me');

export const loginRequest = ({ body }: { body: LoginBody }) => httpClient.post<LoginResponse>('/auth/login', body);

export const logoutRequest = () => httpClient.post<LogoutResponse>('/auth/logout');

export const registerRequest = ({ body }: { body: RegisterBody }) =>
  httpClient.post<RegisterResponse>('/auth/register', body);
