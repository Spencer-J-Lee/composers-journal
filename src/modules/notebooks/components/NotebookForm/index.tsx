"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/buttons/Button";
import { RHFTextField } from "@/components/formFields/RHFFields/RHFTextField";
import { DEFAULT_ERROR_MSG } from "@/constants/messages";
import { checkNotebookNameUnique } from "@/models/Notebook/helpers";
import { isError } from "@/utils/client/isError";
import { showErrorToast } from "@/utils/client/toasts";

import { notebookFormSchema, NotebookFormValues } from "./schema";

type NotebookFormProps = {
  onSubmit: (data: NotebookFormValues) => Promise<void>;
  submitText: string;
  defaultValues?: Partial<NotebookFormValues>;
};

export const NotebookForm = ({
  onSubmit,
  submitText,
  defaultValues,
}: NotebookFormProps) => {
  const [loading, setLoading] = useState(false);

  const methods = useForm<NotebookFormValues>({
    resolver: zodResolver(notebookFormSchema),
    defaultValues,
  });

  const validateNameUnique = async (val: string) => {
    if (await checkNotebookNameUnique(val)) {
      methods.clearErrors("name");
      return true;
    } else {
      methods.setError("name", {
        type: "manual",
        message: "Notebook with that name already exists",
      });
      return false;
    }
  };

  const handleSubmit = async (data: NotebookFormValues) => {
    setLoading(true);

    try {
      if (!(await validateNameUnique(data.name))) {
        return;
      }

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
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <div className="mb-5 space-y-4">
          <RHFTextField
            name="name"
            label="Name your notebook"
            placeholder=""
            className="min-w-80"
          />
        </div>

        <Button type="submit" loading={loading} fullWidth>
          {submitText}
        </Button>
      </form>
    </FormProvider>
  );
};
