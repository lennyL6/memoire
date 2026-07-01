import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { budgetItems, financialBaseline } from '../data/presentationContent';
import { formatEuro } from '../utils/format';
import TopicIllustration, { TopicVariant } from './TopicIllustration';

const chartData = budgetItems.map((item) => ({ name: item.name.replace('Commercial ', '').replace('Targeted ', ''), Min: item.min, Max: item.max }));
const baseline = [
  { offer: 'AR', revenue: financialBaseline.ar, variant: 'ar' },
  { offer: 'E-learning', revenue: financialBaseline.elearning, variant: 'elearning' },
  { offer: 'VR', revenue: financialBaseline.vr, variant: 'vr' }
];

export default function BudgetChart() {
  return (
    <div className="grid h-full grid-cols-[1.15fr_.85fr] gap-5">
      <div className="glass rounded-[1.5rem] p-5">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <TopicIllustration variant="budget" size="sm" className="mb-3 w-fit" />
            <div className="kicker">Direct budget</div>
            <h3 className="text-2xl font-black tracking-[-0.05em]">€4,800-€8,300</h3>
          </div>
          <div className="rounded-full bg-fiducial-mint px-4 py-2 text-sm font-black text-fiducial-deep">1.2%-2.1% of baseline</div>
        </div>
        <ResponsiveContainer width="100%" height="78%">
          <BarChart data={chartData} margin={{ top: 16, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(47,58,58,.12)" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
            <YAxis tickFormatter={(v) => `€${v/1000}k`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => formatEuro(Number(v))} />
            <Bar dataKey="Min" fill="#DFF3EA" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Max" fill="#007A3D" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="glass rounded-[1.5rem] p-5">
        <div className="kicker">2025 signed revenue baseline</div>
        <div className="mt-2 text-4xl font-black tracking-[-0.06em] text-fiducial-deep">{formatEuro(financialBaseline.total)}</div>
        <div className="mt-5 space-y-3">
          {baseline.map((b) => (
            <div key={b.offer} className="rounded-2xl bg-white/75 p-4">
              <div className="flex items-center justify-between gap-3 text-sm font-black">
                <span className="flex items-center gap-2"><TopicIllustration variant={b.variant as TopicVariant} size="xs" />{b.offer}</span>
                <span>{formatEuro(b.revenue)}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-fiducial-light"><div className="h-full rounded-full bg-fiducial-deep" style={{ width: `${(b.revenue / financialBaseline.ar) * 100}%` }} /></div>
            </div>
          ))}
        </div>
        <p className="mt-5 rounded-2xl bg-fiducial-mint/70 p-4 text-sm font-semibold leading-relaxed">The action plan is a commercial structuring effort, not a heavy innovation investment.</p>
      </div>
    </div>
  );
}
