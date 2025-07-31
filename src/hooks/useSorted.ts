import { useMemo, useState } from "react";

import { SortBy } from "@/components/SimpleFilters/types";

export const useSorted = <T>(objs: T[], defaultSortBy: SortBy<T>) => {
  const [sortBy, setSortBy] = useState(defaultSortBy);

  const sorted = useMemo(() => {
    const { key, direction, type } = sortBy;

    if (!objs) return [];

    return objs.toSorted((a, b) => {
      let aVal = a[key];
      let bVal = b[key];
      if (direction === "asc") {
        [aVal, bVal] = [bVal, aVal];
      }

      switch (type) {
        case "dateString":
          if (typeof aVal !== "string" || typeof bVal !== "string") {
            throw new Error("Invalid data type");
          }

          return new Date(bVal).getTime() - new Date(aVal).getTime();
        case "string":
        default:
          if (typeof aVal !== "string" || typeof bVal !== "string") {
            throw new Error("Invalid data type");
          }

          return aVal.localeCompare(bVal);
      }
    });
  }, [objs, sortBy]);

  return {
    sortBy,
    setSortBy,
    sorted,
  };
};
