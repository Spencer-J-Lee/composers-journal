import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { ResetPasswordContent } from "@/modules/resetPassword/components/ResetPasswordContent";

/**
 * TODO: turn auth-related pages into a single page experience
 *
 * This must remain a guest route because Supabase OTP auth finalizes on the
 * client. Marking it as protected would trigger unwanted redirects before
 * auth completes.
 */
const ResetPasswordPage = () => {
  return (
    <PageWrapper paddingSize="none">
      <ResetPasswordContent />
    </PageWrapper>
  );
};

export default ResetPasswordPage;
