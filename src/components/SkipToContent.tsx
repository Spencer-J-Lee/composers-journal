import { AnchorButton } from "./buttons/AnchorButton";
import { ELEMENT_IDS } from "../constants/elementIds";

export const SkipToContent = () => {
  return (
    <AnchorButton
      href={`#${ELEMENT_IDS.MAIN_CONTENT}`}
      className="z-skip-to-content absolute left-1/2 top-0 min-w-max -translate-x-1/2 -translate-y-full rounded-t-none opacity-0 transition-all focus-visible:translate-y-0 focus-visible:opacity-100"
    >
      Skip to Content
    </AnchorButton>
  );
};
