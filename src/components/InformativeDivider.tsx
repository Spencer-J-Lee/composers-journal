import { ReactNode } from "react";
import clsx from "clsx";

import { Divider } from "./Divider";
import { Typography } from "./Typography";

type InformativeDividerProps = {
  children: ReactNode;
  className?: string;
};

export const InformativeDivider = ({
  children,
  className,
}: InformativeDividerProps) => {
  return (
    <div className={clsx("flex items-center gap-x-4", className)}>
      <Divider />
      <Typography variant="divider" className="text-nowrap">
        {children}
      </Typography>
      <Divider />
    </div>
  );
};
