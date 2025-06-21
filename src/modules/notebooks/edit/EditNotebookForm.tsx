"use client";

import { useRouter } from "next/navigation";

import { SUCCESS_MESSAGES } from "@/constants/messages";
import { routes } from "@/constants/routes";
import { Notebook } from "@/models/Notebook";
import { apiUpdateNotebook } from "@/services/notebooks";
import { showSuccessToast } from "@/utils/toasts";

import { NotebookForm } from "../components/NotebookForm";
import { NotebookFormValues } from "../components/NotebookForm/schema";

type EditNotebookFormProps = {
  notebook: Notebook;
};

export const EditNotebookForm = ({ notebook }: EditNotebookFormProps) => {
  const router = useRouter();

  const handleSuccess = async (data: NotebookFormValues) => {
    await apiUpdateNotebook({
      id: notebook.id,
      name: data.name.trim(),
    });

    showSuccessToast(SUCCESS_MESSAGES.USER.EDIT.NOTEBOOK);

    router.push(routes.notebook(notebook.id));
  };

  return (
    <NotebookForm
      defaultValues={{ name: notebook.name }}
      onSubmit={handleSuccess}
      submitText="Save"
    />
  );
};
