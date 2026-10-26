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
 * Student + teacher registration forms (added 2026-10-26 at Ali's order).
 * On submit, the filled details are arranged into a headed WhatsApp
 * message and opened to the academy's number; a success panel confirms
 * and offers to re-open WhatsApp. Option values stay English (they are
 * read by the academy), matching the trial-form policy.
 */
export default function RegistrationForms({
  courseOptions,
}: {
  courseOptions: { value: string; label: string }[];
}) {
  const t = useTranslations("register");
  const [tab, setTab] = useState<"student" | "teacher">("student");
  const [sentText, setSentText] = useState<string | null>(null);

  const submit =
    (kind: "student" | "teacher") => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const get = (n: string) => String(fd.get(n) ?? "");
      const rows: [string, string][] =
        kind === "student"
          ? [
              ["Full Name", get("fullName")],
              ["Phone", get("phone")],
              ["Email", get("email")],
              ["Age", get("age")],
              ["Gender", get("gender")],
              ["Country", get("country")],
              ["Course", get("course")],
              ["Teacher Preference", get("teacherPref")],
              ["Preferred Timing", get("timing")],
              ["Notes", get("notes")],
            ]
          : [
              ["Full Name", get("fullName")],
              ["Phone", get("phone")],
              ["Email", get("email")],
              ["Teaching Experience", get("experience")],
              ["Highest Degree / Qualification", get("degree")],
              ["City", get("city")],
              ["Major Field", get("majorField")],
              ["Notes", get("notes")],
            ];
      const text = buildMessage(
        kind === "student" ? "NEW STUDENT REGISTRATION" : "NEW TEACHER APPLICATION",
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
        <button type="button" role="tab" aria-selected={tab === "student"} onClick={() => { setTab("student"); setSentText(null); }} className={tabCls(tab === "student")}>
          {t("studentTab")}
        </button>
        <button type="button" role="tab" aria-selected={tab === "teacher"} onClick={() => { setTab("teacher"); setSentText(null); }} className={tabCls(tab === "teacher")}>
          {t("teacherTab")}
        </button>
      </div>

      {sentText && (
        <div className="mb-8 rounded-2xl bg-brand-light p-6 text-center" role="status">
          <p className="text-lg font-bold text-brand-dark">✓ {t("successTitle")}</p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-ink/75">{t("successText")}</p>
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
            <input name="phone" required type="tel" className={inputCls} autoComplete="tel" placeholder="+92 ..." />
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
                  <option key={c.value} value={c.value}>{c.label}</option>
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
            <button type="submit" className="btn-shine inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-gold px-6 py-3 text-base font-bold text-brand-dark shadow-goldglow transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-dark active:scale-[0.98] motion-reduce:transform-none">
              {t("submit")}
            </button>
            <p className="mt-2 text-center text-xs text-ink/50">* {t("required")}</p>
          </div>
        </form>
      ) : (
        <form onSubmit={submit("teacher")} className="grid gap-4 sm:grid-cols-2">
          <Field label={t("fullName")} required optionalText={t("optional")}>
            <input name="fullName" required className={inputCls} autoComplete="name" />
          </Field>
          <Field label={t("phone")} required optionalText={t("optional")}>
            <input name="phone" required type="tel" className={inputCls} autoComplete="tel" placeholder="+92 ..." />
          </Field>
          <div className="sm:col-span-2">
            <Field label={t("email")} required optionalText={t("optional")}>
              <input name="email" required type="email" className={inputCls} autoComplete="email" />
            </Field>
          </div>
          <Field label={t("experience")} optionalText={t("optional")}>
            <select name="experience" defaultValue="" className={inputCls}>
              <option value="">— {t("selectOne")} —</option>
              {experienceOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label={t("degree")} optionalText={t("optional")}>
            <select name="degree" defaultValue="" className={inputCls}>
              <option value="">— {t("selectOne")} —</option>
              {degreeOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label={t("city")} optionalText={t("optional")}>
            <select name="city" defaultValue="" className={inputCls}>
              <option value="">— {t("selectOne")} —</option>
              {pakistanCities.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label={t("majorField")} optionalText={t("optional")}>
            <select name="majorField" defaultValue="" className={inputCls}>
              <option value="">— {t("selectOne")} —</option>
              {majorFieldOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field label={t("notes")} optionalText={t("optional")}>
              <textarea name="notes" rows={3} className={inputCls} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-shine inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-gold px-6 py-3 text-base font-bold text-brand-dark shadow-goldglow transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-dark active:scale-[0.98] motion-reduce:transform-none">
              {t("submit")}
            </button>
            <p className="mt-2 text-center text-xs text-ink/50">* {t("required")}</p>
          </div>
        </form>
      )}
    </div>
  );
}
