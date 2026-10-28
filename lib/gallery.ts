/** Gallery data (added 2026-10-28 at Ali's order — photos supplied by Ali
 * in gallery.zip + special_slider.zip). Single source of truth for the
 * /gallery page: the special slider and the photo-card grid both read
 * from here. specialImages[0] is Ali's "special-1" photo. */

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
}

export const specialImages: GalleryImage[] = [
  { src: "/images/slider/special-1.jpg", width: 879, height: 943 },
  { src: "/images/slider/special-2.jpg", width: 738, height: 1600 },
  { src: "/images/slider/special-3.jpg", width: 1600, height: 900 },
  { src: "/images/slider/special-4.jpg", width: 1200, height: 1600 },
  { src: "/images/slider/special-5.jpg", width: 1600, height: 719 },
  { src: "/images/slider/special-6.jpg", width: 1600, height: 902 },
  { src: "/images/slider/special-7.jpg", width: 1600, height: 895 },
  { src: "/images/slider/special-8.jpg", width: 1120, height: 504 },
  { src: "/images/slider/special-9.jpg", width: 1000, height: 666 },
  { src: "/images/slider/special-10.jpg", width: 557, height: 557 },
  { src: "/images/slider/special-11.jpg", width: 581, height: 581 },
  { src: "/images/slider/special-12.jpg", width: 1536, height: 1024 },
  { src: "/images/slider/special-13.jpg", width: 1600, height: 1200 },
  { src: "/images/slider/special-14.jpg", width: 1600, height: 1200 },
  { src: "/images/slider/special-15.jpg", width: 1280, height: 960 },
  { src: "/images/slider/special-16.jpg", width: 1200, height: 1600 },
  { src: "/images/slider/special-17.jpg", width: 1280, height: 960 },
  { src: "/images/slider/special-18.jpg", width: 1280, height: 960 },
];

export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/gallery-1.jpg", width: 1054, height: 1400 },
  { src: "/images/gallery/gallery-2.jpg", width: 1400, height: 1050 },
  { src: "/images/gallery/gallery-3.jpg", width: 1280, height: 720 },
  { src: "/images/gallery/gallery-4.jpg", width: 1400, height: 1050 },
  { src: "/images/gallery/gallery-5.jpg", width: 720, height: 969 },
  { src: "/images/gallery/gallery-6.jpg", width: 1021, height: 1280 },
  { src: "/images/gallery/gallery-7.jpg", width: 911, height: 1280 },
  { src: "/images/gallery/gallery-8.jpg", width: 1400, height: 787 },
  { src: "/images/gallery/gallery-9.jpg", width: 1088, height: 816 },
  { src: "/images/gallery/gallery-10.jpg", width: 1400, height: 1054 },
  { src: "/images/gallery/gallery-11.jpg", width: 1152, height: 864 },
  { src: "/images/gallery/gallery-12.jpg", width: 1400, height: 1051 },
  { src: "/images/gallery/gallery-13.jpg", width: 1152, height: 864 },
  { src: "/images/gallery/gallery-14.jpg", width: 1400, height: 1050 },
  { src: "/images/gallery/gallery-15.jpg", width: 853, height: 1280 },
  { src: "/images/gallery/gallery-16.jpg", width: 1400, height: 1050 },
];

/**
 * Slider play order (Ali's rule 2026-10-28): special-1 plays FIRST and
 * comes back after every three other photos, all the way through the
 * loop. With 18 specials the sequence is 1,2,3,4, 1,5,6,7, 1,8,9,10,
 * 1,11,12,13, 1,14,15,16, 1,17,18 — then it loops back to special-1.
 */
export function buildSliderSequence(images: GalleryImage[]): GalleryImage[] {
  if (images.length === 0) return [];
  const [first, ...rest] = images;
  const seq: GalleryImage[] = [first];
  rest.forEach((img, i) => {
    seq.push(img);
    if ((i + 1) % 3 === 0) seq.push(first);
  });
  // Never end on the special photo — the loop restarts on it anyway.
  if (seq.length > 1 && seq[seq.length - 1] === first) seq.pop();
  return seq;
}
