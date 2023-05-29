import { User } from '../types/UserTypes';

export interface SignInResponse {
  token: string;
  user: User;
}
