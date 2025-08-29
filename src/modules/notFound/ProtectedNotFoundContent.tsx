import ProtectedLayout from "@/app/(ui)/(protected)/layout";
import { LinkButton } from "@/components/buttons/LinkButton";
import { WorkspaceEmptyState } from "@/components/emptyStates/WorkspaceEmptyState";
import { routes } from "@/constants/routes";

import { emptyStateData } from "./constants";

export const ProtectedNotFoundContent = () => {
  return (
    <ProtectedLayout>
      <WorkspaceEmptyState {...emptyStateData}>
        <LinkButton href={routes.workspace()}>Go Home</LinkButton>
      </WorkspaceEmptyState>
    </ProtectedLayout>
  );
};
