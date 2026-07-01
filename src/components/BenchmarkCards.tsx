import { motion } from 'framer-motion';
import { benchmarkActors } from '../data/presentationContent';
import { ArrowRight } from 'lucide-react';
import TopicIllustration, { TopicVariant } from './TopicIllustration';

const variants: TopicVariant[] = ['competitor', 'pedagogy', 'keyAccount', 'sales'];

export default function BenchmarkCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'grid grid-cols-4 gap-4' : 'grid h-full grid-cols-4 gap-4'}>
      {benchmarkActors.map((actor, i) => (
        <motion.article key={actor.actor} className="glass group rounded-[1.4rem] p-5 transition hover:-translate-y-1 hover:bg-white/90" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .06 }}>
          <div className="flex h-full flex-col">
            <TopicIllustration variant={variants[i] ?? 'benchmark'} size={compact ? 'sm' : 'md'} className="mb-4" />
            <div className="rounded-2xl bg-fiducial-deep/10 p-3">
              <div className="text-xs font-black uppercase tracking-[.14em] text-fiducial-deep">{actor.perspective}</div>
              <h3 className="mt-2 text-xl font-black tracking-[-0.04em] text-fiducial-anthracite">{actor.actor}</h3>
            </div>
            <div className="mt-4 text-sm font-bold leading-snug text-fiducial-anthracite">{actor.insight}</div>
            <div className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-fiducial-anthracite/65">
              <ArrowRight className="mt-1 shrink-0 text-fiducial-accent" size={16} />
              <span>{actor.application}</span>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
