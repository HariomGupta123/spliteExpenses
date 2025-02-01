'use client';

import { create } from 'zustand';

type UserState = {
  friendName: string;
    // amount:number;
  setfriendName: (name: string) => void;
  resetfriendName: () => void;
  // amount:number;
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
