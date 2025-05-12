import { ApiClient } from "./apiClient";
import type { Rating } from "./types";

export const RatingService = {
    async get(userId: number, movieId: string) {
        const params = new URLSearchParams();
        params.append('user', userId.toString());
        params.append('movie', movieId.toString());
        return ApiClient.get<Rating>(`/ratings/?${params.toString()}`)       
    },
    async create(rating: Rating) {
        return ApiClient.post<Rating>(`/ratings/`, rating);
    },
    async update(rating: Rating) {
        return ApiClient.patch<Rating>('/ratings/', rating);
    },
    async delete(userId: number, movieId: string) {
        const params = new URLSearchParams();
        params.append('user', userId.toString());
        params.append('movie', movieId.toString());
        return ApiClient.get<Rating>(`/ratings/?${params.toString()}`)
    }
}