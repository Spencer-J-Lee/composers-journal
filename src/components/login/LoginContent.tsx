"use client";

import { GSIButton } from "./google/GSIButton";
import { ELEMENT_IDS } from "../shared/constants/elementIds";
import { LoginForm } from "./LoginForm";

export const LoginContent = () => {
  return (
    <main id={ELEMENT_IDS.MAIN_CONTENT} className="flex flex-col items-center">
      <LoginForm />
      <GSIButton />
    </main>
  );
};
