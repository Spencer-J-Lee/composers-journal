import { useController, useFormContext } from "react-hook-form";

import { getFieldError } from "./helpers";
import { FieldError } from "../FieldError";
import { RichTextField } from "../RichTextField";

type RHFRichTextFieldProps = {
  name: string;
  placeholder?: string;
  editable?: boolean;
  showMenuBar?: boolean;
  editorClassName?: string;
};

export const RHFRichTextField = ({
  name,
  placeholder,
  editable = true,
  showMenuBar,
  editorClassName,
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

  return (
    <>
      <RichTextField
        value={value}
        placeholder={placeholder}
        hasError={!!error}
        onChange={onChange}
        editable={editable}
        showMenuBar={showMenuBar}
        editorClassName={editorClassName}
      />
      <FieldError show={!!error}>{error}</FieldError>
    </>
  );
};
