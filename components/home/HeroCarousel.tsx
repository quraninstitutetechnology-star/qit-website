"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "framer-motion";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import Button from "@/components/ui/Button";

interface SlideImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface Slide {
  image: SlideImage;
  headline: string;
  sub: string;
  primary: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string };
}

const slides: Slide[] = [
  {
    image: images.hero1,
    headline: "Welcome to QIT — Learn the Quran Online & On-Campus in Khanpur, Dera Ghazi Khan",
    sub: `${siteConfig.slogan}. Live one-to-one classes for kids, adults and sisters — start with a ${siteConfig.trialLabel}.`,
    primary: { label: `Book ${siteConfig.trialLabel}`, href: whatsappLink(whatsappMessages.home), external: true },
    secondary: { label: "View Courses", href: "/courses" },
  },
  {
    image: images.hero2,
    headline: "Quran Classes for Kids & Sisters — 1-to-1 with caring male & female teachers",
    sub: "Private lessons at your pace, with a teacher matched to your child — or a female teacher for sisters and girls.",
    primary: { label: `Book ${siteConfig.trialLabel}`, href: whatsappLink(whatsappMessages.home), external: true },
  },
  {
    image: images.hero3,
    headline: "From Noorani Qaida to Hifz & Tajweed — a course for every age and level",
    sub: "A clear pathway from the Arabic alphabet to Ijazah, online and at our Khanpur campus.",
    primary: { label: "Explore Courses", href: "/courses" },
    secondary: { label: "See Pricing", href: "/pricing" },
  },
];

/**
 * Hero carousel — exactly 3 slides (spec §5.1).
 * Embla + Autoplay 5s, visible pause/play, pauses on hover/focus, swipe,
 * arrows + dots (44px), aria-live announcements, no autoplay under reduced motion.
 */
export default function HeroCarousel() {
  const reduce = useReducedMotion();
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, reduce ? [] : [autoplay.current]);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(!reduce);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const togglePlay = () => {
    const player = autoplay.current;
    if (!player) return;
    if (playing) {
      player.stop();
      setPlaying(false);
    } else {
      player.play();
      setPlaying(true);
    }
  };

  return (
    <section aria-roledescription="carousel" aria-label="QIT highlights" className="relative bg-brand-dark">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={slide.headline}
              className="relative min-w-0 shrink-0 grow-0 basis-full"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={selected !== i}
            >
              <div className="relative h-[540px] sm:h-[500px] lg:h-[560px]">
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/40" />
                <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
                  <div className="max-w-2xl">
                    <p lang="ar" dir="rtl" className="mb-4 text-left font-arabic text-xl text-gold-light sm:text-2xl">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </p>
                    <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[44px]">
                      {slide.headline}
                    </h1>
                    <p className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">{slide.sub}</p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Button href={slide.primary.href} variant="gold" external={slide.primary.external}>
                        {slide.primary.label}
                      </Button>
                      {slide.secondary && (
                        <Button href={slide.secondary.href} variant="outline">
                          {slide.secondary.label}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous slide"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-gold hover:text-brand-dark"
        >
          ‹
        </button>
        <div className="flex items-center gap-1">
          {slides.map((s, i) => (
            <button
              key={s.headline}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={selected === i}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span className={`block h-2.5 rounded-full transition-all duration-300 ${selected === i ? "w-8 bg-gold" : "w-2.5 bg-white/50"}`} />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next slide"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-gold hover:text-brand-dark"
        >
          ›
        </button>
        {!reduce && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-sm text-white backdrop-blur transition hover:bg-gold hover:text-brand-dark"
          >
            {playing ? "❚❚" : "▶"}
          </button>
        )}
      </div>

      <span aria-live="polite" className="sr-only">
        Slide {selected + 1} of {slides.length}: {slides[selected].headline}
      </span>
    </section>
  );
}
