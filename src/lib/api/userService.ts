import { ApiClient } from "./apiClient";
import type { User, UserUpdate } from "./types";

export const userService = {
    async getUser(userId: number) {
        return ApiClient.get<User>(`/users/${userId}`);
    },
    async updateUser(user: UserUpdate) {
        return ApiClient.patch<User>(`/users/${user.id}`, user);
    },
    async deleteUser(userId: number) {
        return ApiClient.delete(`/users/${userId}`);
    },
    async getCurrentUser() {
        return ApiClient.get<User>('/users/me')
    }
}