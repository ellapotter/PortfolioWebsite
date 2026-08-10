"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/data/projects";
import { getProjectCategoryLabel } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const categoryLabel = getProjectCategoryLabel(project.category);
  const caseLink = project.caseUrl && project.caseUrl !== "#" ? project.caseUrl : null;
  const isExternalCaseLink = caseLink?.startsWith("http") ?? false;

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-3xl bg-white card-shadow transition-all motion-safe:hover:-translate-y-1 ${
        project.featured
          ? "border-2 border-pink-400 ring-4 ring-pink-100 shadow-pink-200 hover:border-pink-500 hover:shadow-pink-300"
          : "border border-pink-200 shadow-pink-100 hover:border-pink-300 hover:shadow-pink-200"
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-pink-100">
        {caseLink ? (
          <Link href={caseLink} aria-label={`View ${project.title} project`} className="absolute inset-0 z-10 rounded-t-3xl focus-visible:outline-offset-[-4px]">
            <Image
              src={project.cardImage ?? project.image}
              alt={project.cardImageAlt ?? project.imageAlt ?? `${project.title} preview`}
              fill
              className={`${(project.cardImageFit ?? project.imageFit) === "contain" ? "object-contain p-6" : "object-cover"} transition-transform duration-500 motion-safe:group-hover:scale-[1.035]`}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          </Link>
        ) : (
          <Image
            src={project.cardImage ?? project.image}
            alt={project.cardImageAlt ?? project.imageAlt ?? `${project.title} preview`}
            fill
            className={(project.cardImageFit ?? project.imageFit) === "contain" ? "object-contain p-6" : "object-cover"}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        )}

        <span className="pointer-events-none absolute left-4 top-4 z-20 rounded-full border border-pink-200/80 bg-white/90 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-pink-700 backdrop-blur-sm">
          • {categoryLabel}
        </span>
        {project.featured && (
          <span className="pointer-events-none absolute right-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-pink-600 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white shadow-md shadow-pink-300">
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            Featured Project
          </span>
        )}
      </div>

      <div className="relative flex flex-1 flex-col p-6 lg:p-8">
        <span
          className="pointer-events-none absolute bottom-4 right-4 select-none font-mono text-7xl font-bold leading-none text-pink-100 lg:text-8xl"
          aria-hidden="true"
        >
          {number}
        </span>

        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-pink-400 lg:text-xs">
          —— {categoryLabel}
        </p>

        <h3 className="relative z-10 mb-3 text-xl font-bold tracking-tight text-plum-950 lg:text-2xl">
          {caseLink ? <Link href={caseLink} className="rounded-sm transition-colors hover:text-pink-700">{project.title}</Link> : project.title}
        </h3>

        <p className="relative z-10 mb-6 flex-1 text-sm leading-relaxed text-plum-700 lg:text-base">
          {project.description}
        </p>

        {project.technologies && (
          <ul className="relative z-10 mb-6 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-pink-200 bg-pink-50 px-2.5 py-1 font-mono text-[10px] font-semibold text-pink-700 lg:text-xs"
              >
                {technology}
              </li>
            ))}
          </ul>
        )}

        <div className="relative z-10 flex items-center justify-between gap-4 border-t border-pink-100 pt-4">
          {caseLink ? (
            <Link
              href={caseLink}
              {...(isExternalCaseLink && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
              className="rounded-full bg-pink-600 px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-pink-700"
            >
              View Project →
            </Link>
          ) : (
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pink-400">
              Coming soon
            </span>
          )}

          <div className="flex items-center gap-2">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-pink-200 bg-pink-50 text-pink-600 transition-colors hover:border-pink-300 hover:bg-pink-100 hover:text-pink-500"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.github && project.githubStatus !== "coming-soon" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-3 text-xs font-semibold text-plum-700 transition-colors hover:border-pink-300 hover:bg-pink-100 hover:text-pink-700"
              >
                <SiGithub className="h-4 w-4" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
