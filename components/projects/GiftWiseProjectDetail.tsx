import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  Gift,
  ServerCog,
  Sparkles,
  UserRound,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project, ProjectCaseStudy } from "@/data/projects";
import { TechBadge } from "@/components/ui/TechBadge";
import { sectionContainer, sectionLabel, sectionPadding, sectionTitle } from "@/components/ui/sectionLayout";

type Props = { project: Project; caseStudy: ProjectCaseStudy };
const card = "rounded-2xl border border-pink-200 bg-white p-6 shadow-sm shadow-pink-100 lg:rounded-3xl lg:p-8";

function Heading({ label, title }: { label: string; title: string }) {
  return <div className="mb-8 max-w-3xl lg:mb-10"><p className={sectionLabel}>{label}</p><h2 className={sectionTitle}>{title}</h2></div>;
}

function Checks({ items, columns = true }: { items: string[]; columns?: boolean }) {
  return <ul className={`grid gap-3 ${columns ? "sm:grid-cols-2" : ""}`}>{items.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-pink-800"><Check className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" aria-hidden="true" /><span>{item}</span></li>)}</ul>;
}

export function GiftWiseProjectDetail({ project, caseStudy }: Props) {
  const c = caseStudy;
  if (!c.overview || !c.contributions || !c.userFlow || !c.personalization || !c.giftPlanning || !c.aiIntegration || !c.productOffers || !c.learning || !c.saasDesign || !c.testing || !c.reflection || !c.technologies || !c.skillsSection) return null;

  return <main className="bg-pink-50 pt-28 text-pink-950 md:pt-[4.75rem]"><article>
    <header className={`grid-bg relative overflow-hidden ${sectionPadding}`}>
      <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-pink-300/40 blur-3xl" />
      <div className={`relative ${sectionContainer}`}>
        <Link href="/#projects" className="mb-10 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-pink-700 shadow-sm transition-colors hover:bg-pink-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500"><ArrowLeft className="h-4 w-4" /> Back to projects</Link>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div><p className={sectionLabel}>{c.eyebrow}</p><h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">{c.title}</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-pink-800 lg:text-xl">{c.hero?.intro}</p>
            <div className="mt-6 flex flex-wrap gap-2">{project.technologies?.map((tech) => <TechBadge key={tech} label={tech} />)}</div>
            <div className="mt-8 flex flex-wrap items-center gap-4"><span className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-medium text-pink-800"><span className="h-2 w-2 rounded-full bg-pink-500" />{c.status}</span><a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-600"><SiGithub /> View Code on GitHub <ExternalLink className="h-3.5 w-3.5" /></a></div>
          </div>
          <figure className="overflow-hidden rounded-3xl border border-pink-200 bg-white p-3 shadow-xl shadow-pink-200/60"><div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-pink-100"><Image src={project.image} alt="GiftWise gift-box logo representing the gift-planning application" fill priority className="object-contain" sizes="(max-width: 1024px) 100vw, 45vw" /></div><figcaption className="px-2 pb-1 pt-3 text-center font-mono text-xs text-pink-600">GiftWise project</figcaption></figure>
        </div>
      </div>
    </header>

    <section className={`bg-white ${sectionPadding}`}><div className={sectionContainer}><Heading label="Project overview" title={c.overview.heading} /><div className="grid max-w-6xl gap-5 text-base leading-relaxed text-pink-800 lg:grid-cols-3">{c.overview.paragraphs.map(p => <p key={p}>{p}</p>)}</div></div></section>

    <section className={`bg-rose-50/60 ${sectionPadding}`}><div className={sectionContainer}><Heading label="My contributions" title={c.contributions.heading} /><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><p className="text-base leading-relaxed text-pink-800 lg:text-lg">{c.contributions.paragraphs[0]}</p><div className={card}><Checks items={c.contributions.items} /></div></div></div></section>

    <section className={`bg-white ${sectionPadding}`}><div className={sectionContainer}><Heading label="User flow" title={c.userFlow.heading} /><p className="mb-7 max-w-3xl text-pink-800">{c.userFlow.intro}</p><ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{c.userFlow.steps.map((step, i) => <li key={step} className="flex items-center gap-3 rounded-2xl border border-pink-200 bg-pink-50 p-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-500 font-mono text-xs font-bold text-white">{i + 1}</span><span className="font-medium">{step}</span>{i < c.userFlow!.steps.length - 1 && <ArrowRight className="ml-auto hidden h-4 w-4 text-pink-400 lg:block" aria-hidden="true" />}</li>)}</ol><p className="mt-6 text-pink-800">{c.userFlow.explanation}</p></div></section>

    <section className={`bg-rose-50/60 ${sectionPadding}`}><div className={sectionContainer}><Heading label="Personalization" title={c.personalization.heading} /><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="mb-5 text-pink-800">{c.personalization.intro}</p><div className="flex flex-wrap gap-2">{c.personalization.fields?.map(field => <TechBadge key={field} label={field} />)}</div></div><div className={card}><UserRound className="mb-4 h-7 w-7 text-pink-500" /><p className="leading-relaxed text-pink-800">{c.personalization.description}</p></div></div></div></section>

    <section className={`bg-white ${sectionPadding}`}><div className={sectionContainer}><Heading label="Gift planning" title={c.giftPlanning.heading} /><div className="grid gap-8 lg:grid-cols-2"><div className={card}><h3 className="mb-5 text-xl font-bold">Connected data</h3><Checks items={c.giftPlanning.relationships ?? []} /></div><div className={card}><h3 className="mb-5 text-xl font-bold">Gift statuses</h3><ol className="flex flex-wrap items-center gap-2">{c.giftPlanning.statuses?.map((status, i) => <li key={status} className="flex items-center gap-2"><span className="rounded-full bg-pink-100 px-3 py-2 text-sm font-semibold text-pink-800">{status}</span>{i < (c.giftPlanning!.statuses?.length ?? 0) - 1 && <ArrowRight className="h-4 w-4 text-pink-400" />}</li>)}</ol><p className="mt-6 leading-relaxed text-pink-800">{c.giftPlanning.description}</p></div></div></div></section>

    <section className={`grid-bg ${sectionPadding}`}><div className={sectionContainer}><Heading label="AI integration" title={c.aiIntegration.heading} /><div className="grid gap-6 lg:grid-cols-2"><div className={card}><Sparkles className="mb-4 h-7 w-7 text-pink-500" /><p className="leading-relaxed text-pink-800">{c.aiIntegration.description}</p></div><div className={card}><p className="leading-relaxed text-pink-800">{c.aiIntegration.paragraph}</p><p className="mt-4 rounded-xl bg-pink-50 p-4 text-sm text-pink-700">The basic filtering is a defensive check, not a guarantee against prompt manipulation. AI suggestions may still require user judgment.</p></div></div></div></section>

    <section className={`bg-white ${sectionPadding}`}><div className={sectionContainer}><Heading label="External data" title={c.productOffers.heading} /><div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"><div className={card}><Checks items={c.productOffers.features ?? []} /></div><div className="rounded-3xl bg-pink-950 p-7 text-white"><Gift className="mb-4 h-7 w-7 text-pink-300" /><p className="leading-relaxed text-pink-100">{c.productOffers.intro}</p><p className="mt-5 font-semibold">{c.productOffers.note}</p></div></div></div></section>

    <section className={`bg-rose-50/60 ${sectionPadding}`}><div className={sectionContainer}><Heading label="What I learned" title={c.learning.heading} /><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{c.learning.cards.map(item => <div key={item.title} className={card}><h3 className="mb-3 text-xl font-bold">{item.title}</h3><p className="text-sm leading-relaxed text-pink-800">{item.description}</p></div>)}</div></div></section>

    <section className={`bg-white ${sectionPadding}`}><div className={sectionContainer}><Heading label="SaaS concepts" title={c.saasDesign.heading} /><p className="mb-7 max-w-3xl text-pink-800">{c.saasDesign.intro}</p><div className={card}><Checks items={c.saasDesign.features ?? []} /></div><p className="mt-5 text-sm leading-relaxed text-pink-700">This is a SaaS-style course project; the repository does not confirm a currently operated public service.</p></div></section>



    <section className={`bg-rose-50/60 ${sectionPadding}`}><div className={sectionContainer}><Heading label="Testing" title={c.testing.heading} /><div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"><div className={card}><Checks items={c.testing.tools ?? []} /></div><div><ServerCog className="mb-4 h-8 w-8 text-pink-500" /><p className="text-lg leading-relaxed text-pink-800">{c.testing.description}</p><p className="mt-4 text-sm text-pink-700"></p></div></div></div></section>

    <section className={`bg-white ${sectionPadding}`}><div className={sectionContainer}><Heading label="Reflection" title={c.reflection.heading} /><div className="grid gap-5 lg:grid-cols-3">{c.reflection.cards?.map(item => <div key={item.title} className={card}><h3 className="mb-3 text-xl font-bold">{item.title}</h3><p className="text-sm leading-relaxed text-pink-800">{item.description}</p></div>)}</div><p className="mt-8 max-w-4xl text-lg leading-relaxed text-pink-800">{c.reflection.conclusion}</p></div></section>

    <section className={`bg-rose-50/60 ${sectionPadding}`}><div className={sectionContainer}><Heading label="Technology stack" title="Tools Behind GiftWise" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{c.technologies.map(item => <div key={item.name} className={card}><h3 className="font-bold">{item.name}</h3><p className="mt-2 text-sm leading-relaxed text-pink-800">{item.description}</p></div>)}</div></div></section>

    <section className={`bg-white ${sectionPadding}`}><div className={sectionContainer}><Heading label="Skills" title={c.skillsSection.heading} /><ul className="flex flex-wrap gap-3">{c.skillsSection.items.map(item => <li key={item}><TechBadge label={item} /></li>)}</ul></div></section>

    <section className="bg-pink-950 py-14 text-white lg:py-16"><div className={`${sectionContainer} flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between`}><div><p className="font-mono text-xs uppercase tracking-widest text-pink-300">Explore GiftWise</p><h2 className="mt-2 text-2xl font-bold lg:text-3xl">See the collaborative Rails project</h2></div><div className="flex flex-wrap gap-3"><a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold hover:bg-pink-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><SiGithub /> View Code on GitHub</a><Link href="/#projects" className="inline-flex items-center gap-2 rounded-full border border-pink-300 px-5 py-3 text-sm font-semibold hover:bg-pink-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><ArrowLeft className="h-4 w-4" /> Back to Projects</Link></div></div></section>
  </article></main>;
}
