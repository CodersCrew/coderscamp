import { takeEvery } from 'redux-saga/effects';

import { putThunk, storeInitialized } from '@/services/store';

import { userActions } from './userSlice';

function* refetchMe() {
  yield putThunk(userActions.getMe());
}

export function* userRootSaga() {
  yield takeEvery(
    [userActions.login.fulfilled.type, userActions.logout.fulfilled.type, storeInitialized.type],
    refetchMe,
  );
}
