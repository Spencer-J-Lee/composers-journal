import { ContentWrapper } from "@/components/contentWrappers/ContentWrapper";
import { EmptyState } from "@/components/emptyStates/EmptyState";
import { PageWrapper } from "@/components/pageWrappers/PageWrapper";

import { emptyStateData } from "./constants";

export const GuestUnderConstructionPage = () => {
  return (
    <PageWrapper>
      <ContentWrapper className="flex flex-1 items-center justify-center">
        <EmptyState {...emptyStateData} />
      </ContentWrapper>
    </PageWrapper>
  );
};
