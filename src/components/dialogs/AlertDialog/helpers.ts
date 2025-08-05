import { AsyncDialogAction,DialogAction } from "./types";

export const isAsyncDialogAction = (
  action: DialogAction,
): action is AsyncDialogAction => {
  return action.type === "async";
};
