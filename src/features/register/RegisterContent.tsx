import { StyledLink } from "@/components/StyledLink";
import { ELEMENT_IDS } from "@/constants/elementIds";
import { routes } from "@/routes/routes";

import { RegisterForm } from "./RegisterForm";

export const RegisterContent = () => {
  return (
    <main id={ELEMENT_IDS.MAIN_CONTENT} className="flex flex-col items-center">
      <div className="w-full max-w-md">
        <RegisterForm />
        <div>
          Already have an account?{" "}
          <StyledLink href={routes.login()}>Log In</StyledLink>
        </div>
      </div>
    </main>
  );
};
