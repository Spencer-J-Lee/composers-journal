import { StyledLink } from "@/components/StyledLink";
import { routes } from "@/constants/routes";

import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const ForgotPasswordContent = () => {
  return (
    <>
      <p>{"We'll"} send you an email with a login link.</p>
      <ForgotPasswordForm />
      <div className="mt-2">
        Remembered your password?{" "}
        <StyledLink href={routes.login()}>Log In</StyledLink>
      </div>
    </>
  );
};
