import { EmptyStateProps } from "@/components/emptyStates/EmptyState";
import { ASSET_PATHS } from "@/constants/assetPaths";

export const emptyStateData: EmptyStateProps = {
  imageData: {
    src: ASSET_PATHS.EMPTY_STATE_UNDER_CONSTRUCTION,
    alt: "Cartoon character shouting into a megaphone.",
    widthPx: 200,
    heightPx: 192,
  },
  title: "Under Construction",
  description: "Explore around and check back later!",
};
