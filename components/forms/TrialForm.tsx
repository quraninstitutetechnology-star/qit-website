"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { whatsappLink, getWhatsappMessages } from "@/lib/whatsapp";

const inputCls =
  "w-full rounded-xl border border-brand-green/20 bg-white px-4 py-3 text-sm text-ink shadow-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/50";
const labelCls = "mb-1.5 block text-sm font-semibold text-brand-dark";

interface CourseOption {
  slug: string;
  title: string;
}

/**
 * Free-trial / contact form (spec §8). Validates client + server, posts to
 * /api/contact, and on success shows a WhatsApp deep link with details prefilled.
 * Never a dead stub. Labels are localized; option VALUES stay English so the
 * academy's WhatsApp enquiry stays readable. Course options arrive localized
 * from the (server) About page.
 */
export default function TrialForm({ courseOptions }: { courseOptions: CourseOption[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const [error, setError] = useState("");
  const [waUrl, setWaUrl] = useState("");
  const locale = useLocale() as Locale;
  const t = useTranslations("form");
  const wa = getWhatsappMessages(locale);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(
          json.errorCode === "INVALID_EMAIL"
            ? t("errorEmail")
            : json.errorCode === "MISSING_FIELD"
              ? t("errorMissing")
              : json.errorCode === "INVALID_BODY"
                ? t("errorInvalid")
                : t("errorGeneric"),
        );
        return;
      }
      setWaUrl(json.whatsappUrl);
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
      setError(t("errorNetwork"));
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl bg-brand-light p-7 text-center" role="status">
        <p className="text-lg font-bold text-brand-dark">{t("doneTitle")}</p>
        <p className="mt-2 text-sm text-ink/70">{t("doneText")}</p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-[44px] items-center rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97] motion-reduce:transform-none"
        >
          {t("sendWhatsapp")}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="studentName" className={labelCls}>{t("studentName")} *</label>
        <input id="studentName" name="studentName" required className={inputCls} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="age" className={labelCls}>{t("age")} *</label>
        <input id="age" name="age" required inputMode="numeric" className={inputCls} />
      </div>
      <div>
        <label htmlFor="gender" className={labelCls}>{t("gender")} *</label>
        <select id="gender" name="gender" required defaultValue="" className={inputCls}>
          <option value="" disabled>{t("select")}</option>
          <option value="Male">{t("male")}</option>
          <option value="Female">{t("female")}</option>
        </select>
      </div>
      <div>
        <label htmlFor="course" className={labelCls}>{t("course")} *</label>
        <select id="course" name="course" required defaultValue="" className={inputCls}>
          <option value="" disabled>{t("selectCourse")}</option>
          {courseOptions.map((c) => (
            <option key={c.slug} value={c.slug}>{c.title}</option>
          ))}
          <option value="not-sure">{t("notSure")}</option>
        </select>
      </div>
      <div>
        <label htmlFor="country" className={labelCls}>{t("country")} *</label>
        <input id="country" name="country" required className={inputCls} placeholder={t("countryPlaceholder")} />
      </div>
      <div>
        <label htmlFor="whatsapp" className={labelCls}>{t("whatsapp")} *</label>
        <input id="whatsapp" name="whatsapp" required type="tel" autoComplete="tel" className={inputCls} placeholder="+92 ..." />
      </div>
      <div>
        <label htmlFor="email" className={labelCls}>{t("email")}</label>
        <input id="email" name="email" type="email" autoComplete="email" className={inputCls} />
      </div>
      <div>
        <label htmlFor="preferredTimes" className={labelCls}>{t("preferredTimes")} *</label>
        <input id="preferredTimes" name="preferredTimes" required className={inputCls} placeholder={t("timesPlaceholder")} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="teacherPreference" className={labelCls}>{t("teacherPreference")} *</label>
        <select id="teacherPreference" name="teacherPreference" required defaultValue="" className={inputCls}>
          <option value="" disabled>{t("select")}</option>
          <option value="Male teacher">{t("maleTeacher")}</option>
          <option value="Female teacher">{t("femaleTeacher")}</option>
          <option value="No preference">{t("noPreference")}</option>
        </select>
      </div>
      {status === "error" && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 sm:col-span-2">
          {error}
        </p>
      )}
      <div className="flex flex-col items-center gap-3 sm:col-span-2 sm:flex-row">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-shine inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-bold text-brand-dark shadow-goldglow transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-gold-dark active:scale-[0.97] disabled:opacity-60 motion-reduce:transform-none sm:w-auto"
        >
          {status === "sending" ? t("sending") : t("submit")}
        </button>
        <a
          href={whatsappLink(wa.about)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-brand-green transition-colors hover:text-gold-dark"
        >
          {t("orWhatsapp")}
        </a>
      </div>
      <p className="text-xs text-ink/50 sm:col-span-2">{t("note")}</p>
    </form>
  );
}
