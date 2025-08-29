import { InformativeDivider } from "@/components/dividers/InformativeDivider";
import { StyledLink } from "@/components/StyledLink";
import { routes } from "@/constants/routes";

import { GSIButton } from "./google/GSIButton";
import { LoginForm } from "./LoginForm";
import { AuthFormWrapper } from "../components/AuthFormWrapper";
import { FormFooter } from "../components/FormFooter";

export const LoginContent = () => {
  return (
    <AuthFormWrapper>
      <LoginForm />

      <FormFooter>
        Need an account?{" "}
        <StyledLink href={routes.register()}>Register</StyledLink>
      </FormFooter>

      <InformativeDivider className="my-5">or</InformativeDivider>

      <GSIButton redirectTo={routes.workspace()} />
    </AuthFormWrapper>
  );
};
