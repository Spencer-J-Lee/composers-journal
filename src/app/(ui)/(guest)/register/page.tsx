import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { RegisterContent } from "@/modules/register/components/RegisterContent";

/**
 * TODO: turn auth-related pages into a single page experience
 */
const RegisterPage = () => {
  return (
    <PageWrapper maxWidth="md">
      <RegisterContent />;
    </PageWrapper>
  );
};

export default RegisterPage;
