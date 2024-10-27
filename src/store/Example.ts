import StoreHelper from "@/helper/StoreHelper";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface User {
	name: string;
	qualification: string;
	contactNo: string;
	clinicLocation: string;
	timing: string;
	specilization: string;
	about?: string;
}

interface UserWithId extends User {
	id: string;
}

interface ExampleState {
	storeHelper: StoreHelper<UserWithId>;
	hydrated: boolean;
	addItem: (data: UserWithId) => void;
	removeItem: (id: string) => void;
	updateItem: (data: UserWithId) => void;
	setAllItems: (items: UserWithId[]) => void;
	getAllUsers: () => UserWithId[];
}

const useStore = create<ExampleState>()(
	immer((set, get) => ({
		storeHelper: new StoreHelper<UserWithId>(),
		hydrated: false,

		addItem: (item: UserWithId) =>
			set((state) => {
				state.storeHelper.addItem(item);
			}),

		// Remove user by id
		removeItem: (id: string) =>
			set((state) => {
				state.storeHelper.removeItem(id);
			}),

		// Update an existing user by id
		updateItem: (updatedItem: UserWithId) =>
			set((state) => {
				state.storeHelper.updateItem(updatedItem.id, updatedItem);
			}),

		// Set the entire list of users
		setAllItems: (items: UserWithId[]) =>
			set((state) => {
				state.storeHelper.setItems(items);
				set({ hydrated: true });
			}),
		getAllUsers: () => {
			return get().storeHelper.getItems();
		},
	}))
);

export default useStore;
