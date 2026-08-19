import { GraduationCap } from "lucide-react";
import { experience } from "@/data/portfolio";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  sectionContainer,
  sectionPaddingCompact,
} from "@/components/ui/sectionLayout";

export function ExperienceBanner() {
  return (
    <AnimatedSection id="experience" className={`bg-pink-50 ${sectionPaddingCompact}`}>
      <div className={sectionContainer}>
        <div className="space-y-4 lg:space-y-6">
          {experience.map((role) => (
            <div key={`${role.organization}-${role.title}`} className="flex flex-col gap-4 rounded-2xl border border-pink-200 bg-white p-6 shadow-md shadow-pink-100 sm:flex-row sm:items-center sm:justify-between lg:rounded-3xl lg:gap-8 lg:p-8">
              <div className="flex items-start gap-4 lg:gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-100 lg:h-14 lg:w-14">
                  <GraduationCap className="h-6 w-6 text-pink-600 lg:h-7 lg:w-7" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-pink-500 lg:text-sm">
                    Experience
                  </p>
                  <h2 className="text-lg font-semibold text-pink-950 lg:text-xl">
                    {role.title}
                  </h2>
                  <p className="text-sm text-pink-700 lg:text-base">
                    {role.organization} · {role.period}
                  </p>
                </div>
              </div>

              <ul className="space-y-2 sm:max-w-lg lg:max-w-xl">
                {role.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-sm text-pink-800 lg:text-base"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500 lg:mt-2 lg:h-2 lg:w-2" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
