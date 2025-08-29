import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { LoginContent } from "@/modules/auth/login/LoginContent";

/**
 * TODO: turn auth-related pages into a single page experience
 */
const LoginPage = () => {
  return (
    <PageWrapper>
      <LoginContent />
    </PageWrapper>
  );
};

export default LoginPage;
