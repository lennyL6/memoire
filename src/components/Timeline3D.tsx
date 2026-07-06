import { motion } from 'framer-motion';
import { timeline } from '../data/presentationContent';
import TopicIllustration, { TopicVariant } from './TopicIllustration';

const monthVariants: TopicVariant[] = ['portfolio', 'training', 'pilot', 'demo', 'kpi', 'revenue'];

export default function Timeline3D() {
  return (
    <div className="timeline-showcase glass relative flex h-full flex-col overflow-hidden rounded-[1.5rem] p-4">
      <div className="absolute inset-x-8 top-[80px] h-px bg-gradient-to-r from-transparent via-fiducial-accent/70 to-transparent" />
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border-[34px] border-fiducial-mint/70" />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <TopicIllustration variant="roadmap" size="sm" mode="image" className="shrink-0" />
          <div className="min-w-0">
            <div className="kicker">6-week execution</div>
            <h3 className="mt-1 max-w-xl text-2xl font-black leading-tight tracking-[-0.055em] text-fiducial-anthracite">
              Clarify, train, pilot, then scale
            </h3>
          </div>
        </div>
        <div className="rounded-2xl bg-fiducial-mint/85 px-3 py-2 text-right text-xs font-black leading-tight text-fiducial-deep">
          Pilot before scaling<br />
          <span className="text-fiducial-anthracite/60">40 clients first</span>
        </div>
      </div>

      <div className="relative z-10 mt-3 grid grid-cols-3 grid-rows-[150px_150px] gap-3">
        {timeline.map((step, i) => (
          <motion.div
            key={step.week}
            className="month-card group relative h-[150px] overflow-hidden rounded-2xl border border-fiducial-deep/10 bg-white/78 p-3 shadow-sm transition hover:-translate-y-1 hover:bg-white/95 hover:shadow-glass"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i*.05 }}
          >
            <div className="absolute right-2 top-2 h-14 w-14 rounded-full bg-fiducial-mint/70 transition group-hover:scale-110" />
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-fiducial-deep px-3 py-1 text-xs font-black text-white shadow-sm">{step.week}</div>
              <TopicIllustration variant={monthVariants[i] ?? 'roadmap'} size="xs" />
            </div>
            <div className="mt-2 text-[.7rem] font-black uppercase tracking-[.12em] text-fiducial-deep">{step.title}</div>
            <ul className="mt-2 space-y-1 text-xs font-bold leading-[1.15] text-fiducial-anthracite/74">
              {step.actions.map((action) => <li key={action} className="flex gap-1.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fiducial-accent" />{action}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
