"use client";

import type { ComponentType } from "react";
import {
  SiArduino,
  SiCplusplus,
  SiDocker,
  SiFlutter,
  SiGit,
  SiHtml5,
  SiMysql,
  SiOpenjdk,
  SiPython,
  SiRubyonrails,
} from "react-icons/si";
import type { Skill, SkillIcon } from "@/data/portfolio";
import { skills } from "@/data/portfolio";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  sectionContainer,
  sectionDescription,
  sectionLabel,
  sectionPadding,
  sectionTitle,
} from "@/components/ui/sectionLayout";

const iconMap: Record<SkillIcon, ComponentType<{ className?: string }>> = {
  openjdk: SiOpenjdk,
  python: SiPython,
  cplusplus: SiCplusplus,
  flutter: SiFlutter,
  rubyonrails: SiRubyonrails,
  mysql: SiMysql,
  html5: SiHtml5,
  arduino: SiArduino,
  git: SiGit,
  docker: SiDocker,
};

function SkillLogo({ skill }: { skill: Skill }) {
  const Icon = iconMap[skill.icon];

  return (
    <div className="group flex flex-col items-center gap-3 rounded-2xl border border-pink-200 bg-white p-5 shadow-sm shadow-pink-100 transition-all hover:-translate-y-1 hover:border-pink-300 hover:shadow-md hover:shadow-pink-200 lg:gap-4 lg:rounded-3xl lg:p-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-pink-50 lg:h-16 lg:w-16">
        <Icon className="h-8 w-8 text-pink-700 transition-colors group-hover:text-pink-500 lg:h-9 lg:w-9" />
      </div>
      <span className="font-mono text-xs font-medium text-pink-800 lg:text-sm">
        {skill.name}
      </span>
    </div>
  );
}

export function Skills() {
  return (
    <AnimatedSection id="skills" className={`bg-rose-50/60 ${sectionPadding}`}>
      <div className={sectionContainer}>
        <div className="mb-12 text-center lg:mb-16">
          <p className={sectionLabel}>Skills</p>
          <h2 className={sectionTitle}>Tools & technologies I use</h2>
          <p className={sectionDescription}>
            Languages, frameworks, and tools I work with across software, web, and
            embedded projects.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:gap-6 2xl:gap-8">
          {skills.map((skill) => (
            <SkillLogo key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
