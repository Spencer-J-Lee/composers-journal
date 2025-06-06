"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/buttons/Button";
import { RHFGhostTextField } from "@/components/formFields/RHFFields/RHFGhostTextField";
import { RHFRichTextField } from "@/components/formFields/RHFFields/RHFRichTextField";
import { DEFAULT_ERROR_MSG } from "@/constants/messages";
import { routes } from "@/constants/routes";
import { createClientCS } from "@/db/supabase/client";
import { STATUSES } from "@/models/types";
import { apiCreateEntry } from "@/services/entries/post";
import { isError } from "@/utils/isError";
import { showErrorToast } from "@/utils/toasts";

import { CreateEntryFormValues, createEntrySchema } from "./schema";

export const CreateEntryForm = () => {
  const supabase = createClientCS();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const methods = useForm<CreateEntryFormValues>({
    resolver: zodResolver(createEntrySchema),
  });

  const onSubmit = async (data: CreateEntryFormValues) => {
    setLoading(true);
    console.log(`data:`, data);

    try {
      const entry = await apiCreateEntry({
        ...data,
        status: STATUSES.ACTIVE,
      });

      // TODO: handle entryTag creation

      // TODO: handle entryMedia creation

      // router.push(routes.entry(entry.id))
    } catch (error) {
      console.error(error);
      showErrorToast(isError(error) ? error.message : DEFAULT_ERROR_MSG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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

        <Button type="submit" loading={loading} fullWidth>
          Create
        </Button>
      </form>
    </FormProvider>
  );
};
