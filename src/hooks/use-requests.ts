"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/lib/query-client";
import { getUserRequests, getRequest } from "@/data/requests";
import {
  createRequest,
  updateRequest,
  updateRequestStatus,
  addComment,
  addAttachment,
  deleteRequest,
  reorderRequests,
} from "@/data/request-actions";

// Custom hook for fetching all user requests
export function useRequests() {
  return useQuery({
    queryKey: queryKeys.requests,
    queryFn: getUserRequests,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

// Custom hook for fetching a single request
export function useRequest(id: string) {
  return useQuery({
    queryKey: queryKeys.request(id),
    queryFn: () => getRequest(id),
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!id, // Only run query if id is provided
  });
}

// Custom hook for creating a new request
export function useCreateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRequest,
    onSuccess: () => {
      // Invalidate and refetch requests list
      queryClient.invalidateQueries({ queryKey: queryKeys.requests });
      toast.success("Request created successfully!");
    },
    onError: (error: Error) => {
      const serverError = (error as unknown as { serverError?: string })
        .serverError;
      toast.error(serverError || "Failed to create request");
    },
  });
}

// Custom hook for updating a request
export function useUpdateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRequest,
    onSuccess: () => {
      // Invalidate requests to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.requests });
      toast.success("Request updated successfully!");
    },
    onError: (error: Error) => {
      const serverError = (error as unknown as { serverError?: string })
        .serverError;
      toast.error(serverError || "Failed to update request");
    },
  });
}

// Custom hook for updating request status
export function useUpdateRequestStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRequestStatus,
    onSuccess: () => {
      // Invalidate both individual request and list
      queryClient.invalidateQueries({ queryKey: queryKeys.requests });
      toast.success("Status updated successfully!");
    },
    onError: (error: Error) => {
      const serverError = (error as unknown as { serverError?: string })
        .serverError;
      toast.error(serverError || "Failed to update status");
    },
  });
}

// Custom hook for adding a comment
export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onSuccess: (_, variables) => {
      // Invalidate the specific request to refetch with new comment
      queryClient.invalidateQueries({
        queryKey: queryKeys.request(variables.requestId),
      });
      toast.success("Comment added successfully!");
    },
    onError: (error: Error) => {
      const serverError = (error as unknown as { serverError?: string })
        .serverError;
      toast.error(serverError || "Failed to add comment");
    },
  });
}

// Custom hook for adding an attachment
export function useAddAttachment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAttachment,
    onSuccess: (_, variables) => {
      // Invalidate the specific request to refetch with new attachment
      queryClient.invalidateQueries({
        queryKey: queryKeys.request(variables.requestId),
      });
      toast.success("Attachment added successfully!");
    },
    onError: (error: Error) => {
      const serverError = (error as unknown as { serverError?: string })
        .serverError;
      toast.error(serverError || "Failed to add attachment");
    },
  });
}

// Custom hook for deleting a request
export function useDeleteRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRequest,
    onSuccess: () => {
      // Invalidate requests list
      queryClient.invalidateQueries({ queryKey: queryKeys.requests });
      toast.success("Request deleted successfully!");
    },
    onError: (error: Error) => {
      const serverError = (error as unknown as { serverError?: string })
        .serverError;
      toast.error(serverError || "Failed to delete request");
    },
  });
}

// Custom hook for reordering requests
export function useReorderRequests() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reorderRequests,
    onSuccess: () => {
      // Invalidate requests list
      queryClient.invalidateQueries({ queryKey: queryKeys.requests });
      toast.success("Requests reordered successfully!");
    },
    onError: (error: Error) => {
      const serverError = (error as unknown as { serverError?: string })
        .serverError;
      toast.error(serverError || "Failed to reorder requests");
    },
  });
}
