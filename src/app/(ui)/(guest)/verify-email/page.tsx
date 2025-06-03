import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { VerifyEmailContent } from "@/modules/verifyEmail/components/VerifyEmailContent";

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
