import { FakeLinkButton } from "@/components/buttons/FakeLinkButton";
import { InformativeDivider } from "@/components/dividers/InformativeDivider";
import { routes } from "@/constants/routes";

import { RegisterForm } from "./RegisterForm";
import { AUTH_FLOW_ROUTES, AuthFlowRoute } from "../AuthFlow/types";
import { FormFooter } from "../components/FormFooter";
import { GSIButton } from "../login/google/GSIButton";

type RegisterContentProps = {
  onFlowChange: (newRoute: AuthFlowRoute) => void;
};

export const RegisterContent = ({ onFlowChange }: RegisterContentProps) => {
  return (
    <>
      <RegisterForm />

      <FormFooter>
        Already have an account?{" "}
        <FakeLinkButton onClick={() => onFlowChange(AUTH_FLOW_ROUTES.LOGIN)}>
          Log In
        </FakeLinkButton>
      </FormFooter>

      <InformativeDivider className="my-5">or</InformativeDivider>

      {/* TODO: Fix UI jitter caused by button re-rendering */}
      <GSIButton redirectTo={routes.notebooks()} />
    </>
  );
};
