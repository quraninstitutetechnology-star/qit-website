import Image from "next/image";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { teachers } from "@/lib/teachers";
import { images } from "@/lib/images";

/** Teachers preview (spec §5.7) — placeholder cards until Ali supplies real teachers. */
export default function TeachersPreview() {
  return (
    <Section
      eyebrow="Our teachers"
      title="Learn from Caring, Qualified Teachers"
      intro="Teacher profiles are being added — real names, qualifications and photos will appear here."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {teachers.map((teacher, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <Card className="h-full overflow-hidden text-center">
              <div className="relative mx-auto mt-6 h-28 w-28 overflow-hidden rounded-full ring-4 ring-gold-light">
                <Image src={images.avatar.src} alt={images.avatar.alt} fill sizes="112px" className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-brand-dark">{teacher.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold-dark">{teacher.qualification}</p>
                <p className="mt-2 text-sm text-ink/70">{teacher.subjects}</p>
                <p className="mt-1 text-xs italic text-ink/50">{teacher.note}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button href="/about#teachers" variant="green">Meet Our Teachers</Button>
      </div>
    </Section>
  );
}
