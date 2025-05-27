import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { RegisterContent } from "@/modules/register/components/RegisterContent";

const RegisterPage = () => {
  return (
    <PageWrapper maxWidth="md">
      <RegisterContent />;
    </PageWrapper>
  );
};

export default RegisterPage;
