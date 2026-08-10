import { GraduationCap } from "lucide-react";
import { about } from "@/data/portfolio";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  sectionContainer,
  sectionDescription,
  sectionLabel,
  sectionPadding,
  sectionTitle,
} from "@/components/ui/sectionLayout";

export function About() {
  return (
    <AnimatedSection id="about" className={`bg-white ${sectionPadding}`}>
      <div className={sectionContainer}>
        <div className="mb-12 text-center lg:mb-16">
          <p className={sectionLabel}>{about.heading}</p>
          <h2 className={sectionTitle}>A little about me</h2>
        </div>

        <p className={`mb-12 max-w-4xl lg:mb-16 ${sectionDescription}`}>{about.bio}</p>

        <div className="space-y-4 lg:space-y-6">
          <h3 className={`${sectionLabel} text-left lg:text-base`}>Education</h3>

          {about.education.map((entry) => (
            <div
              key={`${entry.school}-${entry.period}`}
              className="flex flex-col gap-4 rounded-2xl border border-pink-200 bg-pink-50 p-6 shadow-sm shadow-pink-100 sm:flex-row sm:items-start lg:rounded-3xl lg:p-8"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-100 lg:h-14 lg:w-14">
                <GraduationCap className="h-6 w-6 text-pink-600 lg:h-7 lg:w-7" />
              </div>

              <div className="flex-1">
                <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h4 className="text-lg font-semibold text-pink-950 lg:text-xl">
                    {entry.degree}
                  </h4>
                  <span className="font-mono text-sm text-pink-500 lg:text-base">
                    {entry.period}
                  </span>
                </div>
                <p className="mb-2 font-medium text-pink-700 lg:text-lg">{entry.school}</p>
                <p className="text-sm leading-relaxed text-pink-800 lg:text-base">
                  {entry.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
