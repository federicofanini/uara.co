import { QueryClient, DefaultOptions } from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    // Server state is considered stale after 5 minutes
    staleTime: 5 * 60 * 1000, // 5 minutes
    // Cache data for 10 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    // Retry failed requests 2 times
    retry: 2,
    // Don't refetch on window focus for better UX
    refetchOnWindowFocus: false,
    // Don't refetch on reconnect unless data is stale
    refetchOnReconnect: "always",
  },
  mutations: {
    // Retry failed mutations once
    retry: 1,
  },
};

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: queryConfig,
  });
}

// Query keys for consistent caching
export const queryKeys = {
  // User-related queries
  user: ["user"] as const,
  currentUser: () => [...queryKeys.user, "current"] as const,

  // Request-related queries
  requests: ["requests"] as const,
  allRequests: (userId: string) =>
    [...queryKeys.requests, "list", userId] as const,
  request: (id: string) => [...queryKeys.requests, "detail", id] as const,
  requestsByStatus: (userId: string, status: string) =>
    [...queryKeys.requests, "status", userId, status] as const,

  // Comments and attachments
  requestComments: (requestId: string) =>
    [...queryKeys.requests, requestId, "comments"] as const,
  requestAttachments: (requestId: string) =>
    [...queryKeys.requests, requestId, "attachments"] as const,

  // Activity
  requestActivity: (requestId: string) =>
    [...queryKeys.requests, requestId, "activity"] as const,
} as const;
