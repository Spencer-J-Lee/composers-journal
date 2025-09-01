import { FakeLinkButton } from "@/components/buttons/FakeLinkButton";

import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { FormFooter } from "../../components/FormFooter";
import { AUTH_FLOW_ROUTES, AuthFlowRoute } from "../types";

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
