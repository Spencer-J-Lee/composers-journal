import { useEffect } from "react";

import { ERROR_MESSAGES } from "@/constants/messages";
import { showErrorToast } from "@/utils/client/toasts";

const handleErrorLogging = (error: unknown) => {
  if (!error) return;

  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : ERROR_MESSAGES.USER.TRY_AGAIN_LATER;

  console.error(error);
  showErrorToast(message);
};

/**
 * This hook is intended to be used with TanStack Query hooks
 */
export const useLogError = (error: unknown) => {
  useEffect(() => {
    handleErrorLogging(error);
  }, [error]);
};
