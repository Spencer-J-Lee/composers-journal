import GuestLayout from "@/app/(ui)/(guest)/layout";
import { LinkButton } from "@/components/buttons/LinkButton";
import { EmptyState } from "@/components/emptyStates/EmptyState";
import { PageWrapper } from "@/components/pageWrappers/PageWrapper";
import { routes } from "@/constants/routes";

import { emptyStateData } from "./constants";

export const GuestNotFoundContent = () => {
  return (
    <GuestLayout>
      <PageWrapper maxWidth="md">
        <EmptyState {...emptyStateData}>
          <LinkButton href={routes.home()}>Go Home</LinkButton>
        </EmptyState>
      </PageWrapper>
    </GuestLayout>
  );
};
