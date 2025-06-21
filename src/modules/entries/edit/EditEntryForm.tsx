"use client";

import { useRouter } from "next/navigation";

import { SUCCESS_MESSAGES } from "@/constants/messages";
import { routes } from "@/constants/routes";
import { Entry } from "@/models/Entry";
import { apiUpdateEntry } from "@/services/entries";
import { showSuccessToast } from "@/utils/toasts";

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

    // TODO: handle entryTag creation

    showSuccessToast(SUCCESS_MESSAGES.USER.EDIT.ENTRY);

    router.push(routes.entry(entry));
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
