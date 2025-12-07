import type { AuthInfo } from './authInfo';

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  info: AuthInfo | null;
}
