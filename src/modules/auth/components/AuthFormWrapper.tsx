import { ReactNode } from "react";
import Image from "next/image";

import { SplitSpans } from "@/components/SplitSpans";
import { Typography } from "@/components/Typography";
import { ASSET_PATHS } from "@/constants/assetPaths";

type AuthFormWrapperProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
};

export const AuthFormWrapper = ({
  children,
  title,
  subtitle,
}: AuthFormWrapperProps) => {
  return (
    <div className="flex flex-1">
      <div className="bg-accent flex flex-1 flex-col items-center justify-center p-10">
        <div className="mb-8 text-center">
          <Typography variant="marketingH1" className="mb-2">
            {title}
          </Typography>
          <Typography variant="marketingSubtitle">
            <SplitSpans text={subtitle} splitOnLastNthWord={2} />
          </Typography>
        </div>
        <Image
          src={ASSET_PATHS.HELLO}
          alt="Cartoon character waving hello."
          width={300}
          height={334}
          style={{ objectFit: "cover" }}
          className="ml-8"
        />
      </div>

      <div className="flex flex-1 items-center justify-center p-10">
        <div className="w-full max-w-[25rem]">{children}</div>
      </div>
    </div>
  );
};
