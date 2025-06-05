import { Status } from "@/models/types";

import { API_PATHS } from "../constants/apiPaths";
import { fetchWithErrorHandling } from "../utils/fetchWithErrorHandling";

type apiCreateCollectionProps = {
  name: string;
  status: Status;
};

export const apiCreateCollection = async ({
  name,
  status,
}: apiCreateCollectionProps) => {
  return await fetchWithErrorHandling(API_PATHS.COLLECTIONS.ROOT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      status,
    }),
  });
};
