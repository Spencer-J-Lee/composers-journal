"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/shared/buttons/Button";
import { RHFTextField } from "@/components/shared/formFields/RHFFields/RHFTextField";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { createClientCS } from "@/lib/db/supabase/client";
import { routes } from "@/routes/routes";
import { genFullSiteUrl } from "@/utils/urls";

import { ForgotPasswordFormValues, forgotPasswordSchema } from "./schema";

export const ForgotPasswordForm = () => {
  const supabase = createClientCS();
  const searchParams = useSearchParams();
  const methods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: searchParams.get(QUERY_KEYS.EMAIL) ?? "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        emailRedirectTo: genFullSiteUrl(
          routes.verifyEmailCallback(routes.search()),
        ),
        shouldCreateUser: false,
      },
    });

    // TODO: add better error handling
    // TODO: remove test logs
    if (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-5 w-full space-y-4">
          <RHFTextField type="email" name="email" label="Email" required />
        </div>

        <Button type="submit" fullWidth>
          Send
        </Button>
      </form>
    </FormProvider>
  );
};
