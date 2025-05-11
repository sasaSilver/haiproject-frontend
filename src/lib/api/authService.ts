import { ApiClient, setAuthToken} from './apiClient';
import type { Token, UserCreate } from './types';

export const AuthService = {
  async login(user: UserCreate) {
    const response = await ApiClient.post<Token>('/auth/login', user);
    setAuthToken(response.access_token);
    return response;
  },

  async register(user: UserCreate) {
    const response = await ApiClient.post<Token>('/auth/register', user);
    setAuthToken(response.access_token);
    return response;
  },

  async logout() {
    setAuthToken(null);
  },
};