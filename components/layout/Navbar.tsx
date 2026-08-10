"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
import Link from "next/link";
import { contact } from "@/data/portfolio";
import { sectionContainer } from "@/components/ui/sectionLayout";

const sectionLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Links" },
] as const;

export function Navbar() {
  const prefersReducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState("home");
  const Nav = prefersReducedMotion ? "nav" : motion.nav;

  useEffect(() => {
    const sections = sectionLinks
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))
      .sort((first, second) => first.offsetTop - second.offsetTop);

    if (!sections.length) return;

    let frame = 0;
    const updateActiveSection = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const pageBottom = window.scrollY + window.innerHeight;
        const isAtPageBottom = pageBottom >= document.documentElement.scrollHeight - 2;
        const finalSection = sections.at(-1);
        const hasReachedFinalSection = Boolean(
          finalSection && finalSection.getBoundingClientRect().top <= window.innerHeight * 0.7,
        );

        if (isAtPageBottom || hasReachedFinalSection) {
          setActiveSection(finalSection?.id ?? sections[0].id);
          return;
        }

        const marker = window.innerHeight * 0.35;
        const current = sections.reduce((active, section) => {
          return section.getBoundingClientRect().top <= marker ? section : active;
        }, sections[0]);

        setActiveSection(current.id);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <Nav
      {...(!prefersReducedMotion && {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      })}
      className="fixed top-0 z-50 w-full border-b border-pink-200 bg-pink-50/95 text-pink-950 shadow-sm shadow-pink-200/60 backdrop-blur-md"
    >
      <div
        className={`grid min-h-28 grid-cols-[auto_1fr] items-center gap-x-4 px-4 py-3 sm:px-6 md:flex md:min-h-[4.75rem] md:gap-2 md:py-0 lg:gap-5 lg:px-12 ${sectionContainer}`}
      >
        <Link
          href="/#home"
          aria-label="Ella Potter — home"
          className="shrink-0 font-mono text-2xl font-bold tracking-tight text-pink-950 transition-colors hover:text-pink-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500 lg:text-3xl"
        >
          EP<span className="text-fuchsia-400">.</span>
        </Link>

        <div className="ml-auto flex shrink-0 items-center gap-2 md:order-3 lg:gap-3">
          <a
            href={contact.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-white px-3 py-2 text-xs font-semibold text-pink-800 shadow-sm transition-colors hover:border-pink-400 hover:bg-pink-100 hover:text-pink-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500 sm:text-sm lg:px-4"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            Resume
          </a>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-400 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-pink-200 transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500 sm:text-sm lg:px-4"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Contact
          </Link>
        </div>

        <div className="col-span-2 -mx-1 mt-2 overflow-x-auto md:order-2 md:mx-auto md:mt-0 md:overflow-visible">
          <div className="flex min-w-max items-center gap-1 px-1 sm:justify-center lg:gap-2">
            {sectionLinks.map(({ id, label }) => {
              const isActive = activeSection === id;

              return (
                <Link
                  key={id}
                  href={`/#${id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative rounded-full px-2 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 lg:px-3 xl:px-4 xl:text-base ${
                    isActive ? "font-semibold text-pink-950" : "text-pink-600 hover:text-pink-950"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-section-dot"
                      className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-fuchsia-500 shadow-sm shadow-fuchsia-300"
                      transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 32 }}
                      aria-hidden="true"
                    />
                  )}
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Nav>
  );
}
