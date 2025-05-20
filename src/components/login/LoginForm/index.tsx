import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/shared/buttons/Button";
import { RHFTextField } from "@/components/shared/formFields/RHFFields/RHFTextField";
import { createClientCS } from "@/lib/db/supabase/client";
import { routes } from "@/routes/routes";

import { LoginFormValues, loginSchema } from "./schema";

export const LoginForm = () => {
  const supabase = createClientCS();
  const router = useRouter();
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    // TODO: handle error when invalid login credentials
    // TODO: add better error handling
    // TODO: remove test logs
    if (error) {
      console.error(error);
    } else {
      console.log("redirecting...");
      router.push(routes.search());
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
          Log In
        </Button>
      </form>
    </FormProvider>
  );
};
