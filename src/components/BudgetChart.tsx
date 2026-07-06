import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { budgetItems, financialBaseline } from '../data/presentationContent';
import { formatEuro } from '../utils/format';
import TopicIllustration from './TopicIllustration';

const chartData = budgetItems.map((item) => ({ name: item.name.replace('Commercial ', '').replace('Targeted ', ''), Cost: item.directCost }));

export default function BudgetChart() {
  return (
    <div className="grid h-full grid-cols-[1.12fr_.88fr] gap-5">
      <div className="glass rounded-[1.5rem] p-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <TopicIllustration variant="budget" size="sm" className="mb-3 w-fit" />
            <div className="kicker">Direct action costs</div>
            <h3 className="text-3xl font-black tracking-[-0.05em]">{formatEuro(financialBaseline.directCostTotal)}</h3>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="78%">
          <BarChart data={chartData} margin={{ top: 16, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(47,58,58,.12)" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
            <YAxis tickFormatter={(v) => `€${v/1000}k`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => formatEuro(Number(v))} />
            <Bar dataKey="Cost" fill="#007A3D" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="glass rounded-[1.5rem] p-5">
        <div className="kicker">Total action budget</div>
        <div className="mt-2 text-5xl font-black tracking-[-0.06em] text-fiducial-deep">{formatEuro(financialBaseline.budgetTotal)}</div>
        <p className="mt-3 rounded-2xl bg-fiducial-deep p-4 text-sm font-semibold leading-relaxed text-white">This budget includes direct costs and internal time valuation.</p>
        <div className="mt-4 grid gap-3">
          <div className="rounded-2xl bg-white/75 p-4">
            <div className="flex items-center justify-between text-sm font-black">
              <span>Subtotal direct costs</span>
              <span>{formatEuro(financialBaseline.directCostTotal)}</span>
            </div>
          </div>
          <div className="rounded-2xl bg-white/75 p-4">
            <div className="flex items-center justify-between gap-3 text-sm font-black">
              <span>Internal time cost</span>
              <span>{formatEuro(financialBaseline.internalTimeCost)}</span>
            </div>
            <div className="mt-2 text-xs font-bold text-fiducial-anthracite/55">
              {financialBaseline.internalHours} hours x €{financialBaseline.internalHourlyRate.toFixed(2)} gross/hour
            </div>
          </div>
        </div>
        <div className="mt-3 rounded-2xl bg-fiducial-mint/70 p-4">
          <div className="kicker">2025 signed revenue baseline</div>
          <div className="mt-1 flex items-center justify-between gap-3">
            <div className="text-2xl font-black text-fiducial-deep">{formatEuro(financialBaseline.total)}</div>
            <div className="text-right text-xs font-black uppercase tracking-[.12em] text-fiducial-anthracite/55">AR + e-learning + VR</div>
          </div>
        </div>
      </div>
    </div>
  );
}
