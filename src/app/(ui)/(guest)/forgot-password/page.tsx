import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { AuthFlow } from "@/modules/auth/AuthFlow";
import { AUTH_FLOW_ROUTES } from "@/modules/auth/AuthFlow/types";

const ForgotPasswordPage = () => {
  return (
    <PageWrapper paddingSize="none">
      <AuthFlow defaultFlowRoute={AUTH_FLOW_ROUTES.FORGOT_PASSWORD} />
    </PageWrapper>
  );
};

export default ForgotPasswordPage;
