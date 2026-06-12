"use client";

import { useEffect, useMemo, useState } from "react";
import { faBookmark, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "@/components/buttons/Button";
import { Dialog } from "@/components/dialogs/components/Dialog";
import { SelectField } from "@/components/formFields/SelectField";
import { Toggle } from "@/components/formFields/Toggle";
import { useTags } from "@/hooks/cache/tags";
import { useLogError } from "@/hooks/useLogError";
import { tagsToOptions } from "@/modules/entries/components/EntryForm/TagsEditor/TagsDialog/helpers";
import { TagOption } from "@/modules/entries/components/EntryForm/TagsEditor/TagsDialog/types";

import { SORT_OPTIONS, SortOption } from "./constants";
import { EntryFilter } from "./types";

type EntriesFilterProps = {
  value: EntryFilter;
  onChange: (next: EntryFilter) => void;
};

export const EntriesFilter = ({ value, onChange }: EntriesFilterProps) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<EntryFilter>(value);

  const { data: tags, error } = useTags({
    orderBy: [{ column: "name", direction: "asc" }],
  });
  useLogError(error);

  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  const tagOptions = useMemo(() => (tags ? tagsToOptions(tags) : []), [tags]);

  const selectedTagOptions = useMemo(
    () => tagOptions.filter((option) => draft.tags.includes(option.value)),
    [tagOptions, draft.tags],
  );

  const selectedSortOption = useMemo(
    () =>
      SORT_OPTIONS.find((option) => {
        const { column, direction } = draft.orderBy[0];
        const { column: optionColumn, direction: optionDirection } =
          option.value[0];
        return optionColumn === column && optionDirection === direction;
      }) ?? undefined,
    [draft.orderBy],
  );

  const activeFilterCount = value.tags.length + (value.savedOnly ? 1 : 0);

  const handleTagsChange = (newVal: readonly TagOption[]) => {
    setDraft((prev) => ({
      ...prev,
      tags: newVal.map((option) => option.value).sort((a, b) => a - b),
    }));
  };

  const handleSortChange = (newVal: SortOption | null) => {
    if (!newVal) return;
    setDraft((prev) => ({ ...prev, orderBy: newVal.value }));
  };

  const toggleSavedOnly = () => {
    setDraft((prev) => ({ ...prev, savedOnly: !prev.savedOnly }));
  };

  const handleClear = () => {
    setDraft((prev) => ({ ...prev, tags: [], savedOnly: false }));
    onChange({ ...value, tags: [], savedOnly: false });
  };

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      size="sm"
      title="Filters"
      trigger={
        <Button variant="ghost" className="flex items-center gap-2">
          <FontAwesomeIcon icon={faFilter} />
          Filters
          {activeFilterCount > 0 && (
            <span className="text-text-muted flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-surface-light)] px-1.5 text-xs font-semibold">
              {activeFilterCount}
            </span>
          )}
        </Button>
      }
      actions={[
        {
          type: "sync",
          key: "clear",
          text: "Clear all",
          variant: "ghost",
          onConfirm: handleClear,
        },
        {
          type: "sync",
          key: "apply",
          text: "Apply",
          variant: "default",
          onConfirm: () => onChange(draft),
        },
      ]}
    >
      <div className="flex flex-col gap-5">
        <SelectField<SortOption, false>
          name="sort"
          label="Sort by"
          value={selectedSortOption}
          options={SORT_OPTIONS}
          onChange={handleSortChange}
          getOptionValue={(option) => option.label}
          isSearchable={false}
        />

        <SelectField<TagOption, true>
          name="tags"
          label="Tags"
          value={selectedTagOptions}
          options={tagOptions}
          onChange={handleTagsChange}
          placeholder="Filter by tags"
          noOptionsMessage={() => "No tags found"}
          closeMenuOnSelect={false}
          isMulti
        />

        <Toggle
          name="savedOnly"
          label="Saved only"
          faIcon={faBookmark}
          checked={draft.savedOnly}
          onChange={toggleSavedOnly}
        />
      </div>
    </Dialog>
  );
};
