import { ReactNode } from "react";

/**
 * This provide access to the TanStack Query context, enabling hooks
 * such as useQueryClient, useQuery, useMutation, etc.
 */
export const AlertDialogProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
