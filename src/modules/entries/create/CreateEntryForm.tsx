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
import { TagOption } from "../components/EntryForm/TagsEditor/TagsDialog/types";

type CreateEntryFormProps = {
  notebookId: number;
};

export const CreateEntryForm = ({ notebookId }: CreateEntryFormProps) => {
  const router = useRouter();
  const { mutateAsync: createTags } = useCreateTags();

  const handleSubmit = async (data: EntryFormValues) => {
    const { tagOptions, ...rest } = data;

    // Create entry
    const createEntry = apiCreateEntry({
      notebookId,
      status: STATUSES.ACTIVE,
      ...rest,
    });

    // Create new tags
    const newTagOptions: TagOption[] = tagOptions.filter(({ isNew }) => isNew);
    const createNewTags = createTags(
      newTagOptions.map(({ label }) => ({
        name: label,
      })),
    );

    // Await creation of pivotal data
    const [entry, newTags] = await Promise.all([createEntry, createNewTags]);

    // Create entry-tag relations
    const tagIds: number[] = newTags.map(({ id }) => id);
    tagOptions.forEach(({ value }) => {
      if (value > 0) tagIds.push(value);
    });
    await apiCreateEntryTags(
      tagIds.map((id) => ({
        entryId: entry.id,
        tagId: id,
      })),
    );

    showSuccessToast(SUCCESS_MESSAGES.USER.CREATE.ENTRY);

    router.push(routes.notebook(entry.notebookId));
  };

  return <EntryForm onSubmit={handleSubmit} submitText="Create" />;
};
