"use client";

import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/buttons/Button";
import { FakeLinkButton } from "@/components/buttons/FakeLinkButton";
import { RHFCaptcha } from "@/components/formFields/RHFFields/RHFCaptcha";
import { RHFPasswordField } from "@/components/formFields/RHFFields/RHFPasswordField";
import { RHFTextField } from "@/components/formFields/RHFFields/RHFTextField";
import { ERROR_MESSAGES } from "@/constants/messages";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { routes } from "@/constants/routes";
import { createClientCS } from "@/db/supabase/client/createClientCS";
import { FormFooter } from "@/modules/auth/components/FormFooter";
import { showErrorToast } from "@/utils/client/toasts";

import { RegisterFormValues, registerSchema } from "./schema";
import { FieldsWrapper } from "../../../components/FieldsWrapper";

export const RegisterForm = () => {
  const supabase = createClientCS();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
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

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);

    // To increase security against brute force information farming, users
    // aren't notified when an account already exists for the provided email.
    // Instead, the request will succeed as if a new user was registered.
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        captchaToken: data.captchaToken,
      },
    });

    if (error) {
      console.error(error);
      showErrorToast(ERROR_MESSAGES.USER.TRY_AGAIN_LATER);
    } else {
      router.push(routes.notebooks());
    }

    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FieldsWrapper>
          <RHFTextField type="email" name="email" label="Email" required />
          <RHFPasswordField name="password" required />
          <RHFCaptcha name="captchaToken" />
        </FieldsWrapper>

        <Button type="submit" loading={loading} fullWidth>
          Register
        </Button>
      </form>

      <FormFooter>
        Already have an account?{" "}
        <FakeLinkButton
          onClick={() => {
            window.history.pushState(null, "", routes.login(watchedEmail));
          }}
        >
          Log In
        </FakeLinkButton>
      </FormFooter>
    </FormProvider>
  );
};
