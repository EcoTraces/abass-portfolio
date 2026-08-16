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
      "A lot of portfolio advice focuses on making a site look complete. Add every section. Add screenshots for every project. Put numbers beside your achievements. Make everything look polished.",
      "That sounds reasonable until you start building a real portfolio and realize that some of the information simply isn't ready yet.",
      "A project might not have a live link. A profile picture might not be available. A project date might be unclear. A contact form might have a nice-looking button, but no actual email service behind it.",
      "That is where I think portfolios can go wrong.",
      "It is easy to fill those gaps with something that looks believable. A guessed project year. A \"completed\" label because it sounds better than \"still working on it.\" A stock image because an empty profile section looks unfinished.",
      "The site will look better, but it won't necessarily be more trustworthy.",
      "While building my portfolio, I decided not to do that. If I didn't have a piece of information yet, I left it as a placeholder in the data rather than inventing something just to make the page look complete.",
      "For example, instead of putting a fake LinkedIn link into the site, I used a placeholder such as \"[ADD_LINKEDIN_URL]\". The application checks for these placeholders before rendering the page. If the real link isn't available, the social link is disabled and the user can see that it hasn't been added yet.",
      "The same approach applies to images. If there is no real profile image, the site doesn't use a random stock photo and pretend that it represents me. It simply falls back to my initials.",
      "It may not look as impressive as a finished photograph, but at least it is honest.",
      "The contact form was probably the best example of why this matters.",
      "Before connecting the form to a real email service, I could have made the button display something like \"Message sent successfully!\" after submission. It would have looked professional. The problem is that the message wouldn't actually have gone anywhere.",
      "So I didn't do it.",
      "Instead, the form tells the visitor that the email service hasn't been connected yet and that the message has not been delivered.",
      "That is not the most impressive message to have on a portfolio. But it is much better than telling someone their message was sent when it wasn't.",
      "There was another lesson I learned from testing the actual site.",
      "Looking at a website and saying \"it looks accessible\" is not the same as testing accessibility.",
      "I ran a Lighthouse audit against the production build and found two issues that I had missed during development. One of the dark-mode text combinations had a contrast ratio of 3.75:1, below the 4.5:1 WCAG recommendation for normal text. I also had scroll-based animations that initially set some content to opacity 0. That meant content could remain invisible until the animation was triggered.",
      "Neither problem was obvious just by looking at the design.",
      "The audit exposed them, and I fixed them.",
      "That experience changed how I think about the word \"done.\" A feature isn't necessarily finished because it looks right in the browser. It needs to work under the conditions people actually use it in.",
      "The blog section gave me another example.",
      "At one point, the portfolio had two blog posts with proper titles, dates, and tags. They looked like real articles in the listing, but when you opened them, the content was basically a placeholder.",
      "That was worse than having no posts at all.",
      "A visitor clicking on an article and finding placeholder text immediately gets the impression that the site was rushed or abandoned.",
      "So I removed the unfinished content instead of pretending it was published.",
      "This has become a simple rule for the portfolio:",
      "If it is real, show it. If it isn't ready, say so. Don't invent something just because the page looks better with it.",
      "The result isn't a portfolio where every section looks perfectly complete. There are still things I need to add, improve, and connect.",
      "But I know that the projects, links, information, and features that are currently there are genuine.",
      "For me, that is a better definition of a professional portfolio.",
      "A good portfolio doesn't have to look like everything has already been achieved. It needs to give the person viewing it a reason to believe what they're seeing.",
      "That trust is worth more than a perfectly filled-out page.",
    ],
  },
];
