import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { RegisterContent } from "@/modules/auth/register/RegisterContent";

/**
 * TODO: turn auth-related pages into a single page experience
 * TODO: use CAPTCHA-based auth verification over dated email verification
 */
const RegisterPage = () => {
  return (
    <PageWrapper maxWidth="md">
      <RegisterContent />;
    </PageWrapper>
  );
};

export default RegisterPage;
