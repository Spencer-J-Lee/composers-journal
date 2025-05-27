import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { StyledLink } from "@/components/StyledLink";
import { routes } from "@/constants/routes";

import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const ForgotPasswordContent = () => {
  return (
    <PageWrapper maxWidth="md">
      <p>{"We'll"} send you an email with a login link.</p>
      <ForgotPasswordForm />
      <div>
        Remembered your password?{" "}
        <StyledLink href={routes.login()}>Log In</StyledLink>
      </div>
    </PageWrapper>
  );
};
