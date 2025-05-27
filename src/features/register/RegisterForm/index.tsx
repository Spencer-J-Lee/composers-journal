"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/buttons/Button";
import { RHFPasswordField } from "@/components/formFields/RHFFields/RHFPasswordField";
import { RHFTextField } from "@/components/formFields/RHFFields/RHFTextField";
import { ERROR_MESSAGES } from "@/constants/messages";
import { createClientCS } from "@/lib/db/supabase/client";
import { routes } from "@/routes/routes";
import { showErrorToast } from "@/utils/toasts";
import { genFullSiteUrl } from "@/utils/urls";

import { RegisterFormValues, registerSchema } from "./schema";

export const RegisterForm = () => {
  const supabase = createClientCS();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
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
        emailRedirectTo: genFullSiteUrl(
          routes.verifyEmailCallback(routes.search()),
        ),
      },
    });

    if (error) {
      console.error(error);
      showErrorToast(ERROR_MESSAGES.GENERIC_SERVER_ERROR);
    } else {
      router.push(routes.verifyEmail(data.email));
    }

    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-5 w-full space-y-4">
          <RHFTextField type="email" name="email" label="Email" required />
          <RHFPasswordField name="password" required />
        </div>

        <Button type="submit" loading={loading} fullWidth>
          Register
        </Button>
      </form>
    </FormProvider>
  );
};
