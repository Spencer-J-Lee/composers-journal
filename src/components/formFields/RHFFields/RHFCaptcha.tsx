import { useFormContext } from "react-hook-form";
import { Turnstile } from "@marsidev/react-turnstile";

import { getFieldError } from "./helpers";
import { FieldError } from "../FieldError";

export type RHFCaptchaProps = {
  name: string;
};

export const RHFCaptcha = ({ name }: RHFCaptchaProps) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const error = getFieldError(errors, name);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) {
    throw new Error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not defined");
  }

  return (
    <div>
      <Turnstile
        siteKey={siteKey}
        onSuccess={(token) => setValue(name, token)}
        options={{
          theme: "light",
          size: "flexible",
        }}
      />
      <FieldError show={!!error}>{error}</FieldError>
    </div>
  );
};
