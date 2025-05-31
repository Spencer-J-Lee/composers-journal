import { useController, useFormContext } from "react-hook-form";

import { getFieldError } from "./helpers";
import { FieldError } from "../FieldError";
import { FieldLabel } from "../FieldLabel";
import { RichTextField } from "../RichTextField";

type RHFRichTextFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  editable?: boolean;
  showMenuBar?: boolean;
};

export const RHFRichTextField = ({
  name,
  label,
  placeholder,
  required,
  editable = true,
  showMenuBar,
}: RHFRichTextFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = getFieldError(errors, name);

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  console.log(`value:`, value);

  return (
    <div>
      <FieldLabel htmlFor={name} required={required} hasError={!!error}>
        {label}
      </FieldLabel>
      <RichTextField
        value={value}
        placeholder={placeholder}
        hasError={!!error}
        onChange={onChange}
        editable={editable}
        showMenuBar={showMenuBar}
      />
      <FieldError show={!!error}>{error}</FieldError>
    </div>
  );
};
