import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { ForgotPasswordContent } from "@/modules/auth/forgotPassword/ForgotPasswordContent";

/**
 * TODO: turn auth-related pages into a single page experience
 */
const ForgotPasswordPage = () => {
  return (
    <PageWrapper paddingSize="none">
      <ForgotPasswordContent />
    </PageWrapper>
  );
};

export default ForgotPasswordPage;
