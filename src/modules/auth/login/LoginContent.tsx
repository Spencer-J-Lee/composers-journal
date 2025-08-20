import { InformativeDivider } from "@/components/dividers/InformativeDivider";
import { StyledLink } from "@/components/StyledLink";
import { routes } from "@/constants/routes";

import { GSIButton } from "./google/GSIButton";
import { LoginForm } from "./LoginForm";
import { AuthWrapper } from "../components/AuthWrapper";

export const LoginContent = () => {
  return (
    <AuthWrapper>
      <LoginForm />
      <div className="mt-2">
        Need an account?{" "}
        <StyledLink href={routes.register()}>Register</StyledLink>
      </div>

      <InformativeDivider className="my-5">or</InformativeDivider>

      <GSIButton />
    </AuthWrapper>
  );
};
