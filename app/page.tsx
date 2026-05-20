import { HeroGroup } from "@/components/sections/hero-group";
import { WorkGrid } from "@/components/sections/work-grid";
// import { Results } from "@/components/sections/results"; // TODO: restore when client reviews are in
import { DarkTransitionGroup, LightTransitionGroup } from "@/components/sections/values-group";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Cta } from "@/components/sections/cta";
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import type { SanityProject } from "@/sanity/lib/queries";

export default async function Home() {
  const projects = await client.fetch<SanityProject[]>(PROJECTS_QUERY);

  return (
    <main id="main-content">
      {/*
        HeroGroup contains:
          - Hero section (100vh)
          - Transition div (75vh, margin-top -8em, margin-bottom -11em)
        Both fade to 0 together, revealing the dark body beneath.
        The -11em margin-bottom on the transition div naturally pulls
        WorkGrid upward, creating the seamless overlap into the dark zone.
      */}
      <HeroGroup />
      <WorkGrid projects={projects} />
      {/* <Results /> */}{/* TODO: restore when client reviews are in */}
      <DarkTransitionGroup />
      <Services />
      {/* Spacer — same height as the transition div, gives breathing room before About */}
      <div data-section-theme="light" aria-hidden className="h-[21vh] sm:h-[42vh] bg-sage" />
      <About />
      <LightTransitionGroup />
      <Cta />
    </main>
  );
}
