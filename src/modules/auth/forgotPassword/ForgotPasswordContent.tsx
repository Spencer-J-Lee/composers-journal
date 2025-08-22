import { StyledLink } from "@/components/StyledLink";
import { routes } from "@/constants/routes";

import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { AuthWrapper } from "../components/AuthWrapper";
import { FormFooter } from "../components/FormFooter";

export const ForgotPasswordContent = () => {
  return (
    <AuthWrapper>
      <ForgotPasswordForm />

      <FormFooter>
        Remembered your password?{" "}
        <StyledLink href={routes.login()}>Log In</StyledLink>
      </FormFooter>
    </AuthWrapper>
  );
};
