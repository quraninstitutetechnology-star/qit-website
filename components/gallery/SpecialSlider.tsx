"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLocale, useTranslations } from "next-intl";
import { specialImages, buildSliderSequence } from "@/lib/gallery";
import { rtlLocales, type Locale } from "@/i18n/routing";

/**
 * Special Moments slider (added 2026-10-28 at Ali's order): photos from
 * Ali's special_slider.zip. Auto-swipes every 4 seconds (Ali's spec),
 * loops, and can be swiped/dragged. Play order comes from
 * buildSliderSequence: special-1 first, then back after every 3 photos.
 * Photos are never cropped — each slide shows the full photo over a
 * blurred fill of itself, so portrait and landscape shots alike display
 * completely.
 */
export default function SpecialSlider() {
  const t = useTranslations("gallery");
  const locale = useLocale() as Locale;
  const isRtl = rtlLocales.includes(locale);
  const slides = buildSliderSequence(specialImages);
  const [selected, setSelected] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, direction: isRtl ? "rtl" : "ltr" },
    reduce ? [] : [autoplay.current]
  );

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // Call reInit once on mount and when window finishes loading to measure accurate image dimensions
    emblaApi.reInit();
    const handleLoad = () => emblaApi.reInit();
    if (document.readyState === "complete") {
      emblaApi.reInit();
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      window.removeEventListener("load", handleLoad);
    };
  }, [emblaApi, onSelect]);

  const altFor = (src: string) => {
    const n = specialImages.findIndex((img) => img.src === src) + 1;
    return t("specialAlt", { n });
  };

  return (
    <div className="group relative">
      <div ref={emblaRef} className="overflow-hidden rounded-3xl shadow-card">
        <div className="flex">
          {slides.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className="relative aspect-[4/3] min-w-0 flex-[0_0_100%] overflow-hidden bg-brand-dark sm:aspect-[16/9]"
            >
              {/* Blurred background copy: fills portrait/landscape letterbox with eager loading */}
              <Image
                src={img.src}
                alt=""
                aria-hidden="true"
                fill
                sizes="100vw"
                loading="eager"
                priority={i === 0}
                className="scale-110 object-cover opacity-60 blur-xl"
              />
              {/* Foreground full photo: uncropped, eager loading prevents off-screen blanking */}
              <Image
                src={img.src}
                alt={altFor(img.src)}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                loading="eager"
                priority={i === 0}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          emblaApi?.scrollPrev();
          autoplay.current?.reset();
        }}
        aria-label={t("prev")}
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-dark/55 text-white backdrop-blur transition hover:bg-brand-dark/80"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 rtl:rotate-180" aria-hidden="true">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => {
          emblaApi?.scrollNext();
          autoplay.current?.reset();
        }}
        aria-label={t("next")}
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-dark/55 text-white backdrop-blur transition hover:bg-brand-dark/80"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 rtl:rotate-180" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
        {slides.map((img, i) => (
          <button
            key={`dot-${img.src}-${i}`}
            type="button"
            onClick={() => {
              emblaApi?.scrollTo(i);
              autoplay.current?.reset();
            }}
            aria-label={t("goToSlide", { n: i + 1 })}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === selected ? "w-6 bg-gold" : "w-2 bg-brand-green/30 hover:bg-brand-green/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
