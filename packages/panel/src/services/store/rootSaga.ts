import { all } from 'redux-saga/effects';

import { userRootSaga } from '@/modules/user';

export function* rootSaga() {
  yield all([userRootSaga()]);
}
