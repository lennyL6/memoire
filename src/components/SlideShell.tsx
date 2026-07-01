import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { brand, Slide } from '../data/presentationContent';

type SlideShellProps = {
  slide: Slide;
  total: number;
  index: number;
  isPrint?: boolean;
  children: ReactNode;
};

export default function SlideShell({ slide, total, index, isPrint = false, children }: SlideShellProps) {
  return (
    <motion.section
      className="presentation-frame relative aspect-video w-full max-w-[1600px] overflow-hidden rounded-[2rem] border border-white/70 bg-fiducial-offwhite shadow-soft"
      initial={isPrint ? false : { opacity: 0, y: 18, scale: 0.992 }}
      animate={isPrint ? undefined : { opacity: 1, y: 0, scale: 1 }}
      exit={isPrint ? undefined : { opacity: 0, y: -18, scale: 0.992 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-fiducial-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-10 h-96 w-96 rounded-full bg-fiducial-deep/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-tl-[8rem] bg-fiducial-mint/65" />
      <div className={`slide-illustration slide-illustration-${slide.kind}`} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="absolute left-8 right-8 top-6 z-20 flex items-center justify-between text-xs font-semibold text-fiducial-anthracite/50">
        <div className="flex items-center gap-3">
          <img className="brand-logo brand-logo-header" src="/fiducial-fpsg-logo.png" alt="Fiducial FPSG" />
        </div>
        <div className="flex items-center gap-3">
          <span>{brand.website.replace('https://', '').replace('/', '')}</span>
          <span className="rounded-full border border-fiducial-deep/10 bg-white/60 px-3 py-1 text-fiducial-deep">{slide.screen}/{total}</span>
        </div>
      </div>
      <main className="relative z-10 grid h-full grid-rows-[auto_1fr] gap-5 px-12 pb-12 pt-32">
        <header>
          {slide.eyebrow && <div className="kicker mb-2">{slide.eyebrow}</div>}
          <h1 className="text-balance max-w-[1180px] text-[clamp(2rem,4.2vw,4.85rem)] font-black leading-[0.95] tracking-[-0.06em] text-fiducial-anthracite">
            {slide.title}
          </h1>
          {slide.subtitle && <p className="mt-4 max-w-[980px] text-xl font-medium leading-relaxed text-fiducial-anthracite/72">{slide.subtitle}</p>}
        </header>
        <div className="slide-safe min-h-0">{children}</div>
      </main>
      <div className="absolute bottom-5 left-8 z-20 text-xs font-semibold text-fiducial-anthracite/35">Lenny Lanfrey - MBA Management International Business - 2026</div>
      <div className="absolute bottom-5 right-8 z-20 text-xs font-semibold text-fiducial-anthracite/35">Screen {index + 1}</div>
    </motion.section>
  );
}
