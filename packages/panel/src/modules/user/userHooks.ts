import { bindActionCreators } from '@reduxjs/toolkit';

import { useDispatch, useSelector } from '@/services/store';

import { userActions } from './userSlice';

export const useUserActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(userActions, dispatch);
};

export const useIsUserAuthorized = () => useSelector((state) => Boolean(state.user.user));

export const useUserStatus = () => useSelector((state) => state.user.status);
