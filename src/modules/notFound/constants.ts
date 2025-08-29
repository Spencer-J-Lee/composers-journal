import { EmptyStateProps } from "@/components/emptyStates/EmptyState";
import { ASSET_PATHS } from "@/constants/assetPaths";

export const emptyStateData: EmptyStateProps = {
  imageData: {
    src: ASSET_PATHS.EMPTY_STATE_NOT_FOUND,
    alt: "Cartoon character inquisitively looking through documents.",
    widthPx: 200,
    heightPx: 301,
  },
  title: "404 - Page Not Found",
  description: "Uh-oh! You've stumbled into the unknown.",
};
