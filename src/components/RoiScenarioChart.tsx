import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { financialBaseline, roiScenarios } from '../data/presentationContent';
import { formatEuro } from '../utils/format';
import TopicIllustration from './TopicIllustration';

const data = roiScenarios.map((scenario) => ({
  name: `${scenario.name} ${scenario.growth}`,
  'Additional revenue': scenario.additionalRevenue,
  'Additional margin': scenario.additionalMargin
}));

export default function RoiScenarioChart() {
  return (
    <div className="grid h-full grid-cols-[1fr_.9fr] gap-4">
      <div className="glass flex min-h-0 flex-col rounded-[1.5rem] p-4">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <div className="kicker">Simulated ROI</div>
            <h3 className="text-2xl font-black tracking-[-0.05em]">35% gross margin assumption</h3>
          </div>
          <TopicIllustration variant="roi" size="sm" />
        </div>
        <ResponsiveContainer width="100%" height="58%">
          <BarChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 6 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(47,58,58,.12)" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(value) => `€${Number(value) / 1000}k`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => formatEuro(Number(value))} />
            <Bar dataKey="Additional revenue" fill="#DFF3EA" radius={[10, 10, 0, 0]} />
            <Bar dataKey="Additional margin" fill="#007A3D" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="grid flex-1 grid-cols-3 gap-2">
          {roiScenarios.map((scenario) => (
            <div key={scenario.name} className="rounded-2xl bg-white/78 p-3">
              <div className="flex items-center justify-between gap-2 text-xs font-black text-fiducial-anthracite/65"><span>{scenario.name}</span><span>{scenario.growth}</span></div>
              <div className="mt-2 text-xl font-black text-fiducial-deep">{formatEuro(scenario.additionalMargin)}</div>
              <div className="mt-1 text-[.68rem] font-bold text-fiducial-anthracite/50">margin = revenue × {financialBaseline.grossMarginAssumption}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass flex min-h-0 flex-col rounded-[1.5rem] p-4">
        <div className="kicker">ROI with complete budget</div>
        <div className="mt-2 text-sm font-bold text-fiducial-anthracite/60">Formula: (Additional margin – Total budget) / Total budget</div>
        <div className="mt-4 space-y-2.5">
          {roiScenarios.map((scenario) => (
            <div key={scenario.name} className={scenario.name === 'Realistic' ? 'rounded-2xl bg-fiducial-deep p-3 text-white' : 'rounded-2xl bg-white/78 p-3 text-fiducial-anthracite'}>
              <div className="flex items-center justify-between gap-3 text-sm font-black">
                <span className="flex items-center gap-2"><TopicIllustration variant={scenario.name === 'Conservative' ? 'risk' : scenario.name === 'Realistic' ? 'conversion' : 'revenue'} size="xs" tone={scenario.name === 'Realistic' ? 'deep' : 'light'} />{scenario.name}</span>
                <span>{scenario.growth}</span>
              </div>
              <div className="mt-1 text-2xl font-black tracking-[-0.05em]">{formatPercent(scenario.roiMin)} to {formatPercent(scenario.roiMax)}</div>
              <div className={scenario.name === 'Realistic' ? 'mt-1 text-xs font-semibold text-white/66' : 'mt-1 text-xs font-semibold text-fiducial-anthracite/55'}>Budget: {formatEuro(financialBaseline.completeBudgetMin)}–{formatEuro(financialBaseline.completeBudgetMax)}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-2xl bg-fiducial-mint/80 p-3 text-sm font-black leading-snug text-fiducial-deep">The realistic scenario makes the action plan financially defendable, even when internal time is included.</p>
        <p className="mt-2 rounded-2xl bg-white/70 p-3 text-xs font-semibold leading-relaxed text-fiducial-anthracite/64">The 35% gross margin is a simulation assumption and should be replaced by actual margin rates by offer for definitive financial monitoring.</p>
      </div>
    </div>
  );
}

function formatPercent(value: number) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}
