import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ContactForm } from "./ContactForm";

afterEach(() => vi.restoreAllMocks());

it("does not transmit contact details when the submission endpoint is unconfigured", () => {
  const request = vi.spyOn(globalThis, "fetch");
  render(<ContactForm />);
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Test visitor" } });
  fireEvent.change(screen.getByLabelText("Work email"), { target: { value: "visitor@example.com" } });
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "Investment" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Interested in developing the concept." } });
  fireEvent.click(screen.getByRole("button", { name: /Send message/ }));
  expect(request).not.toHaveBeenCalled();
});