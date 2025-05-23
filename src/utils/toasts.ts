import { toast } from "sonner";

import { inter } from "@/styles/fonts";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    style: {
      border: "none",
      backgroundColor: "var(--color-positive)",
      color: "var(--color-text)",
      fontFamily: inter.style.fontFamily,
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    style: {
      border: "none",
      backgroundColor: "var(--color-negative)",
      color: "var(--color-text)",
      fontFamily: inter.style.fontFamily,
    },
  });
};
