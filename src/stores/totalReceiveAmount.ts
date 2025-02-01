import {create} from 'zustand';
interface StoreState {
  numbers: number[];
  sum: number;
  addNumbers: (newNumbers: number[]) => void; // specify the type here
}
const useStore = create<StoreState>((set) => ({
  numbers: [],
  sum: 0,
  addNumbers: (newNumbers) => {
    set((state) => {
      // Check if the state needs to be updated
      console.log('Current Numbers:', state.numbers);
      console.log('New Numbers:', newNumbers);

      // Avoid adding an empty array or same values
      if (newNumbers.length === 0 || newNumbers.every(num => state.numbers.includes(num))) {
        console.log('No update needed');
        return state;  // Do not update if no changes
      }

      const updatedNumbers = [...state.numbers, ...newNumbers];
      const newSum = updatedNumbers.reduce((acc, num) => acc + num, 0);
      console.log('Updated Numbers:', updatedNumbers);
      console.log('New Sum:', newSum);

      return { numbers: updatedNumbers, sum: newSum };
    });
  },
}));

export default useStore;
