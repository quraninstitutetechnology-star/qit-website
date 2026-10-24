# QIT — Quran Information Technology (Website)

Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + Embla Carousel website for
**QIT — Quran Information Technology**, a Quran academy in Khanpur, Dera Ghazi Khan, Pakistan.
Slogan: **"We Build The Quranic Nation"**.

Built exactly to `QIT-FINAL-BUILD-SPEC__1.md` (Final v1, 24 Oct 2026).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

## Pages (Phase 1)

| Route | What it is |
|---|---|
| `/` | Home — 3-slide hero carousel, stats, How It Works, courses preview, Why QIT, audience cards, teachers preview, pricing preview, testimonials slider, campus highlight, **FAQ (Home only — there is no /faq page)**, final CTA |
| `/courses` | All 11 courses with All / Kids / Adults / Sisters filter (`?audience=` works) |
| `/courses/[slug]` | One page per course (11 static pages) with Course JSON-LD + breadcrumbs |
| `/pricing` | PKR / USD / GBP currency tabs, 3 plans, comparison table, billing notes |
| `/about` | Story, values, what we teach, `#teachers`, `#campus`, `#contact` with the free-trial form |
| `/privacy` `/terms` `/refund-policy` | Short placeholder legal pages |
| `/api/contact` | Trial-form endpoint — validates and returns a prefilled WhatsApp deep link |

Global on every page: top bar above a sticky shrinking header, a **shining floating WhatsApp
button** (bottom-right, per-page prefilled message) and a **1–100 scroll-progress ring**
(bottom-left, click = back to top). Smooth page transitions, hover animations on cards/buttons,
and full `prefers-reduced-motion` support.

## Editing content — everything lives in `lib/`

| File | What to edit there |
|---|---|
| `lib/site-config.ts` | Academy name, slogan, domain URL, WhatsApp number, address, phone, email, hours, socials |
| `lib/courses.ts` | The 11 courses (text, outcomes, per-course questions) |
| `lib/plans.ts` | Plans, currencies, comparison table, billing notes |
| `lib/faqs.ts` | The 16 Home-page FAQ questions/answers |
| `lib/teachers.ts` | Teacher cards |
| `lib/testimonials.ts` | Testimonial slots |
| `lib/stats.ts` | The 4 stat slots |
| `lib/images.ts` | Every image path used by the site |
| `lib/whatsapp.ts` | WhatsApp link helper + per-page messages |

Images live in `public/images/`. `hero-1.jpg` and `hero-2.jpg` are Ali's real supplied images;
`hero-3.jpg`, `campus.jpg`, `avatar.jpg` and `courses/*.jpg` are branded green/gold placeholders —
replace any of them by dropping in a new file with the **same name**.

## ⚠️ Placeholders Ali must replace (search the code for `TODO_`)

| Placeholder | Where | Replace with |
|---|---|---|
| `TODO_WHATSAPP_NUMBER` | `lib/site-config.ts` | Real WhatsApp number (`92XXXXXXXXXX`, no `+`) — one change updates every WhatsApp link on the site |
| Prices `Rs —` / `$ —` / `£ —` | `lib/plans.ts` (`currencies[].placeholder`) | Real monthly fees per currency |
| Domain `https://www.example.com` | `lib/site-config.ts` (`url`) | Real domain — updates canonicals, sitemap, OG and schema |
| `TODO_STREET_ADDRESS`, `TODO_PHONE_NUMBER`, `TODO_EMAIL_ADDRESS`, `TODO_OPENING_HOURS` | `lib/site-config.ts` | Real campus address, phone, email, hours |
| `TODO_FACEBOOK_URL` / `TODO_INSTAGRAM_URL` / `TODO_YOUTUBE_URL` | `lib/site-config.ts` (`socials`) | Real social profiles |
| 4 teacher placeholders | `lib/teachers.ts` + `public/images/avatar.jpg` | Real teacher names, qualifications, photos |
| Stats rendered `—` | `lib/stats.ts` | Real students / teachers / countries / years numbers |
| 3 testimonial samples | `lib/testimonials.ts` | Real student/parent reviews (marked "Sample" until replaced) |
| Legal page text | `app/privacy`, `app/terms`, `app/refund-policy` | Final approved policy wording |
| Map embed | `app/about/page.tsx` (`#campus`) | Real Google Maps embed for the campus |
| Policy items marked `TODO_CONFIRM` in code comments | `lib/faqs.ts`, `lib/plans.ts`, `components/home/WhyQit.tsx`, course pages | Confirm: Why-QIT claims, trial wording, rescheduling/makeup policy, sibling discount, progress-report format, certificate details, teacher credentials |
| Full-name confirmation | `lib/site-config.ts` (`fullName`) | Default is **"Quran Information Technology"** per Ali's instruction; the logo image prints "Institute" — flip this one line if the name changes |
| Placeholder images | `public/images/hero-3.jpg`, `campus.jpg`, `courses/*.jpg` | Real hero, campus and course photos |

## Deploy

1. Set the real domain in `lib/site-config.ts`.
2. `npm run build` and deploy the project to any Next.js host (Vercel works out of the box:
   import the project, no extra config).
3. After launch: submit `https://<domain>/sitemap.xml` in Google Search Console and claim the
   Google Business Profile for the Khanpur campus.

## Notes

- No prices, phone numbers, stats, teacher names or reviews were invented — competitor prices
  from the research are **not** used anywhere on the site.
- There is intentionally **no `/faq` route** — FAQ is a section on the Home page only.
- Ten Qira'at is intentionally not in v1 (per final spec §6).
