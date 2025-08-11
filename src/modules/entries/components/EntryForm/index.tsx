"use client";

import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/buttons/Button";
import { Card } from "@/components/Card";
import { Divider } from "@/components/Divider";
import { RHFGhostTextField } from "@/components/formFields/RHFFields/RHFGhostTextField";
import { RHFRichTextField } from "@/components/formFields/RHFFields/RHFRichTextField";
import { DEFAULT_ERROR_MSG } from "@/constants/messages";
import { isError } from "@/utils/client/isError";
import { showErrorToast } from "@/utils/client/toasts";

import { entryFormSchema, EntryFormValues } from "./schema";
import { TagsEditor } from "./TagsEditor";

type EntryFormProps = {
  onSubmit: (data: EntryFormValues) => Promise<void>;
  submitText: string;
  defaultValues?: EntryFormValues;
};

export const EntryForm = ({
  onSubmit,
  submitText,
  defaultValues,
}: EntryFormProps) => {
  const [loading, setLoading] = useState(false);
  const methods = useForm<EntryFormValues>({
    resolver: zodResolver(entryFormSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      tagOptions: defaultValues?.tagOptions ?? [],
    },
  });
  const tagOptions = useWatch({
    name: "tagOptions",
    control: methods.control,
  });

  const handleSubmit = async (data: EntryFormValues) => {
    setLoading(true);

    try {
      await onSubmit(data);
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
          // Padding and negative margin are used here to prevent highlighted
          // video outlines from getting cut off
          editorClassName="flex-1 overflow-y-auto p-1 -m-1"
          showMenuBar
        />

        <Card
          className="sticky bottom-0 mt-3 flex items-center"
          paddingSize="sm"
        >
          <TagsEditor
            tagOptions={tagOptions}
            onConfirm={(newVal) => {
              methods.setValue("tagOptions", newVal);
            }}
            className="flex-overflow-fix flex-1"
          />

          <Divider orientation="vertical" className="ml-3 mr-2" flexChild />

          <Button type="submit" loading={loading}>
            {submitText}
          </Button>
        </Card>
      </form>
    </FormProvider>
  );
};
