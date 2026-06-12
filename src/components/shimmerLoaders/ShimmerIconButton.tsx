import { widthHeightClassName } from "../iconButtons/hooks/useIconButtonStyles/styles";
import { IconButtonSize } from "../iconButtons/types";
import { ShimmerLoader } from "../ShimmerLoader";

type ShimmerIconButtonProps = {
  size?: IconButtonSize;
};

export const ShimmerIconButton = ({ size = "md" }: ShimmerIconButtonProps) => {
  return <ShimmerLoader className={widthHeightClassName[size]} />;
};
