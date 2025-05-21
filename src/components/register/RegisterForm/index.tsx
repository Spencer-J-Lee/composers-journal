"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Alert } from "@/components/shared/alert/Alert";
import { useAlert } from "@/components/shared/alert/hooks";
import { Button } from "@/components/shared/buttons/Button";
import { RHFPasswordField } from "@/components/shared/formFields/RHFFields/RHFPasswordField";
import { RHFTextField } from "@/components/shared/formFields/RHFFields/RHFTextField";
import { createClientCS } from "@/lib/db/supabase/client";
import { routes } from "@/routes/routes";
import { genFullSiteUrl } from "@/utils/urls";

import { RegisterFormValues, registerSchema } from "./schema";

export const RegisterForm = () => {
  const supabase = createClientCS();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { alertVisible, alertMsg, showAlert, hideAlert } = useAlert();
  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    hideAlert();

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
      // To increase security against brute force information farming, users
      // aren't notified when an account already exists for the provided email.
      // Instead, the request will succeed as if a new user was registered.
      showAlert("Something went wrong. Please try again later.");
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

      <Alert
        message={alertMsg}
        type="negative"
        show={alertVisible}
        onClose={hideAlert}
      />
    </FormProvider>
  );
};
