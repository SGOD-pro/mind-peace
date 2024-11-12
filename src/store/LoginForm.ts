import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type LoginFormState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  open: () => void  
};

const useLoginForm = create<LoginFormState>()(
  immer((set) => ({
    isOpen: false,
    setIsOpen: (val) => {
      set((state) => {
        console.log(val)
        state.isOpen = val;
      });
    },
    open: () => {
      set((state) => {
        state.isOpen = true;
      });
    }
  }))
);
export  {useLoginForm};
export const LoginFormState=useLoginForm.getState();
