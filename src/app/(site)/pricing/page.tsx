import { FAQ } from "@/components/faq";
import { Pricing } from "@/components/pricing";
import { Rules } from "@/components/rules";
import { DottedSeparator } from "@/components/dotted-separator";

export default function PricingPage() {
  return (
    <div>
      <Pricing />
      <DottedSeparator />
      <Rules />
      <DottedSeparator />
      <FAQ />
    </div>
  );
}
