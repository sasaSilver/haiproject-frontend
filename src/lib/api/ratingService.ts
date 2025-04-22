import { ApiClient } from "./apiClient";
import type { Rating } from "./types";

export const RatingService = {
    async getRating(userId: number, movieId: number) {
        const params = new URLSearchParams();
        params.append('userId', userId.toString());
        params.append('movieId', movieId.toString());
        return ApiClient.get<Rating>(`/ratings/?${params.toString()}`)       
    },
    async createRating(rating: Rating) {
        return ApiClient.post<Rating>(`/ratings/`, rating);
    },
    async updateRating(rating: Rating) {
        return ApiClient.patch<Rating>('/ratings/', rating);
    },
    async deleteRating(userId: number, movieId: number) {
        return ApiClient.delete<Rating>(`/ratings/?user=${userId}?movie=${movieId}`)
    }
}