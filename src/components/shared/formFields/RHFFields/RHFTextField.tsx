import { useFormContext } from "react-hook-form";
import { FieldLabel } from "../FieldLabel";
import { FieldError } from "../FieldError";
import { TextField, TextFieldProps } from "../TextField";
import { required } from "zod/v4-mini";

type RHFTextFieldProps = {
  name: string;
  label: string;
} & TextFieldProps;

export const RHFTextField = ({
  name,
  label,
  required,
  ...props
}: RHFTextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div>
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <TextField id={name} hasError={!!error} {...register(name)} {...props} />
      <FieldError show={!!error}>{error}</FieldError>
    </div>
  );
};
