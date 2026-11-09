"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { whatsappLink } from "@/lib/whatsapp";
import {
  degreeOptions,
  experienceOptions,
  majorFieldOptions,
  pakistanCities,
} from "@/lib/registration";

const inputCls =
  "w-full rounded-xl border border-brand-green/20 bg-white px-4 py-3 text-sm text-ink shadow-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/50";

function Field({
  label,
  required,
  optionalText,
  children,
}: {
  label: string;
  required?: boolean;
  optionalText: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-brand-dark">
        {label}{" "}
        {required ? (
          <span aria-hidden="true" className="text-gold-dark">*</span>
        ) : (
          <span className="text-xs font-normal text-ink/50">({optionalText})</span>
        )}
      </label>
      {children}
    </div>
  );
}

function buildMessage(heading: string, rows: [string, string][]): string {
  const lines = rows
    .filter(([, v]) => v && v.trim() !== "")
    .map(([k, v]) => `*${k}:* ${v.trim()}`);
  return [`*${heading}*`, `*QIT Quran Academy*`, `------------------------------`, ...lines].join("\n");
}

/**
 * Student, Teacher, and Madrasa registration forms.
 * Updated 2026-11-09:
 * - Student: CNIC / B-Form Number added.
 * - Teacher: CNIC / ID Card Number and Highest/Last Degree.
 * - Madrasa: Location/Place, Total Teachers, Total Students, Courses Taught count, and custom course adder.
 */
export default function RegistrationForms({
  courseOptions,
}: {
  courseOptions: { value: string; label: string }[];
}) {
  const t = useTranslations("register");
  const [tab, setTab] = useState<"student" | "teacher" | "madrasa">("student");
  const [sentText, setSentText] = useState<string | null>(null);

  // Dynamic courses state for Madrasa form
  const [selectedStandard, setSelectedStandard] = useState<string[]>([]);
  const [customCourses, setCustomCourses] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");

  const handleAddCustomCourse = () => {
    const trimmed = customInput.trim();
    if (trimmed && !customCourses.includes(trimmed)) {
      setCustomCourses((prev) => [...prev, trimmed]);
      setCustomInput("");
    }
  };

  const submit =
    (kind: "student" | "teacher" | "madrasa") => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const get = (n: string) => String(fd.get(n) ?? "");

      let rows: [string, string][] = [];

      if (kind === "student") {
        rows = [
          ["Full Name", get("fullName")],
          ["Phone", get("phone")],
          ["CNIC / B-Form No.", get("cnic")],
          ["Email", get("email")],
          ["Age", get("age")],
          ["Gender", get("gender")],
          ["Country", get("country")],
          ["Course", get("course")],
          ["Teacher Preference", get("teacherPref")],
          ["Preferred Timing", get("timing")],
          ["Notes", get("notes")],
        ];
      } else if (kind === "teacher") {
        rows = [
          ["Full Name", get("fullName")],
          ["Phone", get("phone")],
          ["CNIC / ID Card No.", get("cnic")],
          ["Email", get("email")],
          ["Teaching Experience", get("experience")],
          ["Highest / Last Degree", get("degree")],
          ["City", get("city")],
          ["Major Field", get("majorField")],
          ["Notes", get("notes")],
        ];
      } else {
        const standardPrograms = fd.getAll("programs").map(String);
        const allPrograms = [...standardPrograms, ...customCourses];

        rows = [
          ["Madrasa Name", get("mName")],
          ["Place / Location", get("place")],
          ["Mohtamim / Head", get("mohtamim")],
          ["Phone", get("phone")],
          ["Email", get("email")],
          ["Address", get("address")],
          ["City / District", get("cityDistrict")],
          ["Existing Registration No.", get("regNo")],
          ["Year Established", get("established")],
          ["Total Teachers", get("teachers")],
          ["Total Students", get("students")],
          ["Total Courses Count", allPrograms.length > 0 ? String(allPrograms.length) : ""],
          ["Courses Taught", allPrograms.join(", ")],
          ["Facility Type", get("facility")],
          ["Notes", get("notes")],
        ];
      }

      const text = buildMessage(
        kind === "student"
          ? "NEW STUDENT REGISTRATION"
          : kind === "teacher"
            ? "NEW TEACHER APPLICATION"
            : "NEW MADRASA REGISTRATION — QOUMI MARKAZI DIGITAL QURAN BOARD",
        rows,
      );
      setSentText(text);
      window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    };

  const tabCls = (active: boolean) =>
    `min-h-[48px] flex-1 rounded-full px-4 py-3 text-sm font-bold transition-all duration-200 active:scale-[0.98] motion-reduce:transform-none ${
      active
        ? "bg-brand-green text-white shadow-card"
        : "bg-white text-brand-dark shadow-card hover:text-brand-green"
    }`;

  return (
    <div>
      <div className="mb-8 flex gap-2" role="tablist" aria-label={t("title")}>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "student"}
          onClick={() => {
            setTab("student");
            setSentText(null);
          }}
          className={tabCls(tab === "student")}
        >
          {t("studentTab")}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "teacher"}
          onClick={() => {
            setTab("teacher");
            setSentText(null);
          }}
          className={tabCls(tab === "teacher")}
        >
          {t("teacherTab")}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "madrasa"}
          onClick={() => {
            setTab("madrasa");
            setSentText(null);
          }}
          className={tabCls(tab === "madrasa")}
        >
          {t("madrasaTab")}
        </button>
      </div>

      {sentText && (
        <div className="mb-8 rounded-2xl bg-brand-light p-6 text-center" role="status">
          <p className="text-lg font-bold text-brand-dark">✓ {t("successTitle")}</p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-ink/75">
            {t("successText")}
          </p>
          <a
            href={whatsappLink(sentText)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine mt-4 inline-flex min-h-[44px] items-center rounded-full bg-brand-green px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-brand-dark active:scale-[0.97] motion-reduce:transform-none"
          >
            {t("openAgain")}
          </a>
        </div>
      )}

      {tab === "student" ? (
        <form onSubmit={submit("student")} className="grid gap-4 sm:grid-cols-2">
          <Field label={t("fullName")} required optionalText={t("optional")}>
            <input name="fullName" required className={inputCls} autoComplete="name" />
          </Field>
          <Field label={t("phone")} required optionalText={t("optional")}>
            <input
              name="phone"
              required
              type="tel"
              className={inputCls}
              autoComplete="tel"
              placeholder="+92 ..."
            />
          </Field>
          <Field label={t("cnicStudent")} optionalText={t("optional")}>
            <input name="cnic" className={inputCls} placeholder={t("cnicPlaceholder")} />
          </Field>
          <Field label={t("email")} optionalText={t("optional")}>
            <input name="email" type="email" className={inputCls} autoComplete="email" />
          </Field>
          <Field label={t("age")} optionalText={t("optional")}>
            <input name="age" inputMode="numeric" className={inputCls} />
          </Field>
          <Field label={t("gender")} optionalText={t("optional")}>
            <select name="gender" defaultValue="" className={inputCls}>
              <option value="">— {t("selectOne")} —</option>
              <option value="Male">{t("male")}</option>
              <option value="Female">{t("female")}</option>
            </select>
          </Field>
          <Field label={t("country")} optionalText={t("optional")}>
            <input name="country" className={inputCls} autoComplete="country-name" />
          </Field>
          <div className="sm:col-span-2">
            <Field label={t("course")} required optionalText={t("optional")}>
              <select name="course" required defaultValue="" className={inputCls}>
                <option value="">— {t("selectOne")} —</option>
                {courseOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label={t("teacherPref")} optionalText={t("optional")}>
            <select name="teacherPref" defaultValue="" className={inputCls}>
              <option value="">— {t("selectOne")} —</option>
              <option value="Male teacher">{t("maleTeacher")}</option>
              <option value="Female teacher">{t("femaleTeacher")}</option>
              <option value="No preference">{t("noPref")}</option>
            </select>
          </Field>
          <Field label={t("timing")} optionalText={t("optional")}>
            <input name="timing" className={inputCls} placeholder={t("timingPh")} />
          </Field>
          <div className="sm:col-span-2">
            <Field label={t("notes")} optionalText={t("optional")}>
              <textarea name="notes" rows={3} className={inputCls} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="btn-shine inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-gold px-6 py-3 text-base font-bold text-brand-dark shadow-goldglow transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-dark active:scale-[0.98] motion-reduce:transform-none"
            >
              {t("submit")}
            </button>
            <p className="mt-2 text-center text-xs text-ink/50">* {t("required")}</p>
          </div>
        </form>
      ) : tab === "teacher" ? (
        <form onSubmit={submit("teacher")} className="grid gap-4 sm:grid-cols-2">
          <Field label={t("fullName")} required optionalText={t("optional")}>
            <input name="fullName" required className={inputCls} autoComplete="name" />
          </Field>
          <Field label={t("phone")} required optionalText={t("optional")}>
            <input
              name="phone"
              required
              type="tel"
              className={inputCls}
              autoComplete="tel"
              placeholder="+92 ..."
            />
          </Field>
          <Field label={t("cnicTeacher")} optionalText={t("optional")}>
            <input name="cnic" className={inputCls} placeholder={t("cnicPlaceholder")} />
          </Field>
          <Field label={t("email")} required optionalText={t("optional")}>
            <input name="email" required type="email" className={inputCls} autoComplete="email" />
          </Field>
          <Field label={t("experience")} optionalText={t("optional")}>
            <select name="experience" defaultValue="" className={inputCls}>
              <option value="">— {t("selectOne")} —</option>
              {experienceOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t("degree")} optionalText={t("optional")}>
            <select name="degree" defaultValue="" className={inputCls}>
              <option value="">— {t("selectOne")} —</option>
              {degreeOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t("city")} optionalText={t("optional")}>
            <select name="city" defaultValue="" className={inputCls}>
              <option value="">— {t("selectOne")} —</option>
              {pakistanCities.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t("majorField")} optionalText={t("optional")}>
            <select name="majorField" defaultValue="" className={inputCls}>
              <option value="">— {t("selectOne")} —</option>
              {majorFieldOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field label={t("notes")} optionalText={t("optional")}>
              <textarea name="notes" rows={3} className={inputCls} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="btn-shine inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-gold px-6 py-3 text-base font-bold text-brand-dark shadow-goldglow transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-dark active:scale-[0.98] motion-reduce:transform-none"
            >
              {t("submit")}
            </button>
            <p className="mt-2 text-center text-xs text-ink/50">* {t("required")}</p>
          </div>
        </form>
      ) : (
        <form onSubmit={submit("madrasa")} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <p className="rounded-2xl bg-brand-light px-5 py-4 text-sm leading-relaxed text-ink/75">
              {t("mIntro")}
            </p>
          </div>
          <Field label={t("mName")} required optionalText={t("optional")}>
            <input name="mName" required className={inputCls} />
          </Field>
          <Field label={t("mPlace")} required optionalText={t("optional")}>
            <input
              name="place"
              required
              className={inputCls}
              placeholder="e.g. Khanpur, Dera Ghazi Khan"
            />
          </Field>
          <Field label={t("mMohtamim")} required optionalText={t("optional")}>
            <input name="mohtamim" required className={inputCls} autoComplete="name" />
          </Field>
          <Field label={t("phone")} required optionalText={t("optional")}>
            <input
              name="phone"
              required
              type="tel"
              className={inputCls}
              autoComplete="tel"
              placeholder="+92 ..."
            />
          </Field>
          <Field label={t("email")} optionalText={t("optional")}>
            <input name="email" type="email" className={inputCls} autoComplete="email" />
          </Field>
          <Field label={t("mCityDistrict")} required optionalText={t("optional")}>
            <input name="cityDistrict" required className={inputCls} />
          </Field>
          <div className="sm:col-span-2">
            <Field label={t("mAddress")} optionalText={t("optional")}>
              <input name="address" className={inputCls} autoComplete="street-address" />
            </Field>
          </div>
          <Field label={t("mTeachers")} required optionalText={t("optional")}>
            <input
              name="teachers"
              required
              type="number"
              min="1"
              className={inputCls}
              placeholder="e.g. 8"
            />
          </Field>
          <Field label={t("mStudents")} required optionalText={t("optional")}>
            <input
              name="students"
              required
              type="number"
              min="1"
              className={inputCls}
              placeholder="e.g. 150"
            />
          </Field>
          <Field label={t("mRegNo")} optionalText={t("optional")}>
            <input name="regNo" className={inputCls} />
          </Field>
          <Field label={t("mEstablished")} optionalText={t("optional")}>
            <input
              name="established"
              inputMode="numeric"
              className={inputCls}
              placeholder="e.g. 2005"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label={t("mFacility")} optionalText={t("optional")}>
              <select name="facility" defaultValue="" className={inputCls}>
                <option value="">— {t("selectOne")} —</option>
                <option value="Day Scholars Only">{t("facDay")}</option>
                <option value="Boarding (Residential)">{t("facBoarding")}</option>
                <option value="Both Day & Boarding">{t("facBoth")}</option>
              </select>
            </Field>
          </div>

          {/* Courses Taught Section with Dynamic Add Course */}
          <div className="sm:col-span-2">
            <Field label={t("mPrograms")} optionalText={t("optional")}>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  ["Hifz", t("progHifz")],
                  ["Nazra", t("progNazra")],
                  ["Tajweed", t("progTajweed")],
                  ["Noorani Qaida", t("progQaida")],
                  ["Dars-e-Nizami", t("progDars")],
                ].map(([value, label]) => (
                  <label
                    key={value}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-brand-green/20 bg-white px-4 py-2 text-sm text-ink shadow-sm transition hover:border-gold"
                  >
                    <input
                      type="checkbox"
                      name="programs"
                      value={value}
                      className="h-4 w-4 accent-[#D9A441]"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedStandard((prev) => [...prev, value]);
                        } else {
                          setSelectedStandard((prev) => prev.filter((v) => v !== value));
                        }
                      }}
                    />
                    {label}
                  </label>
                ))}
              </div>

              {/* Added Custom Courses Chips */}
              {customCourses.length > 0 && (
                <div className="mt-3">
                  <p className="mb-1 text-xs font-semibold text-ink/70">
                    {t("customCoursesList")}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {customCourses.map((c, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-xs font-semibold text-brand-dark"
                      >
                        {c}
                        <button
                          type="button"
                          onClick={() =>
                            setCustomCourses((prev) => prev.filter((_, i) => i !== idx))
                          }
                          className="font-bold text-ink/60 hover:text-red-600 focus:outline-none"
                          aria-label={`Remove ${c}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Custom Course Input */}
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomCourse();
                    }
                  }}
                  placeholder={t("addCustomCourse")}
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={handleAddCustomCourse}
                  className="shrink-0 rounded-xl bg-brand-green px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-brand-dark active:scale-95"
                >
                  {t("addCourseBtn")}
                </button>
              </div>

              {/* Live Count Badge */}
              <p className="mt-2 text-xs text-ink/70">
                {t("mCoursesCount")}:{" "}
                <span className="font-bold text-brand-dark">
                  {selectedStandard.length + customCourses.length}
                </span>
              </p>
            </Field>
          </div>

          <div className="sm:col-span-2">
            <Field label={t("notes")} optionalText={t("optional")}>
              <textarea name="notes" rows={3} className={inputCls} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="btn-shine inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-gold px-6 py-3 text-base font-bold text-brand-dark shadow-goldglow transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-dark active:scale-[0.98] motion-reduce:transform-none"
            >
              {t("submit")}
            </button>
            <p className="mt-2 text-center text-xs text-ink/50">* {t("required")}</p>
          </div>
        </form>
      )}
    </div>
  );
}
