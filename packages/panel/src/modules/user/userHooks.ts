import { bindActionCreators } from '@reduxjs/toolkit';

import { useDispatch, useSelector } from '@/services/store';

import { userActions } from './userSlice';

export const useUserActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(userActions, dispatch);
};

export const useUserState = () => useSelector((state) => state.user);
