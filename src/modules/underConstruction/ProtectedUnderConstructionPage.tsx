import { WorkspaceEmptyStatePage } from "@/components/emptyStates/WorkspaceEmptyStatePage";

import { emptyStateData } from "./constants";

export const ProtectedUnderConstructionPage = () => {
  return <WorkspaceEmptyStatePage {...emptyStateData} />;
};
