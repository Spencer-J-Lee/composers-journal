import clsx from "clsx";

import { ShimmerLoader } from "../ShimmerLoader";

type ShimmerFormProps = {
  className?: string;
};

export const ShimmerFormField = ({ className }: ShimmerFormProps) => {
  return (
    <div className={clsx(className)}>
      <ShimmerLoader className="mb-2 w-32 text-xs" insertText />
      <ShimmerLoader className="h-10" fullWidth />
    </div>
  );
};
