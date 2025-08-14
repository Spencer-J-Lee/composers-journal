import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { ForgotPasswordContent } from "@/modules/auth/forgotPassword/ForgotPasswordContent";

/**
 * TODO: turn auth-related pages into a single page experience
 * TODO: use CAPTCHA-based auth verification over dated email verification
 */
const ForgotPasswordPage = () => {
  return (
    <PageWrapper maxWidth="md">
      <ForgotPasswordContent />;
    </PageWrapper>
  );
};

export default ForgotPasswordPage;
