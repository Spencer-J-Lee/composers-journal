import { useRouter } from "next/navigation";

import { Button } from "@/components/buttons/Button";
import { WorkspaceEmptyState } from "@/components/emptyStates/WorkspaceEmptyState";
import { ASSET_PATHS } from "@/constants/assetPaths";

export const TrashEmptyState = () => {
  const router = useRouter();

  return (
    <WorkspaceEmptyState
      imageData={{
        src: ASSET_PATHS.EMPTY_STATE_TRASH,
        alt: "Cartoon character checking empty mailbox.",
        widthPx: 200,
        heightPx: 246,
      }}
      title="Trash is empty"
      description="Nothing to see here"
    >
      <Button onClick={() => router.back()}>Go back</Button>
    </WorkspaceEmptyState>
  );
};
