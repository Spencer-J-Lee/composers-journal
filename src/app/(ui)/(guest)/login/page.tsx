import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { LoginContent } from "@/modules/login/components/LoginContent";

/**
 * TODO: turn auth-related pages into a single page experience
 */
const LoginPage = () => {
  return (
    <PageWrapper maxWidth="md">
      <LoginContent />;
    </PageWrapper>
  );
};

export default LoginPage;
