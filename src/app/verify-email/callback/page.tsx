import { VerifyEmailCallbackContent } from "@/components/verifyEmailCallback/VerifyEmailCallbackContent";

/**
 * This page acts as an intermediary to verify authentication before redirecting the user
 * based on a redirect in the URL query parameters. The user should only be linked to this
 * page via emails for the purpose of email verification and magic links.
 */
const VerifyEmailCallbackPage = () => {
  return <VerifyEmailCallbackContent />;
};

export default VerifyEmailCallbackPage;
