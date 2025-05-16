"use client";

import { ELEMENT_IDS } from "@/components/shared/constants/elementIds";
import { Button } from "@/components/shared/buttons/Button";
import { createClientCS } from "@/lib/db/supabase/client";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/routes/routes";

export const RegisterContent = () => {
  const supabase = createClientCS();
  const router = useRouter();

  // TODO: implement proper form fields with validations
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const register: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email: formValues.email,
      password: formValues.password,
    });

    // TODO: add better error handling
    // TODO: remove test logs
    if (error) {
      console.error(error);
    } else {
      console.log("redirecting...");
      router.push(routes.verifyEmail());
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main id={ELEMENT_IDS.MAIN_CONTENT}>
      <form className="flex flex-col">
        <input
          type="email"
          name="email"
          value={formValues.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formValues.password}
          placeholder="Password"
          onChange={handleChange}
        />

        {/* TODO: remove test code */}
        <Button
          type="button"
          onClick={async () => {
            const {
              data: { session },
            } = await supabase.auth.getSession();
            console.log(`session:`, session);
          }}
        >
          Log Session
        </Button>
        <Button onClick={register} type="submit">
          Register
        </Button>
      </form>
    </main>
  );
};
