import { PageWrapper } from "@/components/pageWrappers/PageWrapper";

import { VerifyEmailForm } from "./VerifyEmailForm";

export const VerifyEmailContent = () => {
  return (
    <PageWrapper maxWidth="md">
      <p>{"Didn't"} receive an email?</p>
      <VerifyEmailForm />
    </PageWrapper>
  );
};
