import ProtectedLayout from "@/app/(ui)/(protected)/layout";
import { LinkButton } from "@/components/buttons/LinkButton";
import { WorkspaceEmptyStatePage } from "@/components/emptyStates/WorkspaceEmptyStatePage";
import { routes } from "@/constants/routes";

import { emptyStateData } from "./constants";

export const ProtectedNotFoundContent = () => {
  return (
    <ProtectedLayout>
      <WorkspaceEmptyStatePage {...emptyStateData}>
        <LinkButton href={routes.workspace()}>Go Home</LinkButton>
      </WorkspaceEmptyStatePage>
    </ProtectedLayout>
  );
};
