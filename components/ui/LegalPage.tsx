import { getTranslations } from "next-intl/server";
import Breadcrumb from "./Breadcrumb";

/** Shared layout for the short placeholder legal pages (spec §3). */
export default async function LegalPage({
  title,
  path,
  children,
}: {
  title: string;
  path: string;
  children: React.ReactNode;
}) {
  const t = await getTranslations("legal");
  const tb = await getTranslations("breadcrumb");
  return (
    <>
      <Breadcrumb items={[{ name: tb("home"), path: "/" }, { name: title, path }]} />
      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold text-brand-dark">{title}</h1>
        <div className="mt-6 space-y-4 leading-relaxed text-ink/75">{children}</div>
        <p className="mt-8 rounded-xl bg-gold-light/50 px-4 py-3 text-sm text-ink/60">
          {t("note")}
          {/* TODO_LEGAL_TEXT: Ali to supply/approve final legal wording. */}
        </p>
      </section>
    </>
  );
}
