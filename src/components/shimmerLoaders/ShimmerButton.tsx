import clsx from "clsx";

import { useButtonStyles } from "../buttons/hooks/useButtonStyles";
import { ButtonSize } from "../buttons/types";
import { ShimmerLoader } from "../ShimmerLoader";

type ShimmerButtonProps = {
  size: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

export const ShimmerButton = ({
  size = "md",
  fullWidth,
  className,
}: ShimmerButtonProps) => {
  const { buttonClassName } = useButtonStyles({
    size,
    fullWidth,
    variant: "default",
  });

  return (
    <ShimmerLoader className={clsx(buttonClassName, className)} insertText />
  );
};
