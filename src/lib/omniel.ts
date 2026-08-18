/**
 * Single source of truth for OMNIEL website content.
 *
 * ACCURACY RULES (do not break):
 * - OMNIEL is an early-stage, pre-launch AI & technology initiative based in Nigeria.
 * - No offices, funding, investors, customers, partners, employees, benchmarks or launch dates.
 * - Ambitions must always read as ambitions, never as current capability.
 */

export type ProductSlug = "nova" | "vyren" | "arvo" | "kiwi";

export type ProductStatus = "In development" | "Emerging project";

export type Product = {
  slug: ProductSlug;
  name: string;
  kind: string;
  role: string;
  statement: string;
  summary: string;
  hue: number;
  status: ProductStatus;
  audience: string[];
  capabilities: { title: string; body: string }[];
  notes: string[];
};

export const products: Product[] = [
  {
    slug: "nova",
    name: "NOVA",
    kind: "Generalist",
    role: "Generalist AI assistant",
    statement: "Do more, with less unnecessary manual work.",
    summary:
      "NOVA is OMNIEL's generalist assistant: productivity, general assistance and computer interaction, designed to work online and, where possible, offline.",
    hue: 205,
    status: "In development",
    audience: [
      "Students",
      "General users",
      "People who want computer automation",
      "Anyone with repetitive daily tasks",
    ],
    capabilities: [
      {
        title: "Voice and text",
        body: "Speak or type. NOVA is designed to accept instructions the way a person would give them.",
      },
      {
        title: "Computer interaction",
        body: "Opening and interacting with applications, file control and browser control as part of everyday work.",
      },
      {
        title: "Vision and web",
        body: "Screen understanding and web search so instructions can point at things rather than describe them.",
      },
      {
        title: "Memory and planning",
        body: "Persistent context, planning and background tasks so long work does not restart from zero.",
      },
      {
        title: "Self-editing",
        body: "An architecture that can adjust its own routines as workflows change.",
      },
      {
        title: "Offline intelligence",
        body: "A core direction for NOVA: staying useful when connectivity is poor, expensive or unavailable.",
      },
    ],
    notes: [
      "NOVA is in active development. Capabilities are at different stages of maturity and not all of them are production-ready.",
      "Designed with a target of significantly improving productivity, with an internal goal of roughly 40–60%. This is an internal target, not an independently validated benchmark.",
      "The source repository is private. A development build may be made available to visitors.",
    ],
  },
  {
    slug: "vyren",
    name: "VYREN",
    kind: "Specialist",
    role: "Specialist AI for complex technical work",
    statement: "Built for complexity.",
    summary:
      "VYREN is OMNIEL's specialist system for developers, engineers and technical users working on hard problems — coding, deep technical reasoning and complex research.",
    hue: 78,
    status: "In development",
    audience: ["Developers", "Engineers", "Technical users", "People facing complex problems"],
    capabilities: [
      {
        title: "Coding and programming",
        body: "Focused assistance across writing, reading and reasoning about real codebases.",
      },
      {
        title: "Complex technical reasoning",
        body: "Designed for problems where the difficulty is the point, not for casual conversation.",
      },
      {
        title: "Web research and search",
        body: "Gathering, comparing and reconciling technical sources as part of a task.",
      },
      {
        title: "Difficult workflows",
        body: "Long, multi-step technical work that does not fit into a single question and answer.",
      },
    ],
    notes: [
      "VYREN is in private development. Capabilities are still maturing.",
      "A downloadable desktop application is planned. It has not launched.",
      "The source repository is private.",
    ],
  },
  {
    slug: "arvo",
    name: "ARVO",
    kind: "General + Specialist",
    role: "Voice-first AI system",
    statement: "Intelligence you can talk to.",
    summary:
      "ARVO combines general-purpose and specialist capability with a strong voice-first direction, built around memory, vision and tool use.",
    hue: 300,
    status: "In development",
    audience: ["General users", "Professionals", "Teams", "Hands-busy environments"],
    capabilities: [
      {
        title: "Voice-first",
        body: "Conversation is the primary surface rather than an accessory to a text box.",
      },
      {
        title: "Persistent memory",
        body: "Context that carries across sessions instead of resetting every time.",
      },
      {
        title: "Vision and text",
        body: "Reading what is on screen and in documents alongside written instruction.",
      },
      {
        title: "File control",
        body: "Working directly with the files a task actually involves.",
      },
      {
        title: "Proactive assistance",
        body: "Designed to surface the next useful step, not only to answer when asked.",
      },
      {
        title: "Tools and MCP",
        body: "Tool use, including MCP, so ARVO can reach the systems a task depends on.",
      },
    ],
    notes: [
      "ARVO is an evolving product. Not every capability listed here is production-ready today.",
    ],
  },
  {
    slug: "kiwi",
    name: "KIWI",
    kind: "Emerging",
    role: "An emerging OMNIEL project",
    statement: "Early, and deliberately quiet.",
    summary:
      "KIWI is a newer OMNIEL project. Its detailed public specification is still being established, and we would rather say nothing than say something inaccurate.",
    hue: 150,
    status: "Emerging project",
    audience: ["To be defined"],
    capabilities: [],
    notes: [
      "KIWI's public specification is still being established. Details will be published when they are real.",
    ],
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);

export const navigation = [
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Technology", to: "/technology" },
  { label: "Research", to: "/research" },
  { label: "Careers", to: "/careers" },
] as const;

export const positioning = {
  headline: "Building intelligence without borders.",
  lede: "OMNIEL is an early-stage AI and technology ecosystem being built from Nigeria, with the ambition of becoming a global frontier AI and technology company.",
  belief:
    "OMNIEL was created around the belief that Africa shouldn't only participate in the technology of the future — it should help define it.",
};

export const principles = [
  {
    id: "reach",
    title: "Technology should meet people where they are",
    body: "Wealth, network quality, geography, hardware, infrastructure and technical background should not decide who gets to use intelligent software.",
  },
  {
    id: "offline",
    title: "Useful without a connection",
    body: "Offline intelligence is a major direction across the OMNIEL ecosystem, although capabilities vary between products.",
  },
  {
    id: "privacy",
    title: "Privacy-conscious by design",
    body: "Working locally where possible is both a reach decision and a privacy decision.",
  },
  {
    id: "action",
    title: "Capable of taking action",
    body: "An assistant that can only talk is only half of the idea. OMNIEL systems are built to act, under permission.",
  },
];

export const technologyDirections = [
  {
    id: "online-offline",
    title: "Online and offline intelligence",
    stage: "In development",
    body: "Models and runtimes that stay useful when internet access is unreliable, expensive or unavailable. Capabilities vary between products.",
  },
  {
    id: "memory",
    title: "Memory",
    stage: "In development",
    body: "Persistent context so systems continue from where work stopped, rather than restarting each session.",
  },
  {
    id: "computer-interaction",
    title: "Computer interaction",
    stage: "In development",
    body: "Application control, file control and browser control, so software can be operated on a person's behalf.",
  },
  {
    id: "voice",
    title: "Voice",
    stage: "In development",
    body: "Voice as a primary interface, most visibly in ARVO's voice-first direction.",
  },
  {
    id: "vision",
    title: "Vision",
    stage: "In development",
    body: "Screen and document understanding, so instructions can reference what is actually in front of the user.",
  },
  {
    id: "tools",
    title: "Tools and agents",
    stage: "In development",
    body: "Typed tool use, including MCP, planning and background execution for work that outlasts a single prompt.",
  },
];

export const futureDirections = [
  { title: "Frontier AI", body: "Building toward frontier-level systems rather than thin wrappers." },
  { title: "AI research", body: "Exploring a research practice that can eventually publish its own work." },
  { title: "Robotics", body: "A long-term interest in intelligence with a body, likely through partnership." },
  { title: "Games", body: "An area OMNIEL intends to explore as the ecosystem matures." },
  { title: "Enterprise technology", body: "Systems organisations can adopt, once the foundations are proven." },
  { title: "Consumer technology", body: "Products for everyday people, not only technical users." },
  { title: "Intelligent agents", body: "Agents that carry out real work under clear permission." },
  { title: "AI infrastructure", body: "The substrate underneath all of the above, built deliberately." },
];

export const team = {
  founderNote:
    "OMNIEL currently has a sole founder, who is building the ecosystem and working toward expanding the team.",
  collaborators: ["Wisdom", "Jerry", "Chika"],
  disclaimer:
    "Roles and responsibilities are intentionally not listed. This section will grow as the team does.",
};

export const careerAreas = [
  "Engineering",
  "AI / ML",
  "Research",
  "Design",
  "Product",
  "Business",
  "Partnerships",
  "Other",
] as const;

export const partnershipAreas = [
  "Technology",
  "Research",
  "Robotics",
  "Business",
  "Infrastructure",
  "Other",
] as const;

export const contactEmail = "psalmistasagwara@gmail.com";
export const location = "Nigeria";
