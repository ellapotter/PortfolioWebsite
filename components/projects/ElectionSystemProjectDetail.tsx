import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Database, ExternalLink, ShieldCheck, UserRound } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project, ProjectCaseStudy } from "@/data/projects";
import { TechBadge } from "@/components/ui/TechBadge";
import { sectionContainer, sectionLabel, sectionPadding, sectionTitle } from "@/components/ui/sectionLayout";

type Props = { project: Project; caseStudy: ProjectCaseStudy };
const card = "rounded-2xl border border-pink-200 bg-white p-6 shadow-sm shadow-pink-100 lg:rounded-3xl lg:p-8";

function Heading({ label, title }: { label: string; title: string }) {
  return <div className="mb-8 max-w-4xl lg:mb-10"><p className={sectionLabel}>{label}</p><h2 className={sectionTitle}>{title}</h2></div>;
}

function CheckList({ items }: { items: string[] }) {
  return <ul className="grid gap-3 sm:grid-cols-2">{items.map(item => <li key={item} className="flex gap-3 text-sm leading-relaxed text-pink-800"><Check className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" aria-hidden="true" /><span>{item}</span></li>)}</ul>;
}

export function ElectionSystemProjectDetail({ project, caseStudy }: Props) {
  const details = caseStudy.electionCaseStudy;
  if (!details || !caseStudy.overview) return null;

  return <main className="bg-pink-50 pt-28 text-pink-950 md:pt-[4.75rem]"><article>
    <header className={`grid-bg relative overflow-hidden ${sectionPadding}`}><div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-rose-300/40 blur-3xl" /><div className={`relative ${sectionContainer}`}>
      <Link href="/#projects" className="mb-10 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-pink-700 shadow-sm hover:bg-pink-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500"><ArrowLeft className="h-4 w-4" /> Back to projects</Link>
      <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14"><div><p className={sectionLabel}>{caseStudy.eyebrow}</p><h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">{caseStudy.title}</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-pink-800 lg:text-xl">{caseStudy.hero?.intro}</p><div className="mt-6 flex flex-wrap gap-2">{project.technologies?.map(tech => <TechBadge key={tech} label={tech} />)}</div><div className="mt-8 flex flex-wrap gap-3"><span className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-medium"><span className="h-2 w-2 rounded-full bg-pink-500" />{caseStudy.status}</span><a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-pink-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-600"><SiGithub /> View Code on GitHub <ExternalLink className="h-3.5 w-3.5" /></a></div></div>
        <figure><div className="mx-auto max-w-2xl"><div className="relative rounded-t-2xl border-[6px] border-b-0 border-slate-900 bg-slate-900 px-1 pb-1 pt-3 shadow-xl shadow-pink-200/60 sm:rounded-t-3xl sm:border-[9px] sm:border-b-0 sm:px-1.5 sm:pb-1.5 sm:pt-4"><span className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-slate-600 sm:top-2 sm:h-2 sm:w-2" aria-hidden="true" /><div className="relative aspect-[2/1] overflow-hidden rounded-sm bg-slate-100"><Image src="/projects/election-system/VoterHomePage.png" alt={caseStudy.heroImageAlt ?? "Election voter home page"} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 48vw" /></div></div><div className="relative h-4 rounded-b-[50%] bg-gradient-to-b from-slate-300 to-slate-400 shadow-md sm:h-5"><div className="absolute left-1/2 top-0 h-1.5 w-16 -translate-x-1/2 rounded-b-lg bg-slate-500/60 sm:w-24" /></div><div className="mx-auto h-1.5 w-[82%] rounded-b-full bg-slate-500/50" /></div><figcaption className="pt-4 text-center text-xs text-pink-700"></figcaption></figure>
      </div>
    </div></header>

    <section className={`bg-white ${sectionPadding}`}><div className={sectionContainer}><Heading label="Project overview" title={caseStudy.overview.heading} /><div className="grid gap-5 text-base leading-relaxed text-pink-800 lg:grid-cols-3">{caseStudy.overview.paragraphs.map(p => <p key={p}>{p}</p>)}</div></div></section>
    <section className={`bg-rose-50/60 ${sectionPadding}`}><div className={sectionContainer}><Heading label="Collaboration" title={details.scope.heading} /><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><p className="text-lg leading-relaxed text-pink-800">{details.scope.description}</p><div className={card}><CheckList items={details.scope.items} /></div></div></div></section>

    <section className={`bg-white ${sectionPadding}`}><div className={sectionContainer}><Heading label="User roles" title="Different Responsibilities, Different Workflows" /><div className="grid gap-6 lg:grid-cols-3">{details.roles.map(role => <div key={role.title} className={card}><UserRound className="mb-4 h-7 w-7 text-pink-500" /><h3 className="mb-5 text-2xl font-bold">{role.title}</h3><ul className="space-y-3">{role.items.map(item => <li key={item} className="flex gap-2 text-sm leading-relaxed text-pink-800"><Check className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />{item}</li>)}</ul></div>)}</div></div></section>

    <section className={`bg-rose-50/60 ${sectionPadding}`}><div className={sectionContainer}><Heading label="Voting workflow" title="From Precinct Eligibility to Ballot Submission" /><ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{details.votingFlow.map((step, i) => <li key={step} className="rounded-2xl border border-pink-200 bg-pink-50 p-4"><span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 font-mono text-xs font-bold text-white">{i + 1}</span><span className="text-sm leading-relaxed text-pink-900">{step}</span></li>)}</ol><p className="mt-6 rounded-2xl border border-pink-200 bg-white p-5 text-sm leading-relaxed text-pink-800">This is the implemented prototype workflow—not a claim that the application meets the security, legal, accessibility, audit, or certification requirements of a real public election system.</p></div></section>



    <section className={`bg-white ${sectionPadding}`}><div className={sectionContainer}><Heading label="Database" title="A Relational Model for Election Operations" /><p className="mb-8 max-w-4xl text-lg leading-relaxed text-pink-800">{details.database.description}</p><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{details.database.domains.map(domain => <div key={domain.title} className={card}><Database className="mb-4 h-6 w-6 text-pink-500" /><h3 className="mb-3 text-lg font-bold">{domain.title}</h3><ul className="space-y-2 text-sm text-pink-800">{domain.items.map(item => <li key={item}>• {item}</li>)}</ul></div>)}</div></div></section>

    <section className={`bg-rose-50/60 ${sectionPadding}`}><div className={sectionContainer}><Heading label="Account controls" title="Role-Based Access and Account Verification" /><div className={card}><CheckList items={details.controls} /></div></div></section>



    <section className={`bg-white ${sectionPadding}`}><div className={sectionContainer}><Heading label="Interface" title="Gallery" /><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{details.gallery.map(image => <figure key={image.src} className="overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-sm"><div className="relative aspect-video bg-slate-100"><Image src={image.src} alt={image.alt} fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" /></div><figcaption className="p-4 text-sm leading-relaxed text-pink-700">{image.caption}</figcaption></figure>)}</div></div></section>

    <section className={`bg-rose-50/60 ${sectionPadding}`}><div className={sectionContainer}><Heading label="Testing" title="Checking Election and Permission Rules" /><div className={card}><CheckList items={details.tests.slice(0,5)} /></div><p className="mt-5 text-sm text-pink-700">The repository includes pytest coverage for these areas.</p></div></section>

    <section className={`bg-white ${sectionPadding}`}><div className={sectionContainer}><Heading label="Reflection" title="Challenges in Modeling a High-Stakes Workflow" /><div className="grid gap-5 md:grid-cols-2">{details.challenges.map(item => <div key={item.title} className={card}><ShieldCheck className="mb-4 h-6 w-6 text-pink-500" /><h3 className="mb-3 text-xl font-bold">{item.title}</h3><p className="text-sm leading-relaxed text-pink-800">{item.description}</p></div>)}</div><p className="mt-8 max-w-4xl text-lg leading-relaxed text-pink-800">{details.conclusion}</p></div></section>

    <section className={`bg-rose-50/60 ${sectionPadding}`}><div className={sectionContainer}><Heading label="Technology stack" title="Tools Behind the Prototype" /><ul className="flex flex-wrap gap-3">{details.technologies.map(item => <li key={item}><TechBadge label={item} /></li>)}</ul><div className="mt-12"><Heading label="Skills" title="Skills Demonstrated" /><ul className="flex flex-wrap gap-3">{details.skills.map(item => <li key={item}><TechBadge label={item} /></li>)}</ul></div></div></section>

    <section className="bg-pink-950 py-14 text-white"><div className={`${sectionContainer} flex flex-col gap-5 px-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12`}><div><p className="font-mono text-xs uppercase tracking-widest text-pink-300">Completed prototype</p><h2 className="mt-2 text-2xl font-bold">Explore the Election Management code</h2></div><div className="flex flex-wrap gap-3"><a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold hover:bg-pink-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><SiGithub /> View Code on GitHub</a><Link href="/#projects" className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-pink-700 hover:bg-pink-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><ArrowLeft className="h-4 w-4" /> Back to Projects</Link></div></div></section>
  </article></main>;
}
