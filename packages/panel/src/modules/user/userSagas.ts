import { takeEvery } from 'redux-saga/effects';

import { putThunk, storeInitialized } from '@/services/store';

import { userActions } from './userSlice';

function* storeInitializedHandler() {
  yield putThunk(userActions.getMe());
}

function* loginFulfilledHandler() {
  yield putThunk(userActions.getMe());
}

export function* userRootSaga() {
  yield takeEvery(userActions.login.fulfilled.type, loginFulfilledHandler);
  yield takeEvery(storeInitialized.type, storeInitializedHandler);
}
