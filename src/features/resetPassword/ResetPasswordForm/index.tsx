"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/buttons/Button";
import { RHFPasswordField } from "@/components/formFields/RHFFields/RHFPasswordField";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import { createClientCS } from "@/lib/db/supabase/client";
import { routes } from "@/routes/routes";
import { showErrorToast, showSuccessToast } from "@/utils/toasts";

import { ResetPasswordFormValues, resetPasswordSchema } from "./schema";

export const ResetPasswordForm = () => {
  const supabase = createClientCS();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const methods = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      console.log(`error.code:`, error.code);
      showErrorToast(ERROR_MESSAGES.GENERIC_SERVER_ERROR);
    } else {
      showSuccessToast(SUCCESS_MESSAGES.PASSWORD_RESET);
      router.push(routes.search());
    }

    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-5 w-full space-y-4">
          <RHFPasswordField name="password" required />
        </div>

        <Button type="submit" loading={loading} fullWidth>
          Reset
        </Button>
      </form>
    </FormProvider>
  );
};
