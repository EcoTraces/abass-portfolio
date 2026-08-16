export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  /** Paragraphs of the actual post. Omitted while a post hasn't been written yet. */
  content?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-software-should-be-built-for-constraints",
    title: "Why software should be built for constraints",
    description: "Lessons from building resilient systems where connectivity, data, and trust are limited.",
    date: "2026-05-12",
    tags: ["engineering", "systems", "design"],
    content: [
      "The easy version of a payments feature for EcoTrace would have been a generic card gateway, wired up once and left alone. It would have shipped faster, looked complete on a feature list, and been almost useless to the people actually opening the app in Sierra Leone. Mobile money — Orange Money, Afrimoney, Qmoney — isn't an alternative payment method here; it's the payment method. So instead of a card gateway, EcoTrace integrates directly with Monime and lets someone pay for a pickup the moment they confirm it, not as a separate step tacked on afterward.",
      "That decision reframed how I think about constraints. \"Most users pay with mobile money, not cards\" isn't a limitation on the \"real\" design — it is the design brief. A card integration would have been the generic version of the feature; the Monime integration is the actual feature, because it's the one that works for the people using it.",
      "That confidence held until two days before I'm writing this, when live testing surfaced a gap the documentation hadn't warned me about: Monime's Payment Code API doesn't emit an event for a failed payment attempt. Not \"the docs didn't mention it\" — a real payment sitting at pending with no failure signal, confirmed by testing against the live API. The fix landed in the same commit as a wallet refund-on-cancel patch and a reverted phone-restriction check — a cluster of last-minute payment hardening, not one isolated bug. Late, but the kind of thing you only find by watching a real payment fail in front of you.",
      "Payments is the constraint I designed around well. Connectivity is the one I'm still catching up on.",
      "EcoTrace leans on cloud services for almost everything: Firebase Authentication, Cloud Firestore, Cloudinary for image storage, a FastAPI backend on Render, and a separate notifications service. Every one of those assumes a reasonably good connection. I built and tested most of it on one, which meant the assumption stayed invisible until it wasn't.",
      "It showed up as a Cloudinary \"Invalid Signature\" 401 on profile picture uploads. As ERR_CONNECTION_CLOSED errors across several Render endpoints — wallet, pickup requests, profile — that needed their own audit to trace. And as six separate 401 responses on the notifications endpoint in a single page load.",
      "The notifications case is the one I actually dug into. api_client.dart has six independent methods — two GET variants, POST, PATCH, PUT, DELETE — each with its own copy-pasted retry logic: catch a 401, force-refresh the token, retry once. Not a shared retry path, six separate ones. The notification service's own wrapper spells out the working theory directly in its code comments: the client already retries a 401 once with a refreshed token, so if it still fails, the cause is server-side, not a stale client token. I closed the client-side half of this — an earlier fix force-refreshes the Firebase token before the profile polling loop even starts, removing a race that was firing before auth was ready. Why the notifications endpoint still 401s on the server side is still open. That's a patch, not a root cause, and I'd rather say that plainly than pretend it's resolved.",
      "The system's own limitations section says the quiet part out loud: EcoTrace depends heavily on internet connectivity, and the free-tier backend is slow to wake up after sitting idle. I extended the client's retry budget to absorb that cold-start delay, which helps, but it's still a workaround for an architecture that assumes good connectivity by default rather than one designed to degrade gracefully without it.",
      "Put the two next to each other and the lesson gets sharper. Where I designed for Sierra Leone's actual constraint — payments — the product got measurably better than the generic version would have been. Where I hadn't yet designed for the other one — a connection that isn't always there — I found out through debugging instead of through design, which is a more expensive way to learn the same thing. Constraints aren't a tax you pay after the \"real\" design is done. They're what tell you what the real design is. I got that right once. Getting it right before the six 401s happen, instead of after, is the next thing I'm actually building toward.",
    ],
  },
  {
    slug: "building-portfolios-that-earn-recruiter-trust",
    title: "Building portfolios that earn recruiter trust",
    description: "How to turn a personal site into a credibility signal instead of a static resume.",
    date: "2026-07-04",
    tags: ["career", "portfolio", "technical"],
    content: [
      "Most portfolio advice optimizes for looking finished. Fill every section, ship a polished screenshot for every project, put a number next to every claim. The problem is that \"finished\" and \"true\" aren't the same target, and the moment a recruiter — or worse, the engineer they forward your link to — finds one thing on the page that isn't real, they stop trusting the rest of it too. A single fabricated detail doesn't cost you that section; it costs you the page.",
      "Building this site, the tempting move was almost never a big lie. It was small, plausible-sounding fills for the gaps: a project year that was probably close enough, a status label that sounded better than \"I haven't decided yet,\" a stock photo standing in until I had a real one. Every one of those would have rendered cleanly and looked done.",
      "Instead, every unresolved fact got an explicit placeholder — literal strings like \"[ADD_LINKEDIN_URL]\" or \"TODO\" in the data — and a small helper function that checks for them and changes what the UI does. A social link with a placeholder href doesn't render as a dead link; it renders visibly disabled, greyed out, with a title attribute explaining what's missing. A profile image placeholder falls back to initials instead of a stock photo standing in for a real one. Nothing fake ever reaches the page — it's either real, or it's honestly marked as not there yet.",
      "The contact form is the clearest example. Before an email service was wired up, submitting it didn't fake a success message — it said, plainly, that the form wasn't connected to a live email service yet and the message hadn't actually been delivered. That's an uncomfortable thing to show a visitor. It's also the truth, and the alternative — a green \"message sent!\" toast over a form that silently drops everything — is exactly the kind of small dishonesty that erodes trust the moment someone notices, and someone always eventually notices.",
      "The same principle held up under actual testing, not just self-assessment. Running a real Lighthouse audit against the production build — not eyeballing it and assuming it was fine — caught two genuine bugs: dark-mode text sitting at 3.75:1 contrast against WCAG's 4.5:1 minimum for normal text, and scroll-triggered reveal animations that left text at opacity 0 until scrolled into view, which meant any automated accessibility scanner — or a recruiter who never scrolls that far — would see it as invisible. Both got fixed because the audit ran against the real build instead of trusting that \"accessible\" was true because the design intended it to be.",
      "This post is itself part of the same policy. The blog originally shipped with two entries that had real titles, dates, and tags but opened to a literal placeholder sentence when you clicked through — which is worse than not having a blog at all, because it looks abandoned mid-build instead of simply absent. The fix wasn't to write something fast to fill the gap. It was to either write the real thing or say plainly that it isn't published yet, the same rule applied everywhere else on the site.",
      "None of this makes the site look more finished. A visitor can still find sections that admit they're not done. But everything that is present is true, and everything that isn't gets said outright instead of papered over — and that's the actual credibility signal. Not that a portfolio has no gaps, but that nothing on it is fake.",
    ],
  },
];
