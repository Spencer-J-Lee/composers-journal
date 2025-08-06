import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";

import { Button } from "@/components/buttons/Button";

import { SortBy, SortByOption } from "./types";

type SimpleFiltersProps<T> = {
  sortBy: SortBy<T>;
  setSortBy: Dispatch<SetStateAction<SortBy<T>>>;
  options: SortByOption<T>[];
  className?: string;
};

export const SimpleFilters = <T,>({
  sortBy,
  setSortBy,
  options,
  className,
}: SimpleFiltersProps<T>) => {
  return (
    <div className={clsx("flex gap-2", className)}>
      {options.map(({ label, key, direction, type }) => {
        const active = sortBy.key === key && sortBy.direction === direction;

        return (
          <Button
            key={`${String(key)}-${direction}`}
            size="sm"
            onClick={() => setSortBy({ key, direction, type })}
            variant={active ? "positive" : "ghost"}
            className={clsx({ "pointer-events-none": active })}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};
