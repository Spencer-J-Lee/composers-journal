import { repeatRender } from "@/utils/client/repeatRender";

import { ShimmerIconButton } from "./ShimmerIconButton";
import { Card } from "../Card";
import { Divider } from "../Divider";
import { ShimmerLoader } from "../ShimmerLoader";

type ShimmerEntryCardProps = {
  numControls: number;
};

export const ShimmerEntryCard = ({ numControls }: ShimmerEntryCardProps) => {
  return (
    <Card paddingSize="none">
      <div className="flex">
        <div className="flex flex-col items-center gap-1 p-2">
          {repeatRender(numControls, (i) => (
            <ShimmerIconButton key={i} />
          ))}
        </div>

        <div className="border-border flex flex-1 flex-col border-l p-4">
          <ShimmerLoader typographyVariant="h4" className="w-1/2" />

          <Divider className="my-3" />

          <div className="mb-3 space-y-2">
            <ShimmerLoader typographyVariant="body" fullWidth />
            <ShimmerLoader typographyVariant="body" fullWidth />
            <ShimmerLoader typographyVariant="body" fullWidth />
          </div>

          <div className="mt-auto flex justify-between gap-10">
            <ShimmerLoader
              typographyVariant="smallMuted"
              className="max-w-96"
              fullWidth
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
