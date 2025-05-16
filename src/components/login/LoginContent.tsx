"use client";

import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

import { createClientCS } from "@/lib/db/supabase/client";
import { routes } from "@/routes/routes";

import { GSIButton } from "./google/GSIButton";
import { Button } from "../shared/buttons/Button";
import { ELEMENT_IDS } from "../shared/constants/elementIds";

export const LoginContent = () => {
  const supabase = createClientCS();
  const router = useRouter();

  // TODO: implement proper form fields with validations
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const login: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email: formValues.email,
      password: formValues.password,
    });

    // TODO: add better error handling
    // TODO: remove test logs
    if (error) {
      console.error(error);
    } else {
      console.log("redirecting...");
      router.push(routes.search());
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
          onClick={async () => {
            const {
              data: { session },
            } = await supabase.auth.getSession();
            console.log(`session:`, session);
          }}
          type="button"
        >
          Log Session
        </Button>
        <Button onClick={login} type="submit">
          Log In
        </Button>
        <Button
          onClick={async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
              console.error(`error:`, error);
            }
          }}
          type="button"
        >
          Log Out
        </Button>
        <GSIButton />
      </form>
      {/* TODO: Add login functionality */}
    </main>
  );
};
