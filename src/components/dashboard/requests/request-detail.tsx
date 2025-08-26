"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  Clock,
  MessageSquare,
  Paperclip,
  Send,
  ExternalLink,
  MoreVertical,
  Edit,
  Trash2,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Calendar,
  Activity,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import {
  useUpdateRequest,
  useUpdateRequestStatus,
  useAddComment,
  useAddAttachment,
} from "@/hooks/use-requests";
import { toast } from "sonner";
import { RequestStatus, ActivityType, CommentVisibility } from "@prisma/client";

// Type definitions
interface RequestDetailData {
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
    visibility: CommentVisibility;
    createdAt: Date;
    author: {
      name: string | null;
      email: string;
      avatarUrl: string | null;
    } | null;
  }>;
  attachments: Array<{
    id: string;
    url: string;
    kind?: string | null;
    createdAt: Date;
  }>;
  activities: Array<{
    id: string;
    type: ActivityType;
    meta: any;
    createdAt: Date;
    actor: {
      name: string | null;
      email: string;
      avatarUrl: string | null;
    } | null;
  }>;
  createdBy: {
    name: string | null;
    email: string;
    avatarUrl: string | null;
  } | null;
}

interface RequestDetailProps {
  request: RequestDetailData;
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

function ActivityItem({
  activity,
}: {
  activity: RequestDetailData["activities"][0];
}) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const getActivityDescription = () => {
    switch (activity.type) {
      case ActivityType.CREATED:
        return "created this request";
      case ActivityType.UPDATED:
        return "updated the request";
      case ActivityType.STATUS_CHANGED:
        return `changed status from ${activity.meta?.from} to ${activity.meta?.to}`;
      case ActivityType.COMMENT_ADDED:
        return "added a comment";
      case ActivityType.ATTACHMENT_ADDED:
        return "added an attachment";
      case ActivityType.SYSTEM_EVENT:
        return activity.meta?.message || "system event";
      default:
        return "performed an action";
    }
  };

  return (
    <div className="flex items-start gap-3 text-sm">
      <Avatar className="h-6 w-6">
        {activity.actor?.avatarUrl && (
          <AvatarImage
            src={activity.actor.avatarUrl}
            alt={activity.actor.name || ""}
          />
        )}
        <AvatarFallback className="text-xs">
          {activity.actor
            ? activity.actor.name?.charAt(0) || activity.actor.email.charAt(0)
            : "S"}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">
            {activity.actor?.name || activity.actor?.email || "System"}
          </span>{" "}
          {getActivityDescription()}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDate(activity.createdAt)}
        </p>
      </div>
    </div>
  );
}

function CommentItem({
  comment,
}: {
  comment: RequestDetailData["comments"][0];
}) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8">
        {comment.author?.avatarUrl && (
          <AvatarImage
            src={comment.author.avatarUrl}
            alt={comment.author.name || ""}
          />
        )}
        <AvatarFallback className="text-xs">
          {comment.author
            ? comment.author.name?.charAt(0) || comment.author.email.charAt(0)
            : "S"}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">
            {comment.author?.name || comment.author?.email || "System"}
          </span>
          {comment.visibility === CommentVisibility.INTERNAL && (
            <Badge variant="secondary" className="text-xs">
              Internal
            </Badge>
          )}
          <span className="text-xs text-muted-foreground">
            {formatDate(comment.createdAt)}
          </span>
        </div>
        <div className="text-sm text-muted-foreground whitespace-pre-wrap">
          {comment.body}
        </div>
      </div>
    </div>
  );
}

export function RequestDetail({ request }: RequestDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(request.title);
  const [description, setDescription] = useState(request.description);
  const [priority, setPriority] = useState(request.priority);
  const [previewUrl, setPreviewUrl] = useState(request.previewUrl || "");

  const [newComment, setNewComment] = useState("");
  const [newAttachmentUrl, setNewAttachmentUrl] = useState("");

  const updateRequestMutation = useUpdateRequest();
  const updateStatusMutation = useUpdateRequestStatus();
  const addCommentMutation = useAddComment();
  const addAttachmentMutation = useAddAttachment();

  const statusInfo = statusConfig[request.status];
  const StatusIcon = statusInfo.icon;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const handleSave = () => {
    updateRequestMutation.mutate({
      id: request.id,
      title: title.trim(),
      description: description.trim(),
      priority,
      previewUrl: previewUrl.trim() || null,
    });
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus: RequestStatus) => {
    updateStatusMutation.mutate({ id: request.id, status: newStatus });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    addCommentMutation.mutate({
      requestId: request.id,
      body: newComment.trim(),
      visibility: CommentVisibility.PUBLIC,
    });
    setNewComment("");
  };

  const handleAddAttachment = () => {
    if (!newAttachmentUrl.trim()) return;
    try {
      new URL(newAttachmentUrl); // Validate URL
      addAttachmentMutation.mutate({
        requestId: request.id,
        url: newAttachmentUrl.trim(),
        kind: "link",
      });
      setNewAttachmentUrl("");
    } catch {
      toast.error("Please enter a valid URL");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Link href="/dashboard/requests">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Requests
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Badge
              variant={statusInfo.color as any}
              className="flex items-center gap-1"
            >
              <StatusIcon className="h-3 w-3" />
              {statusInfo.label}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Priority:{" "}
              {priorityLabels[request.priority as keyof typeof priorityLabels]}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {request.status === RequestStatus.BACKLOG && (
            <Button
              onClick={() => handleStatusChange(RequestStatus.ACTIVE)}
              disabled={updateStatusMutation.isPending}
              size="sm"
            >
              <Play className="mr-2 h-4 w-4" />
              Make Active
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditing(!isEditing)}>
                <Edit className="mr-2 h-4 w-4" />
                {isEditing ? "Cancel Edit" : "Edit Request"}
              </DropdownMenuItem>
              {Object.values(RequestStatus).map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={status === request.status}
                >
                  Change to {statusConfig[status].label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Request Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Request Details</h2>
              {!isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-priority">Priority</Label>
                  <Select
                    value={priority.toString()}
                    onValueChange={(value) => setPriority(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(priorityLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-preview">Preview URL (optional)</Label>
                  <Input
                    id="edit-preview"
                    value={previewUrl}
                    onChange={(e) => setPreviewUrl(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    disabled={updateRequestMutation.isPending}
                  >
                    {updateRequestMutation.isPending
                      ? "Saving..."
                      : "Save Changes"}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{request.title}</h3>
                </div>
                <div className="whitespace-pre-wrap text-muted-foreground">
                  {request.description}
                </div>
                {request.previewUrl && (
                  <div>
                    <a
                      href={request.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Preview
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Comments */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Comments ({request.comments.length})
            </h2>

            {request.comments.length > 0 ? (
              <div className="space-y-4">
                {request.comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No comments yet.</p>
            )}

            <Separator />

            {/* Add Comment */}
            <div className="space-y-3">
              <Label htmlFor="new-comment">Add a comment</Label>
              <Textarea
                id="new-comment"
                placeholder="Ask questions, provide updates, or share feedback..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim() || addCommentMutation.isPending}
                size="sm"
              >
                <Send className="mr-2 h-4 w-4" />
                {addCommentMutation.isPending ? "Adding..." : "Add Comment"}
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Request Info */}
          <div className="space-y-4">
            <h3 className="text-base font-medium">Request Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Created:</span>
                <span className="text-xs">{formatDate(request.createdAt)}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Updated:</span>
                <span className="text-xs">{formatDate(request.updatedAt)}</span>
              </div>
              {request.eta && (
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">ETA:</span>
                  <span className="text-xs">{formatDate(request.eta)}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Created by:</span>
                <span className="text-xs">
                  {request.createdBy?.name ||
                    request.createdBy?.email ||
                    "Unknown"}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Attachments */}
          <div className="space-y-4">
            <h3 className="text-base font-medium flex items-center gap-2">
              <Paperclip className="h-4 w-4" />
              Attachments ({request.attachments.length})
            </h3>

            {request.attachments.length > 0 ? (
              <div className="space-y-2">
                {request.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center gap-2 text-sm p-2 border border-border rounded-md"
                  >
                    <LinkIcon className="h-3 w-3 text-muted-foreground shrink-0" />
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate flex-1 text-xs"
                    >
                      {attachment.url}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No attachments yet.
              </p>
            )}

            {/* Add Attachment */}
            <div className="space-y-2">
              <Label htmlFor="new-attachment" className="text-sm">
                Add attachment URL
              </Label>
              <Input
                id="new-attachment"
                placeholder="https://..."
                value={newAttachmentUrl}
                onChange={(e) => setNewAttachmentUrl(e.target.value)}
              />
              <Button
                onClick={handleAddAttachment}
                disabled={
                  !newAttachmentUrl.trim() || addAttachmentMutation.isPending
                }
                size="sm"
                variant="outline"
                className="w-full"
              >
                {addAttachmentMutation.isPending
                  ? "Adding..."
                  : "Add Attachment"}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Activity */}
          <div className="space-y-4">
            <h3 className="text-base font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activity
            </h3>

            <div className="space-y-3">
              {request.activities.slice(0, 10).map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
              {request.activities.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No activity yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
