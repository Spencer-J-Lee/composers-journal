import { FakeLinkButton } from "@/components/buttons/FakeLinkButton";

import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { AUTH_FLOW_ROUTES, AuthFlowRoute } from "../AuthFlow/types";
import { FormFooter } from "../components/FormFooter";

type ForgotPasswordContentProps = {
  onFlowChange: (newRoute: AuthFlowRoute) => void;
};

export const ForgotPasswordContent = ({
  onFlowChange,
}: ForgotPasswordContentProps) => {
  return (
    <>
      <ForgotPasswordForm />

      <FormFooter>
        Remembered your password?{" "}
        <FakeLinkButton onClick={() => onFlowChange(AUTH_FLOW_ROUTES.LOGIN)}>
          Log In
        </FakeLinkButton>
      </FormFooter>
    </>
  );
};
