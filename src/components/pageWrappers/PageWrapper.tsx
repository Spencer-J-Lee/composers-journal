import clsx from "clsx";

import { PageWrapperBase, PageWrapperBaseProps } from "./PageWrapperBase";
import { maxWidthClassName } from "./styles";

type PageWrapperProps = {
  maxWidth: "sm" | "md" | "lg" | "xl" | "none";
} & PageWrapperBaseProps;

export const PageWrapper = ({
  children,
  className,
  maxWidth,
}: PageWrapperProps) => {
  return (
    <PageWrapperBase className={clsx("flex flex-col items-center", className)}>
      <div className={clsx("w-full", maxWidthClassName[maxWidth])}>
        {children}
      </div>
    </PageWrapperBase>
  );
};
