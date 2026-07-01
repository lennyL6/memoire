import { motion } from 'framer-motion';
import { segmentation } from '../data/presentationContent';
import TopicIllustration, { TopicVariant } from './TopicIllustration';

const offerVariant = (offer: string): TopicVariant => {
  if (offer === 'E-learning') return 'elearning';
  if (offer === 'AR') return 'ar';
  return 'vr';
};

export default function SegmentationCards() {
  return (
    <div className="grid h-full grid-cols-3 gap-5">
      {segmentation.map((item, i) => (
        <motion.div key={item.offer} className="glass rounded-[1.6rem] p-6" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*.07 }}>
          <div className="flex items-center justify-between">
            <h3 className="text-4xl font-black tracking-[-0.06em] text-fiducial-deep">{item.offer}</h3>
            <TopicIllustration variant={offerVariant(item.offer)} size="sm" />
          </div>
          <div className="mt-7 space-y-3">
            {item.targets.map((target) => <div key={target} className="rounded-2xl bg-white/70 px-4 py-3 text-lg font-bold text-fiducial-anthracite shadow-sm">{target}</div>)}
          </div>
          <div className="mt-6 rounded-2xl bg-fiducial-deep p-4 text-sm font-bold leading-relaxed text-white">
            <TopicIllustration variant="segmentation" size="xs" tone="deep" className="mb-3 w-fit" />
            {item.logic}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
