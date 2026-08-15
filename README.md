# Abass David Komeh — Portfolio

A production-quality personal portfolio built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## Editing your content

All personal content lives in `src/data/` — you should rarely need to touch a component file to update information:

| File | Controls |
|---|---|
| `src/data/profile.ts` | Name, headline, positioning statement, about paragraphs, email, GitHub, LinkedIn, resume path, profile image path |
| `src/data/nav.ts` | Navigation links |
| `src/data/skills.ts` | Skills grouped by category |
| `src/data/experience.ts` | Work/internship timeline |
| `src/data/education.ts` | Education timeline |
| `src/data/certifications.ts` | Certifications, awards, achievements (section auto-hides while empty) |
| `src/data/projects.ts` | Featured projects and full case-study content |

## Resume PDF

`public/resume/resume.pdf` is generated automatically from `src/data/` (profile, experience, education, skills, certifications) — nothing in it is invented. Whenever you edit that data, regenerate it:

```bash
npm run generate:resume
```

This runs `scripts/generate-resume.ts` via `tsx` and overwrites `public/resume/resume.pdf`. If you'd rather use a hand-designed resume PDF instead, drop your own file at `public/resume/resume.pdf` (or update `profile.resumePath`) and skip the script.

## Still needed from you

Search the codebase for `[ADD_...]` and `TODO` — every one marks information that was intentionally left as a placeholder rather than invented:

- `[ADD_PROFILE_IMAGE]` — add a photo to `public/images/` and wire it into the `Hero` component
- Project years, statuses, GitHub repo URLs, and any unconfirmed architecture details in `src/data/projects.ts`
- Replace `https://example.com` in `src/lib/site.ts` with your real deployed domain (used everywhere else via that shared constant)
- Add a 1200×630 social preview image at `public/images/social-preview.jpg`

## Project images

Expected paths (the UI falls back to a styled placeholder panel until these exist):

- `public/images/projects/{slug}-cover.jpg` — 1600×1000
- `public/images/projects/{slug}-01.jpg`, `-02.jpg`, ... — 1600×1000 (case study screenshots)

## Contact form

Wired up via [Resend](https://resend.com) — `src/app/api/contact/route.ts` validates the payload server-side and sends the email; `src/components/sections/Contact.tsx` posts to it and shows loading/success/error states.

To make it actually deliver:

1. Create a free Resend account and API key.
2. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` and `CONTACT_EMAIL_TO`.
3. Until you verify a custom domain with Resend, `CONTACT_EMAIL_TO` **must** be the email address on your Resend account — the default `onboarding@resend.dev` sender only delivers to that address. Once you verify a domain, set `CONTACT_EMAIL_FROM` to an address on it and `CONTACT_EMAIL_TO` can be anything.

Never commit `.env.local`. In production (e.g. Vercel), set these as environment variables in the project settings instead.

## Analytics

[Vercel Analytics](https://vercel.com/docs/analytics) is wired up in `src/app/layout.tsx`. It's a no-op until the site is deployed on Vercel with Analytics enabled for the project — no extra config needed locally.

## Stack

Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion · Resend · Vercel Analytics · lucide-react · self-hosted Inter / Space Grotesk / JetBrains Mono via `@fontsource`
