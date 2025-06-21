"use client";

import { useRouter } from "next/navigation";

import { SUCCESS_MESSAGES } from "@/constants/messages";
import { STATUSES } from "@/models/types/status";
import { apiCreateEntry } from "@/services/entries";
import { showSuccessToast } from "@/utils/toasts";

import { EntryForm } from "../components/EntryForm";
import { EntryFormValues } from "../components/EntryForm/schema";

type CreateEntryFormProps = {
  notebookId: number;
};

export const CreateEntryForm = ({ notebookId }: CreateEntryFormProps) => {
  const router = useRouter();

  const handleSubmit = async (data: EntryFormValues) => {
    const entry = await apiCreateEntry({
      notebookId,
      status: STATUSES.ACTIVE,
      ...data,
    });

    // TODO: handle entryTag creation

    showSuccessToast(SUCCESS_MESSAGES.USER.CREATE.ENTRY);

    // router.push(routes.entry(entry.id))
  };

  return <EntryForm onSubmit={handleSubmit} submitText="Create" />;
};
