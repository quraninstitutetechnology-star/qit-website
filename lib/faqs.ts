export interface Faq {
  q: string;
  a: string;
}

/**
 * The 5 main Home-page FAQs — trimmed to 5 short, simple questions
 * 2026-10-24 at Ali's request (was 16).
 * FAQ exists ONLY on the Home page — there is no /faq route.
 */
export const faqs: Faq[] = [
  {
    q: "Is the free trial class really free?",
    a: "Yes. Your first class is completely free — no card, no payment, and no obligation to join.",
  },
  {
    q: "How do online classes work?",
    a: "Classes are live and one-to-one on a video call. You recite to your teacher, and the teacher corrects you in real time.",
  },
  {
    q: "Do you have female teachers?",
    a: "Yes. Sisters and girls can learn with a qualified female teacher. Just tell us when you book your free trial.",
  },
  {
    q: "What do I need for online classes?",
    a: "Only a phone, tablet or computer with an internet connection. No books are needed to start.",
  },
  {
    q: "How much do classes cost?",
    a: "We offer three simple plans — Basic, Standard and Premium. See the Pricing page for full details.",
  },
];
