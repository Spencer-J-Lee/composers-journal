"use client";

import { useRouter } from "next/navigation";

import { SUCCESS_MESSAGES } from "@/constants/messages";
import { routes } from "@/constants/routes";
import { useEditNotebook } from "@/hooks/cache/notebooks";
import { Notebook } from "@/models/Notebook";
import { showSuccessToast } from "@/utils/client/toasts";

import { NotebookForm } from "../components/NotebookForm";
import { NotebookFormValues } from "../components/NotebookForm/schema";

type EditNotebookFormProps = {
  notebook: Notebook;
};

export const EditNotebookForm = ({ notebook }: EditNotebookFormProps) => {
  const router = useRouter();
  const { mutateAsync: editNotebook } = useEditNotebook();

  const handleSuccess = async (data: NotebookFormValues) => {
    await editNotebook({
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
