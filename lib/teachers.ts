export interface Teacher {
  name: string;
  qualification: string;
  subjects: string;
  note: string;
}

/**
 * §1 Decision 7 — 4 PLACEHOLDER teacher cards.
 * Names, qualifications and photos are NOT known. Ali replaces these entries
 * (and public/images/avatar.jpg) with real teacher details before launch.
 */
export const teachers: Teacher[] = [
  { name: "Teacher Name", qualification: "Qualification — TODO_TEACHER_1", subjects: "Qaida · Nazra · Tajweed", note: "Teacher details coming soon." },
  { name: "Teacher Name", qualification: "Qualification — TODO_TEACHER_2", subjects: "Hifz · Recitation", note: "Teacher details coming soon." },
  { name: "Teacher Name", qualification: "Qualification — TODO_TEACHER_3", subjects: "Female tutor — Sisters & Kids", note: "Teacher details coming soon." },
  { name: "Teacher Name", qualification: "Qualification — TODO_TEACHER_4", subjects: "Arabic · Islamic Studies", note: "Teacher details coming soon." },
];
