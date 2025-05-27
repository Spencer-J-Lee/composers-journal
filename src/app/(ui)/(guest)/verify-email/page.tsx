import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { VerifyEmailContent } from "@/modules/verifyEmail/components/VerifyEmailContent";

const VerifyEmailPage = () => {
  return (
    <PageWrapper maxWidth="md">
      <VerifyEmailContent />;
    </PageWrapper>
  );
};

export default VerifyEmailPage;
