"use client";

import { useState } from "react";
import { Badge } from "./ui/badge";

interface Client {
  id: string;
  name: string;
  email: string;
  projectType: string;
  spotNumber: number;
  startDate: Date;
  completionDate: Date;
}

// Helper function to calculate business days
function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let addedDays = 0;

  while (addedDays < days) {
    result.setDate(result.getDate() + 1);
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (result.getDay() !== 0 && result.getDay() !== 6) {
      addedDays++;
    }
  }

  return result;
}

// Helper function to format date
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function Queue() {
  const [clients, setClients] = useState<Client[]>([
    // Example clients - replace with empty array [] for production
    //{
    //  id: "1",
    //  name: "John Doe",
    //  email: "john@example.com",
    //  projectType: "MVP Website",
    //  spotNumber: 1,
    //  startDate: new Date(),
    //  completionDate: addBusinessDays(new Date(), 5),
    //},
  ]);

  const totalSpots = 5;
  const availableSpots = totalSpots - clients.length;

  return (
    <div className="w-full space-y-16 max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-medium text-foreground">
          development queue<span className="text-teal-300">.</span>
        </h2>
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-xs font-mono">
            <span className="text-teal-300 font-bold">{availableSpots}/5</span>{" "}
            spots left.
          </Badge>
        </div>
      </div>

      {/* Queue Display */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Array.from({ length: totalSpots }, (_, index) => {
            const spotNumber = index + 1;
            const client = clients.find((c) => c.spotNumber === spotNumber);

            return (
              <div
                key={spotNumber}
                className={`p-4 border rounded-none transition-all ${
                  client
                    ? "border-teal-300/30 bg-teal-300/5"
                    : "border-dashed border-muted-foreground/30 bg-background/50"
                }`}
              >
                <div className="text-center">
                  <div className="text-xs font-mono text-muted-foreground mb-2">
                    spot #{spotNumber}
                  </div>
                  {client ? (
                    <div className="space-y-2">
                      <div className="w-8 h-8 bg-teal-300/20 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-xs font-medium text-teal-300">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium truncate">
                          {client.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {client.projectType}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {formatDate(client.completionDate)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-8 h-8 border-2 border-dashed border-muted-foreground/30 rounded-full mx-auto" />
                      <p className="text-xs text-muted-foreground font-mono">
                        available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Queue Status */}
        <div className="text-center">
          {availableSpots > 0 ? (
            <p className="text-sm text-muted-foreground font-mono">
              → {availableSpots} spot{availableSpots !== 1 ? "s" : ""} available
              for immediate booking. updated manually (i&apos;m fast, don&apos;t
              worry).
            </p>
          ) : (
            <p className="text-sm text-muted-foreground font-mono">
              → queue is full • next available spot in{" "}
              {clients.length > 0
                ? Math.ceil(
                    (clients[clients.length - 1].completionDate.getTime() -
                      new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  )
                : 0}{" "}
              days
            </p>
          )}
        </div>

        {/* Current Timeline */}
        {clients.length > 0 && (
          <div className="border-t border-border pt-8">
            <h3 className="text-lg font-medium text-center mb-6">
              current timeline
            </h3>
            <div className="space-y-3">
              {clients
                .sort((a, b) => a.spotNumber - b.spotNumber)
                .map((client, index) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between p-3 bg-background/50 border border-border rounded-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-muted-foreground">
                        #{client.spotNumber}
                      </span>
                      <span className="text-sm font-medium">{client.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {client.projectType}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {formatDate(client.startDate)} →{" "}
                      {formatDate(client.completionDate)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
