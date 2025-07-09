"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // This sets a good default for stale time on cached data
      staleTime: 60 * 1000,

      // These ensure data freshness when returning to the relevant tab
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

/**
 * This provide access to the TanStack Query context, enabling hooks
 * such as useQueryClient, useQuery, useMutation, etc.
 */
export const TanStackQueryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />
      {children}
    </QueryClientProvider>
  );
};
