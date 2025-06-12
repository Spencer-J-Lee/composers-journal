import clsx from "clsx";

type DividerProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
  flexChild?: boolean;
};

export const Divider = ({
  className,
  orientation = "horizontal",
  flexChild,
}: DividerProps) => {
  if (orientation === "horizontal") {
    return <hr className={clsx("border-border w-full border-b", className)} />;
  }

  if (orientation === "vertical") {
    return (
      <div
        className={clsx(
          "border-border border-l",
          flexChild ? "self-stretch" : "h-full",
          className,
        )}
      />
    );
  }
};
