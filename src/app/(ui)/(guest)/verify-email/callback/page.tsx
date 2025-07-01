import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { VerifyEmailCallbackContent } from "@/modules/auth/verifyEmail/VerifyEmailCallbackContent";

/**
 * This page acts as an intermediary to verify authentication before
 * redirecting the user based on a variable in the URL query parameters.
 * The user should only be linked to this page via emails for the purpose
 * of email verification and magic links.
 */
const VerifyEmailCallbackPage = () => {
  return (
    <PageWrapper maxWidth="md">
      <VerifyEmailCallbackContent />;
    </PageWrapper>
  );
};

export default VerifyEmailCallbackPage;
