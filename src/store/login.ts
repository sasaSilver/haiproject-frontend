import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LoginState = {
  isLoggedIn: boolean,
  setLoggedIn: (value: boolean) => void,
  username: string | null,
  setUserName: (name: string | null) => void,
  userId: number | null,
  setUserId: (id: number | null) => void
}

const localStoragePersist = {
  getItem: (name: string) => {
    try {
      const item = localStorage.getItem(name);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: any) => {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch { console.log(`Failed to set ${name} to ${value} in local storage` )}
  },
  removeItem: (name: string) => {
    try {
      localStorage.removeItem(name);
    } catch { console.log(`Failed to remove ${name} from local storage` )}
  },
};

export const useLoginState = create<LoginState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
      username: null,
      setUserName: (name: string | null) => set({ username: name }),
      userId: null,
      setUserId: (id: number | null) => set({userId: id})
    }),
    {
      name: 'login-storage',
      storage: localStoragePersist,
    }
  )
);
