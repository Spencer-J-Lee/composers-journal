"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import { ERROR_MESSAGES } from "@/constants/messages";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { createClientCS } from "@/lib/db/supabase/client";
import { routes } from "@/routes/routes";
import { showErrorToast } from "@/utils/toasts";
import { genFullSiteUrl } from "@/utils/urls";

import { VerifyEmailFormValues, verifyEmailSchema } from "./schema";
import { Button } from "../../shared/buttons/Button";
import { RHFTextField } from "../../shared/formFields/RHFFields/RHFTextField";

export const VerifyEmailForm = () => {
  const supabase = createClientCS();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const methods = useForm<VerifyEmailFormValues>({
    defaultValues: { email: searchParams.get(QUERY_KEYS.EMAIL) ?? "" },
    resolver: zodResolver(verifyEmailSchema),
  });

  const onSubmit = async (data: VerifyEmailFormValues) => {
    setLoading(true);

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: data.email,
      options: {
        emailRedirectTo: genFullSiteUrl(
          routes.verifyEmailCallback(routes.search()),
        ),
      },
    });

    if (error) {
      showErrorToast(ERROR_MESSAGES.GENERIC_SERVER_ERROR);
    }

    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-5 w-full space-y-4">
          <RHFTextField type="email" name="email" label="Email" required />
        </div>
        <Button type="submit" loading={loading} fullWidth>
          Resend
        </Button>
      </form>
    </FormProvider>
  );
};
