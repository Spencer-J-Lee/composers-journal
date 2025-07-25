import clsx from "clsx";

type TreeBranchProps = {
  variant: "middle" | "bottom";
  className?: string;
  flexChild?: boolean;
};

export const TreeBranch = ({
  variant,
  className,
  flexChild,
}: TreeBranchProps) => {
  switch (variant) {
    case "middle":
      return (
        <div
          className={clsx(
            "flex items-center",
            flexChild ? "self-stretch" : "h-full",
            className,
          )}
        >
          <div className="bg-text-muted w-0.5 self-stretch" />
          <div className="bg-text-muted h-0.5 w-4" />
        </div>
      );
    case "bottom":
      return (
        <div
          className={clsx(
            "flex flex-col",
            flexChild ? "self-stretch" : "h-full",
            className,
          )}
        >
          <div className="bg-text-muted w-0.5 flex-1" />
          <div className="w-4.5 relative h-0.5 overflow-hidden">
            <div className="bg-text-muted absolute top-0 h-1 w-full -translate-y-1/2 rounded-bl-full" />
          </div>
          <div className="flex-1" />
        </div>
      );
  }
};
