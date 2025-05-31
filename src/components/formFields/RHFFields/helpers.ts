import { FieldErrors, FieldValues } from "react-hook-form";

export const getFieldError = (
  errors: FieldErrors<FieldValues>,
  name: string,
): string | undefined => {
  return typeof errors[name]?.message === "string"
    ? errors[name].message
    : undefined;
};
