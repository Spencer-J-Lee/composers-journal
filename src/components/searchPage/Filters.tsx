import clsx from "clsx";

export const Filters = () => {
  return (
    <aside
      className={clsx(
        "bg-background sticky top-[var(--navbar-height)] h-[calc(100vh_-_var(--navbar-height))] w-72 min-w-72 overflow-y-auto overflow-x-hidden px-5 py-5 shadow-sm",
      )}
    >
      {/* <div className="h-[1200px]" /> */}
    </aside>
  );
};
