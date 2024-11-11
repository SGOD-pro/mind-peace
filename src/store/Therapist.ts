import StoreHelper from "@/helper/StoreHelper";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ExampleState {
  storeHelper: StoreHelper<Therapists>;
  hydrated: boolean;
  addItem: (data: Therapists) => void;
  removeItem: (id: string) => void;
  updateItem: (data: Therapists) => void;
  setAllItems: (items: Therapists[]) => void;
  getAllUsers: () => Therapists[];
}

const useTherapistStore = create<ExampleState>()(
  immer((set) => {
    const storeHelper = new StoreHelper<Therapists>([]);

    return {
      storeHelper,
      hydrated: false,

      addItem: (item: Therapists) => {
        storeHelper.addItem(item);
        set((state) => {
          state.storeHelper = new StoreHelper<Therapists>(storeHelper.getItems());
        });
      },

      removeItem: (id: string) => {
        console.log(storeHelper.getItems());
        storeHelper.removeItem(id);
        set((state) => {
          state.storeHelper = new StoreHelper<Therapists>(storeHelper.getItems());
        });
        console.log(storeHelper.getItems());
      },

      updateItem: (updatedItem: Therapists) => {
        storeHelper.updateItem(updatedItem);
        set((state) => {
          state.storeHelper = new StoreHelper<Therapists>(storeHelper.getItems());
        });
      },

      setAllItems: (items: Therapists[]) => {
        storeHelper.setItems(items);
        set((state) => {
          state.storeHelper = new StoreHelper<Therapists>(storeHelper.getItems());
          state.hydrated = true;
        });
      },

      getAllUsers: () => {
        return storeHelper.getItems();
      },
    };
  })
);

export default useTherapistStore;
export const useTherapist = () => useTherapistStore.getState();
