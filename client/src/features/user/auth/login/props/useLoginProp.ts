import { User } from '../types/User';

export interface UseLoginProps {
  onSuccess?: (userData: User) => void;
}
