import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type AuthState = {
	user: UserWithId | null;
	ishydrated: boolean;
	setUser: (user: UserWithId | null) => void;
};

const useAuthStore = create<AuthState>()(
	immer((set) => ({
		user: null,
		ishydrated: false,
		setUser: (user) =>
			set((state) => {
				state.user = user;
				state.ishydrated = true;
			}),
	}))
);

export default useAuthStore;
export const getAuthStore = () => useAuthStore.getState();
