"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import { CooldownButton } from "@/components/buttons/CooldownButton";
import { RHFTextField } from "@/components/formFields/RHFFields/RHFTextField";
import { ERROR_MESSAGES } from "@/constants/messages";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useCountdown } from "@/hooks/useCountdown";
import { createClientCS } from "@/lib/db/supabase/client";
import { routes } from "@/routes/routes";
import { showErrorToast } from "@/utils/toasts";
import { genFullSiteUrl } from "@/utils/urls";

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
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setLoading(true);

      options: {
        emailRedirectTo: genFullSiteUrl(
          routes.verifyEmailCallback(routes.search()),
        ),
        shouldCreateUser: false,
      },
    });

    if (error) {
      showErrorToast(ERROR_MESSAGES.GENERIC_SERVER_ERROR);
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
