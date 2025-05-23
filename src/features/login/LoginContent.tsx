import { StyledLink } from "@/components/StyledLink";
import { routes } from "@/routes/routes";

import { GSIButton } from "./google/GSIButton";
import { LoginForm } from "./LoginForm";
import { ELEMENT_IDS } from "../../constants/elementIds";

export const LoginContent = () => {
  return (
    <main id={ELEMENT_IDS.MAIN_CONTENT} className="flex flex-col items-center">
      <div className="w-full max-w-md">
        <LoginForm />
        <GSIButton />
        <div>
          Need an account?{" "}
          <StyledLink href={routes.register()}>Register</StyledLink>
        </div>
      </div>
    </main>
  );
};
