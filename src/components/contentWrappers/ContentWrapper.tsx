import { ReactNode } from "react";
import clsx from "clsx";

type ContentWrapperProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Intended to be used with PageWrapper.
 */
export const ContentWrapper = ({
  children,
  className,
}: ContentWrapperProps) => {
  return <div className={clsx("mx-auto", className)}>{children}</div>;
};
