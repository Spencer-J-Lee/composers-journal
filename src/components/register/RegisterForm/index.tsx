"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/shared/buttons/Button";
import { RHFTextField } from "@/components/shared/formFields/RHFFields/RHFTextField";
import { createClientCS } from "@/lib/db/supabase/client";
import { routes } from "@/routes/routes";
import { genFullSiteUrl } from "@/utils/urls";

import { RegisterFormValues, registerSchema } from "./schema";

export const RegisterForm = () => {
  const supabase = createClientCS();
  const router = useRouter();
  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: genFullSiteUrl(
          routes.verifyEmailCallback(routes.search()),
        ),
      },
    });

    // TODO: handle error when user already exists
    // TODO: handle error when user already registered through OAuth
    // TODO: add better error handling
    // TODO: remove test logs
    if (error) {
      console.error(error);
    } else {
      console.log("redirecting...");
      router.push(routes.verifyEmail(data.email));
    }
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
        </div>

        <Button type="submit" fullWidth>
          Register
        </Button>
      </form>
    </FormProvider>
  );
};
