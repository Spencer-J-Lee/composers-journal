import { widthHeightClassName } from "../iconButtons/hooks/useIconButtonStyles/styles";
import { ShimmerLoader } from "../ShimmerLoader";

export const ShimmerIconButton = () => {
  return <ShimmerLoader className={widthHeightClassName} />;
};
