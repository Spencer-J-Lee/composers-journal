import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { ForgotPasswordContent } from "@/modules/forgotPassword/components/ForgotPasswordContent";

/**
 * TODO: turn auth-related pages into a single page experience
 */
const ForgotPasswordPage = () => {
  return (
    <PageWrapper maxWidth="md">
      <ForgotPasswordContent />;
    </PageWrapper>
  );
};

export default ForgotPasswordPage;
