import { ApiClient, setAuthToken} from './apiClient';
import type { Token, UserCreate, Oauth2PasswordRequestForm } from './types';

export const AuthService = {
  async login(formData: FormData) {
    const response = await ApiClient.post<Token>('/auth/login', formData);
    setAuthToken(response.access_token);
    return response;
  },

  async register(userCreate: UserCreate) {
    const response = await ApiClient.post<Token>('/auth/register', userCreate);
    setAuthToken(response.access_token);
    return response;
  },

  async logout() {
    setAuthToken(null);
  },

  async refreshToken() {
    const response = await ApiClient.post<Token>('/auth/refresh-token', {});
    setAuthToken(response.access_token);
    return response;
  },
};