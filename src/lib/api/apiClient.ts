import { AuthService }from './authService';
import { env } from '~/env';

const API_BASE_URL = env.NEXT_PUBLIC_API_BASE_URL

interface ApiClientConfig {
  baseUrl?: string;
  getToken?: () => string | null;
  onUnauthorized?: () => void;
}

export const createApiClient = (config: ApiClientConfig = {}) => {
  const baseUrl = config.baseUrl || API_BASE_URL;
  
  const request = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${baseUrl}${endpoint}`;
    const headers = new Headers(options.headers || {});
    
    const token = config.getToken?.();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    
    if (!(options.body instanceof FormData)) {
      headers.append('Content-Type', 'application/json');
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include'
      });

      if (response.status === 401) {
        config.onUnauthorized?.();
        throw new Error('Session expired');
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Request failed');
      }

      return response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  return {
    get: <T>(endpoint: string) => request(endpoint) as Promise<T>,
    post: <T>(endpoint: string, body: any, headers?: any) => 
      request(endpoint, { method: 'POST', body: JSON.stringify(body) }) as Promise<T>,
    patch: <T>(endpoint: string, body: any) => 
      request(endpoint, { method: 'PATCH', body: JSON.stringify(body) }) as Promise<T>,
    delete: <T>(endpoint: string) => 
      request(endpoint, { method: 'DELETE' }) as Promise<T>,
    upload: <T>(endpoint: string, formData: FormData) =>
      request(endpoint, { method: 'POST', body: formData }) as Promise<T>
  };
};

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const ApiClient = createApiClient({
  getToken: () => authToken,
  onUnauthorized: () => {
    AuthService.logout();
    window.location.href = '/login';
  }
});