import type { AsyncThunkAction } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';

export const putThunk = put as <Thunk extends AsyncThunkAction<unknown, unknown, Record<string, never>>>(
  thunk: Thunk,
) => unknown;
