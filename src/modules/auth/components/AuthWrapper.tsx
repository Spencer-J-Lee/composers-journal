import { ReactNode } from "react";

type AuthWrapperProps = {
  children: ReactNode;
};

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return <div className="max-w-[25rem]">{children}</div>;
};
