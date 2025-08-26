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
import { Separator } from "@/components/ui/separator";
import { useCreateRequest } from "@/hooks/use-requests";
import { toast } from "sonner";
import { ArrowLeft, AlertCircle, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

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

  const createRequestMutation = useCreateRequest();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    createRequestMutation.mutate(
      {
        title: title.trim(),
        description: description.trim(),
        priority,
      },
      {
        onSuccess: (data) => {
          if (
            data.data?.success &&
            data.data &&
            typeof data.data === "object" &&
            data.data !== null &&
            "id" in data.data
          ) {
            router.push(`/dashboard/requests/${(data.data as any).id}`);
          } else {
            router.push("/dashboard/requests");
          }
        },
      }
    );
  };

  const selectedPriority = priorityOptions.find((p) => p.value === priority);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Link href="/dashboard/requests">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Requests
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">New Request</h1>
          <p className="text-muted-foreground">
            Describe what you'd like me to build or improve.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Request Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Create a hero section with signup form"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={255}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    {title.length}/255 characters
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your request in detail. Include any specific requirements, design preferences, or functionality you need..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Be as specific as possible. This helps me deliver exactly
                    what you need.
                  </p>
                </div>

                {/* Priority */}
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={priority.toString()}
                    onValueChange={(value) => setPriority(parseInt(value))}
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

                <Separator />

                {/* Submit */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Ready to submit?</p>
                    <p className="text-xs text-muted-foreground">
                      Your request will be added to your backlog.
                    </p>
                  </div>
                  <Button
                    type="submit"
                    disabled={createRequestMutation.isPending}
                    className="sm:w-auto w-full"
                  >
                    {createRequestMutation.isPending
                      ? "Creating..."
                      : "Create Request"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Process Info */}
          <div className="space-y-4">
            <h3 className="text-base font-medium">How it works</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 shrink-0">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Added to backlog</p>
                  <p className="text-xs text-muted-foreground">
                    Your request starts in the backlog queue
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-500/10 p-2 shrink-0">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Becomes active</p>
                  <p className="text-xs text-muted-foreground">
                    Only 1 request can be active at a time
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-500/10 p-2 shrink-0">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Delivered in 2-3 days</p>
                  <p className="text-xs text-muted-foreground">
                    Most requests completed within this timeframe
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Examples */}
          <div className="space-y-4">
            <h3 className="text-base font-medium">Example Requests</h3>
            <div className="space-y-4">
              {requestExamples.map((category) => (
                <div key={category.category} className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    {category.category}
                  </Badge>
                  <ul className="space-y-1">
                    {category.examples.map((example, index) => (
                      <li
                        key={index}
                        className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors p-1 rounded hover:bg-muted"
                        onClick={() => {
                          if (!title) setTitle(example);
                        }}
                      >
                        • {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className="text-xs text-muted-foreground">
                💡 Click any example to use it as your title
              </p>
            </div>
          </div>

          <Separator />

          {/* Tips */}
          <div className="space-y-4">
            <h3 className="text-base font-medium">Tips for better requests</h3>
            <div className="space-y-3 text-xs text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Be specific</p>
                <p>
                  Include details about functionality, design, and any
                  requirements
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground">Share references</p>
                <p>Link to examples, mockups, or similar websites you like</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Break it down</p>
                <p>Large features work better as multiple smaller requests</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Think scope</p>
                <p>Each request should be completable in 2-3 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
