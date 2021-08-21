import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { User } from '@coderscamp/shared/models/user';

import { extractResponseData } from '@/services/api';
import type { AsyncStateStatus } from '@/services/store';

import { getMeRequest, loginRequest, logoutRequest, registerRequest } from './userApi';

const SLICE_NAME = 'user';

const createActionName = (name: string) => `${SLICE_NAME}/${name}`;

const register = createAsyncThunk(createActionName('register'), extractResponseData(registerRequest));
const login = createAsyncThunk(createActionName('login'), extractResponseData(loginRequest));
const logout = createAsyncThunk(createActionName('logout'), extractResponseData(logoutRequest));
const getMe = createAsyncThunk(createActionName('getMe'), extractResponseData(getMeRequest));

interface InitialState {
  status: AsyncStateStatus;
  user: User | null;
}

const initialState: InitialState = {
  status: 'idle',
  user: null,
};

export const userSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
    builder.addCase(getMe.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'loading';
      }
    });
    builder.addCase(getMe.fulfilled, (state, { payload }) => {
      state.status = 'success';
      state.user = payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.status = action.error.code === '401' ? 'success' : 'failure';
    });
  },
});

export const userActions = { login, logout, register, getMe };
export const userReducer = {
  [SLICE_NAME]: userSlice.reducer,
};
