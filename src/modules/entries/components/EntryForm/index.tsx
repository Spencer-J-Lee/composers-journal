"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/buttons/Button";
import { RHFGhostTextField } from "@/components/formFields/RHFFields/RHFGhostTextField";
import { RHFRichTextField } from "@/components/formFields/RHFFields/RHFRichTextField";
import { DEFAULT_ERROR_MSG } from "@/constants/messages";
import { isError } from "@/utils/isError";
import { showErrorToast } from "@/utils/toasts";

import { entryFormSchema,EntryFormValues } from "./schema";

type EntryFormProps = {
  onSubmit: (data: EntryFormValues) => Promise<void>;
  submitText: string;
  defaultValues?: Partial<EntryFormValues>;
};

export const EntryForm = ({
  onSubmit,
  submitText,
  defaultValues,
}: EntryFormProps) => {
  const [loading, setLoading] = useState(false);
  const methods = useForm<EntryFormValues>({
    resolver: zodResolver(entryFormSchema),
    defaultValues,
  });

  const handleSubmit = async (data: EntryFormValues) => {
    setLoading(true);

    try {
      await onSubmit(data);

      // TODO: handle entryTag creation

      // TODO: handle entryMedia creation

      // router.push(routes.entry(entry.id))
    } catch (err) {
      console.error(err);
      showErrorToast(isError(err) ? err.message : DEFAULT_ERROR_MSG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <div className="mb-5 w-full space-y-4">
          <RHFGhostTextField
            name="title"
            className="text-4xl"
            placeholder="Title"
          />
          <RHFRichTextField
            name="description"
            placeholder="Start writing your entry..."
            showMenuBar
          />
        </div>

        <Button type="submit" loading={loading} variant="positive" fullWidth>
          {submitText}
        </Button>
      </form>
    </FormProvider>
  );
};
