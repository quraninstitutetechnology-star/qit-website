import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

const stepImages = [
  { img: "/images/how/step-1-book-trial.jpg" },
  { img: "/images/how/step-2-meet-teacher.jpg" },
  { img: "/images/how/step-3-choose-plan.jpg" },
];

interface StepText {
  title: string;
  text: string;
  alt: string;
}

export default async function HowItWorks() {
  const t = await getTranslations("how");
  const steps = t.raw("steps") as StepText[];

  return (
    <Section eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
      <ol className="grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title}>
            <Reveal delay={i * 0.1}>
              <Card className="h-full overflow-hidden">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={stepImages[i].img}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-7 pt-0 text-center">
                  <span className="relative z-10 mx-auto -mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-xl font-bold text-gold shadow-card ring-4 ring-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-brand-dark">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.text}</p>
                </div>
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
