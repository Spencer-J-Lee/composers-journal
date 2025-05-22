import { useState } from "react";

/**
 * @deprecated Use the custom Toast from sonner for alerts
 */
export const useAlert = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const showAlert = (message?: string) => {
    if (message) setAlertMsg(message);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  return {
    alertVisible,
    alertMsg,
    showAlert,
    hideAlert,
  };
};
