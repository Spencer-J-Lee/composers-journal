"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/buttons/Button";
import { Card } from "@/components/Card";
import { RHFGhostTextField } from "@/components/formFields/RHFFields/RHFGhostTextField";
import { RHFRichTextField } from "@/components/formFields/RHFFields/RHFRichTextField";
import { DEFAULT_ERROR_MSG } from "@/constants/messages";
import { Tags } from "@/modules/tags/components/Tags";
import { isError } from "@/utils/client/isError";
import { showErrorToast } from "@/utils/client/toasts";

import { entryFormSchema, EntryFormValues } from "./schema";

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

      // TODO: handle Tag creation
      // TODO: handle entryTag creation
    } catch (err) {
      console.error(err);
      showErrorToast(isError(err) ? err.message : DEFAULT_ERROR_MSG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="flex h-full flex-col"
      >
        <div className="mb-4">
          <RHFGhostTextField
            name="title"
            className="text-4xl"
            placeholder="Title"
          />
        </div>

        <RHFRichTextField
          name="description"
          placeholder="Start writing your entry..."
          editorClassName="flex-1 overflow-y-auto"
          showMenuBar
        />

        <Card
          className="sticky bottom-0 mt-3 flex items-center justify-between gap-x-10"
          paddingSize="sm"
        >
          <Tags tags={methods.getValues().tags} />

          <Button type="submit" loading={loading}>
            {submitText}
          </Button>
        </Card>
      </form>
    </FormProvider>
  );
};
