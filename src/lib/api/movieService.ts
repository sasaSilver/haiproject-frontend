import { ApiClient } from './apiClient';
import type { Movie } from './types';

export type MovieFilters = {
  andGenres?: string[],
  notGenres?: string[],
  orGenres?: string[],
  year?: number,
  rating?: number,
  limit?: number
}

export const MovieService = {
  async getById(id: string) {
    return await ApiClient.get<Movie>(`/movies/${id}`);
  },
  async search(params?: { [key: string]: string | string[] | undefined }) {
    const searchParams = new URLSearchParams();
    if (!params) return await ApiClient.get<Movie[]>(`/search/`);
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => v !== undefined && searchParams.append(key, v));
      } else if (value !== undefined) {
        searchParams.append(key, value);
      }
    });
    return await ApiClient.get<Movie[]>(`/search/?${searchParams.toString()}`);
  },
  async create(movieData: Movie) {
    return await ApiClient.post<Movie>('/movies', movieData);
  },
  async update(id: string, movieData: Movie) {
    return await ApiClient.patch<Movie>(`/movies/${id}`, movieData);
  },
  async delete(id: string) {
    return await ApiClient.delete(`/movies/${id}`);
  }
};