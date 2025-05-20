"use client";

import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { useSearchParams } from "next/navigation";

import { createClientCS } from "@/lib/db/supabase/client";
import { routes } from "@/routes/routes";
import { getRedirectUrl } from "@/utils/urls";

import { Button } from "../shared/buttons/Button";
import { ELEMENT_IDS } from "../shared/constants/elementIds";

/**
 * TODO: handle email already verified error
 * TODO: handle email doesn't exist error(?)
 */
export const VerifyEmailContent = () => {
  const searchParams = useSearchParams();
  const supabase = createClientCS();

  // TODO: implement proper form fields with validations
  const [formValues, setFormValues] = useState({
    email: searchParams.get("email") ?? "",
  });

  const resendVerification: MouseEventHandler<HTMLButtonElement> = async (
    e,
  ) => {
    e.preventDefault();

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: formValues.email,
      options: {
        emailRedirectTo: getRedirectUrl(routes.search()),
      },
    });

    // TODO: add better error handling
    // TODO: remove test logs
    if (error) {
      console.error(error);
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
        {"Didn't"} receive an email?
        <input
          type="email"
          name="email"
          value={formValues.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <Button type="submit" onClick={resendVerification}>
          Resend
        </Button>
      </form>
    </main>
  );
};
