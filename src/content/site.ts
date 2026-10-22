// Editable site content. Brand name shown in the nav, footer and page metadata.
export const BRAND = "Qubiq Recycle";

// Public contact address shown on the site and the destination of the "Get in touch" email link.
export const CONTACT_EMAIL = "contact@qubiqrecycle.com";

export const NAV = [
  { id: "concept", label: "The Concept" },
  { id: "vision", label: "The Challenge" },
  { id: "stockholm", label: "Stockholm" },
  { id: "collaboration", label: "Collaboration" },
  { id: "contact", label: "Contact" },
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
  hero: { eyebrow: "Thoughtful design. Everyday recycling.", headline: "A better future is built into the everyday.", description: "Reimagining everyday recycling through thoughtful product design and a vision for a cleaner Stockholm." },
  challenge: { title: "Light material. An outsized challenge.", paragraphs: ["Deliveries bring more packaging into our homes. Cardboard is light, but bulky. In shared recycling rooms, its volume can quickly become the problem.", "Residents already do their part. We are exploring how better product design could make the spaces and systems around them work better, too."] },
  concept: { title: "Less volume. More possibility.", description: "An early-stage concept for a space-conscious cardboard compaction machine, designed with shared residential recycling rooms in mind.", note: "Final industrial design, dimensions, materials and internal mechanics are still to be developed." },
  shared: { title: "Considered for the spaces we share.", description: "Swedish apartment buildings and BRFs have real spatial constraints. The ambition is a machine considered for its footprint, ease of use and visual integration, alongside existing recycling arrangements." },
  stockholm: { title: "Small everyday moments. A bigger vision for Stockholm.", description: "From residential courtyards to the waterfront, thoughtful design can contribute to the quality of city life. Better everyday recycling is the ambition — not yet a proven outcome." },
  collaboration: { title: "Help shape the next chapter of urban recycling.", description: "We are exploring a new approach to everyday recycling and seeking conversations with partners who share the ambition to create better urban solutions." },
  contact: { title: "Let's build a more circular future.", description: "Have a question or interested in working with Qubiq Recycle? We'd love to hear from you.", cta: "Get in touch" },
};

export const STEPS = [
  { n: "01", t: "Bring your cardboard.", d: "Residents bring packaging to the shared recycling room, as they do today." },
  { n: "02", t: "Reduce its volume.", d: "The proposed compaction system explores making bulky cardboard more manageable." },
  { n: "03", t: "Continue the cycle.", d: "Material continues through the building’s established recycling collection." },
];

export const AUDIENCES = [
  { n: "01", t: "Investors", d: "Early-stage sustainable urban innovation, with room to help shape its development." },
  { n: "02", t: "City of Stockholm", d: "Conversations about practical everyday recycling infrastructure and feasibility." },
  { n: "03", t: "Property owners & BRFs", d: "Shared residential spaces, real-world needs and potential pilot settings." },
  { n: "04", t: "Development partners", d: "Industrial design, engineering, manufacturing and concept development." },
];
