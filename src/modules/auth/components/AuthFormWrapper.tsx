import { ReactNode } from "react";

type AuthFormWrapperProps = {
  children: ReactNode;
};

export const AuthFormWrapper = ({ children }: AuthFormWrapperProps) => {
  return <div className="max-w-[25rem]">{children}</div>;
};
