import { ApiClient } from "./apiClient";
import type { Movie } from "./types";

export const RecommenderService = {
    async get(userId?: number, movieId?: string) {
        const params = new URLSearchParams();
        userId && params.append('user', `${userId}`);
        movieId && params.append('movie', `${movieId}`);
        return await ApiClient.get<Movie[]>(`/recommend/?${params.toString()}`)
    }
}