"use client";

import { useRouter } from "next/navigation";

import { SUCCESS_MESSAGES } from "@/constants/messages";
import { routes } from "@/constants/routes";
import { useCreateTags } from "@/hooks/cache/tags";
import { Entry } from "@/models/Entry";
import { apiUpdateEntry } from "@/services/entries/update";
import { apiCreateEntryTags } from "@/services/entryTags/create";
import { apiDeleteEntryTags } from "@/services/entryTags/delete";
import { showSuccessToast } from "@/utils/client/toasts";

import { EntryForm } from "../components/EntryForm";
import { EntryFormValues } from "../components/EntryForm/schema";
import { tagsToOptions } from "../components/EntryForm/TagsEditor/TagsDialog/helpers";

type EditEntryFormProps = {
  entry: Entry;
};

export const EditEntryForm = ({ entry }: EditEntryFormProps) => {
  const router = useRouter();
  const { mutateAsync: createTags } = useCreateTags();

  const handleSubmit = async (data: EntryFormValues) => {
    const { tagOptions, ...rest } = data;

    // Split tags into existing and new
    const newTagOptions = tagOptions.filter(({ isNew }) => isNew);
    const existingTagIds = tagOptions
      .filter(({ isNew }) => !isNew)
      .map(({ value }) => value);

    // Create any new tags
    const newTags =
      newTagOptions.length > 0
        ? await createTags(newTagOptions.map(({ label }) => ({ name: label })))
        : [];
    const selectedTagIds = [...existingTagIds, ...newTags.map((tag) => tag.id)];

    // Compute which old tags to remove
    const prevTagIds = entry.tags.map((tag) => tag.id);
    const tagIdsToRemove = prevTagIds.filter(
      (id) => !selectedTagIds.includes(id),
    );

    // Compute which tags to add
    const tagIdsToAdd = selectedTagIds.filter((id) => !prevTagIds.includes(id));

    await Promise.all([
      apiUpdateEntry(entry.id, rest),

      tagIdsToRemove.length > 0
        ? apiDeleteEntryTags({
            entryId: entry.id,
            ids: tagIdsToRemove,
          })
        : Promise.resolve(),

      tagIdsToAdd.length > 0
        ? apiCreateEntryTags(
            tagIdsToAdd.map((tagId) => ({ entryId: entry.id, tagId })),
          )
        : Promise.resolve([]),
    ]);

    showSuccessToast(SUCCESS_MESSAGES.USER.EDIT.ENTRY);
    router.push(routes.notebook(entry.notebookId));
  };

  return (
    <EntryForm
      onSubmit={handleSubmit}
      submitText="Save"
      defaultValues={{
        title: entry.title,
        description: entry.description,
        tagOptions: tagsToOptions(entry.tags),
      }}
    />
  );
};
