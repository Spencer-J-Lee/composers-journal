import { useRouter } from "next/navigation";

import { Button } from "@/components/buttons/Button";
import { WorkspaceEmptyStatePage } from "@/components/emptyStates/WorkspaceEmptyStatePage";
import { ASSET_PATHS } from "@/constants/assetPaths";

export const TrashEmptyState = () => {
  const router = useRouter();

  return (
    <WorkspaceEmptyStatePage
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
    </WorkspaceEmptyStatePage>
  );
};
