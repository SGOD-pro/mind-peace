import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware/persist";


type AuthState = {
    user: UserWithId | null;
    setUser: (user: UserWithId | null) => void;
};

