import { ReactNode } from "react";

export const DialogActionsWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="mt-6 flex justify-end gap-x-2">{children}</div>;
};
