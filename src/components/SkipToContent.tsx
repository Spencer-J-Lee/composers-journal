import { ELEMENT_IDS } from "@/constants/elementIds";

import { LinkButton } from "./buttons/LinkButton";

export const SkipToContent = () => {
  return (
    <LinkButton
      href={`#${ELEMENT_IDS.MAIN_CONTENT}`}
      className="z-skip-to-content left-1/2 top-0 min-w-max -translate-x-1/2 -translate-y-full rounded-t-none opacity-0 transition-all focus-visible:translate-y-0 focus-visible:opacity-100"
      style={{ position: "absolute" }}
    >
      Skip to Content
    </LinkButton>
  );
};
