import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type LoginFormState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const useLoginForm = create<LoginFormState>()(
  immer((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => {
      set((state) => {
        state.isOpen = isOpen;
      });
    },
  }))
);
export  {useLoginForm};
export const LoginFormState=useLoginForm.getState();
