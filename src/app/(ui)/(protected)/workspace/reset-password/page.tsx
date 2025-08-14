import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { ResetPasswordContent } from "@/modules/resetPassword/components/ResetPasswordContent";

/**
 * TODO: turn auth-related pages into a single page experience
 * TODO: use CAPTCHA-based auth verification over dated email verification
 */
const ResetPasswordPage = () => {
  return (
    <PageWrapper maxWidth="md">
      <ResetPasswordContent />;
    </PageWrapper>
  );
};

export default ResetPasswordPage;
