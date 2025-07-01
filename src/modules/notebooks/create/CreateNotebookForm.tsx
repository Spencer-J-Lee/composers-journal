"use client";

import { useRouter } from "next/navigation";

import { SUCCESS_MESSAGES } from "@/constants/messages";
import { routes } from "@/constants/routes";
import { useCreateNotebook } from "@/hooks/cache/notebooks";
import { showSuccessToast } from "@/utils/client/toasts";

import { NotebookForm } from "../components/NotebookForm";
import { NotebookFormValues } from "../components/NotebookForm/schema";

export const CreateNotebookForm = () => {
  const router = useRouter();
  const { mutateAsync: createNotebook } = useCreateNotebook();

  const handleSuccess = async (data: NotebookFormValues) => {
    const notebook = await createNotebook({
      name: data.name.trim(),
    });

    showSuccessToast(SUCCESS_MESSAGES.USER.CREATE.NOTEBOOK);

    router.push(routes.notebook(notebook.id));
  };

  return <NotebookForm onSubmit={handleSuccess} submitText="Create" />;
};
