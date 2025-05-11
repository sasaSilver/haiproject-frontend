import { ApiClient } from "./apiClient";
import type { CurrentUser, CurrentUserUpdate } from "./types";

export const UserService = {
    async getUser(userId: number) {
        return ApiClient.get<CurrentUser>(`/users/${userId}`);
    },
    async updateUser(user: CurrentUserUpdate) {
        return ApiClient.patch<CurrentUser>(`/users/${user.id}`, user);
    },
    async deleteUser(userId: number) {
        return ApiClient.delete(`/users/${userId}`);
    },
    async getCurrentUser() {
        return ApiClient.get<CurrentUser>('/users/me')
    },
    async updateCurrentUserName(name: string) {
        return ApiClient.patch<CurrentUser>('/users/me', name);
    }
}