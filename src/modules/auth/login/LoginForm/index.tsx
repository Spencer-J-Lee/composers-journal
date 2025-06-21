"use client";

import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/buttons/Button";
import { RHFTextField } from "@/components/formFields/RHFFields/RHFTextField";
import { StyledLink } from "@/components/StyledLink";
import { ERROR_MESSAGES } from "@/constants/messages";
import { routes } from "@/constants/routes";
import { DEFAULT_PROTECTED_ROUTE } from "@/constants/routes/constants";
import { createClientCS } from "@/db/supabase/client";
import { showErrorToast } from "@/utils/toasts";

import { LoginFormValues, loginSchema } from "./schema";

export const LoginForm = () => {
  const supabase = createClientCS();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const watchedEmail = useWatch({
    control: methods.control,
    name: "email",
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
      console.error(error);
      showErrorToast(ERROR_MESSAGES.USER.TRY_AGAIN_LATER);
    } else {
      router.push(DEFAULT_PROTECTED_ROUTE);
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
          <StyledLink href={routes.forgotPassword(watchedEmail)}>
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
