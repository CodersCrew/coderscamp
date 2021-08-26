import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { storeInitialized } from './storeActions';

export function createStore(preloadedState?: ReturnType<typeof rootReducer>) {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    preloadedState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  });

  sagaMiddleware.run(rootSaga);

  store.dispatch(storeInitialized());

  return store;
}
