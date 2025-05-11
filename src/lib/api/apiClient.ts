import Cookies from 'js-cookie';
import { AuthService } from './authService';
import { env } from '~/env';
import { useLoginState } from '~/store/login';

const API_BASE_URL = env.NEXT_PUBLIC_API_BASE_URL;

class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type ApiClientConfig = {
  baseUrl?: string;
  getToken?: () => string | null;
  onUnauthorized?: () => Promise<void>;
};

export const createApiClient = (config: ApiClientConfig = {}) => {
  const baseUrl = config.baseUrl || API_BASE_URL;

  async function request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${baseUrl}${endpoint}`;
    const headers = new Headers(options.headers || {});

    const token = config.getToken?.();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    headers.append('Content-Type', 'application/json');

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (response.status === 401) {
      await config.onUnauthorized?.();
      console.log("unauthorized")
      throw new ApiError('Session expired', 401);
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new ApiError(
        error.message || 'Request failed',
        response.status,
        error.details
      );
    }

    const data = await response.json();

    return data;
  }

  return {
    get: <T>(endpoint: string) => request<T>(endpoint, { method: 'GET' }),
    post: <T>(endpoint: string, body: unknown) =>
      request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    patch: <T>(endpoint: string, body: unknown) =>
      request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: <T>(endpoint: string) =>
      request<T>(endpoint, { method: 'DELETE' }),
  };
};

export function setAuthToken(token: string | null) {
  if (token) {
    Cookies.set('authToken', token, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: 1,
    });
  } else {
    Cookies.remove('authToken');
  }
}

export function getAuthToken(): string | null {
  return Cookies.get('authToken') || null;
}

export const ApiClient = createApiClient({
  getToken: getAuthToken,
  onUnauthorized: async () => {
    await AuthService.logout();
    const { setLoggedIn, setUserName } = useLoginState.getState();
    setLoggedIn(false);
    setUserName(null);
  },
});
