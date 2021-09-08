import { getMeRequestHandler } from './getMe/getMeHandlers';
import { loginRequestHandler } from './login/loginHandlers';
import { logoutRequestHandler } from './logout/logoutHandlers';
import { registerRequestHandler } from './register/registerHandlers';

export const userApiHandlers = [getMeRequestHandler, loginRequestHandler, logoutRequestHandler, registerRequestHandler];
