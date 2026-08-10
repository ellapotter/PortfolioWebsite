export const projectsSection = {
  label: "Projects",
  title: "Projects I've worked on",
  description:
    "From full-stack mobile apps to voting websites, processor design, and embedded hardware — here's a sample of what I've built.",
};

export type ProjectCategory = "app" | "web" | "embedded" | "systems";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  image: string;
  imageFit?: "cover" | "contain";
  github?: string;
  demo?: string;
  caseUrl?: string;
  technologies?: string[];
  featured?: boolean;
};

export const projectFilters: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "app", label: "App" },
  { id: "web", label: "Web" },
  { id: "embedded", label: "Embedded Systems" },
  { id: "systems", label: "Systems" },
];

const categoryLabels: Record<ProjectCategory, string> = {
  app: "APP",
  web: "WEB",
  embedded: "EMBEDDED",
  systems: "SYSTEMS",
};

export function getProjectCategoryLabel(category: ProjectCategory) {
  return categoryLabels[category];
}

export const projects: Project[] = [
  {
    id: "ridematch",
    title: "RideMatch",
    description:
      "A full-stack rideshare platform with dedicated mobile apps for riders and drivers, an administrative web portal, ride-matching tools, payment integration, and a shared MySQL database.",
    category: "app",
    image: "/projects/RideMatchLogo.png",
    imageFit: "contain",
    github: "https://github.com/RideMatch-SeniorDesign/ridematch",
    caseUrl: "/projects/ridematch",
    technologies: ["Flutter", "Dart", "Python", "MySQL", "Stripe", "GitHub"],
    featured: true,
  },
  {
    id: "election-system",
    title: "Election System",
    description:
      "A voting website for managing elections, user roles, voting workflows, and election results. This project focused on building a secure and organized web-based voting system.",
    category: "web",
    image: "/projects/election.svg",
    caseUrl: "#",
  },
  {
    id: "embedded-systems",
    title: "Embedded Systems Lab Series",
    description:
      "A collection of microcontroller projects using the ATmega328P, including a hex counter, rotary encoder input, LCD display output, PWM fan control, timing routines, and hardware debugging.",
    category: "embedded",
    image: "/projects/embedded.svg",
    caseUrl: "#",
  },
  {
    id: "sisc-processor",
    title: "SISC Processor Design",
    description:
      "A computer architecture project using Verilog to design and debug control logic for a simplified processor, including instruction execution, datapath behavior, and ModelSim simulation.",
    category: "systems",
    image: "/projects/processor.svg",
    caseUrl: "#",
  },
  {
    id: "algorithms",
    title: "Algorithms Portfolio",
    description:
      "A collection of Java programming assignments focused on problem solving, time complexity, divide-and-conquer algorithms, dynamic programming, and closest-pair style problems.",
    category: "systems",
    image: "/projects/algorithms.svg",
    caseUrl: "#",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio Website",
    description:
      "A personal portfolio website built with Next.js to showcase my projects, resume, technical skills, and professional experience.",
    category: "web",
    image: "/projects/portfolio.svg",
    caseUrl: "#",
  },
];

export const rideMatchCaseStudy = {
  slug: "ridematch",
  eyebrow: "Featured Project · Senior Design",
  title: "RideMatch",
  status: "Actively developing",
  overview: {
    heading: "Connecting Riders and Drivers Through One Platform",
    paragraphs: [
      "RideMatch is a full-stack rideshare platform developed as a senior design project. The system includes separate Flutter mobile applications for riders and drivers, an administrative web portal, a shared MySQL database, Python utilities, and Stripe payment integration.",
      "The platform is designed to support the complete ride process, including account registration, driver verification, rider and driver matching, ride management, payment handling, ratings, messaging, notifications, and administrative oversight.",
    ],
  },
  role: {
    heading: "My Role: Team Lead and Developer",
    paragraphs: [
      "I serve as the team lead for RideMatch while also contributing directly to its development. I help organize meetings, maintain task lists, coordinate responsibilities, communicate with our sponsor, and guide technical decisions across the project.",
      "My development work has focused heavily on the administrative system, including the admin dashboard, driver-verification workflow, driver approval and denial features, protected administrative routes, and other management tools. I have also contributed to testing, documentation, project planning, and the transition from our initial web-based prototype to the Flutter mobile applications.",
    ],
    responsibilities: [
      "Lead a three-person computer engineering team",
      "Organize meetings, tasks, deadlines, and project documentation",
      "Communicate project progress and technical decisions",
      "Develop administrative dashboard functionality",
      "Build the driver-verification workflow",
      "Implement driver approval and denial tools",
      "Help protect administrative pages and routes",
      "Support database integration and application testing",
      "Help coordinate the rider, driver, and administrative systems",
    ],
  },
  components: [
    {
      title: "Rider Mobile App",
      description: "Designed to allow riders to create accounts, search for rides, connect with available drivers, manage ride details, review ride history, communicate, and submit ratings.",
    },
    {
      title: "Driver Mobile App",
      description: "Designed to allow drivers to register, submit verification information, manage availability, review ride requests, complete ride workflows, communicate with riders, and manage ride activity.",
    },
    {
      title: "Administrative Web Portal",
      description: "Provides tools for administrators to review driver applications, approve or deny drivers, search and filter accounts, inspect driver information, manage reviews, monitor platform activity, and access protected management tools.",
    },
  ],
  features: [
    "Rider and driver account registration", "Administrative authentication", "Driver verification and approval", "Rider and driver matching", "Ride requests and ride management", "Maps, routes, and location tracking", "Ride history", "Ratings and messaging", "Platform notifications", "Stripe payment integration", "Administrative search and filtering", "Protected administrative routes", "Event logging", "End-to-end testing",
  ],
  technologies: [
    { name: "Flutter and Dart", description: "Used to develop the dedicated rider and driver mobile applications." },
    { name: "Python", description: "Used for supporting scripts, backend-related functionality, and database interactions." },
    { name: "MySQL", description: "Provides shared relational data storage for users, drivers, rides, reviews, payments, and administrative information." },
    { name: "Stripe", description: "Supports the application’s payment workflow." },
    { name: "Git and GitHub", description: "Used for source control, collaboration, task coordination, and version management." },
  ],
  architectureDescription: "RideMatch uses multiple user-facing applications connected through shared platform data. The rider and driver apps provide role-specific mobile experiences, while the administrative portal provides verification, account-management, and oversight tools.",
  process: {
    heading: "From Prototype to Full Mobile Platform",
    paragraphs: [
      "The project began with planning, low-fidelity interface designs, database development, account registration, and an administrative prototype. As development progressed, the team expanded the system into dedicated Flutter applications for riders and drivers while continuing to build shared database, payment, matching, and administrative functionality.",
      "The work was organized into development sprints covering registration, driver discovery, matching rules, ride workflows, route integration, history, ratings, messaging, notifications, payments, security review, logging, testing, interface refinement, documentation, and final verification.",
    ],
    steps: [
      "Planning and low-fidelity interfaces", "Database and account foundation", "Administrative portal and driver verification", "Rider and driver mobile applications", "Matching and ride workflows", "Payments, ratings, messaging, and notifications", "Testing, refinement, and documentation",
    ],
  },
  challenges: [
    { title: "Learning a New Mobile Framework", description: "Our team needed to learn Flutter while developing the product. This required independent research, experimentation, and close coordination as we moved from an initial web-based prototype toward dedicated mobile applications." },
    { title: "Coordinating Multiple Applications", description: "RideMatch includes rider, driver, and administrative experiences that must share consistent data and business rules. Coordinating these parts strengthened my understanding of system design, databases, testing, and cross-platform development." },
    { title: "Leading Through Changing Requirements", description: "Sponsor communication and changing project needs required the team to adjust its priorities while continuing to make progress. This strengthened my leadership, organization, communication, and technical decision-making skills." },
  ],
  skills: [
    "Team leadership", "Full-stack development", "Mobile application development", "Relational database design", "Administrative interface development", "Authentication and protected routes", "Payment integration", "Testing and debugging", "Technical documentation", "Project planning", "Sponsor communication", "Collaborative Git workflows",
  ],
};

export type ProjectCaseStudy = typeof rideMatchCaseStudy;

const projectCaseStudies: Record<string, ProjectCaseStudy> = {
  [rideMatchCaseStudy.slug]: rideMatchCaseStudy,
};

export function getProjectCaseStudy(slug: string) {
  return projectCaseStudies[slug];
}

export function getProjectCaseStudySlugs() {
  return Object.keys(projectCaseStudies);
}
