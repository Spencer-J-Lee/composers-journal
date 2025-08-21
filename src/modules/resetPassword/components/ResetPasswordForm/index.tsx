"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/buttons/Button";
import { RHFPasswordField } from "@/components/formFields/RHFFields/RHFPasswordField";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import { DEFAULT_PROTECTED_ROUTE } from "@/constants/routes/constants";
import { createClientCS } from "@/db/supabase/client/createClientCS";
import { FieldsWrapper } from "@/modules/auth/components/FieldsWrapper";
import { showErrorToast, showSuccessToast } from "@/utils/client/toasts";

import { ResetPasswordFormValues, resetPasswordSchema } from "./schema";

export const ResetPasswordForm = () => {
  const supabase = createClientCS();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const methods = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      console.error(error);
      showErrorToast(ERROR_MESSAGES.USER.TRY_AGAIN_LATER);
    } else {
      showSuccessToast(SUCCESS_MESSAGES.PASSWORD_RESET);
      router.push(DEFAULT_PROTECTED_ROUTE);
    }

    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FieldsWrapper>
          <RHFPasswordField name="password" required />
        </FieldsWrapper>

        <Button type="submit" loading={loading} fullWidth>
          Reset
        </Button>
      </form>
    </FormProvider>
  );
};
