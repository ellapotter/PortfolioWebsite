"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sectionLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Links" },
] as const;

export function Navbar() {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/projects/");
  const isGamePage = pathname === "/game";
  const [activeSection, setActiveSection] = useState("home");
  const displayedActiveSection = isProjectPage ? "projects" : activeSection;
  const Nav = prefersReducedMotion ? "nav" : motion.nav;

  useEffect(() => {
    if (isProjectPage || isGamePage) {
      return;
    }

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
  }, [isProjectPage, isGamePage]);

  if (isGamePage) {
    return null;
  }

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
        className="relative grid min-h-28 w-full grid-cols-[auto_1fr] items-center gap-x-4 px-4 py-3 sm:px-6 md:flex md:min-h-[4.75rem] md:py-0 lg:px-8"
      >
        <Link
          href="/#about"
          aria-label="Ella Potter — about me"
          className="shrink-0 rounded-full transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500"
        >
          <Image
            src="/PinkOnPinkLogo.png"
            alt=""
            width={56}
            height={56}
            priority
            className="h-11 w-11 lg:h-13 lg:w-13"
          />
        </Link>

        <div className="col-span-2 -mx-1 mt-2 overflow-x-auto md:ml-auto md:mr-0 md:mt-0 md:overflow-visible">
          <div className="flex min-w-max items-center gap-1 px-1 sm:justify-center lg:gap-2">
            {sectionLinks.map(({ id, label }) => {
              const isActive = displayedActiveSection === id;

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
