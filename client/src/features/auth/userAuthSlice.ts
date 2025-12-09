import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthInfo } from './types/authInfo';
import type { AuthState } from './types/authState';

const isBrowser = typeof window !== 'undefined';

const initialState: AuthState = {
  accessToken: isBrowser ? sessionStorage.getItem('userAccessToken') : null,
  isAuthenticated: isBrowser ? !!sessionStorage.getItem('userAccessToken') : false,
  info: isBrowser && sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')!) : null,

  isLoggingOut: false,
};

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUserAuth: (state, action: PayloadAction<{ token: string; info: AuthInfo }>) => {
      state.accessToken = action.payload.token;
      state.isAuthenticated = true;
      state.info = action.payload.info;
      state.isLoggingOut = false;

      if (isBrowser) {
        sessionStorage.setItem('userAccessToken', action.payload.token);
        sessionStorage.setItem('userInfo', JSON.stringify(action.payload.info));
      }
    },

    startLogout: (state) => {
      state.isLoggingOut = true;
    },

    clearUserAuth: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.info = null;
      state.isLoggingOut = false;

      if (isBrowser) {
        sessionStorage.removeItem('userAccessToken');
        sessionStorage.removeItem('userInfo');
      }
    },
  },
});

export const { setUserAuth, clearUserAuth, startLogout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
