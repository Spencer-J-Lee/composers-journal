import { StyledLink } from "@/components/StyledLink";
import { ELEMENT_IDS } from "@/constants/elementIds";
import { routes } from "@/constants/routes";

import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const ForgotPasswordContent = () => {
  return (
    <main id={ELEMENT_IDS.MAIN_CONTENT} className="flex flex-col items-center">
      <div className="w-full max-w-md">
        <p>{"We'll"} send you an email with a login link.</p>
        <ForgotPasswordForm />
        <div>
          Remembered your password?{" "}
          <StyledLink href={routes.login()}>Log In</StyledLink>
        </div>
      </div>
    </main>
  );
};
