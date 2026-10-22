// Editable site content. Brand name shown in the nav, footer and page metadata.
export const BRAND = "Qubiq Recycle";

// Public contact address shown on the site and the destination of the "Get in touch" email link.
export const CONTACT_EMAIL = "contact@qubiqrecycle.com";

export const NAV = [
  { id: "idea", label: "The Idea" },
  { id: "development", label: "In Development" },
  { id: "contact", label: "Let's Connect" },
] as const;

// 3D viewer configuration. Replace `modelUrl` with an approved GLB/GLTF file.
export const VIEWER_CONFIG = {
  modelUrl: null as string | null,
  cameraPosition: [3.2, 2.2, 4.2] as [number, number, number],
  minDistance: 3,
  maxDistance: 9,
  backgroundToken: "--studio",
  materialToken: "--stone",
  edgeToken: "--primary",
  lighting: { ambient: 1.6, key: 3, position: [4, 6, 3] as [number, number, number] },
};

export const COPY = {
  hero: {
    eyebrow: "A concept in development · Stockholm",
    headline: "Qubiq Recycle",
    description: "Exploring a more space-conscious approach to cardboard recycling in shared residential buildings.",
    cta: "Discover our vision",
  },
  idea: {
    title: "The Idea",
    headline: "Less bulk. More room.",
    paragraphs: [
      "Cardboard packaging is light, but it takes up space. In a shared recycling room, bulky boxes can quickly fill the available bins.",
      "Qubiq Recycle is exploring a cardboard compaction concept for apartment buildings and housing associations. The idea is to reduce the space cardboard takes up before it continues through the building’s existing recycling collection.",
    ],
    caption: "Shared recycling space · illustrative image",
  },
  development: {
    title: "In Development",
    headline: "An idea, not yet a finished solution.",
    description: "We are still developing the concept. Its design, size, materials and internal mechanics have not been finalised, and its practical feasibility remains to be explored.",
    focus: "Cardboard compaction is the initial focus. Plastic and metal are possibilities for the future, not current capabilities.",
    viewerNote: "The study below is an abstract placeholder, not a product design.",
  },
  journey: {
    title: "The everyday journey",
    headline: "Familiar habits. A more considered space.",
    description: "The concept starts with the way residents already recycle. These are conceptual steps, not operating instructions.",
  },
  shared: {
    title: "Shared residential spaces",
    headline: "Considered for the spaces we share.",
    description: "Swedish apartment buildings and BRFs have real spatial constraints. The ambition is a machine considered for its footprint, ease of use and visual integration, alongside existing recycling arrangements.",
    caption: "Residential courtyard · illustrative image",
  },
  stockholm: {
    title: "The Stockholm vision",
    headline: "Small everyday moments. A bigger vision for Stockholm.",
    description: "From residential courtyards to the waterfront, thoughtful design can contribute to the quality of city life. Better everyday recycling is the ambition — not yet a proven outcome.",
    caption: "Stockholm waterfront · illustrative image",
  },
  explore: {
    title: "Explore the concept",
    description: "A closer look at the thinking behind Qubiq Recycle, what remains to be explored, and the conversations that could help shape its development.",
  },
  contact: {
    title: "Let's Connect",
    description: "Have a question or interested in working with Qubiq Recycle? We'd love to hear from you.",
    cta: "Get in touch",
  },
  footer: "A concept in development. Imagery is illustrative.",
};

export const STEPS = [
  { title: "Bring your cardboard", description: "Residents bring packaging to the shared recycling room, as they do today." },
  { title: "Reduce its volume", description: "The proposed compaction system explores making bulky cardboard more manageable." },
  { title: "Continue the cycle", description: "Material continues through the building’s established recycling collection." },
] as const;

export const CONCEPT_TOPICS = [
  {
    id: "challenge",
    title: "Why focus on cardboard?",
    paragraphs: [
      "Deliveries bring more packaging into our homes. Cardboard is light, but bulky. In shared recycling rooms, its volume can quickly become the problem.",
      "Residents already do their part. We are exploring how better product design could make the spaces and systems around them work better, too.",
    ],
  },
  {
    id: "scope",
    title: "What is being developed?",
    paragraphs: [
      "Qubiq Recycle is an early-stage concept for a space-conscious cardboard compaction machine, with shared residential recycling rooms in mind.",
      "Cardboard compaction is the initial focus. Plastic and metal are future possibilities, not current capabilities. The concept is intended to sit alongside a building’s existing recycling arrangements, rather than replace its collection system.",
    ],
  },
  {
    id: "status",
    title: "What remains to be explored?",
    paragraphs: [
      "The final industrial design, dimensions, materials and internal mechanics are still to be developed. Practical feasibility remains to be explored.",
      "The interactive study is an abstract placeholder, not the final machine or a statement of its specifications. An approved product model can replace it as the design develops.",
    ],
  },
  {
    id: "spaces",
    title: "How could it fit into residential buildings?",
    paragraphs: [
      "Swedish apartment buildings and housing associations (BRFs) have real spatial constraints. Footprint, ease of use and visual integration are part of the ambition, not established features.",
      "The conceptual journey follows familiar habits: bring cardboard to the shared room, explore reducing its volume, and continue through the building’s established recycling collection. These are conceptual steps, not operating instructions.",
    ],
  },
  {
    id: "conversations",
    title: "Who could help shape the next chapter?",
    paragraphs: [
      "We are exploring a new approach to everyday recycling and seeking conversations with people who share the ambition to create better urban solutions.",
      "Potential conversations include investors interested in early-stage sustainable urban innovation; the City of Stockholm on practical recycling infrastructure and feasibility; property owners and BRFs on shared-space needs and potential pilot settings; and development partners in industrial design, engineering, manufacturing and concept development.",
      "These are invitations to explore the idea, not statements of existing partnerships or pilots. Better everyday recycling remains the ambition — not yet a proven outcome.",
    ],
  },
] as const;
