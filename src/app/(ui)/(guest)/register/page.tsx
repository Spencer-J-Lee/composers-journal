import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { AuthFlow } from "@/modules/auth/AuthFlow";
import { AUTH_FLOW_ROUTES } from "@/modules/auth/AuthFlow/types";

const RegisterPage = () => {
  return (
    <PageWrapper paddingSize="none">
      <AuthFlow defaultFlowRoute={AUTH_FLOW_ROUTES.REGISTER} />
    </PageWrapper>
  );
};

export default RegisterPage;
