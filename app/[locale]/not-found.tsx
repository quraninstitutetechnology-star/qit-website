import { getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-24 text-center sm:px-6">
      <p className="text-6xl font-bold text-gold">404</p>
      <h1 className="mt-4 text-3xl font-bold text-brand-dark">{t("title")}</h1>
      <p className="mt-3 text-ink/70">{t("text")}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/" variant="green">{t("goHome")}</Button>
        <Button href="/courses" variant="gold">{t("viewCourses")}</Button>
      </div>
    </section>
  );
}
