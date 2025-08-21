import { repeatRender } from "@/utils/client/repeatRender";

import { ShimmerButton } from "./ShimmerButton";
import { ShimmerFormField } from "./ShimmerFormField";

type ShimmerFormProps = {
  fieldCount: number;
};

export const ShimmerForm = ({ fieldCount }: ShimmerFormProps) => {
  return (
    <div>
      <div className="mb-5 w-full space-y-4">
        {repeatRender(fieldCount, () => (
          <ShimmerFormField />
        ))}
      </div>

      <ShimmerButton fullWidth />
    </div>
  );
};
