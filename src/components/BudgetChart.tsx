import { budgetItems, financialBaseline } from '../data/presentationContent';
import { formatEuro } from '../utils/format';
import TopicIllustration, { TopicVariant } from './TopicIllustration';

const baseline = [
  { offer: 'AR', revenue: financialBaseline.ar, variant: 'ar' },
  { offer: 'E-learning', revenue: financialBaseline.elearning, variant: 'elearning' },
  { offer: 'VR', revenue: financialBaseline.vr, variant: 'vr' }
];

export default function BudgetChart() {
  return (
    <div className="grid h-full grid-cols-[1.08fr_.92fr] gap-5">
      <div className="glass flex min-h-0 flex-col rounded-[1.5rem] p-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <TopicIllustration variant="budget" size="sm" className="mb-3 w-fit" />
            <div className="kicker">Two-level budget</div>
            <h3 className="text-3xl font-black tracking-[-0.055em]">Direct + internal time</h3>
          </div>
          <div className="rounded-2xl bg-fiducial-deep px-4 py-3 text-right text-white">
            <div className="text-xs font-black uppercase tracking-[.14em] text-white/65">Complete budget</div>
            <div className="text-2xl font-black tracking-[-0.05em]">{formatEuro(financialBaseline.completeBudgetMin)} - {formatEuro(financialBaseline.completeBudgetMax)}</div>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-3">
          <div className="deep-card flex flex-col justify-between rounded-[1.4rem] p-4">
            <div>
              <div className="text-xs font-black uppercase tracking-[.16em] text-white/65">Budget direct</div>
              <div className="mt-2 text-4xl font-black tracking-[-0.06em]">{formatEuro(financialBaseline.budgetMin)} - {formatEuro(financialBaseline.budgetMax)}</div>
            </div>
            <div className="mt-4 space-y-2">
              {budgetItems.map((item, i) => (
                <div key={item.name} className="rounded-2xl bg-white/14 p-2.5">
                  <div className="flex items-center gap-2 text-xs font-black leading-tight text-white/78">
                    <TopicIllustration variant={(i === 0 ? 'portfolio' : i === 1 ? 'training' : i === 2 ? 'pilot' : 'kpi') as TopicVariant} size="xs" tone="deep" />
                    {item.name}
                  </div>
                  <div className="mt-1 text-lg font-black">{formatEuro(item.min)} – {formatEuro(item.max)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-[1.4rem] bg-white/78 p-4 shadow-sm">
              <div className="flex items-center gap-2"><TopicIllustration variant="timing" size="xs" /><span className="text-xs font-black uppercase tracking-[.16em] text-fiducial-deep">Temps interne</span></div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <Metric label="Heures" value={`${financialBaseline.internalHours}h`} />
                <Metric label="SMIC brut" value={`${financialBaseline.smicGrossHourly.toString().replace('.', ',')} €`} />
                <Metric label="Arrondi" value={formatEuro(financialBaseline.internalCost)} />
              </div>
              <div className="mt-3 rounded-2xl bg-fiducial-mint/75 p-3 text-sm font-black text-fiducial-deep">89 × 12,31 € = 1 095,59 € → {formatEuro(financialBaseline.internalCost)}</div>
            </div>

            <div className="rounded-[1.4rem] bg-white/78 p-4 shadow-sm">
              <div className="kicker">2025 signed revenue baseline</div>
              <div className="mt-1 text-3xl font-black tracking-[-0.06em] text-fiducial-deep">{formatEuro(financialBaseline.total)}</div>
              <div className="mt-3 space-y-2">
                {baseline.map((b) => (
                  <div key={b.offer} className="flex items-center justify-between rounded-2xl bg-fiducial-offwhite px-3 py-2 text-xs font-black">
                    <span className="flex items-center gap-2"><TopicIllustration variant={b.variant as TopicVariant} size="xs" />{b.offer}</span>
                    <span>{formatEuro(b.revenue)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 rounded-2xl bg-fiducial-mint/70 p-3 text-xs font-semibold leading-relaxed text-fiducial-anthracite/72">Internal time is valued at French gross hourly SMIC. This is a conservative valuation, not a fully loaded employer cost.</p>
      </div>

      <div className="deep-card flex flex-col justify-center rounded-[1.5rem] p-6">
        <TopicIllustration variant="budget" size="lg" tone="deep" className="mb-5 max-w-sm" />
        <div className="text-xs font-black uppercase tracking-[.18em] text-white/62">Financial defensibility</div>
        <div className="mt-3 text-4xl font-black leading-tight tracking-[-0.06em]">The plan remains proportionate, even after internal time is included.</div>
        <div className="mt-6 rounded-2xl bg-white/14 p-4 text-sm font-semibold leading-relaxed text-white/76">The recommendation is not a heavy product investment; it is a controlled commercial structuring effort for offers that already exist.</div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-fiducial-offwhite p-2"><div className="text-[.65rem] font-black uppercase tracking-[.12em] text-fiducial-anthracite/45">{label}</div><div className="mt-1 text-lg font-black text-fiducial-deep">{value}</div></div>;
}
