import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

// Simulate the contact wording being absent from src/content/site.ts.
vi.mock("@/content/site", async (importOriginal) => {
  const mod = await importOriginal<typeof import("@/content/site")>();
  const { contact: _omitted, ...copy } = mod.COPY;
  return { ...mod, COPY: copy };
});

import { ContactCta } from "./ContactCta";

it("still offers the email link when the contact wording is missing", () => {
  render(<ContactCta />);
  expect(screen.getByRole("link", { name: /Get in touch/ }).getAttribute("href")).toBe(
    "mailto:contact@qubiqrecycle.com",
  );
  expect(screen.getByRole("link", { name: "contact@qubiqrecycle.com" })).toBeTruthy();
});
