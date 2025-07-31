import { ReactNode } from "react";
import { create } from "zustand";

import { AlertAction } from "@/components/dialogs/AlertDialog/types";

type AlertState = {
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  actions: AlertAction[];

  setOpen: (open: boolean) => void;
  openAlert: (options: {
    title: ReactNode;
    description?: ReactNode;
    actions: AlertAction[];
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
