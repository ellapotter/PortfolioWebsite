"use client";

import { useMemo, useState } from "react";
import {
  projectFilters,
  projects,
  projectsSection,
  type ProjectCategory,
} from "@/data/projects";
import { AnimatedDiv } from "@/components/ui/AnimatedDiv";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProjectCard } from "@/components/ui/ProjectCard";
import {
  sectionContainer,
  sectionDescription,
  sectionLabel,
  sectionPadding,
  sectionTitle,
} from "@/components/ui/sectionLayout";

type FilterId = "all" | ProjectCategory;

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <AnimatedSection id="projects" className={`bg-rose-50/60 ${sectionPadding}`}>
      <div className={sectionContainer}>
        <div className="mb-10 text-center lg:mb-12">
          <p className={sectionLabel}>{projectsSection.label}</p>
          <h2 className={sectionTitle}>{projectsSection.title}</h2>
          <p className={sectionDescription}>{projectsSection.description}</p>
        </div>

        <div className="mb-12 flex justify-center lg:mb-16">
          <div className="inline-flex max-w-full flex-wrap justify-center gap-2 rounded-full border border-pink-200 bg-white p-1.5 shadow-sm shadow-pink-100 lg:gap-3 lg:p-2">
            {projectFilters.map((filter) => {
              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded-full px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider transition-all sm:px-5 sm:text-xs lg:px-6 lg:py-2.5 lg:text-sm ${
                    isActive
                      ? "bg-pink-600 text-white shadow-md shadow-pink-200"
                      : "text-plum-700 hover:bg-pink-50 hover:text-pink-700"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <AnimatedDiv
              key={project.id}
              delay={index * 0.08}
              className="h-full"
            >
              <ProjectCard project={project} index={index} />
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
