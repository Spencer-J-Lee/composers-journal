"use client";

import { useRouter } from "next/navigation";

import { SUCCESS_MESSAGES } from "@/constants/messages";
import { routes } from "@/constants/routes";
import { STATUSES } from "@/models/types/status";
import { apiCreateNotebook } from "@/services/notebooks";
import { showSuccessToast } from "@/utils/toasts";

import { NotebookForm } from "../components/NotebookForm";
import { NotebookFormValues } from "../components/NotebookForm/schema";

export const CreateNotebookForm = () => {
  const router = useRouter();

  const handleSuccess = async (data: NotebookFormValues) => {
    const notebook = await apiCreateNotebook({
      name: data.name.trim(),
      status: STATUSES.ACTIVE,
    });

    showSuccessToast(SUCCESS_MESSAGES.USER.CREATE.NOTEBOOK);

    router.push(routes.notebook(notebook.id));
  };

  return <NotebookForm onSubmit={handleSuccess} submitText="Create" />;
};
