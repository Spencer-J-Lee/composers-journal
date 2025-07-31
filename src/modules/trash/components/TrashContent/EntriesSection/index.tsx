import { Button } from "@/components/buttons/Button";
import { CardResultsWrapper } from "@/components/CardResultsWrapper";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { commonAlertActions } from "@/components/dialogs/AlertDialog/constants";
import { ShimmerEntryCard } from "@/components/shimmerLoaders/ShimmerEntryCard";
import { ShimmerSimpleFilters } from "@/components/shimmerLoaders/ShimmerSimpleFilters";
import { SimpleFilters } from "@/components/SimpleFilters";
import { Typography } from "@/components/Typography";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import { STATIC_TS_KEYS } from "@/constants/tanStackQueryKeys";
import { useSoftDeleteEntries, useTrashedEntries } from "@/hooks/cache/entries";
import { useAlert } from "@/hooks/useAlert";
import { useLogError } from "@/hooks/useLogError";
import { useSorted } from "@/hooks/useSorted";
import { Entry } from "@/models/Entry";
import { EntryCard } from "@/modules/entries/components/EntryCard";
import { EntryControl } from "@/modules/entries/components/EntryCard/EntryControls/types";
import { repeatRender } from "@/utils/client/repeatRender";

import { TRASHED_ENTRIES_SORT_OPTIONS } from "./constants";

export const EntriesSection = () => {
  const { openAlert } = useAlert();
  const {
    data: entries = [],
    error: entriesError,
    isPending,
    isError,
    isSuccess,
  } = useTrashedEntries();
  const { mutateAsync: softDeleteEntries, isPending: isSoftDeletePending } =
    useSoftDeleteEntries();
  const {
    sortBy,
    setSortBy,
    sorted: sortedEntries,
  } = useSorted<Entry>(entries, TRASHED_ENTRIES_SORT_OPTIONS[0]);
  const entryControls: EntryControl[] = ["restore", "delete"];

  useLogError(entriesError);

  const handleSoftDeleteEntries = async (entries: Entry[]) => {
    openAlert({
      title: "Are you sure?",
      description:
        "This will permanently delete all trashed entries and cannot be undone.",
      actions: [
        commonAlertActions.cancel,
        {
          type: "async",
          key: "confirm",
          text: "Confirm",
          variant: "negative",
          onConfirm: () => softDeleteEntries(entries.map((en) => en.id)),
          successMsg: SUCCESS_MESSAGES.USER.DELETE.ENTRIES,
          errMsg: ERROR_MESSAGES.USER.DELETE.ENTRIES,
        },
      ],
    });
  };

  return (
    <CollapsibleSection title="Entries">
      {isPending && (
        <>
          <ShimmerSimpleFilters className="mb-4" />
          <CardResultsWrapper>
            {repeatRender(3, (i) => (
              <li key={i}>
                <ShimmerEntryCard controlsCount={entryControls.length} />
              </li>
            ))}
          </CardResultsWrapper>
        </>
      )}

      {isError && (
        <Typography variant="fallback">
          Failed to load trashed entries
        </Typography>
      )}

      {isSuccess && entries.length === 0 && (
        <Typography variant="emptyState">No trashed entries</Typography>
      )}

      {isSuccess && entries.length > 0 && (
        <>
          <div className="mb-4 flex items-center justify-between gap-x-10">
            <SimpleFilters
              sortBy={sortBy}
              setSortBy={setSortBy}
              options={TRASHED_ENTRIES_SORT_OPTIONS}
            />
            <Button
              onClick={() => handleSoftDeleteEntries(entries)}
              loading={isSoftDeletePending}
              size="sm"
              variant="negative"
            >
              Delete all
            </Button>
          </div>
          <CardResultsWrapper>
            {sortedEntries.map((entry) => (
              <li key={entry.id}>
                <EntryCard
                  entry={entry}
                  controls={entryControls}
                  queryKey={STATIC_TS_KEYS.TRASHED_ENTRIES}
                  datesToDisplay={{
                    updatedAt: true,
                  }}
                />
              </li>
            ))}
          </CardResultsWrapper>
        </>
      )}
    </CollapsibleSection>
  );
};
