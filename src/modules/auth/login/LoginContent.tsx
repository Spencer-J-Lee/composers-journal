import { FakeLinkButton } from "@/components/buttons/FakeLinkButton";
import { InformativeDivider } from "@/components/dividers/InformativeDivider";
import { routes } from "@/constants/routes";

import { GSIButton } from "./google/GSIButton";
import { LoginForm } from "./LoginForm";
import { AUTH_FLOW_ROUTES, AuthFlowRoute } from "../AuthFlow/types";
import { FormFooter } from "../components/FormFooter";

type LoginContentProps = {
  onFlowChange: (newRoute: AuthFlowRoute) => void;
};

export const LoginContent = ({ onFlowChange }: LoginContentProps) => {
  return (
    <>
      <LoginForm onFlowChange={onFlowChange} />

      <FormFooter>
        Need an account?{" "}
        <FakeLinkButton onClick={() => onFlowChange(AUTH_FLOW_ROUTES.REGISTER)}>
          Register
        </FakeLinkButton>
      </FormFooter>

      <InformativeDivider className="my-5">or</InformativeDivider>

      {/* TODO: Fix UI jitter caused by button re-rendering */}
      <GSIButton redirectTo={routes.workspace()} />
    </>
  );
};
