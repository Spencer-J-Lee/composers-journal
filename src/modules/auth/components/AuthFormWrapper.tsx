import { ReactNode } from "react";

import { Typography } from "@/components/Typography";

type AuthFormWrapperProps = {
  children: ReactNode;
};

export const AuthFormWrapper = ({ children }: AuthFormWrapperProps) => {
  return (
    <div className="flex flex-1">
      <div className="bg-accent flex flex-1 items-center justify-center">
        {/* TODO: [med] add actual copy and change bg */}
        <div className="flex flex-col">
          <Typography variant="h1">Hi there</Typography>
          <Typography variant="subtitle">Time to do stuff</Typography>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-[25rem]">{children}</div>
      </div>
    </div>
  );
};
