/**
 * QIT — central site configuration.
 * EVERY value Ali needs to change lives here (see README "Placeholders").
 * TODO_ values are placeholders — replace them with real details before launch.
 */
export const siteConfig = {
  // §1 Decision 1 — full name default per Ali's explicit instruction.
  // His logo/banner image prints "Quran Institute of Technology".
  // Flip this ONE line to change the name everywhere (titles, schema, footer, About).
  fullName: "Quran Information Technology",
  shortName: "QIT",
  slogan: "We Build The Quranic Nation",

  // §1 Decision 5 — domain placeholder until Ali supplies the real domain.
  url: "https://www.example.com",

  // §1 Decision 2 — WhatsApp number, international format without "+".
  // Real number supplied by Ali 2026-10-24: +92 336 7004940.
  whatsappNumber: "923367004940",

  // §1 Decision 4 — free-trial wording (no number of classes stated).
  trialLabel: "Free Trial Class",

  // §1 Decision 6 — only the city/region is known; no street address has
  // been supplied, so street stays empty and pages show the city-level
  // address only (the About page no longer appends it).
  address: {
    street: "",
    city: "Khanpur",
    region: "Dera Ghazi Khan, Punjab",
    country: "Pakistan",
    display: "Khanpur, Dera Ghazi Khan, Punjab, Pakistan",
  },
  phoneDisplay: "+92 336 7004940",

  // Campus location — Google Maps link supplied by Ali 2026-10-24
  // (Dera Ghazi Khan city; pin 30.0328, 70.6403 — changed from Mana
  // Ahamadani 2026-10-26 at Ali's order).
  mapEmbedUrl: "https://www.google.com/maps?q=30.0328,70.6403&z=13&output=embed",
  mapLinkUrl: "https://www.google.com/maps/search/?api=1&query=30.0328,70.6403",
  // Contact email + hours — supplied by Ali 2026-10-29: the academy's
  // Gmail, and the campus is open 24 hours.
  email: "Sadazamir123@gmail.com",
  hours: "Open 24 Hours",

  // Social links — placeholders until Ali supplies real profiles.
  socials: {
    facebook: "TODO_FACEBOOK_URL",
    instagram: "TODO_INSTAGRAM_URL",
    youtube: "TODO_YOUTUBE_URL",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
