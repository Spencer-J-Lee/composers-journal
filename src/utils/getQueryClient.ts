import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
} from "@tanstack/react-query";

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // This gives a good default for stale time on data and also helps
        // prevent the client from immediately refetching after SSR
        staleTime: 60 * 1000,

        // These ensure data freshness when returning to the relevant tab
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
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

let browserQueryClient: QueryClient | null = null;

export const getQueryClient = () => {
  if (isServer) {
    // Always make a new query client on server-side to prevent data from
    // being shared between users and requests.
    return makeQueryClient();
  } else {
    // Avoid remaking a new query client on client-side to avoid
    // losing cached data.
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};
