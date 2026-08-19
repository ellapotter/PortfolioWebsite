import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { GraduationCap, Presentation } from "lucide-react";
import { about, experience } from "@/data/portfolio";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  sectionContainer,
  sectionLabel,
  sectionPadding,
  sectionTitle,
} from "@/components/ui/sectionLayout";

export function About() {
  const portraitSource = existsSync(join(process.cwd(), "public", about.portrait.src))
    ? about.portrait.src
    : about.portrait.fallbackSrc;

  return (
    <AnimatedSection id="about" className={`bg-white ${sectionPadding}`}>
      <div className={sectionContainer}>
        <div className="mb-10 text-center lg:mb-14">
          <p className={sectionLabel}>{about.heading}</p>
          <h2 className={sectionTitle}>A little about me</h2>
        </div>

        <div className="mb-14 grid items-center gap-8 md:grid-cols-[minmax(16rem,0.82fr)_minmax(0,1.18fr)] lg:mb-20 lg:gap-14">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-pink-200 bg-pink-50 card-shadow">
            <Image
              src={portraitSource}
              alt={about.portrait.alt}
              fill
              sizes="(max-width: 768px) 90vw, 38vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="max-w-2xl text-pretty text-base leading-8 text-plum-700 lg:text-lg lg:leading-9">
              {about.bio}
            </p>
          </div>
        </div>

        <div className="space-y-4 lg:space-y-6">
          <h3 className={`${sectionLabel} text-left lg:text-base`}>Education</h3>

          {about.education.map((entry) => (
            <div
              key={`${entry.school}-${entry.period}`}
              className="flex flex-col gap-4 rounded-3xl border border-pink-200 bg-pink-50/70 p-6 card-shadow sm:flex-row sm:items-start lg:p-8"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-100 lg:h-14 lg:w-14">
                <GraduationCap className="h-6 w-6 text-pink-600 lg:h-7 lg:w-7" />
              </div>

              <div className="flex-1">
                <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h4 className="text-lg font-semibold text-plum-950 lg:text-xl">
                    {entry.degree}
                  </h4>
                  <span className="font-mono text-sm text-pink-500 lg:text-base">
                    {entry.period}
                  </span>
                </div>
                <p className="mb-2 font-medium text-pink-700 lg:text-lg">{entry.school}</p>
                <p className="text-sm leading-relaxed text-plum-700 lg:text-base">
                  {entry.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div id="experience" className="mt-12 space-y-4 lg:mt-16 lg:space-y-6">
          <h3 className={`${sectionLabel} text-left lg:text-base`}>Experience</h3>
          {experience.map((role) => (
            <article key={`${role.organization}-${role.title}`} className="grid gap-6 rounded-3xl border border-pink-200 bg-white p-6 card-shadow md:grid-cols-[minmax(14rem,0.72fr)_minmax(0,1.28fr)] lg:gap-10 lg:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-100">
                  <Presentation className="h-6 w-6 text-pink-700" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-plum-950 lg:text-xl">{role.title}</h4>
                  <p className="mt-1 font-medium text-pink-700">{role.organization}</p>
                  <p className="mt-1 font-mono text-sm text-plum-600">{role.period}</p>
                </div>
              </div>
              <ul className="space-y-3 border-pink-100 md:border-l md:pl-8">
                {role.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm leading-relaxed text-plum-700 lg:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
