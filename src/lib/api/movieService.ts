import { ApiClient } from './apiClient';
import type { Movie, MovieFilters } from './types';

export const MovieService = {
  async getAll(filters?: MovieFilters) {
    const params = new URLSearchParams();
    filters?.andGenres?.forEach((genre) => params.append('and', genre));
    filters?.notGenres?.forEach((genre) => params.append('not', genre));
    filters?.orGenres?.forEach((genre) => params.append('or', genre))
    if (filters?.limit !== undefined) params.append('limit', filters.limit.toString());
    if (filters?.year !== undefined) params.append('year', filters.year.toString());
    if (filters?.rating !== undefined) params.append('rating', filters.rating.toString());
    return ApiClient.get<Movie[]>(`/movies?${params.toString()}`);
  },
  async getById(id: string) {
    return ApiClient.get<Movie>(`/movies/${id}`);
  },
  async create(movieData: Movie) {
    return ApiClient.post<Movie>('/movies', movieData);
  },
  async update(id: string, movieData: Movie) {
    return ApiClient.patch<Movie>(`/movies/${id}`, movieData);
  },
  async delete(id: string) {
    return ApiClient.delete(`/movies/${id}`);
  }
};