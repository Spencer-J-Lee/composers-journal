import { ShimmerCardControls } from "./ShimmerCardControls";
import { Card } from "../Card";
import { Divider } from "../Divider";
import { ShimmerLoader } from "../ShimmerLoader";

type ShimmerEntryCardProps = {
  controlsCount: number;
};

export const ShimmerEntryCard = ({ controlsCount }: ShimmerEntryCardProps) => {
  return (
    <Card paddingSize="none">
      <div className="flex">
        <ShimmerCardControls count={controlsCount} />

        <div className="border-border flex flex-1 flex-col border-l p-4">
          <ShimmerLoader
            typographyVariant="h4"
            className="max-w-10/12"
            fullWidth
          />

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
