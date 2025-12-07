import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthInfo } from './types/authInfo';
import type { AuthState } from './types/authState';

const initialState: AuthState = {
  accessToken: sessionStorage.getItem('userAccessToken'),
  isAuthenticated: !!sessionStorage.getItem('userAccessToken'),
  info: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')!) : null,
};

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUserAuth: (state, action: PayloadAction<{ token: string; info: AuthInfo }>) => {
      state.accessToken = action.payload.token;
      state.isAuthenticated = true;
      state.info = action.payload.info;

      sessionStorage.setItem('userAccessToken', action.payload.token);
      sessionStorage.setItem('userInfo', JSON.stringify(action.payload.info));
    },

    clearUserAuth: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.info = null;
      sessionStorage.removeItem('userAccessToken');
      sessionStorage.removeItem('userInfo');
    },
  },
});

export const { setUserAuth, clearUserAuth } = userAuthSlice.actions;
export default userAuthSlice.reducer;
