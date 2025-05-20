"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import { createClientCS } from "@/lib/db/supabase/client";
import { routes } from "@/routes/routes";
import { genFullSiteUrl } from "@/utils/urls";

import { VerifyEmailFormValues, verifyEmailSchema } from "./schema";
import { Button } from "../../shared/buttons/Button";
import { RHFTextField } from "../../shared/formFields/RHFFields/RHFTextField";

export const VerifyEmailForm = () => {
  const supabase = createClientCS();
  const searchParams = useSearchParams();
  const methods = useForm<VerifyEmailFormValues>({
    defaultValues: { email: searchParams.get("email") ?? "" },
    resolver: zodResolver(verifyEmailSchema),
  });

  const onSubmit = async (data: VerifyEmailFormValues) => {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: data.email,
      options: {
        emailRedirectTo: genFullSiteUrl(
          routes.verifyEmailCallback(routes.search()),
        ),
      },
    });

    // TODO: handle email already verified error
    // TODO: handle email doesn't exist error(?)
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
          Resend
        </Button>
      </form>
    </FormProvider>
  );
};
