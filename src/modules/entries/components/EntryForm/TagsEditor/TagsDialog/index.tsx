import { useMemo, useState } from "react";
import { ActionMeta, createFilter, OnChangeValue } from "react-select";
import { faTags } from "@fortawesome/free-solid-svg-icons";

import { commonDialogActions } from "@/components/dialogs/AlertDialog/constants";
import { Dialog } from "@/components/dialogs/components/Dialog";
import { Select } from "@/components/formFields/Select";
import { IconButton } from "@/components/iconButtons/IconButton";
import { ShimmerSelect } from "@/components/shimmerLoaders/ShimmerSelect";
import { Typography } from "@/components/Typography";
import { useTags } from "@/hooks/cache/tags";
import { useLogError } from "@/hooks/useLogError";

import { tagsToOptions } from "./helpers";
import { TagOption } from "./types";

const filter = createFilter<TagOption>();

type TagsDialogProps = {
  initialTagOptions: TagOption[];
  onConfirm: (newVal: TagOption[]) => void;
};

export const TagsDialog = ({
  initialTagOptions,
  onConfirm,
}: TagsDialogProps) => {
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
  const [selected, setSelected] =
    useState<readonly TagOption[]>(initialTagOptions);
  // Used to ensure placeholder tags don't have overlapping ids
  const [newOptionId, setNewOptionId] = useState(-1);

  const tagOptions = useMemo(() => {
    return tags ? tagsToOptions(tags) : [];
  }, [tags]);

  const filteredOptions = useMemo(() => {
    // Get filtered options based on default react-select search functionality
    const filtered = tagOptions.filter((option) => {
      const { value, label } = option;
      return filter({ value: String(value), label, data: option }, searchStr);
    });

    // Push placeholder tag if searched option doesn't already exist
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
    }

    return filtered;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStr, tagOptions, selected]);

  const handleChange = (
    newVal: OnChangeValue<TagOption, true>,
    actionMeta: ActionMeta<TagOption>,
  ) => {
    // If placeholder option is chosen, ensure next placeholder has unique id
    if (actionMeta.action === "select-option" && actionMeta.option?.isNew) {
      setNewOptionId((prev) => prev - 1);
    }
    setSelected(newVal);
  };

  const handleInputChange = (newVal: string) => {
    setSearchStr(newVal);
  };

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      trigger={<IconButton faIcon={faTags} className="shrink-0" />}
      title="Tags Editor"
      size="md"
      actions={[
        commonDialogActions.cancel,
        {
          type: "sync",
          key: "apply",
          text: "Apply",
          variant: "default",
          onConfirm: () => onConfirm([...selected]),
        },
      ]}
    >
      <div>
        {isPending && <ShimmerSelect />}

        {isSuccess && (
          <Select
            value={selected}
            options={filteredOptions}
            onInputChange={handleInputChange}
            onChange={handleChange}
            placeholder="Search or add tags"
            noOptionsMessage={() => "No tags found"}
            formatOptionLabel={(option, { context }) => {
              return context === "menu" && option.isNew
                ? `Create tag "${option.label}"`
                : option.label;
            }}
            closeMenuOnSelect={false}
            isMulti
            autoFocus
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
