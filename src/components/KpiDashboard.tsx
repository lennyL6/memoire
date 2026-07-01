import { motion } from 'framer-motion';
import { kpis } from '../data/presentationContent';
import { Gauge, TrendingUp } from 'lucide-react';
import TopicIllustration, { TopicVariant } from './TopicIllustration';

const kpiVariant = (kpi: string): TopicVariant => {
  if (kpi.includes('presented')) return 'portfolio';
  if (kpi.includes('Demonstrations')) return 'demo';
  if (kpi.includes('Quotes')) return 'quote';
  if (kpi.includes('Quote value')) return 'budget';
  if (kpi.includes('Conversion')) return 'conversion';
  if (kpi.includes('Signed revenue')) return 'revenue';
  if (kpi.includes('Gross margin')) return 'margin';
  if (kpi.includes('Average')) return 'roi';
  if (kpi.includes('satisfaction')) return 'satisfaction';
  return 'feedback';
};

export default function KpiDashboard() {
  return (
    <div className="grid h-full grid-cols-[.72fr_1.28fr] gap-4">
      <div className="deep-card rounded-[1.5rem] p-5">
        <TopicIllustration variant="kpi" size="lg" tone="deep" className="mb-4" />
        <Gauge size={34} />
        <h3 className="mt-4 text-3xl font-black leading-tight tracking-[-0.06em]">Monthly monitoring routine</h3>
        <p className="mt-3 text-sm font-medium leading-relaxed text-white/78">All indicators are recommended management KPIs. They must not be presented as existing results.</p>
        <div className="mt-4 rounded-2xl bg-white/15 p-3 text-xs font-bold leading-snug">Objective: move from isolated opportunities to a managed commercial priority.</div>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {kpis.map((item, i) => (
          <motion.div key={item.kpi} className="glass flex items-center justify-between rounded-2xl p-3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*.035 }}>
            <div>
              <div className="text-sm font-black text-fiducial-anthracite">{item.kpi}</div>
              <div className="text-xs font-semibold text-fiducial-anthracite/50">{item.type}</div>
            </div>
            <TopicIllustration variant={kpiVariant(item.kpi)} size="xs" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
