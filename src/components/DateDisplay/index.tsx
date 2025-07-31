import { useMemo } from "react";

import { Status, STATUSES } from "@/models/types/status";
import { formatDateString } from "@/utils/client/formatDate";

import { DatesToDisplay } from "./types";

type DateDisplayProps = {
  createdAt: string;
  updatedAt: string;
  status: Status;
  datesToDisplay?: DatesToDisplay;
};

export const DateDisplay = ({
  datesToDisplay,
  createdAt,
  updatedAt,
  status,
}: DateDisplayProps) => {
  const dateDisplayEls = useMemo(() => {
    if (!datesToDisplay) return [];

    const els = [];

    if (datesToDisplay.createdAt) {
      els.push(<span>Created: {formatDateString(createdAt)}</span>);
    }

    if (datesToDisplay.updatedAt) {
      els.push(
        <span>
          {status === STATUSES.TRASHED ? "Trashed: " : "Updated: "}
          {formatDateString(updatedAt)}
        </span>,
      );
    }

    return els;
  }, [datesToDisplay, createdAt, updatedAt, status]);

  return (
    <>
      {dateDisplayEls.map((el, i) => (
        <>
          {i > 0 && <span>•</span>}
          {el}
        </>
      ))}
    </>
  );
};
