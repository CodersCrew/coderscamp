import { LOGOUT_ENDPOINT, LogoutResponse } from '@coderscamp/shared/models/auth/logout';

import { httpClient } from '@/services/api';

export const logoutRequest = () => httpClient.post<LogoutResponse>(LOGOUT_ENDPOINT);
