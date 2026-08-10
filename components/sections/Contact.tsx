"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileText, Code2, Link2 } from "lucide-react";
import { contact } from "@/data/portfolio";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  sectionContainer,
  sectionDescription,
  sectionLabel,
  sectionPadding,
  sectionTitle,
} from "@/components/ui/sectionLayout";

const socialLinks = [
  { href: contact.github, label: "GitHub", icon: Code2 },
  { href: contact.linkedin, label: "LinkedIn", icon: Link2 },
  { href: contact.resume, label: "Resume", icon: FileText },
];

export function Contact() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatedSection id="contact" className={`bg-pink-50 ${sectionPadding}`}>
      <div className={`${sectionContainer} text-center`}>
        <p className={sectionLabel}>Contact</p>
        <h2 className={`mb-4 ${sectionTitle}`}>{contact.heading}</h2>
        <p className={`mb-10 max-w-3xl lg:mb-12 ${sectionDescription}`}>
          {contact.subheading}
        </p>

        <div className="mb-8 flex flex-wrap justify-center gap-4 lg:mb-10 lg:gap-5">
          {socialLinks.map(({ href, label, icon: Icon }) => {
            const Link = prefersReducedMotion ? "a" : motion.a;
            return (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                {...(!prefersReducedMotion && {
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.98 },
                })}
                className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-5 py-2.5 text-sm font-medium text-pink-800 shadow-sm transition-colors hover:border-pink-400 hover:bg-pink-50 hover:text-pink-600 lg:px-6 lg:py-3 lg:text-base"
              >
                <Icon className="h-4 w-4 lg:h-5 lg:w-5" />
                {label}
              </Link>
            );
          })}
        </div>

        <a
          href={`mailto:${contact.email}`}
          className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full px-10 text-sm font-semibold lg:h-16 lg:px-12 lg:text-base"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-pink-500 to-fuchsia-400 p-[2px]">
            <span className="flex h-full w-full items-center justify-center rounded-full bg-white transition-colors group-hover:bg-pink-50" />
          </span>
          <span className="relative gradient-text">Say hello →</span>
        </a>
      </div>
    </AnimatedSection>
  );
}
