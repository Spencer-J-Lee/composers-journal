import { EmptyState } from "@/components/EmptyState";
import { ASSET_PATHS } from "@/constants/assetPaths";

export const TrashEmptyState = () => {
  return (
    <div className="flex min-h-full w-full items-center justify-center">
      <EmptyState
        imageData={{
          src: ASSET_PATHS.EMPTY_STATE_TRASH,
          alt: "Cartoon character checking empty mailbox.",
        }}
        title="Trash is empty"
        description="Nothing to see here"
      />
    </div>
  );
};
