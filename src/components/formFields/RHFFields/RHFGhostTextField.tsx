import { useFormContext } from "react-hook-form";

import { getFieldError } from "./helpers";
import { RHFTextFieldProps } from "./RHFTextField";
import { FieldError } from "../FieldError";
import { GhostTextField } from "../GhostTextField";

type RHFGhostTextFieldProps = Omit<RHFTextFieldProps, "label" | "required">;

export const RHFGhostTextField = ({
  name,
  ...props
}: RHFGhostTextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = getFieldError(errors, name);

  return (
    <div>
      <GhostTextField
        id={name}
        hasError={!!error}
        {...register(name)}
        {...props}
      />
      <FieldError show={!!error}>{error}</FieldError>
    </div>
  );
};
