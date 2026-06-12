import { Props as ReactSelectProps } from "react-select";

import { FieldLabel } from "./FieldLabel";
import { Select } from "./Select";

export type SelectFieldProps<
  Option,
  IsMulti extends boolean = false,
> = {
  name: string;
  label: string;
} & ReactSelectProps<Option, IsMulti>;

export const SelectField = <Option, IsMulti extends boolean = false>({
  name,
  label,
  ...props
}: SelectFieldProps<Option, IsMulti>) => {
  return (
    <div>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Select<Option, IsMulti> inputId={name} {...props} />
    </div>
  );
};
