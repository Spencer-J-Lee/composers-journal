import clsx from "clsx";

export const Filters = () => {
  return (
    <aside
      className={clsx(
        "sticky top-[var(--navbar-height)] h-[calc(100vh_-_var(--navbar-height))] max-w-56 flex-1 overflow-y-auto overflow-x-hidden",
      )}
    >
      <div className="h-[900px] bg-red-500" />
      <div className="h-20 bg-green-700" />
    </aside>
  );
};
