"use client";

import { GSIButton } from "./google/GSIButton";
import { LoginForm } from "./LoginForm";
import { ELEMENT_IDS } from "../shared/constants/elementIds";

export const LoginContent = () => {
  return (
    <main id={ELEMENT_IDS.MAIN_CONTENT} className="flex flex-col items-center">
      <LoginForm />
      <GSIButton />
    </main>
  );
};
