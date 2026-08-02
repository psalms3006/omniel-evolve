export type ProductSlug = "nova" | "vyren";

export type Product = {
  slug: ProductSlug;
  name: string;
  role: string;
  statement: string;
  summary: string;
  hue: number;
  spec: { label: string; value: string }[];
  capabilities: { title: string; body: string }[];
  architecture: { layer: string; body: string }[];
  demo: {
    intro: string;
    turns: { role: "person" | "system"; text: string }[];
  };
};

export const products: Product[] = [
  {
    slug: "nova",
    name: "NOVA",
    role: "Personal AI Operating System",
    statement: "An operating system that keeps your context, not your data trail.",
    summary:
      "NOVA is the layer between a person and their machines. It holds memory, understands intent across applications, and acts with permission you can read in one sentence.",
    hue: 205,
    spec: [
      { label: "Context window", value: "4M tokens, persistent" },
      { label: "Latency", value: "180 ms first token, on device" },
      { label: "Memory", value: "Local-first, user-owned" },
      { label: "Availability", value: "Private preview" },
    ],
    capabilities: [
      {
        title: "Continuous memory",
        body: "A single timeline of everything you chose to keep. Recall is explicit, inspectable, and revocable at the item level.",
      },
      {
        title: "Ambient voice",
        body: "Full-duplex speech with interruption handling. NOVA listens only when the indicator is lit, and the indicator is hardware-bound.",
      },
      {
        title: "Screen understanding",
        body: "Vision that reads interfaces the way you do, so instructions can point at things instead of describing them.",
      },
      {
        title: "Permissioned action",
        body: "Every action is a signed intent with a plain-language preview and a one-tap reversal window.",
      },
    ],
    architecture: [
      {
        layer: "Surface",
        body: "A single input that resolves text, voice, image, and pointer into one intent graph.",
      },
      {
        layer: "Memory",
        body: "Encrypted vector and episodic stores that live on the device and sync only under user keys.",
      },
      {
        layer: "Reasoning",
        body: "Adaptive routing between a 3B on-device model and OMNIEL frontier models when the task earns it.",
      },
      {
        layer: "Actuation",
        body: "A capability broker that mediates every file, network, and application call.",
      },
    ],
    demo: {
      intro: "A recorded interaction. Nothing here is simulated marketing copy.",
      turns: [
        { role: "person", text: "What changed in the Kepler contract since Tuesday?" },
        {
          role: "system",
          text: "Three clauses. Liability cap moved from 2x to 1x fees, the audit window shortened to 14 days, and a new arbitration venue in Zürich. I kept the Tuesday copy so you can compare side by side.",
        },
        { role: "person", text: "Draft a reply. Firm, not adversarial." },
        {
          role: "system",
          text: "Drafted. I accepted the audit window, pushed back on the liability cap with the precedent from your March agreement, and left the venue open for you to decide. Nothing sends until you say so.",
        },
      ],
    },
  },
  {
    slug: "vyren",
    name: "VYREN",
    role: "Autonomous AI Agent Platform",
    statement: "Agents that run for weeks and can explain every minute of it.",
    summary:
      "VYREN gives organizations durable agents with real budgets, real permissions, and a complete audit trail. Long-horizon work becomes reviewable engineering rather than a black box.",
    hue: 78,
    spec: [
      { label: "Horizon", value: "Multi-week durable runs" },
      { label: "Concurrency", value: "10k agents per workspace" },
      { label: "Trace", value: "Full causal replay" },
      { label: "Availability", value: "General availability" },
    ],
    capabilities: [
      {
        title: "Durable execution",
        body: "Runs survive restarts, deploys, and model upgrades. State is checkpointed at every decision boundary.",
      },
      {
        title: "Budgets and bounds",
        body: "Spend, tool access, and blast radius are declared before an agent starts and enforced by the runtime.",
      },
      {
        title: "Causal replay",
        body: "Step backwards through any run, change one input, and re-execute the branch to see what would have happened.",
      },
      {
        title: "Fleet control",
        body: "Thousands of agents behave like one system: shared policy, shared memory, single pane of observation.",
      },
    ],
    architecture: [
      {
        layer: "Planner",
        body: "Decomposes objectives into verifiable subgoals with explicit success criteria.",
      },
      {
        layer: "Runtime",
        body: "A deterministic scheduler with checkpointing, retries, and cost accounting per step.",
      },
      {
        layer: "Tooling",
        body: "Typed tool contracts with schema validation, sandboxing, and per-call authorization.",
      },
      {
        layer: "Observation",
        body: "Traces, evaluations, and anomaly detection streamed to your own storage.",
      },
    ],
    demo: {
      intro: "A live-shaped trace from a supply reconciliation fleet.",
      turns: [
        { role: "person", text: "Objective: reconcile Q3 supplier invoices against receipts." },
        {
          role: "system",
          text: "Planned 4 subgoals. Spawned 128 workers. Budget ceiling $340. Estimated completion 41 minutes.",
        },
        { role: "person", text: "Show me the exceptions." },
        {
          role: "system",
          text: "217 exceptions, 3 classes. 194 are rounding under €0.50 and were auto-cleared under policy. 19 are duplicate receipts. 4 are quantity mismatches above threshold and are held for a human. Replay is available for every one.",
        },
      ],
    },
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);

export const ecosystem = [
  { name: "NOVA", role: "Personal AI Operating System", to: "/products/nova" },
  { name: "VYREN", role: "Autonomous AI Agent Platform", to: "/products/vyren" },
  { name: "OMNIEL Research", role: "Open science and safety", to: "/research" },
  { name: "OMNIEL Cloud", role: "Inference and training substrate", to: "/technology" },
  { name: "OMNIEL Studio", role: "Tools for builders", to: "/developers" },
  { name: "OMNIEL Robotics", role: "Intelligence with a body", to: "/technology" },
];

export const technologyPillars = [
  {
    id: "foundation",
    title: "Foundation models",
    body: "A single family trained on one curriculum, distilled into sizes that fit a watch, a laptop, and a datacenter without changing how they behave.",
    metric: "3B → 1.2T parameters",
  },
  {
    id: "memory",
    title: "Memory",
    body: "Episodic, semantic, and procedural stores with explicit retention policies. Memory is a first-class object you can inspect, export, and delete.",
    metric: "User-owned keys",
  },
  {
    id: "reasoning",
    title: "Reasoning",
    body: "Deliberation is budgeted. Models decide how long to think based on the cost of being wrong, not on a fixed setting.",
    metric: "Adaptive compute",
  },
  {
    id: "voice",
    title: "Voice",
    body: "Full-duplex speech with sub-200 ms turn taking, prosody that carries meaning, and a hardware indicator whenever a microphone is live.",
    metric: "180 ms turn latency",
  },
  {
    id: "vision",
    title: "Vision",
    body: "Continuous perception of documents, interfaces, and the physical world, with spatial grounding that survives motion and occlusion.",
    metric: "60 fps grounding",
  },
  {
    id: "agents",
    title: "Agents",
    body: "Long-horizon execution with durable state, declared budgets, and causal replay of every decision the system made.",
    metric: "Multi-week runs",
  },
  {
    id: "robotics",
    title: "Robotics",
    body: "Shared representations between language, perception, and control, so a policy learned in simulation transfers to hardware without relearning the world.",
    metric: "Sim-to-real transfer",
  },
  {
    id: "os",
    title: "Operating system",
    body: "Intent, permission, and memory as system primitives rather than features bolted onto applications.",
    metric: "Capability brokered",
  },
  {
    id: "cloud",
    title: "Cloud",
    body: "Elastic inference with confidential compute, regional residency, and price that scales with tokens rather than commitments.",
    metric: "11 regions",
  },
  {
    id: "platform",
    title: "Developer platform",
    body: "One SDK, one auth model, one trace format across every product in the ecosystem.",
    metric: "6 languages",
  },
  {
    id: "hardware",
    title: "Future hardware",
    body: "Silicon designed around memory bandwidth and sustained low-power inference, because ambient intelligence is a thermal problem before it is a model problem.",
    metric: "In development",
  },
];

export const researchPapers = [
  {
    title: "Budgeted Deliberation: Letting Models Decide How Long to Think",
    year: "2026",
    area: "Reasoning",
    abstract:
      "We train a controller that allocates inference compute proportional to the expected cost of an error, reducing average latency by 41% while improving hard-task accuracy.",
  },
  {
    title: "Durable Agents: Checkpointed Execution for Long-Horizon Tasks",
    year: "2026",
    area: "Agents",
    abstract:
      "A deterministic runtime that allows multi-week agent runs to survive model upgrades, with causal replay over the full decision graph.",
  },
  {
    title: "Owned Memory: Local-First Recall Without Central Storage",
    year: "2025",
    area: "Memory",
    abstract:
      "An architecture where episodic memory never leaves user-controlled keys, and retrieval quality is preserved through encrypted index sharding.",
  },
  {
    title: "Grounded Duplex Speech at Sub-200ms",
    year: "2025",
    area: "Voice",
    abstract:
      "A streaming architecture that unifies recognition, reasoning, and synthesis, eliminating the turn-taking pauses that make voice interfaces feel mechanical.",
  },
  {
    title: "Transferable Control from Shared Multimodal Representations",
    year: "2025",
    area: "Robotics",
    abstract:
      "Policies trained in simulation transfer to physical manipulators without task-specific finetuning by sharing latent structure with language and vision.",
  },
];

export const benchmarks = [
  { name: "Long-horizon task completion", omniel: 91, field: 68 },
  { name: "Tool-use correctness", omniel: 96, field: 81 },
  { name: "Multi-document reasoning", omniel: 89, field: 74 },
  { name: "Voice turn naturalness", omniel: 94, field: 70 },
  { name: "Refusal precision", omniel: 97, field: 79 },
];

export const roadmap = [
  { year: "2024", title: "Foundation", body: "First unified model family and the memory substrate beneath it." },
  { year: "2025", title: "Voice and vision", body: "Duplex speech and continuous perception shipped into NOVA." },
  { year: "2026", title: "Autonomy", body: "VYREN reaches general availability with durable multi-week runs." },
  { year: "2027", title: "Embodiment", body: "Robotics policies moving from laboratory transfer to field deployment." },
  { year: "2028", title: "Substrate", body: "Purpose-built silicon for sustained ambient inference." },
];

export const news = [
  {
    slug: "vyren-general-availability",
    date: "2026 · 07 · 14",
    kind: "Product",
    title: "VYREN reaches general availability",
    excerpt:
      "Durable agents, declared budgets, and causal replay are now available to every organization on OMNIEL Cloud.",
  },
  {
    slug: "nova-private-preview",
    date: "2026 · 05 · 02",
    kind: "Product",
    title: "NOVA opens private preview",
    excerpt:
      "A personal operating system with local-first memory begins rolling out to a small group of practitioners.",
  },
  {
    slug: "budgeted-deliberation",
    date: "2026 · 03 · 19",
    kind: "Research",
    title: "Budgeted deliberation, published in full",
    excerpt:
      "Our work on adaptive inference compute is released with weights for the controller and full evaluation harness.",
  },
  {
    slug: "zurich-lab",
    date: "2026 · 01 · 28",
    kind: "Company",
    title: "A second research lab in Zürich",
    excerpt: "Forty researchers focused on control, transfer, and the physics of low-power inference.",
  },
  {
    slug: "safety-framework",
    date: "2025 · 11 · 06",
    kind: "Safety",
    title: "The OMNIEL deployment framework",
    excerpt:
      "Capability thresholds, evaluation gates, and the commitments we make before any system reaches a person.",
  },
];

export const positions = [
  { title: "Research Scientist, Reasoning", team: "Research", location: "Zürich", type: "Full-time" },
  { title: "Research Engineer, Memory Systems", team: "Research", location: "San Francisco", type: "Full-time" },
  { title: "Staff Engineer, Agent Runtime", team: "Platform", location: "Remote, EU", type: "Full-time" },
  { title: "Product Designer, NOVA", team: "Design", location: "San Francisco", type: "Full-time" },
  { title: "Motion Designer", team: "Design", location: "London", type: "Contract" },
  { title: "Silicon Architect", team: "Hardware", location: "Taipei", type: "Full-time" },
  { title: "Safety Researcher, Evaluations", team: "Safety", location: "London", type: "Full-time" },
  { title: "Developer Advocate", team: "Platform", location: "Remote, Global", type: "Full-time" },
];

export const offices = [
  { city: "San Francisco", role: "Headquarters", coords: "37.77° N, 122.42° W" },
  { city: "Zürich", role: "Research", coords: "47.37° N, 8.54° E" },
  { city: "London", role: "Safety and policy", coords: "51.51° N, 0.13° W" },
  { city: "Tokyo", role: "Robotics", coords: "35.68° N, 139.69° E" },
  { city: "Taipei", role: "Hardware", coords: "25.03° N, 121.57° E" },
  { city: "Singapore", role: "Cloud", coords: "1.35° N, 103.82° E" },
];

export const navigation = [
  { label: "Technology", to: "/technology" },
  { label: "Products", to: "/products" },
  { label: "Research", to: "/research" },
  { label: "Developers", to: "/developers" },
  { label: "Company", to: "/company" },
  { label: "Careers", to: "/careers" },
  { label: "News", to: "/news" },
] as const;
