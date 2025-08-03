import { useMemo, useState } from "react";
import { createFilter, OnChangeValue } from "react-select";
import { faTags } from "@fortawesome/free-solid-svg-icons";

import { Dialog } from "@/components/dialogs/components/Dialog";
import { Select } from "@/components/formFields/Select";
import { IconButton } from "@/components/iconButtons/IconButton";
import { ShimmerNotebookCard } from "@/components/shimmerLoaders/ShimmerNotebookCard";
import { Typography } from "@/components/Typography";
import { useTags } from "@/hooks/cache/tags";
import { useLogError } from "@/hooks/useLogError";
import { Tag } from "@/models/Tag";

import { tagsToOptions } from "./helpers";
import { TagOption } from "./types";

const filter = createFilter<TagOption>();

type TagsDialogProps = {
  initialTags: Tag[];
};

export const TagsDialog = ({ initialTags }: TagsDialogProps) => {
  const {
    data: tags,
    error,
    isPending,
    isError,
    isSuccess,
  } = useTags({ orderBy: [{ column: "name", direction: "asc" }] });
  useLogError(error);

  const [open, setOpen] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const [newOptionId, setNewOptionId] = useState(-1);
  const [selected, setSelected] = useState<readonly TagOption[]>(
    tagsToOptions(initialTags),
  );

  const tagOptions = useMemo(() => {
    return tags ? tagsToOptions(tags) : [];
  }, [tags]);

  const filteredOptions = useMemo(() => {
    const filtered = tagOptions.filter((option) => {
      const { value, label } = option;
      return filter({ value: String(value), label, data: option }, searchStr);
    });

    if (
      searchStr &&
      !tagOptions.some((option) => option.label === searchStr) &&
      !selected.some((option) => option.label === searchStr)
    ) {
      filtered.unshift({
        value: newOptionId,
        label: searchStr,
        isNew: true,
      });
      setNewOptionId((prev) => prev - 1);
    }

    return filtered;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStr, tagOptions]);

  const handleChange = (newVal: OnChangeValue<TagOption, true>) => {
    setSelected(newVal);
  };

  const handleInputChange = (newVal: string) => {
    setSearchStr(newVal);
  };

  // TODO: handle saving
  const handleSave = () => {
    // create new tags if there are any
    // call onConfirm and pass array of new tags
  };

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      trigger={<IconButton faIcon={faTags} className="shrink-0" />}
      title="Tags Editor"
      size="md"
      // actions={[
      //   commonAlertActions.cancel,
      //   {
      //     text: "Save",
      //     variant: "default",
      //     onClick: () => null,
      //   },
      // ]}
    >
      <div>
        {isPending && (
          // TODO:  create shimmer
          <ShimmerNotebookCard controlsCount={2} />
        )}

        {isSuccess && (
          <Select
            value={selected}
            options={filteredOptions}
            formatOptionLabel={(option, { context }) => {
              return context === "menu" && option.isNew
                ? `Create tag "${option.label}"`
                : option.label;
            }}
            onInputChange={handleInputChange}
            onChange={handleChange}
            placeholder="Search or add tags"
            noOptionsMessage={() => "No tags found"}
            closeMenuOnSelect={false}
            isMulti
          />
        )}

        {isError && (
          <Typography variant="fallback">
            Failed to load tags. Please try again.
          </Typography>
        )}
      </div>
    </Dialog>
  );
};
