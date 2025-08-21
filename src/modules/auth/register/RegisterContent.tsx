import { StyledLink } from "@/components/StyledLink";
import { routes } from "@/constants/routes";

import { RegisterForm } from "./RegisterForm";
import { AuthWrapper } from "../components/AuthWrapper";
import { FormFooter } from "../components/FormFooter";

export const RegisterContent = () => {
  return (
    <AuthWrapper>
      <RegisterForm />

      <FormFooter>
        Already have an account?{" "}
        <StyledLink href={routes.login()}>Log In</StyledLink>
      </FormFooter>
    </AuthWrapper>
  );
};
