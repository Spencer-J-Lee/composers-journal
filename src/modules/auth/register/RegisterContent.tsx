import { InformativeDivider } from "@/components/dividers/InformativeDivider";
import { StyledLink } from "@/components/StyledLink";
import { routes } from "@/constants/routes";

import { RegisterForm } from "./RegisterForm";
import { AuthWrapper } from "../components/AuthWrapper";
import { FormFooter } from "../components/FormFooter";
import { GSIButton } from "../login/google/GSIButton";

export const RegisterContent = () => {
  return (
    <AuthWrapper>
      <RegisterForm />

      <FormFooter>
        Already have an account?{" "}
        <StyledLink href={routes.login()}>Log In</StyledLink>
      </FormFooter>

      <InformativeDivider className="my-5">or</InformativeDivider>

      <GSIButton redirectTo={routes.notebooks()} />
    </AuthWrapper>
  );
};
