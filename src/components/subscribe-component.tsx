import { getSubscriberCount } from "@/data/subscribe";
import { SubscribeInput } from "./subscribe-input";
import { BellRing } from "lucide-react";
import { unstable_cache } from "next/cache";
import { ActionResponse } from "@/data/types/action-response";

// Cache the subscriber count for 1 hour
const getCachedSubscriberCount = unstable_cache(
  async () => {
    const state = await getSubscriberCount();
    return (
      Number(
        (state as unknown as ActionResponse<{ count: number }>)?.data?.count
      ) || 0
    );
  },
  ["subscriber-count"],
  {
    revalidate: 3600, // 1 hour in seconds
    tags: ["subscriber-count"],
  }
);

export async function SubscribeComponent() {
  const subscribers = await getCachedSubscriberCount();
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <p className="text-sm text-teal-300 flex items-center gap-2">
        <BellRing className="size-3.5" />
        subscribe to know when ready
      </p>
      <p className="text-sm text-muted-foreground">
        <span className="text-teal-300">{subscribers}</span> joined (i
        don&apos;t spam)
      </p>
      <SubscribeInput />
    </div>
  );
}
