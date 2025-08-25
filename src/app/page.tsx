import { Hero } from "@/components/hero";
import { DottedSeparator } from "@/components/dotted-separator";
import { AboutMe } from "@/components/about-me";
import { Shipped } from "@/components/shipped";

export default function Home() {
  return (
    <>
      <Hero />
      <DottedSeparator />
      <Shipped />
      <DottedSeparator />
      <AboutMe />
    </>
  );
}
