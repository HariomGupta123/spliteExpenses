import { create } from 'zustand';

interface StoreStates {
  arrayNumbers: number[];
  sumOfGiveAmount: number;
  addToGiveAmount: (newNumbers: number[]) => void; // specify the type here
}

const useToGiveAmount = create<StoreStates>((set) => ({
  arrayNumbers: [],
  sumOfGiveAmount: 0,
  addToGiveAmount: (newNumbers) => {
    set((state) => {
      console.log('Current Numbers:', state);
      console.log('New Numbers:', newNumbers);

      if (newNumbers.length === 0 || newNumbers.every(num => state.arrayNumbers.includes(num))) {
        console.log('No update needed');
        return state;  // Do not update if no changes
      }

      const updatedNumbers = [...state.arrayNumbers, ...newNumbers];
      const newSum = updatedNumbers.reduce((acc, num) => acc + num, 0);
      console.log('Updated Numbers:', updatedNumbers);
      console.log('New Sum:', newSum);

      return { arrayNumbers: updatedNumbers, sumOfGiveAmount: newSum };  // Return updated state
    });
  },
}));

export default useToGiveAmount;
