import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { LoginContent } from "@/modules/auth/login/LoginContent";

/**
 * TODO: turn auth-related pages into a single page experience
 * TODO: use CAPTCHA-based auth verification over dated email verification
 */
const LoginPage = () => {
  return (
    <PageWrapper maxWidth="md">
      <LoginContent />
    </PageWrapper>
  );
};

export default LoginPage;
