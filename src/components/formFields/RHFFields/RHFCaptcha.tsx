import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

import { getFieldError } from "./helpers";
import { FieldError } from "../FieldError";

export type RHFCaptchaProps = {
  name: string;
  invisible?: boolean;
};

export const RHFCaptcha = ({ name, invisible }: RHFCaptchaProps) => {
  const {
    setValue,
    formState: { errors, submitCount, isSubmitSuccessful },
  } = useFormContext();
  const error = getFieldError(errors, name);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  useEffect(() => {
    // This prevents re-submission of already consumed tokens
    if (isSubmitSuccessful) {
      turnstileRef.current?.reset();
    }
  }, [submitCount, isSubmitSuccessful]);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) {
    throw new Error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not defined");
  }

  const handleSuccess = (token: string) => {
    setValue(name, token);
  };

  return (
    <div>
      <Turnstile
        ref={turnstileRef}
        siteKey={siteKey}
        onSuccess={handleSuccess}
        options={{
          theme: "auto",
          size: "flexible",
          appearance: invisible ? "interaction-only" : "always",
        }}
        /**
         * TODO: [med] Find a solution that doesn't risk showing the user
         * broken UI if turnstile detects the user as a bot when they aren't
         **/
        // Need this to override the default height on invisible turnstiles
        style={invisible ? { height: 0 } : undefined}
      />
      <FieldError show={!!error}>{error}</FieldError>
    </div>
  );
};
