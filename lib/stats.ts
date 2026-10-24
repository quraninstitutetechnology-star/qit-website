export interface Stat {
  value: string;
  label: string;
}

/**
 * §1 Decision 8 — four stat slots rendered as "—" until Ali supplies
 * real, audited numbers. Never animate/count up from invented values.
 */
export const stats: Stat[] = [
  { value: "—", label: "Students" }, // TODO_STAT_STUDENTS
  { value: "—", label: "Teachers" }, // TODO_STAT_TEACHERS
  { value: "—", label: "Countries" }, // TODO_STAT_COUNTRIES
  { value: "—", label: "Years" }, // TODO_STAT_YEARS
];
