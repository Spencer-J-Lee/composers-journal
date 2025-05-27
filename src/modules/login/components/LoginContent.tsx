import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { StyledLink } from "@/components/StyledLink";
import { routes } from "@/constants/routes";

import { GSIButton } from "./google/GSIButton";
import { LoginForm } from "./LoginForm";

export const LoginContent = () => {
  return (
    <>
      <LoginForm />
      <GSIButton />
      <div>
        Need an account?{" "}
        <StyledLink href={routes.register()}>Register</StyledLink>
      </div>
    </>
  );
};
