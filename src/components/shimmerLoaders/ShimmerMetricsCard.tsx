import { repeatRender } from "@/utils/client/repeatRender";

import { Card } from "../Card";
import { ShimmerLoader } from "../ShimmerLoader";

type ShimmerMetricsCardProps = {
  itemCount: number;
};

export const ShimmerMetricsCard = ({ itemCount }: ShimmerMetricsCardProps) => {
  return (
    <Card>
      <ShimmerLoader typographyVariant="h3" className="mb-3 max-w-48" />

      <ul className="space-y-2">
        {repeatRender(itemCount, () => (
          <li>
            <ShimmerLoader
              typographyVariant="smallMuted"
              className="mb-1 max-w-32"
            />
            <ShimmerLoader typographyVariant="body" className="max-w-20" />
          </li>
        ))}
      </ul>
    </Card>
  );
};
