import { motion } from 'framer-motion';
import TopicIllustration, { TopicVariant } from './TopicIllustration';

const risks = [
  { risk: 'Weak sales adoption', impact: 'High', mitigation: 'Training, scripts, demos, monthly follow-up', variant: 'training' },
  { risk: 'Price resistance', impact: 'High', mitigation: 'Value-based selling and ROI logic', variant: 'budget' },
  { risk: 'VR gadget perception', impact: 'Medium', mitigation: 'Reposition on professional road risk', variant: 'vr' },
  { risk: 'No KPI follow-up', impact: 'High', mitigation: 'Monthly dashboard and sales review', variant: 'kpi' },
  { risk: 'Lack of internal time', impact: 'Medium', mitigation: 'Limited pilot scope and clear responsibilities', variant: 'timing' },
  { risk: 'Weak client response', impact: 'Medium', mitigation: 'Track refusal reasons and adjust targeting', variant: 'feedback' }
];

const impactClass: Record<string, string> = {
  High: 'bg-fiducial-deep text-white',
  Medium: 'bg-fiducial-mint text-fiducial-deep'
};

export default function RiskMatrix() {
  return (
    <div className="grid h-full grid-cols-3 gap-3">
      {risks.map((r, i) => (
        <motion.div key={r.risk} className="glass rounded-2xl p-4" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*.04 }}>
          <TopicIllustration variant={r.variant as TopicVariant} size="sm" className="mb-3" />
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-black tracking-[-0.04em] text-fiducial-anthracite">{r.risk}</h3>
            <span className={`rounded-full px-3 py-1 text-xs font-black ${impactClass[r.impact]}`}>{r.impact}</span>
          </div>
          <p className="mt-5 rounded-2xl bg-white/70 p-3 text-sm font-semibold leading-relaxed text-fiducial-anthracite/70">{r.mitigation}</p>
        </motion.div>
      ))}
    </div>
  );
}
