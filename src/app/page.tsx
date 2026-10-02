import About from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import { getSiteSettings } from "@/lib/content";

export default async function Home() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <Hero siteSettings={siteSettings} />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Certifications />
      <Contact />
    </>
  );
}
