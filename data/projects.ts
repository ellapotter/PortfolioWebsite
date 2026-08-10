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
  cardImage?: string;
  cardImageAlt?: string;
  cardImageFit?: "cover" | "contain";
  imageAlt?: string;
  imageFit?: "cover" | "contain";
  github?: string;
  githubStatus?: "coming-soon";
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
      "Completed senior-design prototype that gives riders more control through preference-aware driver recommendations and swipe-based selection, with Flutter rider and driver apps, a Flask admin portal, and shared Python/MySQL services.",
    category: "app",
    image: "/projects/RideMatchLogo.png",
    cardImage: "/projects/covers/ridematch-cover-v2.png",
    cardImageAlt: "RideMatch mobile app with route and ride-preference icons",
    cardImageFit: "cover",
    imageFit: "contain",
    github: "https://github.com/RideMatch-SeniorDesign/ridematch",
    caseUrl: "/projects/ridematch",
    technologies: ["Flutter", "Dart", "Python", "Flask", "MySQL", "Stripe"],
    featured: true,
  },
  {
    id: "election-system",
    title: "Election Management System",
    description:
      "A role-based election management prototype supporting voter registration, user verification, precinct-based ballots, election administration, voting workflows, and controlled result publication.",
    category: "web",
    image: "/projects/election-system/election-welcome.png",
    cardImage: "/projects/covers/election-management-cover-v2.png",
    cardImageAlt: "Election management system with a secure ballot box and regional results",
    cardImageFit: "cover",
    imageAlt: "Election Management System public welcome page",
    imageFit: "cover",
    caseUrl: "/projects/election-system",
    technologies: ["Python", "Flask", "MySQL", "HTML/CSS"],
    featured: false,
    // Restore after the public repository's exposed mail credential is revoked,
    // moved to environment variables, removed from Git history, and a full secret scan passes:
    // github: "https://github.com/ellapotter/VotingSystem",
  },
  {
    id: "embedded-systems",
    title: "Embedded Systems & Digital Compass",
    description:
      "A series of ATmega328P hardware and software projects culminating in a digital compass with sensor communication, an LCD interface, directional LEDs, push-button controls, and mixed-voltage circuitry.",
    category: "embedded",
    image: "/projects/embedded-systems/img_4694.jpg",
    cardImage: "/projects/covers/embedded-systems-cover-v2.png",
    cardImageAlt: "Embedded digital compass circuit on a breadboard",
    cardImageFit: "cover",
    caseUrl: "/projects/embedded-systems",
    technologies: [
      "ATmega328P",
      "AVR Assembly",
      "Embedded C",
      "I2C",
      "PWM",
      "USART",
      "ADC/DAC",
    ],
    // TODO: Insert the real GitHub repository URL here when it exists.
    githubStatus: "coming-soon",
  },
  {
    id: "library-database",
    title: "Library Database Management System",
    description:
      "A full-stack library management application with patron and staff dashboards, catalog and checkout workflows, room reservations, account management, and a relational MySQL database.",
    category: "web",
    image: "/projects/library-database/staff-dashboard.png",
    cardImage: "/projects/covers/library-database-cover-v2.png",
    cardImageAlt: "Library database connecting books, patrons, reservations, and catalog records",
    cardImageFit: "cover",
    imageFit: "cover",
    github: "https://github.com/ellapotter/LibraryDatabase",
    caseUrl: "/projects/library-database",
    technologies: ["Python", "Flask", "MySQL", "HTML/CSS", "JavaScript"],
    featured: false,
  },
  {
    id: "giftwise",
    title: "GiftWise",
    description:
      "A SaaS-style Ruby on Rails application that helps users organize recipients, plan gift-giving events, track budgets, manage gift ideas, and generate personalized suggestions with AI.",
    category: "web",
    image: "/projects/giftwise/giftwise-icon.svg",
    cardImage: "/projects/giftwise/giftwise-icon.svg",
    cardImageAlt: "GiftWise gift-box logo on a pink background",
    cardImageFit: "cover",
    imageAlt: "GiftWise gift-box logo representing the gift-planning application",
    imageFit: "contain",
    github: "https://github.com/hjmjohnsonSELT2025/giftwiseproject-selt_2025_team_02",
    caseUrl: "/projects/giftwise",
    technologies: [
      "Ruby",
      "Ruby on Rails",
      "RSpec",
      "Cucumber",
    ],
    featured: false,
  },
];

export const embeddedSystemsCaseStudy = {
  slug: "embedded-systems",
  eyebrow: "Coursework · Embedded Systems",
  title: "Embedded Systems & Digital Compass",
  status: "Completed",
  heroImageAlt: "Embedded Systems digital compass prototype circuit with LCD and LED indicators",
  hero: {
    intro:
      "Through a sequence of hands-on embedded systems labs, I developed experience connecting hardware components to the ATmega328P and programming their behavior in AVR assembly and C. The course culminated in a two-person final project that combined a magnetometer, LCD, directional LEDs, push-button controls, and mixed-voltage I2C communication into a digital compass prototype.",
  },
  overview: {
    heading: "Building Hardware and Software as One System",
    paragraphs: [
      "This project collection demonstrates the progression from controlling individual outputs to building an interactive sensor-based system. The labs covered seven-segment displays, shift registers, rotary input, timers, interrupts, PWM, LCD communication, serial communication, and analog-to-digital and digital-to-analog conversion.",
      "The final project brought many of those skills together in a digital compass prototype. The system read magnetic-field measurements from an MMC3416xPJ magnetometer, calculated a heading, displayed the direction and degrees on an LCD, and illuminated an LED corresponding to north, east, south, or west.",
    ],
  },
  collaboration: {
    heading: "Developed in a Two-Person Team",
    paragraphs: [
      "The labs and final project were collaborative efforts completed as part of ECE:3360 Embedded Systems at the University of Iowa. We worked together to construct and test the hardware, write and debug firmware, and document the results across the full project sequence.",
      "I developed confidence in combining circuit construction with register-level programming, and the team’s shared work helped us test communication interfaces, debug hardware and software issues, and integrate multiple subsystems into one working prototype.",
    ],
    items: [
      "Collaborated on breadboard circuit construction and component integration",
      "Wrote and debugged AVR assembly and embedded C",
      "Used datasheets to configure microcontroller registers and external devices",
      "Integrated user inputs, displays, sensors, and communication interfaces",
      "Tested circuits using serial output, a multimeter, and an oscilloscope",
      "Documented hardware, software, calculations, testing, and results",
      "Diagnosed problems across both hardware and software",
    ],
  },
  featuredProject: {
    heading: "Digital Compass Prototype",
    intro:
      "The final project goal was to determine cardinal direction and rotational heading while allowing the user to activate or deactivate the system.",
    hardware: [
      "ATmega328P microcontroller",
      "MMC3416xPJ three-axis AMR magnetometer",
      "16×2 LCD",
      "Four colored directional LEDs",
      "Debounced push-button switch",
      "Two 2N7000 N-channel MOSFETs",
      "Pull-up resistors and mixed-voltage level shifting",
      "Breadboard circuitry",
    ],
    behaviors: [
      "The LCD initially displayed \"PRESS BUTTON TO BEGIN.\"",
      "Pressing the button activated or deactivated the compass.",
      "When active, the program retrieved sensor measurements and calculated the heading.",
      "The LCD displayed the cardinal direction and heading in degrees.",
      "A corresponding LED indicated north, east, south, or west.",
      "The display updated when the calculated direction changed.",
    ],
  },
  integration: {
    heading: "Hardware and Software Integration",
    cards: [
      {
        title: "Sensor input",
        description: "MMC3416xPJ magnetic-field measurements were captured and interpreted as heading data.",
      },
      {
        title: "Communication",
        description: "Bidirectional I2C communication linked the magnetometer to the ATmega328P.",
      },
      {
        title: "Voltage compatibility",
        description: "MOSFET-based level shifting allowed the 3.3V sensor to communicate safely with 5V logic.",
      },
      {
        title: "Processing",
        description: "Heading and cardinal-direction calculations were performed in embedded C on the microcontroller.",
      },
      {
        title: "User interface",
        description: "The LCD, directional LEDs, and push button provided visible feedback and interaction.",
      },
    ],
  },
  labs: {
    heading: "Lab Progression",
    cards: [
      {
        title: "Hexadecimal Up/Down Counter",
        description:
          "Built a hexadecimal counter using the ATmega328P, an SN74HC595 shift register, a seven-segment display, and a debounced push button. AVR assembly lookup tables stored the display patterns for 0–F, while the duration of each button press controlled incrementing, decrementing, mode changes, and resets.",
        skills: ["AVR assembly", "Shift registers", "Lookup tables", "Button timing", "Hardware debouncing", "Seven-segment displays"],
      },
      {
        title: "Rotary Encoder Interface",
        description:
          "Extended the counter with a rotary pulse generator, using quadrature-state changes to determine clockwise and counterclockwise rotation. The lab introduced input masking, timer calculations, and multi-input interaction.",
        skills: ["Quadrature input", "Timers", "Input masking", "Rotary controls", "State tracking"],
      },
      {
        title: "PWM Fan Controller",
        description:
          "Created an interactive cooling-fan controller using Timer/Counter0 PWM generation. A push button controlled the fan’s power, a rotary input adjusted its duty cycle, and an LCD continuously displayed the fan status and duty-cycle percentage.",
        skills: ["PWM", "Pin-change interrupts", "LCD communication", "Duty-cycle calculations", "Rotary input", "AVR assembly"],
      },
      {
        title: "Serial Data Logging System",
        description:
          "Developed a serially controlled analog data-logging system in C. The system used the ATmega328P’s ADC to measure voltages, a MAX518 DAC to generate output voltages, USART for computer communication, and I2C for external-device control.",
        skills: ["Embedded C", "USART", "ADC/DAC", "I2C", "Command parsing", "Serial communication"],
      },
    ],
  },
  testing: {
    heading: "Testing Across Hardware and Software",
    paragraphs: [
      "We tested components separately before combining them into the final system. Serial output helped trace communication with the magnetometer, while a multimeter and oscilloscope were used to verify voltage levels, I2C activity, and level-shifter behavior. This component-by-component approach made it easier to isolate wiring, timing, and communication problems.",
    ],
    bullets: [
      "Incremental integration",
      "Datasheet interpretation",
      "Register-level debugging",
      "Circuit verification",
      "Hardware/software fault isolation",
      "Testing mixed-voltage communication",
    ],
  },
  limitations: {
    heading: "Challenges and Limitations",
    cards: [
      {
        title: "Mixed-Voltage Communication",
        description:
          "The magnetometer operated at 3.3V and was not tolerant of the microcontroller’s 5V logic. The team constructed a bidirectional I2C level shifter using 2N7000 MOSFETs and pull-up resistors.",
      },
      {
        title: "Sensor Reliability",
        description:
          "The magnetometer did not always provide stable heading measurements, even when tested with reference libraries. This limited the consistency of the degree output and reinforced the importance of calibration and sensor validation.",
      },
      {
        title: "I2C Error Handling",
        description:
          "A missed acknowledgement could cause communication to stop and require the prototype to be restarted. A future version would include timeouts, retries, and more robust recovery behavior.",
      },
    ],
  },
  skillsSection: {
    heading: "Skills Demonstrated",
    items: [
      "Embedded systems",
      "AVR assembly",
      "Embedded C",
      "ATmega328P",
      "Register-level programming",
      "I2C",
      "USART",
      "PWM",
      "ADC/DAC",
      "Interrupts",
      "Timers",
      "LCD interfaces",
      "Sensor integration",
      "Circuit construction",
      "Hardware debugging",
      "Datasheet interpretation",
      "Technical documentation",
      "Team collaboration",
    ],
  },
  galleryImages: [
    {
      src: "/projects/embedded-systems/img_2968.jpg",
      alt: "Hexadecimal counter using a seven-segment display and ATmega328P hardware setup",
    },
    {
      src: "/projects/embedded-systems/img_4012.jpg",
      alt: "PWM fan controller showing duty-cycle and fan status on an LCD",
    },
    {
      src: "/projects/embedded-systems/img_4694.jpg",
      alt: "Complete digital compass prototype with LCD, LEDs, and breadboard circuitry",
    },
    {
      src: "/projects/embedded-systems/img_4723.png",
      alt: "Compass display showing cardinal direction and heading in degrees",
    },
    {
      src: "/projects/embedded-systems/img_4372.jpg",
      alt: "Supporting hardware development photograph for the embedded systems prototype",
    },
  ],
  reflection: {
    heading: "Reflection",
    paragraphs: [
      "These projects strengthened my ability to reason about software and hardware together. I gained experience moving from circuit diagrams and datasheets to working prototypes, debugging communication at the register and signal levels, and integrating several components into one interactive embedded system.",
    ],
    ctaLabel: "Explore more projects",
    ctaHref: "/#projects",
  },
};

export const libraryDatabaseCaseStudy = {
  slug: "library-database",
  eyebrow: "Course Project · Database Systems",
  title: "Library Database Management System",
  status: "Completed",
  heroImageAlt: "Staff library dashboard with catalog management and checkout tools",
  hero: {
    intro:
      "A full-stack database application designed to organize common library operations through separate patron and staff experiences. The system connects a Flask web interface to a relational MySQL database containing library materials, checkouts, reservations, fees, events, staff records, and café operations.",
  },
  overview: {
    heading: "Managing Library Operations Through One Connected System",
    paragraphs: [
      "The Library Database Management System was developed as a Database Systems course project. Its purpose was to model the information a library needs to manage and make that data accessible through a working web application.",
      "The project includes separate patron and staff dashboards. Patrons can browse materials, request checkouts, review checkout history, manage room reservations, inspect account information, and view fees. Staff members receive additional tools for managing materials, patrons, checkout requests, returns, reservations, and late fees.",
      "The application demonstrates both database design and full-stack integration. The Flask backend executes parameterized MySQL queries and passes results to Jinja templates, while the database enforces relationships and business rules through keys, constraints, views, triggers, a stored function, and a stored procedure.",
    ],
  },
  collaboration: {
    heading: "Developed as a Team Database Project",
    paragraphs: [
      "This project was completed collaboratively as part of a three-person Database Systems team. The work required coordinating the relational schema, SQL scripts, sample data, application logic, user interface, testing, and written documentation.",
      "We successfully moved from an entity-relationship model and data dictionary to a working schema, implemented query logic for real user workflows, and connected the Python web application to persistent MySQL data across shared development and testing phases.",
    ],
    items: [
      "Relational database design",
      "SQL schema and sample-data development",
      "Flask and MySQL integration",
      "Patron and staff workflow implementation",
      "Query development and testing",
      "Interface development",
      "Technical documentation",
      "Collaborative debugging",
    ],
  },
  overview2: {
    heading: "From Web Interface to Relational Data",
    description:
      "Users interact with server-rendered Flask and Jinja pages. Flask routes validate requests, execute parameterized SQL statements through mysql-connector-python, commit data changes, and return updated dashboard information. MySQL stores the relational data and enforces several business rules at the database level.",
  },
  databaseDesign: {
    heading: "A Schema Covering the Full Library Environment",
    intro: "The relational schema includes 23 tables organized into key domains:",
    domains: [
      {
        title: "Patrons and accounts",
        tables: ["Patron", "Fee", "Registration", "Reservation"],
      },
      {
        title: "Library collection",
        tables: ["Material", "Book", "Film", "Author", "Director", "Book and Film Connector Tables"],
      },
      {
        title: "Circulation",
        tables: ["Checkouts", "CheckoutRequest"],
      },
      {
        title: "Rooms and events",
        tables: ["Room", "Reservation", "SchoolEvent", "Registration"],
      },
      {
        title: "Staff and scheduling",
        tables: ["Staff", "Role", "Availability", "Shift"],
      },
      {
        title: "Library café",
        tables: ["CafeItem", "Category", "CafeOrder", "OrderItem"],
      },
    ],
    explanation:
      "Primary keys identify records, foreign keys connect related entities, unique constraints prevent duplicate data where appropriate, and check constraints validate statuses, dates, quantities, prices, and availability values.",
  },
  userExperience: {
    heading: "Role-Specific Library Workflows",
    patron: {
      heading: "Patron Dashboard",
      capabilities: [
        "Browse all library materials",
        "Search for books by title",
        "Search for films by title",
        "Request an available material for checkout",
        "Review request status",
        "View checkout history",
        "View account and fee information",
        "Update an email address",
        "Review room reservations",
        "Create and cancel room reservations",
        "Review event registrations and account information",
      ],
    },
    staff: {
      heading: "Staff Dashboard",
      capabilities: [
        "Browse books, films, authors, and directors",
        "Add books and films to the collection",
        "Create patron accounts",
        "Update patron information",
        "Delete patron accounts",
        "Create and complete checkouts",
        "Review active and historical checkouts",
        "Process patron checkout requests",
        "Return materials",
        "Review and update room-reservation status",
        "View the total number of checked-out materials",
        "Apply late fees",
      ],
    },
  },
  checkoutWorkflow: {
    heading: "Keeping Requests, Checkouts, and Availability Synchronized",
    steps: [
      { number: 1, description: "A patron selects an available material." },
      { number: 2, description: "The patron submits a checkout request." },
      { number: 3, description: "Staff review the pending request." },
      { number: 4, description: "An accepted request creates a checkout." },
      { number: 5, description: "The material becomes unavailable." },
      { number: 6, description: "Returning the material records the return and makes it available again." },
    ],
    explanation:
      "The application validates material availability, detects duplicate pending requests, checks for active checkouts, and displays success or error messages to the user. The database includes triggers that help synchronize material availability with checkout and return records.",
  },
  sqlCapabilities: {
    heading: "Business Logic at the Database Layer",
    views: {
      heading: "Views",
      description: "The database defines reusable representations of material and reservation information:",
      items: ["Patron_Material_View", "Patron_Reservation_View"],
    },
    triggers: {
      heading: "Triggers",
      description: "Five triggers enforce business rules:",
      items: [
        "Prevent checking out unavailable materials",
        "Mark materials as checked out after checkout creation",
        "Restore availability after a return",
        "Reduce café inventory when order items are created",
        "Prevent overlapping room reservations",
      ],
    },
    function: {
      heading: "Stored Function",
      description: "get_unpaid_fee_total: Calculates a patron's total unpaid fees.",
    },
    procedure: {
      heading: "Stored Procedure",
      description: "apply_late_fees: Creates fees for overdue, unreturned materials.",
    },
    queries: {
      heading: "Queries and Aggregation",
      items: [
        "Multi-table joins",
        "Subqueries",
        "Aggregate functions",
        "Parameterized search",
        "Counts and totals",
        "CRUD operations",
      ],
    },
  },
  galleryImages: [
    {
      src: "/projects/library-database/library-login.png",
      alt: "Library database application login page with patron and staff demo accounts",
    },
    {
      src: "/projects/library-database/patron-dashboard.png",
      alt: "Patron library dashboard with catalog, checkout, reservation, and account tools",
    },
    {
      src: "/projects/library-database/staff-dashboard.png",
      alt: "Staff library dashboard with catalog management and checkout tools",
    },
  ],
  technologies: [
    {
      name: "Python and Flask",
      description: "Provide routing, session handling, form processing, validation, database operations, and server-rendered application logic.",
    },
    {
      name: "MySQL and SQL",
      description: "Store the relational data and implement tables, constraints, joins, subqueries, views, triggers, a function, and a stored procedure.",
    },
    {
      name: "Jinja",
      description: "Renders role-specific dashboard content and database results in reusable HTML templates.",
    },
    {
      name: "HTML, CSS, and JavaScript",
      description: "Create the responsive interface, dashboard tabs, forms, tables, expandable tools, and interactive content.",
    },
    {
      name: "mysql-connector-python",
      description: "Connects the Flask application to MySQL and executes parameterized queries.",
    },
  ],
  challenges: [
    {
      title: "Modeling a Broad Organization",
      description:
        "The schema needed to represent more than books and checkouts. It also connected patrons, rooms, events, fees, staff scheduling, and café operations while preserving meaningful relationships.",
    },
    {
      title: "Coordinating Application and Database State",
      description:
        "Checkout requests, active checkouts, returns, and material availability had to remain consistent across the Flask application and MySQL database.",
    },
    {
      title: "Supporting Different User Roles",
      description:
        "Patrons and staff needed different views of the same data, requiring role-specific dashboards, routes, forms, queries, and permissions.",
    },
  ],
  skillsSection: {
    heading: "Skills Demonstrated",
    items: [
      "Relational database design",
      "MySQL",
      "SQL",
      "Python",
      "Flask",
      "Jinja",
      "HTML/CSS",
      "JavaScript",
      "CRUD operations",
      "Primary and foreign keys",
      "Joins and subqueries",
      "Aggregate queries",
      "Views",
      "Triggers",
      "Stored functions",
      "Stored procedures",
      "Parameterized queries",
      "Role-based interfaces",
      "Form handling",
      "Data validation",
      "Full-stack integration",
      "Git and GitHub",
      "Technical documentation",
      "Team collaboration",
    ],
  },
  reflection: {
    heading: "Reflection",
    paragraphs: [
      "This project strengthened my understanding of how relational database design affects an entire application. I gained experience moving from an ER model and data dictionary to a working schema, writing queries for real user workflows, and connecting a Python web application to persistent MySQL data.",
    ],
    ctaLabel: "Explore more projects",
    ctaHref: "/#projects",
  },
};

export const giftwiseCaseStudy = {
  slug: "giftwise",
  eyebrow: "Team Project · Software Engineering",
  title: "GiftWise",
  status: "Completed",
  heroImageAlt: "GiftWise gift-box logo representing the gift-planning application",
  hero: {
    intro:
      "GiftWise is a collaborative Ruby on Rails application designed to make gift planning easier. Users can create recipient profiles, organize events and budgets, track gift ideas through different stages, and request AI-generated suggestions based on a recipient's interests and personal details.",
  },
  overview: {
    heading: "Making Gift Planning More Personal and Organized",
    paragraphs: [
      "GiftWise brings several parts of gift planning into one database-backed web application. Instead of keeping recipient details, event dates, budgets, and gift ideas in separate places, users can organize them through connected profiles, events, and gift lists.",
      "The application can use recipient information such as age range, relationship, occupation, hobbies, likes, dislikes, and additional notes to request personalized gift suggestions from OpenAI. Users can then organize their ideas and track gifts from an initial idea through planning, ordering, wrapping, and giving.",
      "For me, the project was an opportunity to learn Ruby and Ruby on Rails while working within a larger team codebase. It provided practical experience with Rails conventions, MVC architecture, Active Record relationships, database migrations, authentication, validation, automated testing, API integration, and collaborative Git workflows.",
    ],
  },
  contributions: {
    heading: "Recipient Profiles, User Features, and Budget Planning",
    paragraphs: [
      "My work focused primarily on the recipient and user-management experience. I helped develop the information used to personalize gift suggestions, including birthdays, age ranges, occupations, hobbies, and other recipient details. I also contributed event-recipient budget functionality, account features, Google authentication setup, automated tests, validation, and ongoing bug fixes.",
    ],
    items: [
      "Implemented recipient creation, viewing, editing, and deletion",
      "Added recipient database relationships",
      "Added birthday support and automatic age calculation",
      "Developed selectable age-range functionality",
      "Added occupation, hobbies, and additional recipient information",
      "Added recipient validations and user-facing error messages",
      "Implemented event-recipient budget tracking",
      "Added user signup and profile-editing functionality",
      "Contributed Google OAuth configuration and authentication routes",
      "Added and updated model, controller, request, and view tests",
      "Fixed bugs, routing problems, merge issues, and lint errors",
    ],
  },
  userFlow: {
    heading: "From Recipient Profile to Completed Gift",
    intro:
      "GiftWise connects recipient data, event planning, and gift tracking into one workflow:",
    steps: [
      "Create an account",
      "Add a recipient",
      "Record interests and personal details",
      "Create or select an event",
      "Set a budget",
      "Generate or add gift ideas",
      "Compare product offers",
      "Track the gift's status",
      "Mark the gift as given",
    ],
    explanation:
      "These features are connected through Rails models and database relationships.",
  },
  personalization: {
    heading: "Building Better Context for Gift Suggestions",
    intro:
      "Recipient profiles can store rich information that improves suggestion relevance:",
    fields: [
      "Name",
      "Relationship",
      "Birthday or age range",
      "Gender",
      "Occupation",
      "Likes",
      "Dislikes",
      "Hobbies",
      "Additional information",
    ],
    description:
      "Recipient data provides the context needed to organize ideas and generate more relevant suggestions. Validation prevents incomplete or contradictory age information, while birthday-based age calculation helps keep profiles current. A default general gift list is created when a recipient is added.",
  },
  giftPlanning: {
    heading: "Tracking Ideas Through the Giving Process",
    intro: "GiftWise organizes gifts through connected domain models:",
    relationships: [
      "Recipients",
      "Events",
      "Gift lists",
      "Gifts",
      "Product offers",
      "Individual event-recipient budgets",
    ],
    statuses: ["Idea", "Planned", "Ordered", "Acquired", "Wrapped", "Given"],
    description:
      "This status system turns GiftWise into more than a suggestion generator by helping users manage the complete gift-planning process.",
  },
  aiIntegration: {
    heading: "Suggestions Based on Recipient Context",
    description:
      "GiftWise sends recipient context to the OpenAI API. The service requests structured JSON gift suggestions. Existing gift names can be included to discourage duplicate recommendations. Suggestions are cached for seven days. Users can force a refresh when they want new results. The service handles missing API keys and malformed responses. Basic filtering checks free-form fields for common prompt-manipulation phrases.",
    paragraph:
      "The AI integration demonstrated how an application can transform structured user data into a useful model request, validate the returned format, cache results, and handle external-service failures without making the API the only useful part of the product.",
  },
  productOffers: {
    heading: "Connecting Ideas to Real Product Options",
    intro:
      "The GiftOfferLookupService connects gift ideas to real product options through Google Shopping:",
    features: [
      "Searches Google Shopping through SerpAPI",
      "Retrieves stores, prices, ratings, and product URLs",
      "Removes incomplete offers",
      "Keeps the lowest-priced result from each store",
      "Sorts offers by price",
      "Limits the displayed results",
      "Uses a static fallback catalog when appropriate",
      "Uses deterministic fallback data during tests",
    ],
    note: "GiftWise does not sell products or process purchases.",
  },
  learning: {
    heading: "Learning Ruby Through the Rails Ecosystem",
    cards: [
      {
        title: "Ruby",
        description:
          "Learned Ruby syntax, object-oriented organization, modules, validation methods, enumerations, collections, and service classes.",
      },
      {
        title: "MVC Architecture",
        description:
          "Worked with Rails models, views, and controllers to separate data rules, interface rendering, and request handling.",
      },
      {
        title: "Active Record",
        description:
          "Used model relationships, validations, callbacks, scopes, enums, migrations, and database-backed queries.",
      },
      {
        title: "Rails Conventions",
        description:
          "Learned how resourceful routing, naming conventions, migrations, helpers, partials, and framework structure support a larger application.",
      },
      {
        title: "External Services",
        description:
          "Worked in a codebase that integrated OpenAI, Google OAuth, and product-search APIs through environment-based configuration.",
      },
      {
        title: "Team Development",
        description:
          "Practiced Git branching, pull requests, merge-conflict resolution, linting, testing, and incremental feature development in a shared repository.",
      },
    ],
  },
  saasDesign: {
    heading: "Designing a Multi-Feature Web Service",
    intro:
      "GiftWise demonstrates SaaS-style concepts through comprehensive application design:",
    features: [
      "User accounts",
      "User-owned persistent data",
      "Personalized application experiences",
      "Connected domain models",
      "Authentication",
      "Third-party API integrations",
      "Cached service results",
      "Form validation",
      "Automated testing",
      "Environment-based configuration",
      "Separate development, testing, and production database configurations",
      "Container and deployment configuration included in the repository",
    ],
    note: "The application does not have paying customers, subscriptions, production users, guaranteed uptime, or a confirmed public deployment.",
  },
  architecture: {
    heading: "Rails MVC with External Service Integrations",
    description:
      "Rails coordinates the application through resourceful routes and MVC conventions. Active Record models store users, recipients, events, budgets, lists, gifts, and offers. Service classes isolate external AI and shopping-search logic from the primary controllers and models.",
    diagram: {
      elements: [
        "User",
        "Rails Controllers & Views",
        "Active Record Models",
        "Application Database",
        "OpenAI API",
        "Google OAuth",
        "SerpAPI Product Search",
      ],
    },
  },
  testing: {
    heading: "Validating Features at Multiple Levels",
    intro: "GiftWise uses comprehensive testing throughout the development process:",
    tools: [
      "RSpec model tests",
      "RSpec controller tests",
      "Request tests",
      "View tests",
      "Service tests",
      "Cucumber feature scenarios",
      "Capybara",
      "SimpleCov coverage reporting",
      "RuboCop linting",
      "Brakeman security analysis",
      "Bundler Audit",
    ],
    description:
      "Feature scenarios cover areas such as authentication, recipients, events, gifts, offers, and gift-status updates.",
  },
  reflection: {
    heading: "Working in a Large Collaborative Rails Codebase",
    cards: [
      {
        title: "Learning a New Framework",
        description:
          "Ruby on Rails introduced a new language, framework conventions, directory structure, routing system, and database abstraction that I had to learn while actively contributing features.",
      },
      {
        title: "Coordinating Connected Models",
        description:
          "Recipients, events, budgets, gift lists, gifts, and users depend on one another. Changes required careful attention to associations, validations, migrations, and referential integrity.",
      },
      {
        title: "Collaborative Development",
        description:
          "Multiple developers contributed simultaneously, making clear branches, tests, linting, pull-request feedback, and merge-conflict resolution important parts of the development process.",
      },
    ],
    conclusion:
      "GiftWise taught me how Rails conventions can support rapid development without removing the need for thoughtful data modeling, validation, testing, and teamwork. It also gave me experience contributing meaningful features to an existing team application rather than building only isolated assignments.",
  },
  technologies: [
    { name: "Ruby 3.3.8", description: "The programming language used throughout the Rails application." },
    { name: "Ruby on Rails 8.1.1", description: "The web framework coordinating MVC architecture, routing, and database operations." },
    { name: "Active Record", description: "Rails' ORM for database access, migrations, validations, and model relationships." },
    { name: "SQLite", description: "The database for development and test environments." },
    { name: "PostgreSQL", description: "The database for production deployments." },
    { name: "Hotwire", description: "Rails' frontend approach for responsive page updates without a large client framework." },
    { name: "Stimulus", description: "JavaScript controllers for focused interactions such as gift-status updates." },
    { name: "Tailwind CSS", description: "Utility-first CSS framework for responsive design." },
    { name: "OpenAI API", description: "External service for generating personalized gift suggestions." },
    { name: "Google OAuth", description: "Authentication provider for single sign-on functionality." },
    { name: "SerpAPI", description: "External service for searching Google Shopping product data." },
    { name: "RSpec", description: "Testing framework for model, controller, request, and view tests." },
    { name: "Cucumber", description: "Behavior-driven development framework for feature scenarios." },
    { name: "Capybara", description: "Testing library for simulating user interactions with the application." },
    { name: "Git and GitHub", description: "Version control, branching, pull requests, review, and team collaboration." },
  ],
  skillsSection: {
    heading: "Skills Demonstrated",
    items: [
      "Ruby",
      "Ruby on Rails",
      "MVC architecture",
      "SaaS-style application development",
      "Active Record",
      "Database migrations",
      "Model associations",
      "Data validation",
      "Authentication",
      "OAuth integration",
      "API integration",
      "AI-assisted features",
      "Recipient management",
      "Budget tracking",
      "Automated testing",
      "Behavior-driven development",
      "Debugging",
      "Git workflows",
      "Pull-request collaboration",
      "Team software development",
    ],
  },
  reflection_cta: {
    ctaLabel: "View Code on GitHub",
    ctaHref: "https://github.com/hjmjohnsonSELT2025/giftwiseproject-selt_2025_team_02",
  },
};

export const electionSystemCaseStudy = {
  slug: "election-system",
  eyebrow: "Academic Project · Full-Stack Development",
  title: "Election Management System",
  status: "Completed prototype",
  heroImageAlt: "Election administration page listing sample elections, dates, races, precincts, and ballot controls",
  hero: { intro: "A full-stack election management prototype built with Python, Flask, and MySQL. The application models separate voter, manager, and administrator workflows, including account registration, user verification, precinct-based ballots, election configuration, ballot activation, voting, result verification, and controlled public result release." },
  overview: { heading: "Modeling an Election from Registration to Results", paragraphs: [
    "The Election Management System explores the many connected workflows required to organize an election. Rather than focusing only on casting a vote, the application includes voter registration, account approval, precinct configuration, election and race management, ballot generation, manager assignments, voting, result calculation, and public result release.",
    "The application uses separate voter, manager, and administrator roles. Each role receives different routes and interface options based on its responsibilities. Flask blueprints separate authentication, primary voter features, and administrative operations, while controller modules organize database logic for users, elections, races, candidates, precincts, ballots, managers, notifications, and email.",
    "This project strengthened my understanding of full-stack development, relational data modeling, role-based workflows, server-rendered interfaces, session-based voting flows, database-backed business rules, and automated testing.",
  ] },
  electionCaseStudy: {
    scope: { heading: "Contributions and Technical Scope", description: "This project required integrating authentication, election configuration, relational database design, voting logic, administrative workflows, interface development, and testing into one connected system.", items: ["Python and Flask development", "MySQL schema design", "Server-rendered Jinja templates", "Role-based routes and dashboards", "Election and precinct management", "Ballot and voting workflows", "Form validation", "Testing and debugging", "Technical integration"] },
    roles: [
      { title: "Voter", items: ["Create a voter account", "Wait for account verification", "Log in after approval", "Review and update profile information", "Submit sensitive profile changes for review", "View notifications", "Access an eligible active ballot", "Move through races one at a time", "View candidate profiles", "Review selections before submission", "Submit one ballot per election", "View public results after release"] },
      { title: "Manager", items: ["Work with an assigned precinct", "Review ballots for that precinct", "Activate and deactivate eligible ballots", "Count ballot results", "Review or declare precinct-level results", "Participate in result-verification workflows"] },
      { title: "Administrator", items: ["Approve or deny new users", "Review profile-change requests", "Create role invite codes", "Search users across multiple fields", "Create and manage elections", "Create and manage races and candidates", "Create and manage precincts", "Associate elections and races with precincts", "Generate and verify ballots", "Assign managers to precincts", "Review election results", "Release approved results publicly"] },
    ],
    configuration: { heading: "Connecting Elections, Races, Candidates, and Precincts", items: ["Elections", "Races", "Candidates", "Precincts", "ZIP-code ranges", "Election-precinct associations", "Race-precinct associations", "Ballots"], description: "Administrators can create elections and connect them to the precincts and races that apply. Races are associated with candidates and eligible precincts. Ballots are then generated for the precincts participating in an election, allowing different voters to receive the races that apply to their location." },
    votingFlow: ["A voter registers and receives a generated user ID.", "An administrator verifies the account.", "The system uses the voter’s ZIP code to identify a precinct.", "The system finds a verified, active ballot for that precinct.", "The voter moves through the ballot one race at a time.", "Candidate information is available during selection.", "The voter reviews a summary.", "The ballot is submitted.", "A database constraint prevents a second submission for the same election.", "Results remain unavailable publicly until released."],
    lifecycle: ["Election dates configured", "Precinct ballots created", "Pending, verified, or rejected review", "Eligible ballot activated", "Voting window", "Votes counted", "Manager and administrator verification", "Results released publicly"],
    database: { domains: [
      { title: "Users and verification", items: ["Users", "Admins", "Invite codes", "Verifications", "Notifications"] },
      { title: "Election configuration", items: ["Elections", "Races", "Candidates", "Precincts", "ZIP-code ranges"] },
      { title: "Associations", items: ["Election–race", "Race–candidate", "Election–precinct", "Race–precinct", "Manager–precinct"] },
      { title: "Ballots and results", items: ["Ballots", "Voter ballots", "Ballot audit", "Ballot results", "Ballot winners", "Race results"] },
      { title: "Database views", items: ["Election race results", "Public election results"] },
    ], description: "The initialization defines 21 tables and two result views. Primary keys, foreign keys, unique constraints, status fields, and association tables connect users, election configuration, ballot activity, and result publication." },
    controls: ["Passwords are hashed with bcrypt", "Flask-Login manages authenticated sessions", "Pending users cannot log in", "Administrative and manager routes check user roles", "Manager and administrator registration requires invite codes", "Login attempts are tracked", "Account approval is separated from signup", "Profile changes can require administrative review", "Notifications communicate approval and rejection events"],
    results: "The database contains an internal election-results view and a public-results view. The public view joins election data with a release flag so results remain hidden until an administrator explicitly releases them.",
    gallery: [
      { src: "/projects/election-system/election-welcome.png", alt: "Election prototype welcome page with signup and login options", caption: "The public landing page directs users to account creation or login." },
      { src: "/projects/election-system/voter-signup.png", alt: "Voter signup form with role selection and blank registration fields", caption: "Role-specific signup collects the information required for account review." },
      { src: "/projects/election-system/election-management.png", alt: "Election administration page listing sample elections and ballot controls", caption: "Administrators can review elections and manage their associated ballots." },
      { src: "/projects/election-system/precinct-associations.png", alt: "Election and precinct association management interface", caption: "Election and race configuration determines which precincts receive each ballot." },
      { src: "/projects/election-system/manager-assignments.png", alt: "Manager assignment interface showing sample election cards", caption: "Administrators assign managers to election polling locations." },
      { src: "/projects/election-system/voter-dashboard.png", alt: "Sample voter dashboard with voting and profile actions", caption: "Verified voters receive a simplified dashboard for voting and profile management." },
    ],
    tests: ["Election creation", "Race and precinct associations", "Precinct and ZIP-code behavior", "Candidate operations", "Application routes", "Results hidden before release", "Results visible after release", "Public view enforcing the release flag", "Voters blocked from administrative dashboards", "Administrators allowed to access administrative dashboards"],
    challenges: [
      { title: "Coordinating Multiple Roles", description: "Voters, managers, and administrators require different interfaces, permissions, and responsibilities while still working with the same election data." },
      { title: "Managing Relational Associations", description: "Elections, races, candidates, precincts, managers, and ballots form a highly connected data model that requires careful association handling." },
      { title: "Protecting Workflow State", description: "The application must prevent duplicate voting, restrict ballots by precinct and date, track ballot status, and control when results become public." },
      { title: "Recognizing Security Boundaries", description: "Building the prototype demonstrated that a functional voting workflow is different from a production election system, which would require extensive cryptographic, infrastructure, privacy, accessibility, auditing, and certification work." },
    ],
    conclusion: "This project strengthened my ability to break a large real-world process into roles, data relationships, routes, validation rules, and state transitions. It also showed me why high-stakes systems require both functional correctness and a much deeper level of security review.",
    technologies: ["Python", "Flask", "Flask Blueprints", "Flask-Login", "Flask-Mail", "bcrypt", "MySQL", "Jinja", "HTML/CSS", "JavaScript", "pytest", "Git and GitHub"],
    skills: ["Full-stack development", "Python", "Flask", "MySQL", "Relational database design", "Role-based access", "Authentication", "Password hashing", "Server-side sessions", "CRUD operations", "Dynamic queries", "Form validation", "Election modeling", "Workflow design", "State management", "Jinja templates", "Automated testing", "Debugging", "Security awareness", "Technical documentation"],
  },
};

export const rideMatchCaseStudy = {
  slug: "ridematch",
  eyebrow: "Featured Project · Senior Design",
  title: "RideMatch",
  status: "Completed prototype",
  hero: {
    intro: "RideMatch is a completed senior-design prototype that replaces automatic driver assignment with a rider-controlled, preference-aware matching experience. Riders can browse compatible available drivers and choose who they request rather than receiving an automatic assignment.",
  },
  overview: {
    heading: "A More Personal and Transparent Rideshare Experience",
    paragraphs: [
      "RideMatch is a multi-interface rideshare prototype created by a three-person engineering senior-design team. Its purpose is to make rides more personalized and transparent by allowing riders to choose among compatible available drivers instead of receiving an automatic assignment.",
      "The team delivered separate Rider and Driver Flutter applications, a browser-based Flask administrative portal, shared Python services, and a MySQL database. The working prototype was tested locally but was not published to the iOS or Android app stores.",
      "Production use would require additional hosting, security, privacy, payment, mapping, monitoring, and deployment work. The prototype demonstrates the product concept and connected role-based workflows without claiming production readiness.",
    ],
  },
  role: {
    heading: "My Role: Team Lead and Full-Stack Developer",
    paragraphs: [
      "RideMatch was a collaborative three-person project with responsibilities rotating across the Rider, Driver, Admin, backend, and database components. As team lead, I coordinated tasks, recurring meetings, development progress, documentation, and the GitHub workflow while contributing directly to implementation.",
      "My primary technical work included the basic administrative login and protected access, significant portions of the admin dashboard, driver review and approval workflows, matching rules, ride-flow support, event logging, testing, debugging, and final system integration.",
    ],
    responsibilities: [
      "Established and maintained the team’s GitHub workflow",
      "Coordinated project tasks, meetings, and development progress",
      "Built basic administrative login and protected admin access",
      "Developed significant portions of the administrative dashboard",
      "Implemented driver review, approval, and denial workflows",
      "Contributed to rider-driver matching rules",
      "Supported ride-request and ride-progression flows",
      "Added event logging and supported automated and end-to-end testing",
      "Contributed to documentation, debugging, and final integration",
    ],
  },
  rideMatchDetails: {
    differentiator: "RideMatch replaces automatic driver assignment with a rider-controlled, preference-aware matching experience.",
    flow: [
      "A rider or driver creates an account and signs in.",
      "A new driver passes the administrative review workflow before activation.",
      "A rider selects pickup and destination locations.",
      "The system finds approved, available drivers using location and ride criteria.",
      "Preference-aware matching compares rider priorities with driver characteristics and shared preferences.",
      "The rider browses drivers with a swipe-based interface.",
      "A selected driver receives the request and can accept or decline it.",
      "An accepted request moves through the ride lifecycle.",
      "Completed rides are saved to history and can support ratings, reviews, payments, and tips.",
      "Administrators can monitor accounts, driver applications, trip activity, reviews, analytics, and platform settings.",
    ],
    features: [
      "Rider-controlled driver selection", "Swipe-based driver browsing", "Prioritized ride-preference categories", "Shared-preference and recommendation indicators", "Pickup and destination search", "Current-location and map support", "Driver availability and request dispatch", "Ride-request response window", "Role-based Rider, Driver, and Admin access", "Driver verification and approval", "Ride lifecycle and trip history", "Rider and driver ratings", "Driver earnings, fares, and tips", "Administrative analytics and settings", "Authentication and protected routes", "Event logging", "Automated and cross-client testing",
    ],
    architecture: [
      { title: "Rider Flutter App", description: "Pickup and destination planning, ride preferences, driver browsing, requests, trip progress, history, and feedback." },
      { title: "Driver Flutter App", description: "Availability, ride-request responses, lifecycle updates, rider communication, ratings, fares, tips, and income views." },
      { title: "Shared Python Services", description: "REST-style APIs and Socket.IO events connect mobile clients to matching, trip, payment, and communication logic." },
      { title: "MySQL Database", description: "Shared relational data for accounts, verification, preferences, rides, ratings, payments, and administrative activity." },
      { title: "Flask Admin Portal", description: "Protected browser interface for driver review, accounts, analytics, platform settings, and oversight." },
    ],
    process: ["Two-week Agile sprints", "Recurring team meetings", "GitHub branches, pull requests, issues, and task tracking", "Low-fidelity UI designs", "Learning Flutter during development", "Iterative mobile, API, and database integration", "Manual tests and cross-client scenarios", "pytest and Flutter widget testing", "Refinement based on constraints and feedback"],
    limitations: ["Cloud hosting and production database infrastructure", "Secure secret and environment management", "More extensive privacy and security review", "Production-grade mapping and real-time location services", "Hardened payment workflows", "Broader device and platform testing", "iOS and Android app-store deployment", "Monitoring, scalability, and operational support"],
    screenshots: [
      { src: "/projects/ridematch/login.png", alt: "RideMatch Rider authentication screen", caption: "Rider authentication introduces the mobile experience." },
      { src: "/projects/ridematch/rider-dashboard.png", alt: "RideMatch Rider dashboard with trip summary and ride preferences", caption: "The rider dashboard summarizes trips, ratings, and selected comfort preferences." },
      { src: "/projects/ridematch/ride-planning.png", alt: "Ride planning screen with map, pickup, destination, and ride type fields", caption: "Map-based planning supports current location, pickup, destination, and ride type." },
      { src: "/projects/ridematch/driver-matching.png", alt: "Swipe-based driver recommendation showing compatibility indicators", caption: "Riders compare available drivers using recommendation and shared-preference context." },
      { src: "/projects/ridematch/driver-dispatch.png", alt: "Driver dispatch screen with an incoming ride assignment and response window", caption: "Drivers manage availability and respond to incoming ride requests." },
      { src: "/projects/ridematch/driver-income.png", alt: "Driver income screen showing fares, tips, and pay-period summaries", caption: "The driver experience summarizes fare share, tips, and payout periods using demo data." },
      { src: "/projects/ridematch/ride-preferences.png", alt: "Ride preference screen with selectable and prioritized comfort options", caption: "Riders select and prioritize comfort preferences used during matching." },
    ],
  },
};

export type ProjectCaseStudy = {
  slug: string;
  eyebrow: string;
  title: string;
  status: string;
  heroImageAlt?: string;
  overview?: { heading: string; paragraphs: string[] };
  overview2?: { heading: string; description: string };
  contributions?: { heading: string; paragraphs: string[]; items: string[] };
  userFlow?: {
    heading: string;
    intro?: string;
    steps: string[];
    explanation?: string;
  };
  personalization?: {
    heading: string;
    intro?: string;
    fields?: string[];
    description?: string;
  };
  giftPlanning?: {
    heading: string;
    intro?: string;
    relationships?: string[];
    statuses?: string[];
    description?: string;
  };
  aiIntegration?: {
    heading: string;
    description?: string;
    paragraph?: string;
  };
  productOffers?: {
    heading: string;
    intro?: string;
    features?: string[];
    note?: string;
  };
  learning?: { heading: string; cards: Array<{ title: string; description: string }> };
  saasDesign?: {
    heading: string;
    intro?: string;
    features?: string[];
    note?: string;
  };
  architecture?: {
    heading: string;
    description?: string;
    diagram?: { elements: string[] };
  };
  reflection_cta?: { ctaLabel: string; ctaHref: string };
  databaseDesign?: {
    heading: string;
    intro: string;
    domains: Array<{ title: string; tables: string[] }>;
    explanation: string;
  };
  userExperience?: {
    heading: string;
    patron: { heading: string; capabilities: string[] };
    staff: { heading: string; capabilities: string[] };
  };
  checkoutWorkflow?: {
    heading: string;
    steps: Array<{ number: number; description: string }>;
    explanation: string;
  };
  sqlCapabilities?: {
    heading: string;
    views?: { heading: string; description: string; items: string[] };
    triggers?: { heading: string; description: string; items: string[] };
    function?: { heading: string; description: string };
    procedure?: { heading: string; description: string };
    queries?: { heading: string; items: string[] };
  };
  role?: { heading: string; paragraphs: string[]; responsibilities: string[] };
  components?: Array<{ title: string; description: string }>;
  features?: string[];
  technologies?: Array<{ name: string; description: string }>;
  architectureDescription?: string;
  process?: { heading: string; paragraphs: string[]; steps: string[] };
  challenges?: Array<{ title: string; description: string }>;
  skills?: string[];
  hero?: { intro: string };
  electionCaseStudy?: typeof electionSystemCaseStudy.electionCaseStudy;
  rideMatchDetails?: typeof rideMatchCaseStudy.rideMatchDetails;
  galleryImages?: Array<{ src: string; alt: string }>;
  collaboration?: { heading: string; paragraphs: string[]; items: string[] };
  featuredProject?: {
    heading: string;
    intro: string;
    hardware: string[];
    behaviors: string[];
  };
  integration?: { heading: string; cards: Array<{ title: string; description: string }> };
  labs?: { heading: string; cards: Array<{ title: string; description: string; skills: string[] }> };
  testing?: { heading: string; paragraphs?: string[]; bullets?: string[]; intro?: string; tools?: string[]; description?: string };
  limitations?: { heading: string; cards: Array<{ title: string; description: string }> };
  skillsSection?: { heading: string; items: string[] };
  reflection?: { heading: string; paragraphs?: string[]; cards?: Array<{ title: string; description: string }>; conclusion?: string; ctaLabel?: string; ctaHref?: string };
};

const projectCaseStudies: Record<string, ProjectCaseStudy> = {
  [electionSystemCaseStudy.slug]: electionSystemCaseStudy,
  [libraryDatabaseCaseStudy.slug]: libraryDatabaseCaseStudy,
  [giftwiseCaseStudy.slug]: giftwiseCaseStudy,
  [rideMatchCaseStudy.slug]: rideMatchCaseStudy,
  [embeddedSystemsCaseStudy.slug]: embeddedSystemsCaseStudy,
};

export function getProjectCaseStudy(slug: string) {
  return projectCaseStudies[slug];
}

export function getProjectCaseStudySlugs() {
  return Object.keys(projectCaseStudies);
}
