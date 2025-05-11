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
  async getAll(filters?: MovieFilters) {
    const params = new URLSearchParams();
    filters?.andGenres?.forEach((genre) => params.append('and', genre));
    filters?.notGenres?.forEach((genre) => params.append('not', genre));
    filters?.orGenres?.forEach((genre) => params.append('or', genre))
    if (filters?.limit !== undefined) params.append('limit', filters.limit.toString());
    if (filters?.year !== undefined) params.append('year', filters.year.toString());
    if (filters?.rating !== undefined) params.append('rating', filters.rating.toString());
    return await ApiClient.get<Movie[]>(`/movies?${params.toString()}`);
  },
  async getById(id: string) {
    return await ApiClient.get<Movie>(`/movies/${id}`);
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