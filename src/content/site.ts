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
  contact: {
    title: "Let's Connect",
    description: "Have a question or interested in working with Qubiq Recycle? We'd love to hear from you.",
    cta: "Get in touch",
  },
  footer: "A concept in development. Imagery is illustrative.",
};
