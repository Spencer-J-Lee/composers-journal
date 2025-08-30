import { InformativeDivider } from "@/components/dividers/InformativeDivider";
import { routes } from "@/constants/routes";

import { RegisterForm } from "./RegisterForm";
import { AuthFormWrapper } from "../components/AuthFormWrapper";
import { GSIButton } from "../login/google/GSIButton";

export const RegisterContent = () => {
  return (
    <AuthFormWrapper>
      <RegisterForm />

      <InformativeDivider className="my-5">or</InformativeDivider>

      {/* TODO: Fix UI jitter caused by button re-rendering */}
      <GSIButton redirectTo={routes.notebooks()} />
    </AuthFormWrapper>
  );
};
