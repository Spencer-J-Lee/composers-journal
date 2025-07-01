import { Dispatch, SetStateAction } from "react";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { Button } from "@/components/buttons/Button";

import { SortBy } from "./types";

type SimpleFiltersProps = {
  sortBy: SortBy;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
  className?: string;
};

const SORT_OPTIONS: {
  label: string;
  value: SortBy;
}[] = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
];

export const SimpleFilters = ({
  sortBy,
  setSortBy,
  className,
}: SimpleFiltersProps) => {
  const isNameSort = sortBy === "name asc" || sortBy === "name desc";
  const handleNameSort = () => {
    setSortBy(sortBy === "name desc" ? "name asc" : "name desc");
  };

  return (
    <div className={clsx("flex gap-2", className)}>
      {SORT_OPTIONS.map(({ label, value }) => (
        <Button
          key={value}
          size="sm"
          onClick={() => setSortBy(value)}
          variant={sortBy === value ? "positive" : "ghost"}
        >
          {label}
        </Button>
      ))}

      <Button
        size="sm"
        onClick={handleNameSort}
        variant={isNameSort ? "positive" : "ghost"}
      >
        Name {sortBy === "name desc" && <FontAwesomeIcon icon={faArrowDown} />}
        {sortBy === "name asc" && <FontAwesomeIcon icon={faArrowUp} />}
      </Button>
    </div>
  );
};
