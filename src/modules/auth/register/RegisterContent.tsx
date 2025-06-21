import { StyledLink } from "@/components/StyledLink";
import { routes } from "@/constants/routes";

import { RegisterForm } from "./RegisterForm";

export const RegisterContent = () => {
  return (
    <>
      <RegisterForm />
      <div>
        Already have an account?{" "}
        <StyledLink href={routes.login()}>Log In</StyledLink>
      </div>
    </>
  );
};
