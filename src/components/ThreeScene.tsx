import TopicIllustration, { TopicVariant } from './TopicIllustration';

type Variant = 'opening' | 'elearning' | 'ar' | 'vr' | 'dashboard' | 'tunnel' | 'timeline' | 'generic';

type Props = {
  variant?: Variant;
  compact?: boolean;
};

const panels: Record<Variant, {
  label: string;
  title: string;
  steps: string[];
  footer: string;
  illustration: TopicVariant;
}> = {
  opening: {
    label: 'Strategic focus',
    title: 'Innovation portfolio → commercial system',
    steps: ['Diagnose', 'Segment', 'Enable', 'Pilot', 'Measure'],
    footer: 'The visual hierarchy supports the oral argument.',
    illustration: 'opening'
  },
  elearning: {
    label: 'E-learning logic',
    title: 'Custom project → reusable training asset',
    steps: ['Client process', 'Tailored content', 'SCORM delivery', 'Reuse'],
    footer: 'Useful for large accounts and multi-site clients.',
    illustration: 'elearning'
  },
  ar: {
    label: 'AR logic',
    title: 'Familiar safety need → stronger engagement',
    steps: ['Fire safety', 'Demonstration', 'Operational realism', 'Upsell'],
    footer: 'Short-term lever because the need is already understood.',
    illustration: 'ar'
  },
  vr: {
    label: 'VR logic',
    title: 'Immersion only matters if it proves prevention value',
    steps: ['Road risk', 'Target fleets', 'Realistic scenario', 'Proof'],
    footer: 'Position as professional risk prevention, not a gadget.',
    illustration: 'vr'
  },
  dashboard: {
    label: 'Monitoring logic',
    title: 'Opportunities become manageable when tracked',
    steps: ['Presented', 'Demo', 'Quote', 'Signed', 'Refusal'],
    footer: 'Recommended KPIs, not actual historical results.',
    illustration: 'kpi'
  },
  tunnel: {
    label: 'Strategic bridge',
    title: 'From availability to scalability',
    steps: ['Value proposition', 'Sales appropriation', 'Client understanding', 'Adoption', 'Performance'],
    footer: 'This is the core transformation of the mission.',
    illustration: 'strategy'
  },
  timeline: {
    label: '6-month execution',
    title: 'Clarify, train, pilot, then scale',
    steps: ['M1 Clarify', 'M2 Train', 'M3 Launch', 'M4 Demo', 'M5 Review', 'M6 Scale'],
    footer: 'A staged plan reduces commercial and adoption risk.',
    illustration: 'roadmap'
  },
  generic: {
    label: 'Decision view',
    title: 'Evidence → recommendation → control',
    steps: ['Evidence', 'Choice', 'Action', 'KPI'],
    footer: 'A sober visual support for the oral narrative.',
    illustration: 'summary'
  }
};

export default function ThreeScene({ variant = 'generic', compact = false }: Props) {
  const panel = panels[variant];
  const dense = variant === 'opening' || variant === 'tunnel';
  return (
    <div className="strategic-visual glass flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-[1.5rem] p-4">
      <div>
        <TopicIllustration variant={panel.illustration} size={dense ? 'sm' : 'md'} mode={dense ? 'icon' : 'auto'} className="mb-3 w-fit max-w-[280px]" />
        <div className="kicker">{panel.label}</div>
        <h3 className={`${dense ? 'mt-2 text-[clamp(1.25rem,1.7vw,2rem)]' : 'mt-3 text-[clamp(1.45rem,2.1vw,2.5rem)]'} max-w-xl font-black leading-tight tracking-[-0.05em] text-fiducial-anthracite`}>
          {panel.title}
        </h3>
      </div>

      <div className={compact ? 'mt-5 grid grid-cols-3 gap-3' : dense ? 'mt-4 grid grid-cols-2 gap-2' : 'mt-6 space-y-2.5'}>
        {panel.steps.map((step, index) => (
          <div key={step} className={`${dense ? 'p-2' : 'p-3'} flex items-center gap-2 rounded-2xl border border-fiducial-deep/10 bg-white/72 shadow-sm`}>
            <span className={`${dense ? 'h-7 w-7' : 'h-8 w-8'} flex shrink-0 items-center justify-center rounded-xl bg-fiducial-deep text-xs font-black text-white`}>
              {index + 1}
            </span>
            <span className={`${dense ? 'text-xs' : 'text-sm'} font-black leading-tight text-fiducial-anthracite`}>{step}</span>
          </div>
        ))}
      </div>

      {!dense && (
        <div className="mt-4 rounded-2xl bg-fiducial-mint/75 p-3 text-sm font-semibold leading-relaxed text-fiducial-anthracite/72">
          {panel.footer}
        </div>
      )}
    </div>
  );
}
