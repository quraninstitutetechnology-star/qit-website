export interface Testimonial {
  text: string;
  name: string;
  location: string;
  sample: boolean;
}

/**
 * §1 Decision 9 — 3 PLACEHOLDER testimonial slots, clearly marked as samples.
 * No stars, no ratings, and these are excluded from all structured data.
 * Ali replaces them with real student/parent reviews before launch.
 */
export const testimonials: Testimonial[] = [
  { text: "Sample — replace with a real review from a QIT parent or student.", name: "Parent / Student Name", location: "City, Country", sample: true },
  { text: "Sample — replace with a real review from a QIT parent or student.", name: "Parent / Student Name", location: "City, Country", sample: true },
  { text: "Sample — replace with a real review from a QIT parent or student.", name: "Parent / Student Name", location: "City, Country", sample: true },
];
