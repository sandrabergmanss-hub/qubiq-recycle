import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { ContactCta } from "./ContactCta";

it("opens the visitor's email app addressed to the public contact address", () => {
  render(<ContactCta />);
  const cta = screen.getByRole("link", { name: /Get in touch/ });
  expect(cta.getAttribute("href")).toBe("mailto:contact@qubiqrecycle.com");
  const email = screen.getByRole("link", { name: "contact@qubiqrecycle.com" });
  expect(email.getAttribute("href")).toBe("mailto:contact@qubiqrecycle.com");
});

it("shows the heading and invitation without collecting any details", () => {
  render(<ContactCta />);
  expect(screen.getByRole("heading", { name: "Let's build a more circular future." })).toBeTruthy();
  expect(
    screen.getByText(
      "Have a question or interested in working with Qubiq Recycle? We'd love to hear from you.",
    ),
  ).toBeTruthy();
  expect(screen.queryByRole("textbox")).toBeNull();
});
