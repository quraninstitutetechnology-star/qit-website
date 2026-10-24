/**
 * All image paths for the site live here — never hard-code a path in a component.
 * hero-1 and hero-2 are Ali's real supplied images; hero-3 and the course /
 * campus images are branded green/gold placeholders Ali can replace by
 * dropping a new file with the same name into public/images/.
 */
export const images = {
  hero1: { src: "/images/hero-1.jpg", alt: "Welcome banner of QIT Quran Academy with the QIT logo, an open Quran on a rehal and Pakistan flags", width: 1536, height: 1024 },
  hero2: { src: "/images/hero-2.jpg", alt: "QIT logo — a green Islamic arch with an open Quran on a rehal and Pakistan flags", width: 800, height: 800 },
  hero3: { src: "/images/hero-3.jpg", alt: "Branded placeholder artwork — green and gold Islamic arch with an open Quran", width: 1200, height: 800 },
  campus: { src: "/images/campus.jpg", alt: "The QIT madarsa campus — a traditional Islamic school building with a green and gold arched entrance, dome and minaret, with students in the courtyard", width: 1100, height: 733 },
  avatar: { src: "/images/avatar.jpg", alt: "Placeholder avatar — teacher photo coming soon", width: 400, height: 400 },
} as const;

export function courseImage(slug: string, title: string) {
  return {
    src: `/images/courses/${slug}.jpg`,
    alt: `Photo for the ${title} course at QIT Quran Academy`,
    width: 800,
    height: 560,
  };
}
