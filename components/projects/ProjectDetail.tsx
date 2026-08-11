import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CircleCheck,
  Database,
  ExternalLink,
  GitBranch,
  LayoutDashboard,
  Smartphone,
  Users,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project, ProjectCaseStudy } from "@/data/projects";
import { TechBadge } from "@/components/ui/TechBadge";
import { GiftWiseProjectDetail } from "@/components/projects/GiftWiseProjectDetail";
import { ElectionSystemProjectDetail } from "@/components/projects/ElectionSystemProjectDetail";
import { RideMatchProjectDetail } from "@/components/projects/RideMatchProjectDetail";
import {
  sectionContainer,
  sectionLabel,
  sectionPadding,
  sectionTitle,
} from "@/components/ui/sectionLayout";

type ProjectDetailProps = {
  project: Project;
  caseStudy: ProjectCaseStudy;
};

const cardClass =
  "rounded-2xl border border-pink-200 bg-white p-6 shadow-sm shadow-pink-100 lg:rounded-3xl lg:p-8";

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8 max-w-3xl lg:mb-10">
      <p className={sectionLabel}>{label}</p>
      <h2 className={sectionTitle}>{title}</h2>
    </div>
  );
}

export function ProjectDetail({ project, caseStudy }: ProjectDetailProps) {
  if (caseStudy.slug === "ridematch") {
    return <RideMatchProjectDetail project={project} caseStudy={caseStudy} />;
  }

  if (caseStudy.slug === "election-system") {
    return <ElectionSystemProjectDetail project={project} caseStudy={caseStudy} />;
  }

  if (caseStudy.slug === "giftwise") {
    return <GiftWiseProjectDetail project={project} caseStudy={caseStudy} />;
  }

  const componentIcons = [Smartphone, Users, LayoutDashboard];
  const heroIntro = caseStudy.hero?.intro ?? project.description;

  return (
    <main className="bg-pink-50 pt-28 text-pink-950 md:pt-[4.75rem]">
      <article>
        <header className={`grid-bg relative overflow-hidden ${sectionPadding}`}>
          <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-pink-300/40 blur-3xl" />
          <div className={`relative ${sectionContainer}`}>
            <Link
              href="/#projects"
              className="mb-10 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-pink-700 shadow-sm transition-colors hover:border-pink-300 hover:bg-pink-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500"
            >
              <ArrowLeft className="h-4 w-4" /> Back to projects
            </Link>

            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div>
                <p className={sectionLabel}>{caseStudy.eyebrow}</p>
                <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-pink-950 sm:text-6xl lg:text-7xl">
                  {caseStudy.title}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pink-800 lg:text-xl">
                  {heroIntro}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies?.map((technology) => (
                    <TechBadge key={technology} label={technology} />
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-medium text-pink-800">
                    <span className="h-2 w-2 rounded-full bg-pink-500" aria-hidden="true" />
                    {caseStudy.status}
                  </span>
                  {project.github && project.githubStatus !== "coming-soon" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-pink-200 transition-colors hover:bg-pink-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-600"
                    >
                      <SiGithub className="h-4 w-4" /> GitHub
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                  {project.githubStatus === "coming-soon" && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-pink-300 bg-white px-4 py-2 text-sm font-medium text-pink-700">
                      Source code repository coming soon
                    </span>
                  )}
                </div>
              </div>

              <figure className="overflow-hidden rounded-3xl border border-pink-200 bg-white p-3 shadow-xl shadow-pink-200/60">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-pink-100">
                  <Image
                    src={project.image}
                    alt={caseStudy.heroImageAlt ?? "Project preview"}
                    fill
                    priority
                    className={project.imageFit === "contain" ? "object-contain p-6" : "object-cover"}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
                <figcaption className="px-2 pb-1 pt-3 text-center font-mono text-xs text-pink-600">
                  {caseStudy.slug === "embedded-systems" ? "Digital Compass Project" : `${caseStudy.title} project preview`}
                </figcaption>
              </figure>
            </div>
          </div>
        </header>

        {caseStudy.overview && (
          <section className={`bg-white ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Project overview" title={caseStudy.overview.heading} />
              <div className="grid max-w-5xl gap-5 text-base leading-relaxed text-pink-800 lg:grid-cols-2 lg:text-lg">
                {caseStudy.overview.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {caseStudy.role && (
          <section className={`bg-rose-50/60 ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Contribution" title={caseStudy.role.heading} />
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-5 text-base leading-relaxed text-pink-800 lg:text-lg">
                  {caseStudy.role.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className={cardClass}>
                  <h3 className="mb-5 text-xl font-bold text-pink-950">Core responsibilities</h3>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {caseStudy.role.responsibilities.map((responsibility) => (
                      <li key={responsibility} className="flex gap-3 text-sm leading-relaxed text-pink-800">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" aria-hidden="true" />
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {caseStudy.collaboration && (
          <section className={`bg-rose-50/60 ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Collaboration" title={caseStudy.collaboration.heading} />
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-5 text-base leading-relaxed text-pink-800 lg:text-lg">
                  {caseStudy.collaboration.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className={cardClass}>
                  <ul className="grid gap-3">
                    {caseStudy.collaboration.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-pink-800">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {caseStudy.featuredProject && (
          <section className={`bg-white ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Featured project" title={caseStudy.featuredProject.heading} />
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <div className="space-y-5 text-base leading-relaxed text-pink-800 lg:text-lg">
                  <p>{caseStudy.featuredProject.intro}</p>
                  <div className={cardClass}>
                    <h3 className="mb-4 text-xl font-bold text-pink-950">Hardware used</h3>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {caseStudy.featuredProject.hardware.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-pink-800">
                          <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={cardClass}>
                  <h3 className="mb-4 text-xl font-bold text-pink-950">Key behaviors</h3>
                  <ul className="grid gap-3">
                    {caseStudy.featuredProject.behaviors.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-pink-800">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {caseStudy.components && (
          <section className={`bg-white ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Platform" title="Three Connected System Components" />
              <div className="grid gap-6 lg:grid-cols-3">
                {caseStudy.components.map((component, index) => {
                  const Icon = componentIcons[index] ?? Smartphone;
                  return (
                    <div key={component.title} className={cardClass}>
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-pink-950">{component.title}</h3>
                      <p className="text-sm leading-relaxed text-pink-800 lg:text-base">{component.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {caseStudy.features && (
          <section className={`bg-rose-50/60 ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Capabilities" title="Key Platform Features" />
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {caseStudy.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 rounded-2xl border border-pink-200 bg-white px-4 py-3 text-sm font-medium text-pink-900 shadow-sm shadow-pink-100">
                    <CircleCheck className="h-4 w-4 shrink-0 text-pink-500" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {caseStudy.technologies && (
          <section className={`bg-white ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Tools" title="Technology Stack" />
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                {caseStudy.technologies.map((technology) => (
                  <div key={technology.name} className={cardClass}>
                    <GitBranch className="mb-4 h-5 w-5 text-pink-500" aria-hidden="true" />
                    <h3 className="mb-2 font-bold text-pink-950">{technology.name}</h3>
                    <p className="text-sm leading-relaxed text-pink-800">{technology.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {caseStudy.overview2 && (
          <section className={`grid-bg ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Architecture" title={caseStudy.overview2.heading} />
              <p className="max-w-3xl text-base leading-relaxed text-pink-800 lg:text-lg">{caseStudy.overview2.description}</p>
            </div>
          </section>
        )}

        {caseStudy.databaseDesign && (
          <section className={`bg-rose-50/60 ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Database design" title={caseStudy.databaseDesign.heading} />
              <p className="mb-8 max-w-3xl text-base leading-relaxed text-pink-800 lg:text-lg">{caseStudy.databaseDesign.intro}</p>
              <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {caseStudy.databaseDesign.domains.map((domain) => (
                  <div key={domain.title} className={cardClass}>
                    <h3 className="mb-3 text-lg font-bold text-pink-950">{domain.title}</h3>
                    <ul className="space-y-2 text-sm text-pink-800">
                      {domain.tables.map((table) => (
                        <li key={table} className="flex gap-2">
                          <span className="text-pink-500">•</span>
                          <span>{table}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className={cardClass}>
                <p className="text-sm leading-relaxed text-pink-800 lg:text-base">{caseStudy.databaseDesign.explanation}</p>
              </div>
            </div>
          </section>
        )}

        {caseStudy.userExperience && (
          <section className={`bg-white ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="User experience" title={caseStudy.userExperience.heading} />
              <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-xl font-bold text-pink-950">{caseStudy.userExperience.patron.heading}</h3>
                  <ul className="space-y-2 text-base text-pink-800">
                    {caseStudy.userExperience.patron.capabilities.map((capability) => (
                      <li key={capability} className="flex gap-3">
                        <CircleCheck className="h-5 w-5 shrink-0 text-pink-500" aria-hidden="true" />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-xl font-bold text-pink-950">{caseStudy.userExperience.staff.heading}</h3>
                  <ul className="space-y-2 text-base text-pink-800">
                    {caseStudy.userExperience.staff.capabilities.map((capability) => (
                      <li key={capability} className="flex gap-3">
                        <CircleCheck className="h-5 w-5 shrink-0 text-pink-500" aria-hidden="true" />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {caseStudy.checkoutWorkflow && (
          <section className={`bg-rose-50/60 ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Core workflow" title={caseStudy.checkoutWorkflow.heading} />
              <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                <div>
                  <p className="mb-6 text-base leading-relaxed text-pink-800 lg:text-lg">{caseStudy.checkoutWorkflow.explanation}</p>
                </div>
                <ol className="relative grid gap-4 before:absolute before:bottom-5 before:left-[1.15rem] before:top-5 before:w-px before:bg-pink-200">
                  {caseStudy.checkoutWorkflow.steps.map((step) => (
                    <li key={step.number} className="relative flex items-center gap-4 rounded-2xl border border-pink-200 bg-white p-4">
                      <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-500 font-mono text-xs font-bold text-white">
                        {step.number}
                      </span>
                      <span className="font-medium text-pink-900">{step.description}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}

        {caseStudy.sqlCapabilities && (
          <section className={`bg-white ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="SQL implementation" title={caseStudy.sqlCapabilities.heading} />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {caseStudy.sqlCapabilities.views && (
                  <div className={cardClass}>
                    <h3 className="mb-3 text-lg font-bold text-pink-950">{caseStudy.sqlCapabilities.views.heading}</h3>
                    <p className="mb-3 text-sm text-pink-800">{caseStudy.sqlCapabilities.views.description}</p>
                    <ul className="space-y-2 text-sm text-pink-800">
                      {caseStudy.sqlCapabilities.views.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-pink-500">•</span>
                          <code className="text-pink-700">{item}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {caseStudy.sqlCapabilities.triggers && (
                  <div className={cardClass}>
                    <h3 className="mb-3 text-lg font-bold text-pink-950">{caseStudy.sqlCapabilities.triggers.heading}</h3>
                    <p className="mb-3 text-sm text-pink-800">{caseStudy.sqlCapabilities.triggers.description}</p>
                    <ul className="space-y-2 text-sm text-pink-800">
                      {caseStudy.sqlCapabilities.triggers.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-pink-500">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {caseStudy.sqlCapabilities.function && (
                  <div className={cardClass}>
                    <h3 className="mb-3 text-lg font-bold text-pink-950">{caseStudy.sqlCapabilities.function.heading}</h3>
                    <p className="text-sm leading-relaxed text-pink-800">{caseStudy.sqlCapabilities.function.description}</p>
                  </div>
                )}
                {caseStudy.sqlCapabilities.procedure && (
                  <div className={cardClass}>
                    <h3 className="mb-3 text-lg font-bold text-pink-950">{caseStudy.sqlCapabilities.procedure.heading}</h3>
                    <p className="text-sm leading-relaxed text-pink-800">{caseStudy.sqlCapabilities.procedure.description}</p>
                  </div>
                )}
                {caseStudy.sqlCapabilities.queries && (
                  <div className={cardClass}>
                    <h3 className="mb-3 text-lg font-bold text-pink-950">{caseStudy.sqlCapabilities.queries.heading}</h3>
                    <ul className="space-y-2 text-sm text-pink-800">
                      {caseStudy.sqlCapabilities.queries.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-pink-500">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {caseStudy.integration && (
          <section className={`bg-rose-50/60 ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Integration" title={caseStudy.integration.heading} />
              <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-5">
                {caseStudy.integration.cards.map((card) => (
                  <div key={card.title} className={cardClass}>
                    <h3 className="mb-3 text-lg font-bold text-pink-950">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-pink-800">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {caseStudy.galleryImages && (
          <section className={`bg-white ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Visuals" title={caseStudy.slug === "embedded-systems" ? "Lab Gallery" : "Project Gallery"} />
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {caseStudy.galleryImages.map((image) => (
                  <figure key={image.src} className="overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-sm shadow-pink-100">
                    <div className="relative aspect-[4/3] overflow-hidden bg-pink-100">
                      <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                    </div>
                    <figcaption className="px-4 py-3 text-sm leading-relaxed text-pink-700">{image.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {caseStudy.labs && (
          <section className={`bg-rose-50/60 ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Lab progression" title={caseStudy.labs.heading} />
              <div className="grid gap-6 lg:grid-cols-2">
                {caseStudy.labs.cards.map((lab) => (
                  <div key={lab.title} className={cardClass}>
                    <h3 className="mb-3 text-xl font-bold text-pink-950">{lab.title}</h3>
                    <p className="text-sm leading-relaxed text-pink-800 lg:text-base">{lab.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {lab.skills.map((skill) => (
                        <li key={skill}><TechBadge label={skill} /></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {caseStudy.testing && (
          <section className={`bg-white ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Testing" title={caseStudy.testing.heading} />
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div className="space-y-4 text-base leading-relaxed text-pink-800 lg:text-lg">
                  {(caseStudy.testing.paragraphs ?? []).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className={cardClass}>
                  <ul className="grid gap-3">
                    {(caseStudy.testing.bullets ?? []).map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-pink-800">
                        <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {caseStudy.limitations && (
          <section className={`bg-rose-50/60 ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Challenges" title={caseStudy.limitations.heading} />
              <div className="grid gap-6 lg:grid-cols-3">
                {caseStudy.limitations.cards.map((card) => (
                  <div key={card.title} className={cardClass}>
                    <h3 className="mb-3 text-xl font-bold text-pink-950">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-pink-800">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {caseStudy.architectureDescription && (
          <section className={`grid-bg ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Architecture" title="Shared Data, Role-Specific Experiences" />
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div className={`${cardClass} grid gap-4 md:grid-cols-[1fr_auto_1.25fr] md:items-center`} role="img" aria-label="The rider mobile app, driver mobile app, and administrative web portal connect to shared application services and a MySQL database">
                  <div className="grid gap-3">
                    {['Rider Mobile App', 'Driver Mobile App', 'Administrative Web Portal'].map((label) => (
                      <div key={label} className="flex items-center gap-3 rounded-xl border border-pink-200 bg-pink-50 p-4 font-semibold text-pink-900">
                        <Smartphone className="h-5 w-5 shrink-0 text-pink-500" aria-hidden="true" /> {label}
                      </div>
                    ))}
                  </div>
                  <ChevronRight className="mx-auto hidden h-7 w-7 text-pink-400 md:block" aria-hidden="true" />
                  <div className="rounded-2xl bg-pink-500 p-6 text-center text-white shadow-lg shadow-pink-200">
                    <Database className="mx-auto mb-3 h-7 w-7" aria-hidden="true" />
                    <p className="font-bold">Shared Application Services</p>
                    <p className="mt-1 text-sm text-pink-50">and MySQL Database</p>
                  </div>
                </div>
                <p className="max-w-xl text-base leading-relaxed text-pink-800 lg:text-lg">{caseStudy.architectureDescription}</p>
              </div>
            </div>
          </section>
        )}

        {caseStudy.process && (
          <section className={`bg-white ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Development process" title={caseStudy.process.heading} />
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="space-y-5 text-base leading-relaxed text-pink-800">
                  {caseStudy.process.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <ol className="relative grid gap-4 before:absolute before:bottom-5 before:left-[1.15rem] before:top-5 before:w-px before:bg-pink-200">
                  {caseStudy.process.steps.map((step, index) => (
                    <li key={step} className="relative flex items-center gap-4 rounded-2xl border border-pink-200 bg-rose-50 p-4">
                      <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-500 font-mono text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <span className="font-medium text-pink-900">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}

        {caseStudy.challenges && (
          <section className={`bg-rose-50/60 ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Reflection" title="Challenges and What I Learned" />
              <div className="grid gap-6 lg:grid-cols-3">
                {caseStudy.challenges.map((challenge) => (
                  <div key={challenge.title} className={cardClass}>
                    <h3 className="mb-3 text-xl font-bold text-pink-950">{challenge.title}</h3>
                    <p className="text-sm leading-relaxed text-pink-800 lg:text-base">{challenge.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {caseStudy.skillsSection && (
          <section className={`bg-white ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Experience" title={caseStudy.skillsSection.heading} />
              <ul className="flex max-w-5xl flex-wrap gap-3">
                {caseStudy.skillsSection.items.map((skill) => (
                  <li key={skill}><TechBadge label={skill} /></li>
                ))}
              </ul>
              <div className="mt-12 rounded-3xl border border-pink-200 bg-pink-950 p-8 text-white shadow-xl shadow-pink-200 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:p-10">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-pink-300">Project status</p>
                  <h2 className="mt-2 text-2xl font-bold lg:text-3xl">{caseStudy.status}</h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-pink-100">
                    {caseStudy.reflection?.paragraphs?.[0] ?? heroIntro}
                  </p>
                </div>
                {caseStudy.reflection && (
                  <Link href={caseStudy.reflection.ctaHref ?? "/#projects"} className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-pink-700 transition-colors hover:bg-pink-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:mt-0">
                    {caseStudy.reflection.ctaLabel} <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        {caseStudy.reflection && !caseStudy.skillsSection && (
          <section className={`bg-white ${sectionPadding}`}>
            <div className={sectionContainer}>
              <SectionHeading label="Reflection" title={caseStudy.reflection.heading} />
              <div className="space-y-5 text-base leading-relaxed text-pink-800 lg:text-lg">
                {(caseStudy.reflection.paragraphs ?? []).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8">
                <Link href={caseStudy.reflection.ctaHref ?? "/#projects"} className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-pink-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-600">
                  {caseStudy.reflection.ctaLabel ?? "Back to projects"} <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
