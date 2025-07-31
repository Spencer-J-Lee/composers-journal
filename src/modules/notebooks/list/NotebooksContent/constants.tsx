import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SortByOption } from "@/components/SimpleFilters/types";
import { Notebook } from "@/models/Notebook";

export const NOTEBOOKS_SORT_OPTIONS: SortByOption<Notebook>[] = [
  { label: "Latest", key: "createdAt", direction: "desc", type: "dateString" },
  { label: "Oldest", key: "createdAt", direction: "asc", type: "dateString" },
  {
    label: (
      <>
        Name <FontAwesomeIcon icon={faArrowDown} />
      </>
    ),
    key: "name",
    direction: "desc",
    type: "string",
  },
  {
    label: (
      <>
        Name <FontAwesomeIcon icon={faArrowUp} />
      </>
    ),
    key: "name",
    direction: "asc",
    type: "string",
  },
] as const;
