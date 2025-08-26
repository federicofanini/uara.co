"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useCreateRequest, useCreateBulkRequests } from "@/hooks/use-requests";
import { toast } from "sonner";
import {
  ArrowLeft,
  CheckCircle,
  Loader2,
  Plus,
  Trash2,
  Sparkles,
  Zap,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { type RequestSplitResult } from "@/packages/ai";

// Type for editable subtasks
interface EditableSubtask {
  id: string;
  title: string;
  description: string;
  isEditing?: boolean;
}

const priorityOptions = [
  { value: 1, label: "High", description: "Urgent, needs immediate attention" },
  {
    value: 2,
    label: "Medium-High",
    description: "Important, should be done soon",
  },
  { value: 3, label: "Medium", description: "Standard priority" },
  { value: 4, label: "Medium-Low", description: "Can wait a bit" },
  { value: 5, label: "Low", description: "Nice to have" },
];

const requestExamples = [
  {
    category: "Landing Page",
    examples: [
      "Create a hero section with CTA button",
      "Build a pricing table component",
      "Add a testimonials section",
      "Create a contact form with validation",
    ],
  },
  {
    category: "Website Improvements",
    examples: [
      "Optimize page loading speed",
      "Fix mobile responsiveness issues",
      "Add dark mode support",
      "Improve SEO meta tags",
    ],
  },
  {
    category: "Integrations",
    examples: [
      "Connect Stripe payment processing",
      "Add email newsletter signup",
      "Integrate analytics tracking",
      "Set up contact form backend",
    ],
  },
];

export function NewRequestForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<number>(3);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<RequestSplitResult | null>(null);
  const [subtasks, setSubtasks] = useState<EditableSubtask[]>([]);
  const [showSubtasks, setShowSubtasks] = useState(false);

  const createRequestMutation = useCreateRequest();
  const createBulkRequestsMutation = useCreateBulkRequests();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // If we already have an analysis and subtasks, create the requests
    if (showSubtasks && subtasks.length > 0) {
      handleCreateBulkRequests();
      return;
    }

    // First, analyze the request with AI
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/ai/analyze-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `API request failed: ${response.statusText}`
        );
      }

      const analysis: RequestSplitResult = await response.json();
      console.log("AI Analysis Result:", analysis);
      setAnalysisResult(analysis);

      if (analysis.isTooBig && analysis.subtasks.length > 0) {
        // Convert to editable subtasks and show them
        const editableSubtasks: EditableSubtask[] = analysis.subtasks.map(
          (subtask, index) => ({
            id: `subtask-${index}`,
            title: subtask.title,
            description: subtask.description,
          })
        );
        setSubtasks(editableSubtasks);
        setShowSubtasks(true);
        toast.success("ai thinks this is too big → split into smaller tasks");
        console.log(
          "AI suggested split into",
          editableSubtasks.length,
          "tasks:",
          editableSubtasks
        );
      } else {
        // Create single request if it's the right size
        console.log("AI says request is fine, creating single request");
        createSingleRequest();
      }
    } catch (error) {
      console.error("AI analysis failed:", error);

      // Check if it's an API key error
      if (error instanceof Error && error.message.includes("API key")) {
        toast.error(
          "OpenAI API key is not configured. Please set up your API key and try again."
        );
      } else {
        toast.error("AI analysis failed, creating request anyway...");
      }

      // Create single request as fallback
      createSingleRequest();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const createSingleRequest = () => {
    console.log("Creating single request:", {
      title: title.trim(),
      description: description.trim(),
      priority,
    });
    createRequestMutation.mutate(
      {
        title: title.trim(),
        description: description.trim(),
        priority,
      },
      {
        onSuccess: (data) => {
          console.log("Single request creation successful:", data);
          if (
            data.data?.success &&
            data.data &&
            typeof data.data === "object" &&
            data.data !== null &&
            "id" in data.data
          ) {
            router.push(
              `/dashboard/requests/${(data.data as Record<string, unknown>).id}`
            );
          } else {
            router.push("/dashboard/requests");
          }
        },
        onError: (error) => {
          console.error("Single request creation failed:", error);
        },
      }
    );
  };

  const handleCreateBulkRequests = () => {
    if (!subtasks.length) return;

    const requests = subtasks.map((subtask) => ({
      title: subtask.title,
      description: subtask.description,
      priority,
    }));

    console.log("Creating bulk requests:", requests);

    createBulkRequestsMutation.mutate(
      { requests },
      {
        onSuccess: (data) => {
          const count = Array.isArray(data.data)
            ? data.data.length
            : subtasks.length;
          toast.success(`queued ${count} tasks. let's ship.`);
          console.log("Bulk creation successful, redirecting to dashboard");
          router.push("/dashboard/requests");
        },
        onError: (error) => {
          console.error("Bulk creation failed:", error);
        },
      }
    );
  };

  // Subtask management functions
  const updateSubtask = (id: string, updates: Partial<EditableSubtask>) => {
    setSubtasks(
      subtasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteSubtask = (id: string) => {
    setSubtasks(subtasks.filter((task) => task.id !== id));
  };

  const addSubtask = () => {
    const newSubtask: EditableSubtask = {
      id: `subtask-${Date.now()}`,
      title: "",
      description: "",
      isEditing: true,
    };
    setSubtasks([...subtasks, newSubtask]);
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setSubtasks([]);
    setShowSubtasks(false);
  };

  const selectedPriority = priorityOptions.find((p) => p.value === priority);

  return (
    <div className=" flex flex-col">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-foreground">
            describe what you need<span className="text-teal-300">.</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            ai will split big requests into smaller tasks before creating them.
          </p>
        </div>
        <Link href="/dashboard/requests" className="ml-auto">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Requests
          </Button>
        </Link>
      </div>

      <div className="w-full space-y-8">
        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Original Request */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-medium">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g., Create a hero section with signup form"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={255}
                required
                className="text-base"
                disabled={showSubtasks}
              />
              <p className="text-xs text-muted-foreground">
                {title.length}/255 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-medium">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your request in detail. Include any specific requirements, design preferences, or functionality you need..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                required
                className="text-base"
                disabled={showSubtasks}
              />
              <p className="text-xs text-muted-foreground">
                be as specific as possible. this helps me deliver exactly what
                you need.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-base font-medium">
                Priority
              </Label>
              <Select
                value={priority.toString()}
                onValueChange={(value) => setPriority(parseInt(value))}
                disabled={showSubtasks}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      <div className="flex items-center gap-2">
                        <span>{option.label}</span>
                        <span className="text-xs text-muted-foreground">
                          - {option.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedPriority && (
                <p className="text-xs text-muted-foreground">
                  {selectedPriority.description}
                </p>
              )}
            </div>
          </div>

          {/* AI Split Results */}
          {showSubtasks && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-teal-400" />
                  <h2 className="text-lg font-medium">
                    ai split this into {subtasks.length} smaller tasks
                  </h2>
                </div>
                <Button variant="ghost" size="sm" onClick={resetAnalysis}>
                  start over
                </Button>
              </div>

              {analysisResult && (
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground">
                    {analysisResult.suggestion}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {subtasks.map((subtask, index) => (
                  <SubtaskCard
                    key={subtask.id}
                    subtask={subtask}
                    index={index}
                    onUpdate={updateSubtask}
                    onDelete={deleteSubtask}
                  />
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={addSubtask}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                add another task
              </Button>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 pt-6">
            {!showSubtasks ? (
              <div className="text-center space-y-4">
                <Button
                  type="submit"
                  disabled={isAnalyzing || createRequestMutation.isPending}
                  size="lg"
                  className="text-base px-8"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      analyzing...
                    </>
                  ) : createRequestMutation.isPending ? (
                    "creating..."
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      analyze & create
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">
                  ai will check if this needs to be split into smaller tasks
                </p>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <Button
                  type="submit"
                  disabled={
                    createBulkRequestsMutation.isPending ||
                    subtasks.length === 0
                  }
                  size="lg"
                  className="text-base px-8"
                >
                  {createBulkRequestsMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      creating {subtasks.length} tasks...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      create {subtasks.length} tasks
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">
                  only 1 task will be active at a time. the rest will wait in
                  your backlog.
                </p>
              </div>
            )}
          </div>
        </form>

        {/* Tips Section */}
        <div className="w-full space-y-6 pt-8 border-t border-border">
          <h2 className="text-lg font-medium text-foreground">
            tips for better requests
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-teal-400 font-mono text-sm mt-1">◇</span>
                <div>
                  <p className="text-sm font-medium">be specific</p>
                  <p className="text-xs text-muted-foreground">
                    include details about functionality, design, and any
                    requirements.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-teal-400 font-mono text-sm mt-1">◇</span>
                <div>
                  <p className="text-sm font-medium">share references</p>
                  <p className="text-xs text-muted-foreground">
                    link to examples, mockups, or similar websites you like.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-teal-400 font-mono text-sm mt-1">◇</span>
                <div>
                  <p className="text-sm font-medium">think scope</p>
                  <p className="text-xs text-muted-foreground">
                    each request should be completable in 2-3 days.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-teal-400 font-mono text-sm mt-1">◇</span>
                <div>
                  <p className="text-sm font-medium">trust the ai</p>
                  <p className="text-xs text-muted-foreground">
                    if it suggests splitting, it&apos;s probably right.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="w-full space-y-6">
          <h2 className="text-lg font-medium text-foreground">
            example requests
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {requestExamples.map((category) => (
              <div key={category.category} className="space-y-3">
                <Badge variant="outline" className="text-xs">
                  {category.category}
                </Badge>
                <div className="space-y-2">
                  {category.examples.map((example, index) => (
                    <div
                      key={index}
                      className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors p-2 rounded hover:bg-muted/50 border border-transparent hover:border-border"
                      onClick={() => {
                        if (!title && !showSubtasks) setTitle(example);
                      }}
                    >
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center">
            💡 click any example to use it as your title
          </p>
        </div>
      </div>
    </div>
  );
}

// SubtaskCard Component
interface SubtaskCardProps {
  subtask: EditableSubtask;
  index: number;
  onUpdate: (id: string, updates: Partial<EditableSubtask>) => void;
  onDelete: (id: string) => void;
}

function SubtaskCard({ subtask, index, onUpdate, onDelete }: SubtaskCardProps) {
  const [localTitle, setLocalTitle] = useState(subtask.title);
  const [localDescription, setLocalDescription] = useState(subtask.description);

  const isEditing = subtask.isEditing || false;

  const handleSave = () => {
    onUpdate(subtask.id, {
      title: localTitle.trim(),
      description: localDescription.trim(),
      isEditing: false,
    });
  };

  const handleCancel = () => {
    setLocalTitle(subtask.title);
    setLocalDescription(subtask.description);
    onUpdate(subtask.id, { isEditing: false });
  };

  const handleEdit = () => {
    onUpdate(subtask.id, { isEditing: true });
  };

  return (
    <div className="p-3 sm:p-4 rounded-lg border border-border bg-card space-y-3">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-xs">
          Task {index + 1}
        </Badge>
        <div className="flex items-center gap-1 sm:gap-2">
          {!isEditing && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="h-6 w-6 p-0"
            >
              <Edit className="h-3 w-3" />
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onDelete(subtask.id)}
            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <Input
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            placeholder="Task title..."
            className="text-sm"
          />
          <Textarea
            value={localDescription}
            onChange={(e) => setLocalDescription(e.target.value)}
            placeholder="Task description..."
            rows={3}
            className="text-sm"
          />
          <div className="flex gap-2">
            <Button type="button" size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">{subtask.title}</h4>
          <p className="text-xs text-muted-foreground">{subtask.description}</p>
        </div>
      )}
    </div>
  );
}
