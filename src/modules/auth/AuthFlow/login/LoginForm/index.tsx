"use client";

import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/buttons/Button";
import { FakeLinkButton } from "@/components/buttons/FakeLinkButton";
import { RHFCaptcha } from "@/components/formFields/RHFFields/RHFCaptcha";
import { RHFTextField } from "@/components/formFields/RHFFields/RHFTextField";
import { ERROR_MESSAGES } from "@/constants/messages";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { DEFAULT_PROTECTED_ROUTE } from "@/constants/routes/constants";
import { createClientCS } from "@/db/supabase/client/createClientCS";
import { showErrorToast } from "@/utils/client/toasts";

import { LoginFormValues, loginSchema } from "./schema";
import { AUTH_FLOW_ROUTES, AuthFlowRoute } from "../../../AuthFlow/types";
import { FieldsWrapper } from "../../../components/FieldsWrapper";

type LoginFormProps = {
  onFlowChange: (newRoute: AuthFlowRoute) => void;
};

export const LoginForm = ({ onFlowChange }: LoginFormProps) => {
  const supabase = createClientCS();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: searchParams.get(QUERY_KEYS.EMAIL) ?? "",
      password: "",
      captchaToken: "",
    },
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
      options: {
        captchaToken: data.captchaToken,
      },
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
        <FieldsWrapper>
          <RHFTextField type="email" name="email" label="Email" required />
          <div>
            <RHFTextField
              type="password"
              name="password"
              label="Password"
              required
            />

            <FakeLinkButton
              onClick={() => onFlowChange(AUTH_FLOW_ROUTES.FORGOT_PASSWORD)}
            >
              Forgot password?
            </FakeLinkButton>
          </div>
        </FieldsWrapper>

        <RHFCaptcha name="captchaToken" invisible />

        <Button type="submit" loading={loading} fullWidth>
          Log In
        </Button>
      </form>
    </FormProvider>
  );
};
