import { ReactNode } from "react";

import { ELEMENT_IDS } from "@/constants/elementIds";

export type PageWrapperBaseProps = {
  children: ReactNode;
  className?: string;
};

export const PageWrapperBase = ({
  children,
  className,
}: PageWrapperBaseProps) => {
  return (
    <main id={ELEMENT_IDS.MAIN_CONTENT} className={className}>
      {children}
    </main>
  );
};
