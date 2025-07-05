"use client";

import { useRouter } from "next/navigation";

import { SUCCESS_MESSAGES } from "@/constants/messages";
import { routes } from "@/constants/routes";
import { Entry } from "@/models/Entry";
import { apiUpdateEntry } from "@/services/entries/update";
import { showSuccessToast } from "@/utils/client/toasts";

import { EntryForm } from "../components/EntryForm";
import { EntryFormValues } from "../components/EntryForm/schema";

type EditEntryFormProps = {
  entry: Entry;
};

export const EditEntryForm = ({ entry }: EditEntryFormProps) => {
  const router = useRouter();

  const handleSubmit = async (data: EntryFormValues) => {
    await apiUpdateEntry({
      id: entry.id,
      ...data,
    });

    // TODO: handle Tag update
    // TODO: handle entryTag update

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
      }}
    />
  );
};
