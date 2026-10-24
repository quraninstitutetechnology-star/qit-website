"use client";

import type { Course } from "@/lib/courses";
import CourseCard from "./CourseCard";
import Reveal from "@/components/ui/Reveal";

/**
 * Course grid — shows ALL courses directly.
 * The audience filter tabs (All / Kids / Adults / Sisters) were removed
 * 2026-10-24 at Ali's request, together with the page intro section.
 * Courses arrive localized from the (server) Courses page.
 */
export default function CourseFilter({ courses }: { courses: Course[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course, i) => (
        <Reveal key={course.slug} delay={(i % 3) * 0.06}>
          <CourseCard course={course} />
        </Reveal>
      ))}
    </div>
  );
}
