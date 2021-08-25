type Store = ReturnType<typeof import('./createStore').createStore>;

export type RootState = ReturnType<Store['getState']>;
export type Dispatch = Store['dispatch'];

export type AsyncStateStatus = 'idle' | 'loading' | 'success' | 'failure';
