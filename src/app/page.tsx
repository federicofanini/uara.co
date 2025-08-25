import { Hero } from "@/components/hero";
import { DottedSeparator } from "@/components/dotted-separator";
import { AboutMe } from "@/components/about-me";

export default function Home() {
  return (
    <>
      <Hero />
      <DottedSeparator />
      <AboutMe />
    </>
  );
}
