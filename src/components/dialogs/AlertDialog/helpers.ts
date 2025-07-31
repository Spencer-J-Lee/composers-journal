import { AlertAction, AsyncAlertAction } from "./types";

export const isAsyncAlertAction = (
  action: AlertAction,
): action is AsyncAlertAction => {
  return action.type === "async";
};
