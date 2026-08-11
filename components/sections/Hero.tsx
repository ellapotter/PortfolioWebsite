"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, FileText, Gamepad2, Sparkles } from "lucide-react";
import Link from "next/link";
import { site } from "@/data/portfolio";
import { TypewriterSkills } from "@/components/ui/TypewriterSkills";
import {
  sectionContainer,
  sectionLabel,
} from "@/components/ui/sectionLayout";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const background = (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-pink-300/50 blur-3xl lg:h-96 lg:w-96" />
      <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-rose-300/45 blur-3xl lg:h-[28rem] lg:w-[28rem]" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-200/50 blur-3xl lg:h-80 lg:w-80" />
    </div>
  );

  const inner = (
    <div
      className={`relative z-10 flex min-h-screen flex-col items-center justify-center pt-16 text-center sm:px-8 lg:px-12 ${sectionContainer}`}
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-pink-200 bg-white shadow-md shadow-pink-200/50 lg:h-20 lg:w-20 lg:rounded-3xl">
        <Sparkles className="h-7 w-7 text-pink-500 lg:h-9 lg:w-9" />
      </div>

      <p className={`${sectionLabel} lg:text-base`}>{site.role}</p>

      <h1 className="mb-4 text-5xl font-bold tracking-tight text-pink-950 sm:text-6xl lg:text-7xl 2xl:text-8xl">
        <span className="gradient-text">{site.name}</span>
      </h1>

      <div className="mb-10 flex min-h-[4.5rem] w-full max-w-3xl flex-col items-center justify-center rounded-2xl border border-pink-200 bg-white/90 px-6 py-5 shadow-md shadow-pink-100 lg:max-w-4xl lg:rounded-3xl lg:px-8 lg:py-7">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-pink-500 lg:text-sm">
        </p>
        <TypewriterSkills
          sequences={site.typewriterSequences}
          staticText={
            prefersReducedMotion ? site.typewriterSequences[0] : undefined
          }
        />
      </div>
      <div className="mb-16 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/game"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-pink-300 bg-white px-5 py-2.5 text-sm font-semibold text-pink-700 shadow-md shadow-pink-200/70 transition-colors hover:border-pink-400 hover:bg-pink-50 hover:text-pink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 lg:text-base"
        >
          <Gamepad2 className="h-4 w-4" aria-hidden="true" />
          Play Game
        </Link>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-pink-300 bg-white px-5 py-2.5 text-sm font-semibold text-pink-700 shadow-md shadow-pink-200/70 transition-colors hover:border-pink-400 hover:bg-pink-50 hover:text-pink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 lg:text-base"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          View Resume
        </a>
      </div>
      <a
        href="#experience"
        className="absolute bottom-10 animate-bounce text-pink-400 transition-colors hover:text-pink-600"
        aria-label="Scroll to experience"
      >
        <ArrowDown className="h-5 w-5 lg:h-6 lg:w-6" />
      </a>
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <section id="home" className="relative grid-bg">
        {background}
        {inner}
      </section>
    );
  }

  return (
    <motion.section
      id="home"
      className="relative grid-bg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {background}
      <motion.div variants={itemVariants}>{inner}</motion.div>
    </motion.section>
  );
}
