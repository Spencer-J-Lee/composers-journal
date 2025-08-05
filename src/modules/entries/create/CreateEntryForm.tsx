"use client";

import { useRouter } from "next/navigation";

import { SUCCESS_MESSAGES } from "@/constants/messages";
import { routes } from "@/constants/routes";
import { useCreateTags } from "@/hooks/cache/tags";
import { STATUSES } from "@/models/types/status";
import { apiCreateEntry } from "@/services/entries/create";
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

    const entry = await apiCreateEntry({
      notebookId,
      status: STATUSES.ACTIVE,
      ...rest,
    });

    const newTagOptions: TagOption[] = tagOptions.filter((op) => op.isNew);
    const newTags = await createTags(
      newTagOptions.map((op) => ({
        name: op.label,
      })),
    );

    // // TODO: handle entryTag creation
    // const entryTags = await apiCreateEntryTags([
    //   {
    //     tagId: number,
    //     entryId: number,
    //   }
    // ])

    showSuccessToast(SUCCESS_MESSAGES.USER.CREATE.ENTRY);

    router.push(routes.notebook(entry.notebookId));
  };

  return <EntryForm onSubmit={handleSubmit} submitText="Create" />;
};
