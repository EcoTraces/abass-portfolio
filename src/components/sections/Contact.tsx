"use client";

import { profile, socialLinks } from "@/data/profile";
import { isPlaceholder } from "@/lib/utils";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { FormEvent, useState } from "react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";

const icons = { github: Github, linkedin: Linkedin, mail: Mail, whatsapp: WhatsappIcon };

// No opacity in the hidden state — see src/components/motion/Reveal.tsx for why.
const formVariants: Variants = {
  hidden: { y: 16 },
  visible: { y: 0, transition: { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] } },
};

type FormState = "idle" | "submitting" | "success" | "error";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export function Contact() {
  const [status, setStatus] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [errorMessage, setErrorMessage] = useState("");

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name) next.name = "Enter your name.";
    if (!email) next.email = "Enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (!subject) next.subject = "Add a subject.";
    if (!message || message.length < 10) next.message = "Message should be at least 10 characters.";

    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const validation = validate(data);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong sending your message.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong sending your message.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading
          index="06"
          label="Get in touch"
          title="Contact"
          description="Have a role, project, or collaboration in mind? Send a message and I'll get back to you."
        />

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="space-y-6">
            {socialLinks.map((link) => {
              const Icon = icons[link.icon];
              const disabled = isPlaceholder(link.href);
              return (
                <a
                  key={link.label}
                  href={disabled ? undefined : link.href}
                  target={link.icon !== "mail" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-disabled={disabled}
                  className={
                    "flex items-center gap-4 rounded-sm border border-line-strong p-4 transition-colors " +
                    (disabled ? "cursor-not-allowed opacity-40" : "hover:border-accent")
                  }
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-line-strong text-accent">
                    <Icon size={16} />
                  </span>
                  <span>
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-fg-faint">
                      {link.label}
                    </span>
                    <span className="block text-sm text-fg">
                      {disabled
                        ? "Add your " + link.label.toLowerCase()
                        : link.icon === "whatsapp"
                        ? profile.phone
                        : link.href.replace("mailto:", "")}
                    </span>
                  </span>
                </a>
              );
            })}
            <p className="font-mono text-xs uppercase tracking-wider text-fg-faint">
              Based in {profile.location}
            </p>
          </Reveal>

          <motion.form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={formVariants}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" error={errors.name} />
              <Field label="Email" name="email" type="email" error={errors.email} />
            </div>
            <Field label="Subject" name="subject" error={errors.subject} />
            <Field label="Message" name="message" as="textarea" error={errors.message} />

            <Button type="submit" variant="primary" disabled={status === "submitting"} className="w-full sm:w-auto">
              {status === "submitting" ? "Sending…" : "Send Message"}
            </Button>

            <div aria-live="polite">
              {status === "success" && (
                <p className="font-mono text-xs uppercase tracking-wider text-accent-2">
                  Message sent — thank you.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-fg-muted">
                  {errorMessage || "Something went wrong sending your message."} Reach me directly
                  at {isPlaceholder(profile.email) ? "the email above" : profile.email} in the
                  meantime.
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  as = "input",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "textarea";
  error?: string;
}) {
  const id = `field-${name}`;
  const baseClasses =
    "w-full rounded-sm border bg-transparent px-4 py-3 text-sm text-fg placeholder:text-fg-faint focus-visible:outline-2 focus-visible:outline-accent";
  const borderClass = error ? "border-red-400/60" : "border-line-strong";

  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-fg-faint">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          className={`${baseClasses} ${borderClass}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          className={`${baseClasses} ${borderClass}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
