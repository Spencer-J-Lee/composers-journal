import { StyledLink } from "@/components/StyledLink";
import { routes } from "@/constants/routes";

import { RegisterForm } from "./RegisterForm";
import { AuthWrapper } from "../components/AuthWrapper";

export const RegisterContent = () => {
  return (
    <AuthWrapper>
      <RegisterForm />
      <div className="mt-2">
        Already have an account?{" "}
        <StyledLink href={routes.login()}>Log In</StyledLink>
      </div>
    </AuthWrapper>
  );
};
