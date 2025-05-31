import { useFormContext, useWatch } from "react-hook-form";

import { checkPasswordRules } from "./helpers";
import { PasswordRequirement } from "./PasswordRequirement";
import { FieldLabel } from "../../FieldLabel";
import { TextField, TextFieldProps } from "../../TextField";
import { getFieldError } from "../helpers";

type RHFPasswordFieldProps = {
  name: string;
} & TextFieldProps;

export const RHFPasswordField = ({
  name,
  required,
  ...props
}: RHFPasswordFieldProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const error = getFieldError(errors, name);
  const password = useWatch({ name, control });
  const rules = checkPasswordRules(password ?? "");

  return (
    <div>
      <FieldLabel htmlFor={name} required={required} hasError={!!error}>
        Password
      </FieldLabel>
      <TextField
        id={name}
        hasError={!!error}
        {...register(name)}
        {...props}
        type="password"
      />

      <ul className="mt-2 space-y-0.5">
        <li>
          <PasswordRequirement
            text="Minimum 8 characters"
            fulfilled={rules.minLength}
          />
        </li>
        <li>
          <PasswordRequirement
            text="One lowercase"
            fulfilled={rules.hasLowercase}
          />
        </li>
        <li>
          <PasswordRequirement
            text="One uppercase"
            fulfilled={rules.hasUppercase}
          />
        </li>
        <li>
          <PasswordRequirement text="One number" fulfilled={rules.hasNumber} />
        </li>
        <li>
          <PasswordRequirement text="One symbol" fulfilled={rules.hasSymbol} />
        </li>
      </ul>
    </div>
  );
};
