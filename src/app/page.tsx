import { Hero } from "@/components/hero";
import { DottedSeparator } from "@/components/dotted-separator";
import { AboutMe } from "@/components/about-me";
import { Shipped } from "@/components/shipped";
import { Pricing } from "@/components/pricing";
import { Rules } from "@/components/rules";
import { FAQ } from "@/components/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <DottedSeparator />
      <Shipped />
      <Pricing />
      <DottedSeparator />
      <Rules />
      <DottedSeparator />
      <FAQ />
      <DottedSeparator />
      <AboutMe />
    </>
  );
}
