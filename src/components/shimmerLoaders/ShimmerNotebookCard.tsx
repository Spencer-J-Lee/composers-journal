import { ShimmerCardControls } from "./ShimmerCardControls";
import { Card } from "../Card";
import { ShimmerLoader } from "../ShimmerLoader";

type ShimmerNotebookCardProps = {
  controlsCount: number;
};

export const ShimmerNotebookCard = ({
  controlsCount,
}: ShimmerNotebookCardProps) => {
  return (
    <Card paddingSize="none">
      <div className="flex">
        <ShimmerCardControls count={controlsCount} />

        <div className="border-border flex flex-1 flex-col border-l p-4">
          <ShimmerLoader
            typographyVariant="h4"
            className="mb-2 max-w-56"
            fullWidth
          />

          <div className="mt-auto">
            <ShimmerLoader
              typographyVariant="smallMuted"
              className="max-w-48"
              fullWidth
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
