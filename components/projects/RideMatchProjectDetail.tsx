import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Database, ExternalLink, GitBranch, ServerCog, Smartphone, Users } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project, ProjectCaseStudy } from "@/data/projects";
import { TechBadge } from "@/components/ui/TechBadge";
import { sectionContainer, sectionLabel, sectionPadding, sectionTitle } from "@/components/ui/sectionLayout";

type Props = { project: Project; caseStudy: ProjectCaseStudy };
const card = "rounded-2xl border border-pink-200 bg-white p-6 shadow-sm shadow-pink-100 lg:rounded-3xl lg:p-8";

function Heading({ label, title }: { label: string; title: string }) {
  return <div className="mb-8 max-w-4xl lg:mb-10"><p className={sectionLabel}>{label}</p><h2 className={sectionTitle}>{title}</h2></div>;
}

function Checks({ items }: { items: string[] }) {
  return <ul className="grid gap-3 sm:grid-cols-2">{items.map(item => <li key={item} className="flex gap-3 text-sm leading-relaxed text-pink-800"><Check className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" aria-hidden="true" /><span>{item}</span></li>)}</ul>;
}

function Phone({ src, alt, priority = false, className = "" }: { src: string; alt: string; priority?: boolean; className?: string }) {
  return <div className={`mx-auto w-full max-w-[17rem] rounded-[2.25rem] border-[7px] border-pink-950 bg-pink-950 p-1.5 shadow-xl shadow-pink-300/40 ${className}`}><div className="relative aspect-[430/932] overflow-hidden rounded-[1.55rem] bg-slate-900"><Image src={src} alt={alt} fill priority={priority} className="object-contain" sizes="(max-width: 640px) 70vw, 18rem" /></div></div>;
}

export function RideMatchProjectDetail({ project, caseStudy }: Props) {
  const details = caseStudy.rideMatchDetails;
  if (!details || !caseStudy.overview || !caseStudy.role) return null;
  const heroShots = details.screenshots.filter(image => ["RiderDashboard.png", "RideMatchLogIn.png", "Swipe.png"].some(name => image.src.endsWith(name)));
  const workflowShots = details.screenshots.filter(image => ["RiderDashboard.png", "RideRequest.png", "Swipe.png", "DriverDispatch.png", "RiderChat.png", "PayScreen.png"].some(name => image.src.endsWith(name)));

  return <main className="overflow-x-clip bg-pink-50 pt-28 text-pink-950 md:pt-[4.75rem]"><article>
    <header className={`grid-bg relative overflow-hidden ${sectionPadding}`}><div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl" /><div className={`relative ${sectionContainer}`}>
      <Link href="/#projects" className="mb-10 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-pink-700 shadow-sm hover:bg-pink-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500"><ArrowLeft className="h-4 w-4" /> Back to projects</Link>
      <div className="grid items-center gap-12 lg:grid-cols-[0.86fr_1.14fr]"><div><p className={sectionLabel}>{caseStudy.eyebrow}</p><h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">RideMatch</h1><p className="mt-6 text-lg leading-relaxed text-pink-800 lg:text-xl">{caseStudy.hero?.intro}</p><div className="mt-6 flex flex-wrap gap-2">{project.technologies?.map(tech => <TechBadge key={tech} label={tech} />)}</div><div className="mt-8 flex flex-wrap items-center gap-3"><span className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-medium"><span className="h-2 w-2 rounded-full bg-pink-500" />{caseStudy.status}</span><a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-pink-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-600"><SiGithub /> View Code on GitHub <ExternalLink className="h-3.5 w-3.5" /></a></div></div>
        <div className="grid grid-cols-3 items-center gap-2 sm:gap-4" aria-label="RideMatch Rider dashboard, login, and swipe-based driver selection screens">{heroShots.map((image, i) => <Phone key={image.src} src={image.src} alt={image.alt} priority className={i === 1 ? "relative z-10 sm:-translate-y-4" : "scale-95"} />)}</div>
      </div>
    </div></header>

    <section className={`bg-rose-50/60 ${sectionPadding}`}><div className={sectionContainer}><Heading label="Project walkthrough" title="See RideMatch in Action" /><div className="overflow-hidden rounded-2xl border border-pink-200 bg-pink-950 shadow-xl shadow-pink-200/50 lg:rounded-3xl"><div className="aspect-video"><iframe src="https://www.youtube-nocookie.com/embed/pDXZAcv9ziA" title="RideMatch project walkthrough" className="h-full w-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div></div><p className="mt-4 text-center text-sm text-pink-700">Having trouble viewing the video? <a href="https://youtu.be/pDXZAcv9ziA" target="_blank" rel="noopener noreferrer" className="font-semibold text-pink-600 underline decoration-pink-300 underline-offset-4 hover:text-pink-950">Watch it on YouTube <ExternalLink className="inline h-3.5 w-3.5" aria-hidden="true" /></a></p></div></section>

    <section className={`bg-white ${sectionPadding}`}><div className={sectionContainer}><Heading label="Overview" title={caseStudy.overview.heading} /><div className="grid gap-5 text-base leading-relaxed text-pink-800 lg:grid-cols-3">{caseStudy.overview.paragraphs.map(p => <p key={p}>{p}</p>)}</div><blockquote className="mt-10 rounded-3xl bg-pink-950 p-7 text-xl font-semibold leading-relaxed text-white lg:text-2xl">“{details.differentiator}”</blockquote></div></section>

    <section className={`bg-rose-50/60 ${sectionPadding}`}><div className={sectionContainer}><Heading label="My role" title={caseStudy.role.heading} /><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div className="space-y-5 text-base leading-relaxed text-pink-800 lg:text-lg">{caseStudy.role.paragraphs.map(p => <p key={p}>{p}</p>)}</div><div className={card}><Checks items={caseStudy.role.responsibilities} /></div></div></div></section>

    <section className={`bg-white ${sectionPadding}`}><div className={sectionContainer}><Heading label="Core experience" title="From Account Creation to a Completed Ride" /><ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{details.flow.map((step, i) => <li key={step} className="rounded-2xl border border-pink-200 bg-pink-50 p-4"><span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 font-mono text-xs font-bold text-white">{i + 1}</span><span className="text-sm leading-relaxed">{step}</span></li>)}</ol></div></section>

    <section className={`bg-rose-50/60 ${sectionPadding}`}><div className={sectionContainer}><Heading label="Key features" title="Preference-Based Matching Across Three Roles" /><div className={card}><Checks items={details.features} /></div><p className="mt-5 text-sm leading-relaxed text-pink-700">Mapping, location, payments, notifications, and real-time communication depend on local configuration or third-party test services; the prototype does not claim production reliability for those integrations.</p></div></section>

    <section className={`grid-bg ${sectionPadding}`}><div className={sectionContainer}><Heading label="Architecture" title="Role-Specific Clients, Shared Platform Logic" /><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">{details.architecture.map((item, i) => { const Icon = [Smartphone, Smartphone, ServerCog, Database, Users][i]; return <div key={item.title} className={card}><Icon className="mb-4 h-7 w-7 text-pink-500" aria-hidden="true" /><h3 className="mb-3 text-lg font-bold">{item.title}</h3><p className="text-sm leading-relaxed text-pink-800">{item.description}</p></div>; })}</div></div></section>

    <section className={`bg-white ${sectionPadding}`}><div className={sectionContainer}><Heading label="Engineering process" title="Iterating from Low-Fidelity Designs to a Connected Prototype" /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{details.process.map((item, i) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-pink-200 bg-pink-50 p-4"><GitBranch className="h-5 w-5 shrink-0 text-pink-500" /><span className="text-sm font-medium">{String(i + 1).padStart(2,"0")} · {item}</span></div>)}</div></div></section>

    <section className={`bg-rose-50/60 ${sectionPadding}`}><div className={sectionContainer}><Heading label="Product screens" title="Rider and Driver Workflows" /><div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{workflowShots.map(image => <figure key={image.src} className="min-w-0"><Phone src={image.src} alt={image.alt} /><figcaption className="mx-auto mt-4 max-w-[18rem] text-center text-sm leading-relaxed text-pink-700">{image.caption}</figcaption></figure>)}</div></div></section>

    <section className={`bg-white ${sectionPadding}`}><div className={sectionContainer}><Heading label="Challenges and learning" title="Building Across Mobile, Web, API, and Data Layers" /><div className="grid gap-6 lg:grid-cols-3">{[
      {title:"Learning Flutter While Building",description:"The team learned mobile development and Flutter while delivering functional Rider and Driver experiences, requiring focused research, experimentation, and iteration."},
      {title:"Coordinating Shared State",description:"Rider, Driver, Admin, API, and database components needed consistent rules for matching, requests, ride progression, ratings, payments, and account state."},
      {title:"Scoping a Production-Scale Idea",description:"The team balanced the original concept with the time, cost, privacy, security, third-party service, and deployment constraints of a senior-design prototype."},
    ].map(item => <div key={item.title} className={card}><h3 className="mb-3 text-xl font-bold">{item.title}</h3><p className="text-sm leading-relaxed text-pink-800">{item.description}</p></div>)}</div><p className="mt-8 max-w-4xl text-lg leading-relaxed text-pink-800">The project strengthened my full-stack integration, mobile development, relational-data, testing, technical-leadership, project-coordination, and role-based system-design skills.</p></div></section>

    <section className={`bg-rose-50/60 ${sectionPadding}`}><div className={sectionContainer}><Heading label="Limitations and future work" title="From Successful Prototype to Production Service" /><p className="mb-7 max-w-4xl text-lg leading-relaxed text-pink-800">RideMatch met its senior-design goal as a completed working prototype. We are currently working on deploying it as a real rideshare service which would require:</p><div className={card}><Checks items={details.limitations} /></div></div></section>

    <section className="bg-pink-950 py-14 text-white"><div className={`${sectionContainer} flex flex-col gap-5 px-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12`}><div><p className="font-mono text-xs uppercase tracking-widest text-pink-300">Completed senior-design prototype</p><h2 className="mt-2 text-2xl font-bold">Explore the RideMatch code</h2></div><div className="flex flex-wrap gap-3"><a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold hover:bg-pink-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><SiGithub /> View Code on GitHub</a><Link href="/#projects" className="inline-flex items-center gap-2 rounded-full border border-pink-300 px-5 py-3 text-sm font-semibold hover:bg-pink-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><ArrowLeft className="h-4 w-4" /> Back to Projects</Link></div></div></section>
  </article></main>;
}
