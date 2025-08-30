import { Hero } from "@/components/hero";
import { DottedSeparator } from "@/components/dotted-separator";
import { AboutMe } from "@/components/about-me";
import { Shipped } from "@/components/shipped";
import { Pricing } from "@/components/pricing";
import { Rules, HowItWorksCards } from "@/components/rules";
import { FAQ } from "@/components/faq";
import { WallOfLove } from "@/components/wall-of-love";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorksCards />
      <Shipped />

      <WallOfLove />

      <Pricing />
      <FAQ />

      <AboutMe />
    </>
  );
}
