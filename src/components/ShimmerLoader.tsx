import clsx from "clsx";

import { Typography } from "./Typography";
import { TypographyVariant } from "./Typography/types";

type ShimmerLoaderProps = {
  className?: string;
  typographyVariant?: TypographyVariant;
  fullWidth?: boolean;
  insertText?: boolean;
};

export const ShimmerLoader = ({
  className,
  typographyVariant,
  fullWidth,
  insertText,
}: ShimmerLoaderProps) => {
  return (
    <div
      className={clsx(
        "bg-skeleton-background relative overflow-hidden rounded-md",
        { "w-full": fullWidth },
        className,
      )}
    >
      {insertText && <>&nbsp;</>}

      {typographyVariant && (
        <Typography
          variant={typographyVariant}
          htmlTag="div"
          className="text-transparent"
        >
          &nbsp;
        </Typography>
      )}

      <div className="animate-shimmer-l-to-r absolute left-0 top-0 h-full w-full">
        <div className="via-shimmer-background h-full w-full bg-gradient-to-r from-transparent from-10% via-50% to-transparent to-80%" />
      </div>
    </div>
  );
};
