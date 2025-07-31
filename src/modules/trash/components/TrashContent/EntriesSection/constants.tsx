import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SortByOption } from "@/components/SimpleFilters/types";
import { Entry } from "@/models/Entry";

export const TRASHED_ENTRIES_SORT_OPTIONS: SortByOption<Entry>[] = [
  { label: "Latest", key: "updatedAt", direction: "desc", type: "dateString" },
  { label: "Oldest", key: "updatedAt", direction: "asc", type: "dateString" },
  {
    label: (
      <>
        Title <FontAwesomeIcon icon={faArrowDown} />
      </>
    ),
    key: "title",
    direction: "desc",
    type: "string",
  },
  {
    label: (
      <>
        Title <FontAwesomeIcon icon={faArrowUp} />
      </>
    ),
    key: "title",
    direction: "asc",
    type: "string",
  },
] as const;
