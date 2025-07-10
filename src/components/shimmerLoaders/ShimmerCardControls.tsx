import { repeatRender } from "@/utils/client/repeatRender";

import { ShimmerIconButton } from "./ShimmerIconButton";

type ShimmerCardControlsProps = {
  count: number;
};

export const ShimmerCardControls = ({ count }: ShimmerCardControlsProps) => {
  return (
    <div className="flex flex-col items-center gap-1 p-2">
      {repeatRender(count, (i) => (
        <ShimmerIconButton key={i} />
      ))}
    </div>
  );
};
