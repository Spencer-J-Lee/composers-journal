"use client";

import { useRouter } from "next/navigation";

import { SUCCESS_MESSAGES } from "@/constants/messages";
import { routes } from "@/constants/routes";
import { useCreateTags } from "@/hooks/cache/tags";
import { STATUSES } from "@/models/types/status";
import { apiCreateEntry } from "@/services/entries/create";
import { apiCreateEntryTags } from "@/services/entryTags/create";
import { showSuccessToast } from "@/utils/client/toasts";

import { EntryForm } from "../components/EntryForm";
import { EntryFormValues } from "../components/EntryForm/schema";

type CreateEntryFormProps = {
  notebookId: number;
};

export const CreateEntryForm = ({ notebookId }: CreateEntryFormProps) => {
  const router = useRouter();
  const { mutateAsync: createTags } = useCreateTags();

  const handleSubmit = async (data: EntryFormValues) => {
    const { tagOptions, ...rest } = data;

    // Split tags into existing and new
    const existingTagIds = tagOptions
      .filter(({ isNew }) => !isNew)
      .map(({ value }) => value);
    const newTagOptions = tagOptions.filter(({ isNew }) => isNew);

    // Create any new tags
    const createNewTags =
      newTagOptions.length > 0
        ? createTags(newTagOptions.map(({ label }) => ({ name: label })))
        : Promise.resolve([]);

    // Create entry
    const createEntry = apiCreateEntry({
      notebookId,
      status: STATUSES.ACTIVE,
      ...rest,
    });

    const [entry, newTags] = await Promise.all([createEntry, createNewTags]);

    // Create any new entry-tag relations
    if (tagOptions.length > 0) {
      const allTagIds = [...existingTagIds, ...newTags.map(({ id }) => id)];
      await apiCreateEntryTags(
        allTagIds.map((tagId) => ({ entryId: entry.id, tagId })),
      );
    }

    showSuccessToast(SUCCESS_MESSAGES.USER.CREATE.ENTRY);
    router.push(routes.notebook(entry.notebookId));
  };

  return <EntryForm onSubmit={handleSubmit} submitText="Create" />;
};
