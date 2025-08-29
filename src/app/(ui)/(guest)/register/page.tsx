import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { RegisterContent } from "@/modules/auth/register/RegisterContent";

/**
 * TODO: turn auth-related pages into a single page experience
 */
const RegisterPage = () => {
  return (
    <PageWrapper>
      <RegisterContent />
    </PageWrapper>
  );
};

export default RegisterPage;
