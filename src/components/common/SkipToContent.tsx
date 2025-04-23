import { SECTION_IDS } from "./constants/sectionIds";
import { AnchorButton } from "./buttons/AnchorButton";

export const SkipToContent = () => {
  return (
    <AnchorButton
      href={`#${SECTION_IDS.MAIN_CONTENT}`}
      className="absolute left-1/2 top-0 z-50 min-w-max -translate-x-1/2 -translate-y-full rounded-t-none opacity-0 transition-all focus-visible:translate-y-0 focus-visible:opacity-100"
    >
      Skip to Content
    </AnchorButton>
  );
};
