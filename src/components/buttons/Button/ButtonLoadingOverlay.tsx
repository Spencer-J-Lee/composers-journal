import clsx from "clsx";

import { PulsingEllipsis } from "@/components/loaders/PulsingEllipsis";

import { calcVariantClassName } from "../hooks/useButtonStyles/helpers";

import { ButtonProps } from ".";

export const ButtonLoadingOverlay = ({
  variant = "default",
  loading,
}: Pick<ButtonProps, "variant" | "loading">) => {
  return (
    <div
      className={clsx(
        "absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-inherit",
        calcVariantClassName({
          variant,
          loading,
          isActive: false,
        }),
      )}
    >
      <PulsingEllipsis />
    </div>
  );
};
