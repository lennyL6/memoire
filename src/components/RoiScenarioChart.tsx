import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { roiScenarios } from '../data/presentationContent';
import { formatEuro } from '../utils/format';
import TopicIllustration from './TopicIllustration';

const data = roiScenarios.map((s) => ({
  name: `${s.name} ${s.growth}`,
  'Additional revenue': s.additionalRevenue,
  'Break-even min %': s.breakEvenMin,
  'Break-even max %': s.breakEvenMax
}));

export default function RoiScenarioChart() {
  return (
    <div className="grid h-full grid-cols-[1fr_.82fr] gap-4">
      <div className="glass rounded-[1.5rem] p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="kicker">Additional signed revenue scenarios</div>
          <TopicIllustration variant="roi" size="sm" />
        </div>
        <ResponsiveContainer width="100%" height="82%">
          <BarChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 6 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(47,58,58,.12)" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => `€${v/1000}k`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => formatEuro(Number(v))} />
            <Bar dataKey="Additional revenue" fill="#007A3D" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="glass rounded-[1.5rem] p-4">
        <div className="kicker">Break-even gross margin required</div>
        <div className="mt-3 space-y-2.5">
          {roiScenarios.map((s) => (
            <div key={s.name} className="rounded-2xl bg-white/75 p-3">
              <div className="flex items-center justify-between gap-3 text-sm font-black text-fiducial-anthracite">
                <span className="flex items-center gap-2"><TopicIllustration variant={s.name === 'Conservative' ? 'risk' : s.name === 'Realistic' ? 'conversion' : 'revenue'} size="xs" />{s.name}</span>
                <span>{s.growth}</span>
              </div>
              <div className="mt-1 text-xl font-black tracking-[-0.04em] text-fiducial-deep">{s.breakEvenMin}% - {s.breakEvenMax}%</div>
              <div className="mt-1 text-xs font-semibold text-fiducial-anthracite/55">Required margin to cover €4,800-€8,300</div>
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-2xl bg-fiducial-deep p-3 text-xs font-semibold leading-relaxed text-white">ROI is calculated on additional gross margin. Without exact margin data, these scenarios remain a decision framework.</p>
      </div>
    </div>
  );
}
