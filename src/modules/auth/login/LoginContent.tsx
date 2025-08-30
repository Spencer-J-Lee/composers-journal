import { InformativeDivider } from "@/components/dividers/InformativeDivider";
import { routes } from "@/constants/routes";

import { GSIButton } from "./google/GSIButton";
import { LoginForm } from "./LoginForm";
import { AuthFormWrapper } from "../components/AuthFormWrapper";

export const LoginContent = () => {
  return (
    <AuthFormWrapper>
      <LoginForm />

      <InformativeDivider className="my-5">or</InformativeDivider>

      {/* TODO: Fix UI jitter caused by button re-rendering */}
      <GSIButton redirectTo={routes.workspace()} />
    </AuthFormWrapper>
  );
};
