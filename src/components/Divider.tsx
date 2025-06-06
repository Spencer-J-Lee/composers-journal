import clsx from "clsx";

type DividerProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

export const Divider = ({
  className,
  orientation = "horizontal",
}: DividerProps) => {
  if (orientation === "horizontal") {
    return <hr className={clsx("border-border w-full border-b", className)} />;
  }

  if (orientation === "vertical") {
    return <div className={clsx("border-border h-full border-l", className)} />;
  }
};
