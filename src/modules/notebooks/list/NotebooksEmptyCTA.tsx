import Image from "next/image";

import { LinkButton } from "@/components/buttons/LinkButton";
import { Typography } from "@/components/Typography";
import { ASSET_PATHS } from "@/constants/assetPaths";
import { routes } from "@/constants/routes";

export const NotebooksEmptyCTA = () => {
  return (
    <div className="flex min-h-full w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <Image
          src={ASSET_PATHS.EMPTY_STATE_WRITING} // TODO: replace with
          alt=""
          width={200}
          height={200}
          style={{ objectFit: "cover" }}
          className="mb-3"
        />
        <Typography variant="h2" className="mb-2">
          No notebooks yet
        </Typography>
        <Typography variant="body" className="mb-6">
          Let's start by creating a new one
        </Typography>
        <LinkButton href={routes.notebookCreate()}>Get Started</LinkButton>
      </div>
    </div>
  );
};
