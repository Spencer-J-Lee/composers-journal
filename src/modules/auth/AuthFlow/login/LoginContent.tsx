import { InformativeDivider } from "@/components/dividers/InformativeDivider";
import { routes } from "@/constants/routes";

import { GSIButton } from "./google/GSIButton";
import { LoginForm } from "./LoginForm";

export const LoginContent = () => {
  return (
    <>
      <LoginForm />

      <InformativeDivider className="my-5">or</InformativeDivider>

      {/* TODO: Fix UI jitter caused by button re-rendering */}
      <GSIButton redirectTo={routes.workspace()} />
    </>
  );
};
