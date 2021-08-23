import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

import { Dispatch, RootState } from './storeTypes';

export const useDispatch = () => useReduxDispatch<Dispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
