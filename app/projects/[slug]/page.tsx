import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import {
  getProjectCaseStudy,
  getProjectCaseStudySlugs,
  projects,
} from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjectCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);

  if (!project) return {};

  return {
    title: `${project.title} Project | Ella Potter`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  const caseStudy = getProjectCaseStudy(slug);

  if (!project || !caseStudy) notFound();

  return (
    <div className="min-h-full bg-pink-50">
      <Navbar />
      <ProjectDetail project={project} caseStudy={caseStudy} />
      <Footer />
    </div>
  );
}
