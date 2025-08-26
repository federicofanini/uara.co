"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Clock,
  MessageSquare,
  Paperclip,
  MoreVertical,
  Trash2,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useUpdateRequestStatus, useDeleteRequest } from "@/hooks/use-requests";
import { RequestStatus } from "@prisma/client";

// Type definitions based on the Prisma schema
interface RequestWithDetails {
  id: string;
  title: string;
  description: string;
  status: RequestStatus;
  priority: number;
  orderIndex: number;
  previewUrl?: string | null;
  eta?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  comments: Array<{
    id: string;
    body: string;
    author: {
      name: string | null;
      email: string;
      avatarUrl: string | null;
    } | null;
    createdAt: Date;
  }>;
  attachments: Array<{
    id: string;
    url: string;
    kind?: string | null;
  }>;
  _count: {
    comments: number;
    attachments: number;
  };
}

interface RequestListProps {
  requests: RequestWithDetails[];
}

const statusConfig = {
  [RequestStatus.BACKLOG]: {
    label: "Backlog",
    color: "secondary",
    icon: Clock,
  },
  [RequestStatus.ACTIVE]: {
    label: "Active",
    color: "default",
    icon: Play,
  },
  [RequestStatus.REVIEW]: {
    label: "Review",
    color: "orange",
    icon: AlertCircle,
  },
  [RequestStatus.DONE]: {
    label: "Done",
    color: "green",
    icon: CheckCircle,
  },
  [RequestStatus.PAUSED]: {
    label: "Paused",
    color: "yellow",
    icon: Pause,
  },
  [RequestStatus.REJECTED]: {
    label: "Rejected",
    color: "destructive",
    icon: XCircle,
  },
} as const;

const priorityLabels = {
  1: "High",
  2: "Medium-High",
  3: "Medium",
  4: "Medium-Low",
  5: "Low",
};

function RequestItem({ request }: { request: RequestWithDetails }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const updateStatusMutation = useUpdateRequestStatus();
  const deleteRequestMutation = useDeleteRequest();

  const statusInfo = statusConfig[request.status];
  const StatusIcon = statusInfo.icon;

  const formatDate = (date: Date | string) => {
    const dateObj = new Date(date);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year:
        dateObj.getFullYear() !== new Date().getFullYear()
          ? "numeric"
          : undefined,
    }).format(dateObj);
  };

  const canDelete = request.status === RequestStatus.BACKLOG;
  const canActivate = request.status === RequestStatus.BACKLOG;

  return (
    <>
      <div className="group py-4 px-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant={
                  statusInfo.color as
                    | "default"
                    | "secondary"
                    | "destructive"
                    | "outline"
                }
                className="flex items-center gap-1 text-xs"
              >
                <StatusIcon className="h-3 w-3" />
                {statusInfo.label}
              </Badge>
              <span className="text-xs text-muted-foreground hidden sm:inline">
                Priority:{" "}
                {
                  priorityLabels[
                    request.priority as keyof typeof priorityLabels
                  ]
                }
              </span>
            </div>

            <Link
              href={`/dashboard/requests/${request.id}`}
              className="group/link"
            >
              <h3 className="font-medium text-foreground group-hover/link:text-primary transition-colors line-clamp-1 mb-1">
                {request.title}
              </h3>
            </Link>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {request.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                {request._count.comments}
              </span>
              <span className="flex items-center gap-1">
                <Paperclip className="h-3 w-3" />
                {request._count.attachments}
              </span>
              <span className="hidden sm:inline">
                Created {formatDate(request.createdAt)}
              </span>
              {request.eta && (
                <span className="hidden md:inline">
                  ETA: {formatDate(request.eta)}
                </span>
              )}
            </div>

            {request.previewUrl && (
              <div className="mt-2">
                <a
                  href={request.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  Preview
                </a>
              </div>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {canActivate && (
                <DropdownMenuItem
                  onClick={() =>
                    updateStatusMutation.mutate({
                      id: request.id,
                      status: RequestStatus.ACTIVE,
                    })
                  }
                  disabled={updateStatusMutation.isPending}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Make Active
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/requests/${request.id}`}>
                  View Details
                </Link>
              </DropdownMenuItem>
              {canDelete && (
                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{request.title}&quot;? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteRequestMutation.mutate({ id: request.id });
                setShowDeleteDialog(false);
              }}
              disabled={deleteRequestMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteRequestMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function RequestList({ requests }: RequestListProps) {
  // Group requests by status for better organization
  const requestsByStatus = requests.reduce((acc, request) => {
    if (!acc[request.status]) {
      acc[request.status] = [];
    }
    acc[request.status].push(request);
    return acc;
  }, {} as Record<RequestStatus, RequestWithDetails[]>);

  const activeRequests = requestsByStatus[RequestStatus.ACTIVE] || [];
  const backlogRequests = requestsByStatus[RequestStatus.BACKLOG] || [];
  const inProgressRequests = [
    ...(requestsByStatus[RequestStatus.REVIEW] || []),
    ...(requestsByStatus[RequestStatus.PAUSED] || []),
  ];
  const completedRequests = [
    ...(requestsByStatus[RequestStatus.DONE] || []),
    ...(requestsByStatus[RequestStatus.REJECTED] || []),
  ];

  const hasActiveRequest = activeRequests.length > 0;

  return (
    <div className="space-y-8">
      {/* Active Request */}
      {activeRequests.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium">Active Request</h2>
              <p className="text-sm text-muted-foreground">
                Currently being worked on
              </p>
            </div>
            <Badge variant="default" className="flex items-center gap-1 w-fit">
              <Play className="h-3 w-3" />
              In Progress
            </Badge>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            {activeRequests.map((request) => (
              <RequestItem key={request.id} request={request} />
            ))}
          </div>
        </div>
      )}

      {/* No Active Request CTA */}
      {!hasActiveRequest && backlogRequests.length > 0 && (
        <div className="p-6 border border-dashed border-border rounded-lg">
          <div className="text-center">
            <Play className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
            <h3 className="text-sm font-semibold mb-1">No Active Request</h3>
            <p className="text-sm text-muted-foreground mb-3">
              You have {backlogRequests.length} request
              {backlogRequests.length === 1 ? "" : "s"} in your backlog.
            </p>
            <p className="text-xs text-muted-foreground">
              Your next request will be activated automatically, or you can
              activate one manually.
            </p>
          </div>
        </div>
      )}

      {/* Backlog */}
      {backlogRequests.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium">Backlog</h2>
              <p className="text-sm text-muted-foreground">
                {backlogRequests.length} request
                {backlogRequests.length === 1 ? "" : "s"} waiting to be
                activated
              </p>
            </div>
            <Link href="/dashboard/requests/new">
              <Button size="sm" className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Request
              </Button>
            </Link>
          </div>
          <div className="space-y-0 border border-border rounded-lg overflow-hidden">
            {backlogRequests.map((request, index) => (
              <div
                key={request.id}
                className={index > 0 ? "border-t border-border" : ""}
              >
                <RequestItem request={request} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* In Progress (Review/Paused) */}
      {inProgressRequests.length > 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium">In Progress</h2>
            <p className="text-sm text-muted-foreground">
              {inProgressRequests.length} request
              {inProgressRequests.length === 1 ? "" : "s"} in review or paused
            </p>
          </div>
          <div className="space-y-0 border border-border rounded-lg overflow-hidden">
            {inProgressRequests.map((request, index) => (
              <div
                key={request.id}
                className={index > 0 ? "border-t border-border" : ""}
              >
                <RequestItem request={request} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed */}
      {completedRequests.length > 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium">Completed</h2>
            <p className="text-sm text-muted-foreground">
              {completedRequests.length} finished request
              {completedRequests.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="space-y-0 border border-border rounded-lg overflow-hidden">
            {completedRequests.map((request, index) => (
              <div
                key={request.id}
                className={index > 0 ? "border-t border-border" : ""}
              >
                <RequestItem request={request} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {requests.length === 0 && (
        <div className="p-12 border border-dashed border-border rounded-lg">
          <div className="text-center">
            <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
            <h3 className="text-sm font-semibold mb-1">No requests yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get started by creating your first request.
            </p>
            <Link href="/dashboard/requests/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Request
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
