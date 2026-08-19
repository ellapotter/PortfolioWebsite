export const site = {
  name: "Ella Potter",
  tagline: "Computer Science & Engineering student building mobile apps, embedded systems, and full-stack projects.",
  role: "Computer Science & Engineering Student",
  typewriterSequences: [
    "Engineer. Problem Solver. Critical Thinker. Designer.",
    "Coder. Java. Python. C++. Dart. SQL. Ruby.",
    "Leader. Creator. Builder. Learner.",
  ],
};

export const about = {
  heading: "About Me",
  portrait: {
    src: "/ProfilePicture.jpg",
    fallbackSrc: "/images/ella-portrait-placeholder.svg",
    alt: "Portrait of Ella Potter.",
  },
  bio: "I’m a Computer Science & Engineering student at the University of Iowa planning to graduate in December 2026. My experience includes mobile app development, web development, databases, embedded systems, robotics, and full-stack projects. I like working on projects that combine creativity with technical problem-solving, whether I’m building an app, debugging hardware, or helping others learn how to code.",
  education: [
    {
      school: "University of Iowa",
      degree: "B.S.E. in Computer Science & Engineering",
      period: "2022 – 2026",
      details: "Relevant coursework: Data Structures, Algorithms, Operating Systems, Embedded Systems, Software Engineering, Computer Achitecture, Artificial Intelligence",
    },
  ],
};

export type SkillIcon =
  | "openjdk"
  | "python"
  | "cplusplus"
  | "flutter"
  | "rubyonrails"
  | "mysql"
  | "html5"
  | "dart"
  | "arduino"
  | "git"
  | "docker";

export type Skill = {
  name: string;
  icon: SkillIcon;
};

export const skills: Skill[] = [
  { name: "Java", icon: "openjdk" },
  { name: "Python", icon: "python" },
  { name: "C++", icon: "cplusplus" },
  { name: "Flutter", icon: "flutter" },
  { name: "Ruby on Rails", icon: "rubyonrails" },
  { name: "MySQL", icon: "mysql" },
  { name: "HTML", icon: "html5" },
  { name: "Arduino", icon: "arduino" },
  { name: "Git", icon: "git" },
  { name: "Docker", icon: "docker" },
];

export const experience = [
  {
    title: "Software Engineering Intern",
    organization: "RideMatch",
    period: "May 2026 – Present",
    highlights: [
      "Continue developing RideMatch beyond the initial senior design prototype into a production-ready application",
      "Develop and improve Flutter-based rider and driver mobile applications",
      "Debug application functionality and integrate frontend, backend, database, and payment systems",
      "Support application testing, deployment, and preparation for public release",
      "Collaborate with the project sponsor to translate business requirements into technical features",
    ],
  },
  {
    title: "Lead Coding & Robotics Instructor",
    organization: "iCode",
    period: "Summer 2025",
    highlights: [
      "Led coding, robotics, and gaming lessons for students ages 6–15",
      "Taught beginner-friendly programming concepts using Python, Java, and C#",
      "Helped students debug code, solve problems, and build confidence with technology",
    ],
  },
  {
    title: "Social Media Manager",
    organization: "Polished Nails & Spa",
    period: "May 2023 – Present",
    highlights: [
      "Curate and design engaging social media posts",
      "Interact with customers across social platforms",
      "Grow audience engagement and appointment bookings",
    ],
  },
];

export type EmbeddedSubProject = {
  name: string;
  description: string;
};

export type { Project, ProjectCategory } from "./projects";
export { projects, projectsSection, projectFilters, getProjectCategoryLabel } from "./projects";

export const contact = {
  heading: "Let's build something together",
  subheading: "I am open to software engineering, project collaborations, and opportunities to solve interesting problems.",
  email: "ellapotter80@gmail.com",
  github: "https://github.com/ellapotter",
  linkedin: "https://www.linkedin.com/in/ella-potter-7384632a8/",
  resume: "/resume.pdf",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
