import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

const sendMock = vi.fn();
vi.mock("@tanstack/react-start", () => ({ useServerFn: () => sendMock }));
vi.mock("@/lib/contact.functions", () => ({ sendContactMessage: {} }));

import { ContactForm } from "./ContactForm";

afterEach(() => sendMock.mockReset());

it("does not send when required fields are missing", () => {
  render(<ContactForm />);
  fireEvent.click(screen.getByRole("button", { name: /Send message/ }));
  expect(sendMock).not.toHaveBeenCalled();
  expect(screen.getByText("Please enter your name.")).toBeTruthy();
});

it("sends name, email and message and shows success", async () => {
  sendMock.mockResolvedValue({ ok: true });
  render(<ContactForm />);
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Test visitor" } });
  fireEvent.change(screen.getByLabelText("Work email"), { target: { value: "visitor@example.com" } });
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "Investment" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Interested in the concept." } });
  fireEvent.click(screen.getByRole("button", { name: /Send message/ }));
  expect(sendMock).toHaveBeenCalledWith({
    data: expect.objectContaining({ name: "Test visitor", email: "visitor@example.com", message: "Interested in the concept." }),
  });
  expect(await screen.findByText("Thank you.")).toBeTruthy();
});

