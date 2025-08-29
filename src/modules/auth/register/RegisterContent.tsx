import { InformativeDivider } from "@/components/dividers/InformativeDivider";
import { StyledLink } from "@/components/StyledLink";
import { routes } from "@/constants/routes";

import { RegisterForm } from "./RegisterForm";
import { AuthFormWrapper } from "../components/AuthFormWrapper";
import { FormFooter } from "../components/FormFooter";
import { GSIButton } from "../login/google/GSIButton";

export const RegisterContent = () => {
  return (
    <AuthFormWrapper>
      <RegisterForm />

      <FormFooter>
        Already have an account?{" "}
        <StyledLink href={routes.login()}>Log In</StyledLink>
      </FormFooter>

      <InformativeDivider className="my-5">or</InformativeDivider>

      <GSIButton redirectTo={routes.notebooks()} />
    </AuthFormWrapper>
  );
};
