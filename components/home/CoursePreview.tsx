import { courses } from "@/lib/courses";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import CourseCard from "@/components/courses/CourseCard";

/** Courses preview (spec §5.4) — first 6 courses + "View all courses". */
export default function CoursePreview() {
  return (
    <Section
      tone="white"
      eyebrow="Our courses"
      title="A Course for Every Age and Level"
      intro="From the very first letter of Noorani Qaida to Ijazah — follow one clear pathway, at your own pace."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.slice(0, 6).map((course, i) => (
          <Reveal key={course.slug} delay={(i % 3) * 0.08}>
            <CourseCard course={course} />
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button href="/courses" variant="green">View All Courses</Button>
      </div>
    </Section>
  );
}
