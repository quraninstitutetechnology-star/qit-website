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

  // §1 Decision 6 — only the city/region is known; everything else is a placeholder.
  address: {
    street: "TODO_STREET_ADDRESS",
    city: "Khanpur",
    region: "Dera Ghazi Khan, Punjab",
    country: "Pakistan",
    display: "Khanpur, Dera Ghazi Khan, Punjab, Pakistan",
  },
  phoneDisplay: "+92 336 7004940",

  // Campus location — Google Maps link supplied by Ali 2026-10-24
  // (Mana Ahamadani, Dera Ghazi Khan; pin 29.8039701, 70.6246536).
  mapEmbedUrl: "https://www.google.com/maps?q=29.8039701,70.6246536&z=14&output=embed",
  mapLinkUrl: "https://www.google.com/maps/search/?api=1&query=29.8039701,70.6246536",
  email: "TODO_EMAIL_ADDRESS",
  hours: "TODO_OPENING_HOURS",

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
