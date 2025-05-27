import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { ForgotPasswordContent } from "@/modules/forgotPassword/components/ForgotPasswordContent";

const ForgotPasswordPage = () => {
  return (
    <PageWrapper maxWidth="md">
      <ForgotPasswordContent />;
    </PageWrapper>
  );
};

export default ForgotPasswordPage;
