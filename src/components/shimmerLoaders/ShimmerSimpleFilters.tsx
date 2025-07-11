import clsx from "clsx";

import { ShimmerButton } from "./ShimmerButton";

type ShimmerSimpleFiltersProps = {
  className?: string;
};

export const ShimmerSimpleFilters = ({
  className,
}: ShimmerSimpleFiltersProps) => {
  return (
    <div className={clsx("flex gap-2", className)}>
      <ShimmerButton size="sm" className="max-w-15" fullWidth />
      <ShimmerButton size="sm" className="max-w-15" fullWidth />
      <ShimmerButton size="sm" className="max-w-15" fullWidth />
    </div>
  );
};
