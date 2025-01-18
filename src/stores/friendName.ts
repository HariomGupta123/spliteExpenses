// src/stores/userStore.ts
'use client';

import { create } from 'zustand';

type UserState = {
  friendName: string;
  setfriendName: (name: string) => void;
  resetfriendName: () => void;
};

const useUserStore = create<UserState>((set) => ({
  friendName: '',
  setfriendName: (name) => {
    // Prevent unnecessary updates by ensuring state actually changes
    set((state) => {
      if (state.friendName !== name) {
        return { friendName: name };
      }
      return state; // Return the current state if no changes
    });
  },
  resetfriendName: () => set({ friendName: '' }),
}));

export default useUserStore;
