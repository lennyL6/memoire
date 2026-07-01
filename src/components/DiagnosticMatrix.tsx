import { motion } from 'framer-motion';
import { offerMaturity } from '../data/presentationContent';
import TopicIllustration, { TopicVariant } from './TopicIllustration';

const offerVariant = (offer: string): TopicVariant => {
  if (offer.includes('e-learning')) return 'elearning';
  if (offer.includes('Augmented')) return 'ar';
  return 'vr';
};

export default function DiagnosticMatrix() {
  return (
    <div className="grid h-full grid-cols-3 gap-5">
      {offerMaturity.map((offer, i) => (
        <motion.div
          key={offer.offer}
          className="glass group flex flex-col rounded-[1.5rem] p-6 transition hover:-translate-y-1 hover:bg-white/90"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <TopicIllustration variant={offerVariant(offer.offer)} size="lg" className="mb-5" />
          <div className="text-xs font-black uppercase tracking-[.18em] text-fiducial-deep">{offer.maturity}</div>
          <h3 className="mt-3 text-3xl font-black tracking-[-0.05em] text-fiducial-anthracite">{offer.offer}</h3>
          <p className="mt-4 text-sm leading-relaxed text-fiducial-anthracite/68">{offer.target}</p>
          <div className="mt-auto">
            <div className="mb-2 flex items-center justify-between text-xs font-bold text-fiducial-anthracite/55">
              <span>Commercial maturity</span><span>{offer.score}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-fiducial-light">
              <motion.div className="h-full rounded-full bg-fiducial-deep" initial={{ width: 0 }} animate={{ width: `${offer.score}%` }} transition={{ delay: .25 + i*.1, duration: .8 }} />
            </div>
            <div className="mt-4 rounded-2xl bg-fiducial-mint/65 p-4 text-sm font-semibold leading-relaxed text-fiducial-anthracite/75">
              {offer.issue}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
