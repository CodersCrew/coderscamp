import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from '@/modules/user';

export const rootReducer = combineReducers({
  ...userReducer,
});
