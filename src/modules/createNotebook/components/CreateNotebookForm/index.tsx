"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/buttons/Button";
import { RHFTextField } from "@/components/formFields/RHFFields/RHFTextField";
import { DEFAULT_ERROR_MSG } from "@/constants/messages";
import { routes } from "@/constants/routes";
import { STATUSES } from "@/models/types";
import { apiCreateNotebook } from "@/services/notebooks/post";
import { isError } from "@/utils/isError";
import { showErrorToast } from "@/utils/toasts";

import { CreateNotebookFormValues, createNotebookSchema } from "./schema";

export const CreateNotebookForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // TODO: check for duplicate name
  const methods = useForm<CreateNotebookFormValues>({
    resolver: zodResolver(createNotebookSchema),
  });

  const onSubmit = async (data: CreateNotebookFormValues) => {
    setLoading(true);

    try {
      const notebook = await apiCreateNotebook({
        ...data,
        status: STATUSES.ACTIVE,
      });

      router.push(routes.notebook(notebook.id));
    } catch (err) {
      console.error(err);
      showErrorToast(isError(err) ? err.message : DEFAULT_ERROR_MSG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-5 w-full space-y-4">
          <RHFTextField name="name" label="Name" placeholder="Name" />
        </div>

        <Button type="submit" loading={loading} fullWidth>
          Create
        </Button>
      </form>
    </FormProvider>
  );
};
