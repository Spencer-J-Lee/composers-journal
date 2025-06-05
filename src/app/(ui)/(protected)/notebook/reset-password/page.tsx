import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { ResetPasswordContent } from "@/modules/resetPassword/components/ResetPasswordContent";

/**
 * TODO: turn auth-related pages into a single page experience
 */
const ResetPasswordPage = () => {
  return (
    <PageWrapper maxWidth="md">
      <ResetPasswordContent />;
    </PageWrapper>
  );
};

export default ResetPasswordPage;
