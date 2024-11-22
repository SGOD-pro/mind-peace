import StoreHelper from "@/helper/StoreHelper";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";


interface ExampleState {
  data: Therapists[]; // This will be updated via StoreHelper
  hydrated: boolean;
  addItem: (item: Therapists) => void;
  removeItem: (id: string) => void;
  updateItem: (item: Therapists) => void;
  setAllItems: (items: Therapists[]) => void;
}

const useTherapistStore = create<ExampleState>()(
  immer((set) => {
    const storeHelper = new StoreHelper<Therapists>([]);

    return {
      data: storeHelper.getItems(),
      hydrated: false,

      addItem: (item) => {
        const updatedData = storeHelper.addItem(item);
        set((state) => {
          state.data = updatedData;
        });
      },

      removeItem: (id) => {
        const updatedData = storeHelper.removeItem(id);
        set((state) => {
          state.data = updatedData;
        });
      },

      updateItem: (item) => {
        const updatedData = storeHelper.updateItem(item);
        set((state) => {
          state.data = updatedData;
        });
      },

      setAllItems: (items) => {
        const updatedData = storeHelper.setItems(items);
        set((state) => {
          state.data = items;
          state.hydrated = true;
        });
      },
    };
  })
);

export default useTherapistStore;
