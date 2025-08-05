import { ReactNode } from "react";
import { create } from "zustand";

import { DialogAction } from "@/components/dialogs/AlertDialog/types";

type AlertState = {
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  actions: DialogAction[];

  setOpen: (open: boolean) => void;
  openAlert: (options: {
    title: ReactNode;
    description?: ReactNode;
    actions: DialogAction[];
  }) => void;
};

export const useAlert = create<AlertState>()((set) => ({
  open: false,
  title: "",
  description: "",
  actions: [],

  setOpen: (open: boolean) => set({ open }),
  openAlert: ({ title, description, actions }) =>
    set({
      open: true,
      title,
      description: description ?? "",
      actions,
    }),
}));
