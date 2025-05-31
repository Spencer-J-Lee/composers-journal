import clsx from "clsx";

type DividerProps = {
  orientation: "vertical" | "horizontal";
  className?: string;
};

export const Divider = ({ className, orientation }: DividerProps) => {
  if (orientation === "vertical") {
    return <div className={clsx("border-border h-full border-l", className)} />;
  }

  if (orientation === "horizontal") {
    return <div className={clsx("border-border w-full border-b", className)} />;
  }
};
