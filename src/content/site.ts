// Editable site content. Brand name shown in the nav, footer and page metadata.
export const BRAND = "Qubiq";

export const NAV = [
  { id: "vision", label: "Vision" },
  { id: "concept", label: "The Concept" },
  { id: "stockholm", label: "Stockholm" },
  { id: "collaboration", label: "Collaboration" },
  { id: "contact", label: "Contact" },
] as const;

export const INTEREST_OPTIONS = [
  "Investment",
  "Municipal collaboration",
  "Property or housing association",
  "Product development",
  "Pilot project",
  "Other",
] as const;

// Set to a working endpoint (e.g. a form service URL) to activate submissions.
// While null, the form validates input but clearly states it is not yet connected.
export const CONTACT_ENDPOINT: string | null = null;

// 3D viewer configuration. Replace `modelUrl` with an approved GLB/GLTF file.
export const VIEWER_CONFIG = {
  modelUrl: null as string | null,
  cameraPosition: [3.2, 2.2, 4.2] as [number, number, number],
  minDistance: 3,
  maxDistance: 9,
  background: "#ece8e0",
};
