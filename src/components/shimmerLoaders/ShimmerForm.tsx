import { FieldsWrapper } from "@/modules/auth/components/FieldsWrapper";
import { repeatRender } from "@/utils/client/repeatRender";

import { ShimmerButton } from "./ShimmerButton";
import { ShimmerFormField } from "./ShimmerFormField";

type ShimmerFormProps = {
  fieldCount: number;
};

export const ShimmerForm = ({ fieldCount }: ShimmerFormProps) => {
  return (
    <div>
      <FieldsWrapper>
        {repeatRender(fieldCount, () => (
          <ShimmerFormField />
        ))}
      </FieldsWrapper>

      <ShimmerButton fullWidth />
    </div>
  );
};
