"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/shared/buttons/Button";
import { RHFTextField } from "@/components/shared/formFields/RHFFields/RHFTextField";
import { StyledLink } from "@/components/shared/StyledLink";
import { ERROR_MESSAGES } from "@/constants/messages";
import { createClientCS } from "@/lib/db/supabase/client";
import { routes } from "@/routes/routes";
import { showErrorToast } from "@/utils/toasts";

import { LoginFormValues, loginSchema } from "./schema";

export const LoginForm = () => {
  const supabase = createClientCS();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (
      error?.code === "invalid_credentials" ||
      error?.code === "validation_failed"
    ) {
      const keys: (keyof LoginFormValues)[] = ["email", "password"];

      keys.forEach((key) => {
        methods.setError(key, {
          type: "manual",
          message: "Email or password is invalid.",
        });
      });
    } else if (error) {
      showErrorToast(ERROR_MESSAGES.GENERIC_SERVER_ERROR);
    } else {
      router.push(routes.search());
    }

    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-5 w-full space-y-4">
          <RHFTextField type="email" name="email" label="Email" required />
          <RHFTextField
            type="password"
            name="password"
            label="Password"
            required
          />
          <StyledLink href={routes.forgotPassword(methods.getValues().email)}>
            Forgot password?
          </StyledLink>
        </div>

        <Button type="submit" loading={loading} fullWidth>
          Log In
        </Button>
      </form>
    </FormProvider>
  );
};
