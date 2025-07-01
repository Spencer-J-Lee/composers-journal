import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";

/**
 * Always make a new query client on server-side to prevent data from
 * being shared between users and requests.
 */
export const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // This prevents the client from immediately refetching after SSR
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // This helps to avoid having to await non-critical prefetches by
        // allowing pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",

        // We should not catch Next.js server errors as that's how Next.js
        // detects dynamic pages so we cannot redact them. Next.js also
        // automatically redacts errors for us with better digests.
        shouldRedactErrors: () => {
          return false;
        },
      },
    },
  });
};
