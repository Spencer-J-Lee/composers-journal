import clsx from "clsx";

import { repeatRender } from "@/utils/client/repeatRender";

import { ShimmerButton } from "./ShimmerButton";

type ShimmerSimpleFiltersProps = {
  className?: string;
};

export const ShimmerSimpleFilters = ({
  className,
}: ShimmerSimpleFiltersProps) => {
  return (
    <div className={clsx("flex items-center gap-x-2", className)}>
      {repeatRender(3, (i) => (
        <ShimmerButton size="sm" className="w-15" key={i} />
      ))}
    </div>
  );
};
