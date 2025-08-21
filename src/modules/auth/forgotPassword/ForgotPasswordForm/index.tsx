"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import { CooldownButton } from "@/components/buttons/CooldownButton";
import { RHFCaptcha } from "@/components/formFields/RHFFields/RHFCaptcha";
import { RHFTextField } from "@/components/formFields/RHFFields/RHFTextField";
import { ERROR_MESSAGES } from "@/constants/messages";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { routes } from "@/constants/routes";
import { createClientCS } from "@/db/supabase/client/createClientCS";
import { useCountdown } from "@/hooks/useCountdown";
import { showErrorToast } from "@/utils/client/toasts";
import { genFullSiteUrl } from "@/utils/client/urls";

import { ForgotPasswordFormValues, forgotPasswordSchema } from "./schema";

export const ForgotPasswordForm = () => {
  const supabase = createClientCS();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { count, startCountdown } = useCountdown();
  const methods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: searchParams.get(QUERY_KEYS.EMAIL) ?? "",
      captchaToken: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: genFullSiteUrl(routes.resetPassword()),
      captchaToken: data.captchaToken,
    });

    if (error) {
      console.error(error);
      showErrorToast(ERROR_MESSAGES.USER.TRY_AGAIN_LATER);
    } else {
      startCountdown(10);
    }

    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-5 w-full space-y-4">
          <RHFTextField type="email" name="email" label="Email" required />
          <RHFCaptcha name="captchaToken" />
        </div>

        <CooldownButton
          type="submit"
          loading={loading}
          cooldown={count}
          fullWidth
        >
          Resend
        </CooldownButton>
      </form>
    </FormProvider>
  );
};
