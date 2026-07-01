import { motion } from 'framer-motion';
import { FileText, GraduationCap, Megaphone, Gauge } from 'lucide-react';
import TopicIllustration, { TopicVariant } from './TopicIllustration';

const actions = [
  { title: 'Commercial offer portfolio', icon: FileText, outcome: 'Clearer offer packaging', variant: 'portfolio' },
  { title: 'Sales training', icon: GraduationCap, outcome: 'Sales force appropriation', variant: 'training' },
  { title: '40-client pilot campaign', icon: Megaphone, outcome: 'Market feedback before scaling', variant: 'pilot' },
  { title: 'KPI dashboard', icon: Gauge, outcome: 'Monthly management routine', variant: 'kpi' }
];

export default function ActionPlan() {
  return (
    <div className="grid h-full grid-cols-4 gap-4">
      {actions.map((action, i) => {
        const Icon = action.icon;
        return (
          <motion.div key={action.title} className="deep-card rounded-[1.5rem] p-6" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*.08 }}>
            <div className="flex h-full flex-col">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/18"><Icon size={30} /></div>
                <TopicIllustration variant={action.variant as TopicVariant} size="sm" tone="deep" />
              </div>
              <div className="text-5xl font-black opacity-40">0{i + 1}</div>
              <h3 className="mt-3 text-2xl font-black tracking-[-0.05em]">{action.title}</h3>
              <p className="mt-auto rounded-2xl bg-white/14 p-3 text-sm font-semibold leading-relaxed">{action.outcome}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
