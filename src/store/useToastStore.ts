// packages
import create from "zustand";
import { combine } from "zustand/middleware";

type ID = string | number;

export const useToastStore = create(
  combine(
    {
      toastListState: new Set(),
    },
    (set, get) => ({
      show(id: ID) {
        const { toastListState } = get();

        const newToastList = new Set(toastListState);
        newToastList.add(id);

        set({
          toastListState: newToastList,
        });
      },
      close(id: ID) {
        const { toastListState } = get();

        const newToastList = new Set(toastListState);
        newToastList.delete(id);

        set({
          toastListState: newToastList,
        });
      },
      clear() {
        const newToastList = new Set();

        set({
          toastListState: newToastList,
        });
      },
    })
  )
);
