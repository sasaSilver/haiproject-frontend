import { create } from 'zustand';

type LoginState = {
  isLoggedIn: boolean,
  username: string | null,
  reviewedMovies: string[],
  signInDropdownOpen: boolean,
  login: (username: string) => void,
  logout: () => void,
  openSignInDropdown: () => void,
  closeSignInDropdown: () => void,
}

export const useLoginState = create<LoginState>((set) => ({
  isLoggedIn: false,
  username: null,
  reviewedMovies: [],
  signInDropdownOpen: false,
  login: (username: string) => set({ isLoggedIn: true, username, signInDropdownOpen: false }),
  logout: () => set({ isLoggedIn: false, username: null }),
  openSignInDropdown: () => set({ signInDropdownOpen: true }),
  closeSignInDropdown: () => set({ signInDropdownOpen: false }),
}));
