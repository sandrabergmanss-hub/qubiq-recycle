import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CONTACT_EMAIL, INTEREST_OPTIONS } from "@/content/site";

const RECIPIENT = CONTACT_EMAIL;
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

const oneLine = (max: number) =>
  z.string().trim().max(max).refine((v) => !/[\r\n]/.test(v), "Invalid characters");

export const contactSchema = z.object({
  name: oneLine(100).pipe(z.string().min(1, "Please enter your name.")),
  organization: oneLine(150).optional().default(""),
  email: oneLine(255).pipe(z.string().email("Please enter a valid email.")),
  interest: z.enum(INTEREST_OPTIONS),
  message: z.string().trim().min(10, "Please write a short message.").max(5000),
  website: z.string().max(0).optional().default(""), // honeypot
});

const b64 = (s: string) =>
  btoa(Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join(""));
const header = (v: string) => (/^[\x00-\x7F]*$/.test(v) ? v : `=?UTF-8?B?${b64(v)}?=`);

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const gmailKey = process.env["GOOGLE_MAIL_API_KEY"];
    if (!lovableKey || !gmailKey) {
      console.error("Contact form: email connection is not configured");
      return { ok: false as const };
    }
    const body = [
      `Name: ${data.name}`,
      `Organization: ${data.organization || "—"}`,
      `Email: ${data.email}`,
      `Area of interest: ${data.interest}`,
      "",
      data.message,
    ].join("\n");
    const raw = [
      `To: ${RECIPIENT}`,
      `Reply-To: ${data.email}`,
      `Subject: ${header(`Qubiq Recycle contact: ${data.name}`)}`,
      "MIME-Version: 1.0",
      'Content-Type: text/plain; charset="UTF-8"',
      "Content-Transfer-Encoding: base64",
      "",
      b64(body),
    ].join("\r\n");
    const encoded = b64(raw).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    const res = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gmailKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: encoded }),
    });
    if (!res.ok) {
      console.error(`Contact email failed [${res.status}]: ${await res.text()}`);
      return { ok: false as const };
    }
    return { ok: true as const };
  });
