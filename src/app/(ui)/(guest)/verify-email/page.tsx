import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { VerifyEmailContent } from "@/modules/auth/verifyEmail/VerifyEmailContent";

/**
 * TODO: turn auth-related pages into a single page experience
 */
const VerifyEmailPage = () => {
  return (
    <PageWrapper maxWidth="md">
      <VerifyEmailContent />;
    </PageWrapper>
  );
};

export default VerifyEmailPage;
