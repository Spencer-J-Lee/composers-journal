import { StyledLink } from "@/components/StyledLink";
import { routes } from "@/constants/routes";

import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { AuthFormWrapper } from "../components/AuthFormWrapper";
import { FormFooter } from "../components/FormFooter";

export const ForgotPasswordContent = () => {
  return (
    <AuthFormWrapper>
      <ForgotPasswordForm />

      <FormFooter>
        Remembered your password?{" "}
        <StyledLink href={routes.login()}>Log In</StyledLink>
      </FormFooter>
    </AuthFormWrapper>
  );
};
