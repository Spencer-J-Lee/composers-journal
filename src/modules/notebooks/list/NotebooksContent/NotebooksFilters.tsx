import { Dispatch, SetStateAction } from "react";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "@/components/buttons/Button";

import { SortBy } from "./types";

type NotebooksFiltersProps = {
  sortBy: SortBy;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
};

/**
 * TODO: UI
 */
export const NotebooksFilters = ({
  sortBy,
  setSortBy,
}: NotebooksFiltersProps) => {
  return (
    <div className="bg-background-light sticky top-0 flex gap-2 p-4">
      <Button
        size="sm"
        onClick={() => setSortBy("latest")}
        variant={sortBy === "latest" ? "positive" : "ghost"}
      >
        Latest
      </Button>
      <Button
        size="sm"
        onClick={() => setSortBy("oldest")}
        variant={sortBy === "oldest" ? "positive" : "ghost"}
      >
        Oldest
      </Button>
      <Button
        size="sm"
        onClick={() =>
          setSortBy(sortBy === "name desc" ? "name asc" : "name desc")
        }
        variant={
          sortBy === "name desc" || sortBy === "name asc" ? "positive" : "ghost"
        }
      >
        Name {sortBy === "name desc" && <FontAwesomeIcon icon={faArrowDown} />}
        {sortBy === "name asc" && <FontAwesomeIcon icon={faArrowUp} />}
      </Button>
    </div>
  );
};
