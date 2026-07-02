import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, ArrowRight, BadgeEuro, BookOpenCheck, BrainCircuit, CalendarDays, CheckCircle2, ClipboardList, Gauge, LineChart, Mail, MessageSquareText, MonitorUp, MousePointer2, NotebookPen, PhoneCall, Presentation, Send, ShieldCheck, Target, UsersRound } from 'lucide-react';
import SlideShell from './components/SlideShell';
import Navigation from './components/Navigation';
import PresenterNotes from './components/PresenterNotes';
import ProgressBar from './components/ProgressBar';
import Timer from './components/Timer';
import BlackScreen from './components/BlackScreen';
import ThreeScene from './components/ThreeScene';
import DiagnosticMatrix from './components/DiagnosticMatrix';
import BenchmarkCards from './components/BenchmarkCards';
import SegmentationCards from './components/SegmentationCards';
import ActionPlan from './components/ActionPlan';
import BudgetChart from './components/BudgetChart';
import RoiScenarioChart from './components/RoiScenarioChart';
import Timeline3D from './components/Timeline3D';
import KpiDashboard from './components/KpiDashboard';
import RiskMatrix from './components/RiskMatrix';
import FinalQRCode from './components/FinalQRCode';
import TopicIllustration, { TopicVariant } from './components/TopicIllustration';
import { annexes, benchmarkActors, brand, budgetItems, coherenceChecklist, financialBaseline, getPresenterScriptEN, kpis, roiScenarios, segmentation, slides, timingPlan, Slide } from './data/presentationContent';
import { formatEuro } from './utils/format';

const PRESENTER_SCRIPT_STORAGE_KEY = 'fpsg-presenter-script-overrides';

type PresenterScriptOverrides = Record<string, string>;

const loadPresenterScriptOverrides = (): PresenterScriptOverrides => {
  try {
    const stored = localStorage.getItem(PRESENTER_SCRIPT_STORAGE_KEY);
    if (!stored) return {};
    const parsed = JSON.parse(stored);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed as PresenterScriptOverrides : {};
  } catch {
    return {};
  }
};

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
};

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const printMode = params.get('print') === '1';
  const presenterMode = params.get('presenter') === '1';
  const initialSlide = Number(params.get('slide') ?? 0);
  const initialAnnex = params.get('annex') === '1';

  const [index, setIndex] = useState(Number.isFinite(initialSlide) ? Math.max(0, Math.min(initialSlide, slides.length - 1)) : 0);
  const [annexIndex, setAnnexIndex] = useState(0);
  const [inAnnex, setInAnnex] = useState(initialAnnex);
  const [showNotes, setShowNotes] = useState(params.get('notes') === '1');
  const [showTimer, setShowTimer] = useState(false);
  const [black, setBlack] = useState(false);
  const processedCommandId = useRef<string | null>(null);

  const activeDeck = inAnnex ? annexes : slides;
  const activeIndex = inAnnex ? annexIndex : index;
  const activeSlide = activeDeck[activeIndex];

  const goNext = () => {
    if (inAnnex) setAnnexIndex((i) => Math.min(annexes.length - 1, i + 1));
    else setIndex((i) => Math.min(slides.length - 1, i + 1));
  };
  const goPrev = () => {
    if (inAnnex) setAnnexIndex((i) => Math.max(0, i - 1));
    else setIndex((i) => Math.max(0, i - 1));
  };
  const goRoadmap = () => { setInAnnex(false); setIndex(1); };
  const toggleAnnex = () => { setInAnnex((v) => !v); if (!inAnnex) setAnnexIndex(0); };
  const fullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  };
  const openPresenterView = () => {
    window.open(`${window.location.origin}${window.location.pathname}?presenter=1`, 'fiducial-presenter-view', 'width=1280,height=900');
  };
  const sendPresenterCommand = (command: 'next' | 'prev' | 'roadmap' | 'annex') => {
    const payload = { type: 'command', command, id: `${Date.now()}-${Math.random().toString(16).slice(2)}` };
    const channel = new BroadcastChannel('fpsg-defense');
    channel.postMessage(payload);
    channel.close();
  };

  useEffect(() => {
    if (presenterMode) return;
    const payload = { type: 'state', index, annexIndex, inAnnex, updatedAt: Date.now() };
    localStorage.setItem('fpsg-defense-state', JSON.stringify(payload));
    const channel = new BroadcastChannel('fpsg-defense');
    channel.postMessage(payload);
    channel.close();
  }, [index, annexIndex, inAnnex, presenterMode]);

  useEffect(() => {
    const applyState = (payload: { index?: number; annexIndex?: number; inAnnex?: boolean }) => {
      if (typeof payload.index === 'number') setIndex(Math.max(0, Math.min(slides.length - 1, payload.index)));
      if (typeof payload.annexIndex === 'number') setAnnexIndex(Math.max(0, Math.min(annexes.length - 1, payload.annexIndex)));
      if (typeof payload.inAnnex === 'boolean') setInAnnex(payload.inAnnex);
    };
    if (presenterMode) {
      const stored = localStorage.getItem('fpsg-defense-state');
      if (stored) applyState(JSON.parse(stored));
    }
    const handlePayload = (payload: { type?: string; command?: string; id?: string; index?: number; annexIndex?: number; inAnnex?: boolean }) => {
      if (presenterMode && payload.type === 'state') applyState(payload);
      if (!presenterMode && payload.type === 'command') {
        if (payload.id && processedCommandId.current === payload.id) return;
        processedCommandId.current = payload.id ?? null;
        if (payload.command === 'next') goNext();
        if (payload.command === 'prev') goPrev();
        if (payload.command === 'roadmap') goRoadmap();
        if (payload.command === 'annex') toggleAnnex();
      }
    };
    const channel = new BroadcastChannel('fpsg-defense');
    channel.onmessage = (event) => handlePayload(event.data);
    const onStorage = (event: StorageEvent) => {
      if (!event.newValue) return;
      if (presenterMode && event.key === 'fpsg-defense-state') handlePayload(JSON.parse(event.newValue));
    };
    window.addEventListener('storage', onStorage);
    return () => {
      channel.close();
      window.removeEventListener('storage', onStorage);
    };
  }, [presenterMode, inAnnex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) return;
      if (presenterMode) {
        if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); sendPresenterCommand('next'); }
        if (e.key === 'ArrowLeft') sendPresenterCommand('prev');
        if (e.key.toLowerCase() === 'a') sendPresenterCommand('annex');
        if (e.key.toLowerCase() === 'r') sendPresenterCommand('roadmap');
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key.toLowerCase() === 'f') fullscreen();
      if (e.key.toLowerCase() === 'p') openPresenterView();
      if (e.key.toLowerCase() === 'n') setShowNotes((v) => !v);
      if (e.key.toLowerCase() === 't') setShowTimer((v) => !v);
      if (e.key.toLowerCase() === 'b') setBlack((v) => !v);
      if (e.key.toLowerCase() === 'a') toggleAnnex();
      if (e.key.toLowerCase() === 'r') goRoadmap();
      if (e.key === 'Escape') setBlack(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inAnnex, presenterMode]);

  if (presenterMode) {
    return (
      <PresenterView
        activeSlide={activeSlide}
        activeIndex={activeIndex}
        activeDeck={activeDeck}
        inAnnex={inAnnex}
        sendCommand={sendPresenterCommand}
      />
    );
  }

  if (printMode) {
    const printSlides = [...slides, ...annexes];
    return (
      <div className="min-h-screen bg-white">
        {printSlides.map((slide, i) => (
          <div key={slide.id} className="print-page flex min-h-screen items-center justify-center bg-white p-0">
            <SlideShell slide={slide} total={slides.length} index={Math.min(i, slides.length - 1)} isPrint>
              <SlideContent slide={slide} />
            </SlideShell>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center p-6">
      <AnimatePresence mode="wait">
        <SlideShell key={activeSlide.id} slide={activeSlide} total={activeDeck.length} index={activeIndex}>
          <SlideContent slide={activeSlide} />
        </SlideShell>
      </AnimatePresence>
      <ProgressBar index={activeIndex} total={activeDeck.length} />
      <Navigation
        index={activeIndex}
        total={activeDeck.length}
        inAnnex={inAnnex}
        onPrev={goPrev}
        onNext={goNext}
        onRoadmap={goRoadmap}
        onToggleAnnex={toggleAnnex}
        onToggleNotes={() => setShowNotes((v) => !v)}
        onToggleTimer={() => setShowTimer((v) => !v)}
        onFullscreen={fullscreen}
        onOpenPresenter={openPresenterView}
      />
      <PresenterNotes note={activeSlide.note} visible={showNotes} />
      <Timer visible={showTimer} targetMinutes={36} />
      {black && <BlackScreen />}
    </div>
  );
}

function SlideContent({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case 'opening': return <Opening slide={slide} />;
    case 'roadmap': return <Roadmap slide={slide} />;
    case 'issue': return <Issue slide={slide} />;
    case 'problem': return <Problem slide={slide} />;
    case 'methodology': return <Methodology slide={slide} />;
    case 'benchmarkLogic': return <BenchmarkLogic slide={slide} />;
    case 'offersSnapshot': return <DiagnosticMatrix />;
    case 'elearning': return <ELearning slide={slide} />;
    case 'ar': return <OfferDiagnosis slide={slide} icon="AR" variant="ar" />;
    case 'vr': return <OfferDiagnosis slide={slide} icon="VR" variant="vr" />;
    case 'internalDiagnosis': return <TwoColumn titleLeft="Strengths" titleRight="Weaknesses" left={(slide.data?.strengths as string[]) ?? []} right={(slide.data?.weaknesses as string[]) ?? []} />;
    case 'externalDiagnosis': return <TwoColumn titleLeft="Opportunities" titleRight="Threats" left={(slide.data?.opportunities as string[]) ?? []} right={(slide.data?.threats as string[]) ?? []} />;
    case 'benchmarkSynthesis': return <BenchmarkCards />;
    case 'strategicSynthesis': return <StrategicSynthesis slide={slide} />;
    case 'segmentation': return <SegmentationCards />;
    case 'positioning': return <Positioning slide={slide} />;
    case 'actionOverview': return <ActionPlan />;
    case 'portfolio': return <Recommendation slide={slide} icon={<ClipboardList size={42} />} />;
    case 'training': return <Recommendation slide={slide} icon={<UsersRound size={42} />} formula />;
    case 'pilot': return <Pilot slide={slide} />;
    case 'kpi': return <KpiDashboard />;
    case 'budget': return <BudgetChart />;
    case 'roi': return <RoiScenarioChart />;
    case 'risksFinal': return <Final slide={slide} />;
    case 'annex': return <AnnexContent slide={slide} />;
    default: return null;
  }
}

function Opening({ slide }: { slide: Slide }) {
  const data = slide.data as Record<string, string>;
  return (
    <div className="grid h-full grid-cols-[1.05fr_.95fr] gap-6">
      <div className="opening-card deep-card flex min-h-0 flex-col justify-between rounded-[1.8rem] p-7">
        <div className="min-h-0">
          <div className="rounded-3xl bg-white/14 p-5">
            <div className="text-xs font-black uppercase tracking-[.18em] text-white/60">Defense focus</div>
            <p className="mt-3 max-w-xl text-[clamp(1.25rem,1.8vw,2rem)] font-black leading-tight tracking-[-0.035em]">
              Turning existing innovation into structured, measurable and scalable commercial growth.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {['Diagnosis', 'Action plan', 'ROI logic'].map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-black text-white/82">{item}</div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-white/14 p-4 text-sm font-semibold leading-relaxed text-white/82">
          <span className="font-black text-white">{data.author}</span>
          <span> - {data.programme} - {data.school} - {data.company} - {data.year}</span>
        </div>
      </div>
      <ThreeScene variant="opening" />
    </div>
  );
}

function Roadmap({ slide }: { slide: Slide }) {
  const steps = (slide.data?.steps as string[]) ?? [];
  const variants: TopicVariant[] = ['issue', 'methodology', 'elearning', 'benchmark', 'strategy', 'pilot', 'budget', 'risk'];
  return (
    <div className="grid h-full grid-cols-4 gap-4">
      {steps.map((step, i) => (
        <motion.div key={step} className="glass group rounded-[1.5rem] p-5 transition hover:-translate-y-1 hover:bg-white/90" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*.05 }}>
          <TopicIllustration variant={variants[i] ?? 'roadmap'} size="sm" className="mb-4" />
          <div className="mb-12 flex h-12 w-12 items-center justify-center rounded-2xl bg-fiducial-deep text-lg font-black text-white">{i + 1}</div>
          <h3 className="text-2xl font-black tracking-[-0.05em] text-fiducial-anthracite">{step}</h3>
          <div className="mt-5 h-1.5 w-16 rounded-full bg-fiducial-accent" />
        </motion.div>
      ))}
    </div>
  );
}

function Issue({ slide }: { slide: Slide }) {
  const variants: TopicVariant[] = ['portfolio', 'training', 'positioning', 'kpi'];
  return (
    <div className="grid h-full grid-cols-[1fr_.9fr] gap-6">
      <div className="glass flex min-h-0 flex-col justify-center rounded-[1.8rem] p-6">
        <div className="text-[clamp(2.25rem,3.15vw,3.7rem)] font-black leading-tight tracking-[-0.06em] text-fiducial-deep">{slide.message}</div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {slide.bullets?.map((b, i) => <motion.div key={b} className="flex items-start gap-3 rounded-2xl bg-white/70 p-3 text-base font-bold leading-snug text-fiducial-anthracite" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*.08 }}><TopicIllustration variant={variants[i] ?? 'issue'} size="xs" className="shrink-0" />{b}</motion.div>)}
        </div>
      </div>
      <ThreeScene variant="tunnel" />
    </div>
  );
}

function Problem({ slide }: { slide: Slide }) {
  const dimensions = (slide.data?.dimensions as string[]) ?? [];
  const variants: TopicVariant[] = ['strategy', 'sales', 'kpi'];
  return (
    <div className="grid h-full grid-cols-[1.3fr_.7fr] gap-6">
      <div className="deep-card flex flex-col justify-center rounded-[1.8rem] p-8">
        <p className="text-balance text-[clamp(1.8rem,3.7vw,4.2rem)] font-black leading-[1.05] tracking-[-0.06em]">{slide.message}</p>
      </div>
      <div className="grid gap-4">
        {dimensions.map((d, i) => <motion.div key={d} className="glass flex items-center gap-4 rounded-[1.5rem] p-5" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i*.08 }}><TopicIllustration variant={variants[i] ?? 'problem'} size="sm" /><span className="text-2xl font-black tracking-[-0.04em]">{d}</span></motion.div>)}
      </div>
    </div>
  );
}

function Methodology({ slide }: { slide: Slide }) {
  const variants: TopicVariant[] = ['methodology', 'strength', 'portfolio', 'benchmark', 'strategy', 'summary', 'budget'];
  return (
    <div className="grid h-full grid-cols-7 gap-3">
      {slide.bullets?.map((b, i) => {
        return <motion.div key={b} className="glass flex min-h-0 flex-col rounded-[1.4rem] p-4" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*.05 }}><TopicIllustration variant={variants[i] ?? 'methodology'} size="sm" className="mb-auto w-fit" /><div className="mt-6 break-words text-base font-black leading-tight tracking-[-0.04em]">{b}</div></motion.div>;
      })}
    </div>
  );
}

function BenchmarkLogic({ slide }: { slide: Slide }) {
  const criteria = (slide.data?.criteria as string[]) ?? [];
  return (
    <div className="grid h-full grid-cols-[1.25fr_.75fr] gap-5">
      <BenchmarkCards compact />
      <div className="deep-card rounded-[1.5rem] p-6">
        <div className="text-sm font-black uppercase tracking-[.18em] text-white/70">Benchmark criteria</div>
        <div className="mt-6 space-y-3">
          {criteria.map((c) => <div key={c} className="rounded-2xl bg-white/15 p-4 text-lg font-black">{c}</div>)}
        </div>
      </div>
    </div>
  );
}

function ELearning({ slide }: { slide: Slide }) {
  const examples = (slide.data?.examples as Array<{ label: string; value: number }>) ?? [];
  return (
    <div className="grid h-full grid-cols-[.9fr_1.1fr] gap-5">
      <ThreeScene variant="elearning" />
      <div className="grid grid-rows-[auto_1fr] gap-4">
        <div className="glass rounded-[1.5rem] p-5">
          <TopicIllustration variant="elearning" size="lg" className="mb-4 max-w-sm" />
          <div className="text-3xl font-black tracking-[-0.05em] text-fiducial-deep">{slide.message}</div>
          <div className="mt-4 grid grid-cols-3 gap-3">{slide.bullets?.map((b) => <div key={b} className="rounded-2xl bg-white/70 p-3 text-sm font-bold leading-snug">{b}</div>)}</div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {examples.map((ex) => <div key={ex.label} className="deep-card flex flex-col justify-between rounded-[1.5rem] p-5"><TopicIllustration variant="keyAccount" size="sm" tone="deep" className="mb-4" /><div className="text-sm font-bold text-white/70">{ex.label}</div><div className="text-4xl font-black tracking-[-0.06em]">{formatEuro(ex.value)}</div><div className="text-xs font-semibold text-white/70">excluding tax</div></div>)}
        </div>
      </div>
    </div>
  );
}

function OfferDiagnosis({ slide, variant, icon }: { slide: Slide; variant: 'ar' | 'vr'; icon: string }) {
  const topic = variant === 'ar' ? 'ar' : 'vr';
  return (
    <div className="grid h-full grid-cols-[.9fr_1.1fr] gap-5">
      <ThreeScene variant={variant} />
      <div className="glass rounded-[1.5rem] p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="inline-flex rounded-full bg-fiducial-deep px-4 py-2 text-sm font-black text-white">{icon}</div>
          <TopicIllustration variant={topic} size="md" />
        </div>
        <div className="text-3xl font-black leading-tight tracking-[-0.06em] text-fiducial-deep">{slide.message}</div>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {slide.bullets?.map((b, i) => <div key={b} className="rounded-2xl bg-white/75 p-3 text-sm font-bold leading-snug text-fiducial-anthracite"><TopicIllustration variant={i === 0 ? topic : i === 1 ? 'demo' : i === 2 ? 'client' : i === 3 ? 'positioning' : 'risk'} size="xs" className="mb-2 w-fit" />{b}</div>)}
        </div>
      </div>
    </div>
  );
}

function TwoColumn({ titleLeft, titleRight, left, right }: { titleLeft: string; titleRight: string; left: string[]; right: string[] }) {
  return (
    <div className="grid h-full grid-cols-2 gap-6">
      <ListPanel title={titleLeft} items={left} positive />
      <ListPanel title={titleRight} items={right} />
    </div>
  );
}

function ListPanel({ title, items, positive = false }: { title: string; items: string[]; positive?: boolean }) {
  const panelVariant: TopicVariant = positive ? 'strength' : title === 'Threats' ? 'threat' : title === 'Opportunities' ? 'opportunity' : 'weakness';
  return (
    <div className={positive ? 'deep-card flex min-h-0 flex-col rounded-[1.7rem] p-5' : 'glass flex min-h-0 flex-col rounded-[1.7rem] p-5'}>
      <h3 className="text-3xl font-black tracking-[-0.055em]">{title}</h3>
      <div className="mt-4 grid flex-1 grid-cols-2 auto-rows-fr gap-2">
        {items.map((item, i) => <motion.div key={item} className={positive ? 'flex items-center gap-2 rounded-2xl bg-white/15 p-2 text-sm font-bold leading-tight text-white' : 'flex items-center gap-2 rounded-2xl bg-white/80 p-2 text-sm font-bold leading-tight text-fiducial-anthracite'} initial={{ opacity: 0, x: positive ? -12 : 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i*.04 }}><TopicIllustration variant={panelVariant} size="xs" tone={positive ? 'deep' : 'light'} className="list-panel-icon shrink-0" />{item}</motion.div>)}
      </div>
    </div>
  );
}

function StrategicSynthesis({ slide }: { slide: Slide }) {
  const flow = (slide.data?.flow as string[]) ?? [];
  const variants: TopicVariant[] = ['positioning', 'training', 'client', 'conversion', 'revenue'];
  return (
    <div className="grid h-full grid-cols-[.62fr_1.38fr] gap-5">
      <ThreeScene variant="tunnel" />
      <div className="flex items-center">
        <div className="grid w-full grid-cols-5 gap-2">
          {flow.map((f, i) => <motion.div key={f} className="glass rounded-[1.3rem] p-4 text-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*.08 }}><TopicIllustration variant={variants[i] ?? 'strategy'} size="sm" className="mx-auto mb-4 max-w-[120px]" /><div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-fiducial-deep text-sm font-black text-white">{i+1}</div><div className="text-lg font-black leading-tight tracking-[-0.04em]">{f}</div>{i < flow.length - 1 && <ArrowRight className="mx-auto mt-4 text-fiducial-accent" />}</motion.div>)}
        </div>
      </div>
    </div>
  );
}

function Positioning({ slide }: { slide: Slide }) {
  return (
    <div className="grid h-full grid-cols-[1.15fr_.85fr] gap-5">
      <div className="deep-card flex min-h-0 flex-col justify-center rounded-[1.8rem] p-7">
        <div className="text-[clamp(2.35rem,3.15vw,3.65rem)] font-black leading-[1.03] tracking-[-0.055em]">{slide.message}</div>
      </div>
      <ThreeScene variant="generic" />
    </div>
  );
}

function Recommendation({ slide, icon, formula = false }: { slide: Slide; icon: React.ReactNode; formula?: boolean }) {
  const sideVariant: TopicVariant = formula ? 'training' : 'portfolio';
  const bulletVariants: TopicVariant[] = formula ? ['client', 'timing', 'sales', 'demo', 'risk', 'methodology'] : ['portfolio', 'client', 'problem', 'budget', 'demo', 'risk', 'strength', 'kpi'];
  return (
    <div className="grid h-full grid-cols-[.55fr_1.45fr] gap-5">
      <div className="deep-card rounded-[1.5rem] p-6">
        <TopicIllustration variant={sideVariant} size="md" tone="deep" className="mb-5" />
        {icon}
        <div className="mt-8 text-4xl font-black leading-tight tracking-[-0.06em]">{slide.title}</div>
        {formula && <div className="mt-8 rounded-2xl bg-white/15 p-4 text-lg font-black leading-snug">{slide.message}</div>}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {slide.bullets?.map((b, i) => <motion.div key={b} className="glass rounded-2xl p-4" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*.04 }}><TopicIllustration variant={bulletVariants[i] ?? sideVariant} size="sm" className="mb-4" /><div className="text-3xl font-black text-fiducial-deep">{String(i+1).padStart(2,'0')}</div><div className="mt-4 text-xl font-black leading-tight tracking-[-0.04em]">{b}</div></motion.div>)}
      </div>
    </div>
  );
}

function Pilot({ slide }: { slide: Slide }) {
  const sequence = [
    { label: '40 clients', detail: 'Priority portfolio', icon: UsersRound, variant: 'client' },
    { label: 'Segment', detail: 'Offer relevance', icon: Target, variant: 'segmentation' },
    { label: 'Email', detail: 'Targeted outreach', icon: Mail, variant: 'email' },
    { label: 'Call', detail: 'Phone follow-up', icon: PhoneCall, variant: 'call' },
    { label: 'Demo', detail: 'Pilot sessions', icon: Presentation, variant: 'demo' },
    { label: 'Learn', detail: 'Refusal reasons', icon: MessageSquareText, variant: 'feedback' }
  ];
  return (
    <div className="grid h-full grid-cols-[.7fr_1.3fr] gap-5">
      <div className="campaign-card deep-card relative overflow-hidden rounded-[1.5rem] p-4">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[28px] border-white/10" />
        <div className="absolute bottom-8 right-8 h-28 w-28 rounded-full bg-white/10 blur-xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
              <Send size={21} />
            </span>
            <TopicIllustration variant="pilot" size="sm" tone="deep" mode="image" />
            <div>
              <div className="text-xs font-black uppercase tracking-[.18em] text-white/62">Pilot sequence</div>
              <div className="text-2xl font-black leading-tight tracking-[-0.05em]">40-client campaign</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {sequence.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className="rounded-2xl bg-white/13 p-2.5"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * .05 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/14">
                      <Icon size={17} className="text-white/86" />
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-black leading-tight">{item.label}</div>
                  <div className="mt-0.5 text-xs font-semibold leading-tight text-white/68">{item.detail}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <Timeline3D />
    </div>
  );
}

function PresenterView({ activeSlide, activeIndex, activeDeck, inAnnex, sendCommand }: { activeSlide: Slide; activeIndex: number; activeDeck: Slide[]; inAnnex: boolean; sendCommand: (command: 'next' | 'prev' | 'roadmap' | 'annex') => void }) {
  const [seconds, setSeconds] = useState(0);
  const [scriptOverrides, setScriptOverrides] = useState<PresenterScriptOverrides>(() => loadPresenterScriptOverrides());
  useEffect(() => {
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);
  const label = useMemo(() => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }, [seconds]);
  const nextSlide = activeDeck[Math.min(activeDeck.length - 1, activeIndex + 1)];
  const progress = ((activeIndex + 1) / activeDeck.length) * 100;
  const defaultScript = useMemo(() => getPresenterScriptEN(activeSlide), [activeSlide]);
  const currentScript = scriptOverrides[activeSlide.id] ?? defaultScript;
  const hasCustomScript = Object.prototype.hasOwnProperty.call(scriptOverrides, activeSlide.id);

  const saveScript = (script: string) => {
    setScriptOverrides((current) => {
      const next = { ...current, [activeSlide.id]: script };
      localStorage.setItem(PRESENTER_SCRIPT_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const resetScript = () => {
    setScriptOverrides((current) => {
      const next = { ...current };
      delete next[activeSlide.id];
      localStorage.setItem(PRESENTER_SCRIPT_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="presenter-view min-h-screen overflow-auto bg-[#101716] p-6 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-[.9fr_1.1fr] gap-5">
        <section className="rounded-[1.5rem] border border-white/10 bg-white/[.06] p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MonitorUp className="text-fiducial-accent" />
              <div>
                <div className="text-xs font-black uppercase tracking-[.18em] text-fiducial-accent">Private presenter view</div>
                <div className="text-sm font-semibold text-white/52">Not shown on the presentation screen</div>
              </div>
            </div>
            <div className="rounded-2xl bg-fiducial-accent px-4 py-2 text-sm font-black text-[#10201b]">{inAnnex ? 'Annex' : 'Main'} {activeIndex + 1}/{activeDeck.length}</div>
          </div>

          <div className="mt-8 rounded-[1.4rem] bg-white p-5 text-fiducial-anthracite">
            <div className="kicker">{activeSlide.eyebrow ?? 'Current slide'}</div>
            <h1 className="mt-3 text-4xl font-black leading-tight tracking-[-0.06em]">{activeSlide.title}</h1>
            {activeSlide.subtitle && <p className="mt-3 text-lg font-semibold text-fiducial-anthracite/62">{activeSlide.subtitle}</p>}
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-fiducial-light">
              <div className="h-full rounded-full bg-fiducial-deep" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-[1.4rem] bg-white/[.08] p-5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.18em] text-fiducial-accent"><CalendarDays size={16} /> Timer</div>
              <div className="mt-3 text-6xl font-black tracking-[-0.06em]">{label}</div>
              <button className="mt-4 rounded-xl bg-white/10 px-4 py-2 text-sm font-black text-white/75 hover:bg-white/16" onClick={() => setSeconds(0)}>Reset timer</button>
            </div>
            <div className="rounded-[1.4rem] bg-white/[.08] p-5">
              <div className="text-xs font-black uppercase tracking-[.18em] text-fiducial-accent">Next</div>
              <div className="mt-3 text-2xl font-black leading-tight tracking-[-0.04em]">{nextSlide.title}</div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-fiducial-anthracite" onClick={() => sendCommand('prev')}>Previous</button>
            <button className="rounded-2xl bg-fiducial-accent px-5 py-3 text-sm font-black text-[#10201b]" onClick={() => sendCommand('next')}>Next slide</button>
            <button className="rounded-2xl bg-white/10 px-5 py-3 text-sm font-black text-white" onClick={() => sendCommand('roadmap')}>Roadmap</button>
            <button className="rounded-2xl bg-white/10 px-5 py-3 text-sm font-black text-white" onClick={() => sendCommand('annex')}>Annexes</button>
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-white/10 bg-white/[.08] p-6 shadow-2xl">
          <div className="text-xs font-black uppercase tracking-[.18em] text-fiducial-accent">Oral notes</div>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.05em]">{activeSlide.note.title}</h2>
          <div className="mt-5 grid gap-4">
            <PresenterBlock label="Recommended timing" text={activeSlide.note.duration} />
            <div className="rounded-2xl bg-white/[.08] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-black uppercase tracking-[.16em] text-fiducial-accent">Oral script</div>
                  <div className="mt-1 text-xs font-semibold text-white/50">Saved automatically in this browser for this slide.</div>
                </div>
                <button
                  className="rounded-xl bg-white/10 px-3 py-2 text-xs font-black text-white/78 hover:bg-white/16 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={!hasCustomScript}
                  onClick={resetScript}
                >
                  Reset
                </button>
              </div>
              <textarea
                className="mt-4 min-h-[420px] w-full resize-y rounded-2xl border border-white/10 bg-[#0b1110] p-4 text-lg font-semibold leading-relaxed text-white/88 outline-none transition focus:border-fiducial-accent focus:ring-2 focus:ring-fiducial-accent/30"
                value={currentScript}
                onChange={(event) => saveScript(event.target.value)}
                spellCheck
                aria-label="Editable oral script"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function PresenterBlock({ label, text, large = false }: { label: string; text: string; large?: boolean }) {
  return (
    <div className="rounded-2xl bg-white/[.08] p-4">
      <div className="text-xs font-black uppercase tracking-[.16em] text-fiducial-accent">{label}</div>
      <p className={large ? 'mt-2 whitespace-pre-line text-lg font-semibold leading-relaxed text-white/86' : 'mt-2 whitespace-pre-line text-base font-semibold leading-relaxed text-white/74'}>{text}</p>
    </div>
  );
}

function Final({ slide }: { slide: Slide }) {
  const data = slide.data as { risks: string[]; limits: string[]; conclusion: string };
  return (
    <div className="grid h-full grid-cols-[1.35fr_.65fr] gap-5">
      <div className="grid grid-rows-[1fr_auto] gap-4">
        <RiskMatrix />
        <div className="deep-card rounded-[1.5rem] p-5 text-2xl font-black leading-tight tracking-[-0.04em]">{data.conclusion}</div>
      </div>
      <div className="grid gap-4">
        <FinalQRCode />
        <div className="glass rounded-[1.5rem] p-5">
          <div className="kicker">Critical limits</div>
          <div className="mt-3 space-y-2 text-sm font-bold leading-snug text-fiducial-anthracite/70">{data.limits.map((l) => <div key={l}>- {l}</div>)}</div>
        </div>
      </div>
    </div>
  );
}

function AnnexContent({ slide }: { slide: Slide }) {
  const type = slide.data?.type as string;
  if (type === 'budget') return <BudgetAnnex />;
  if (type === 'roi') return <RoiAnnex />;
  if (type === 'kpi') return <KpiDashboard />;
  if (type === 'benchmark') return <BenchmarkCards />;
  if (type === 'questions') return <QuestionsAnnex />;
  if (type === 'definitions') return <DefinitionsAnnex />;
  if (type === 'timing') return <TimingAnnex />;
  return <SummaryAnnex />;
}

function BudgetAnnex() {
  const variants: TopicVariant[] = ['portfolio', 'training', 'pilot', 'kpi'];
  return <div className="grid h-full grid-cols-4 gap-4">{budgetItems.map((item, i) => <div key={item.name} className="glass rounded-[1.5rem] p-5"><TopicIllustration variant={variants[i] ?? 'budget'} size="md" className="mb-4" /><div className="text-xl font-black tracking-[-0.04em]">{item.name}</div><div className="mt-8 text-3xl font-black text-fiducial-deep">{formatEuro(item.min)} - {formatEuro(item.max)}</div></div>)}<div className="deep-card col-span-4 rounded-[1.5rem] p-6 text-4xl font-black tracking-[-0.06em]"><TopicIllustration variant="budget" size="sm" tone="deep" className="mb-4 w-fit" />Total direct budget: {formatEuro(financialBaseline.budgetMin)} - {formatEuro(financialBaseline.budgetMax)}</div></div>;
}
function RoiAnnex() {
  return <div className="grid h-full grid-cols-3 gap-4">{roiScenarios.map((s) => <div key={s.name} className="glass rounded-[1.5rem] p-6"><TopicIllustration variant={s.name === 'Conservative' ? 'risk' : s.name === 'Realistic' ? 'conversion' : 'revenue'} size="lg" className="mb-5" /><div className="text-2xl font-black">{s.name} {s.growth}</div><div className="mt-6 text-4xl font-black text-fiducial-deep">{formatEuro(s.additionalRevenue)}</div><div className="mt-4 rounded-2xl bg-fiducial-mint p-4 text-sm font-bold">Break-even margin: {s.breakEvenMin}% - {s.breakEvenMax}%</div></div>)}</div>;
}
function QuestionsAnnex() {
  const qs = [
    ['Why these benchmark actors?', 'They cover competitor, pedagogy, key account client and B2B sales perspectives.'],
    ['Is ROI guaranteed?', 'No. It is a framework based on additional signed revenue and break-even margin logic.'],
    ['Why 40 clients?', 'Enough to generate feedback, limited enough to remain manageable.'],
    ['Why not become a tech provider?', 'Fiducial FPSG’s credibility is safety training expertise; technology is a lever.'],
    ['Are the KPIs real results?', 'No. They are recommended monitoring indicators.']
  ];
  const variants: TopicVariant[] = ['benchmark', 'roi', 'pilot', 'positioning', 'methodology'];
  return <div className="grid h-full grid-cols-5 gap-3">{qs.map(([q,a], i) => <div key={q} className="glass rounded-2xl p-4"><TopicIllustration variant={variants[i] ?? 'summary'} size="sm" className="mb-4" /><div className="text-lg font-black tracking-[-0.04em] text-fiducial-deep">{q}</div><p className="mt-4 text-sm font-semibold leading-relaxed text-fiducial-anthracite/72">{a}</p></div>)}</div>;
}
function DefinitionsAnnex() {
  return <div className="grid h-full grid-cols-3 gap-5"><OfferDiagnosisCard title="E-learning" text="Customized, reusable and scalable digital training module, especially relevant for large accounts and multi-site clients." /><OfferDiagnosisCard title="AR" text="Augmented reality fire awareness: practical scenarios, active learning, connected equipment and familiar fire safety need." /><OfferDiagnosisCard title="VR" text="Virtual reality road risk prevention: immersive simulation for employees exposed to professional road risk." /></div>;
}
function OfferDiagnosisCard({ title, text }: { title: string; text: string }) { const variant: TopicVariant = title === 'E-learning' ? 'elearning' : title === 'AR' ? 'ar' : 'vr'; return <div className="deep-card rounded-[1.5rem] p-6"><TopicIllustration variant={variant} size="xl" tone="deep" className="mb-6" /><div className="text-5xl font-black tracking-[-0.06em]">{title}</div><p className="mt-8 text-xl font-semibold leading-relaxed text-white/82">{text}</p></div>; }
function TimingAnnex() { return <div className="grid h-full grid-cols-3 gap-4">{timingPlan.map((p) => <div key={p.phase} className="glass rounded-[1.5rem] p-5"><TopicIllustration variant="timing" size="sm" className="mb-4" /><div className="text-xs font-black uppercase tracking-[.16em] text-fiducial-deep">Screens {p.screens}</div><div className="mt-3 text-2xl font-black tracking-[-0.04em]">{p.phase}</div><div className="mt-8 rounded-2xl bg-fiducial-deep p-4 text-2xl font-black text-white">{p.duration}</div></div>)}</div>; }
function SummaryAnnex() { return <div className="grid h-full grid-cols-[1fr_.8fr] gap-5"><div className="deep-card flex flex-col justify-center rounded-[1.8rem] p-8"><TopicIllustration variant="summary" size="xl" tone="deep" className="mb-6 max-w-md" /><div className="text-5xl font-black leading-tight tracking-[-0.06em]">Innovation exists. Commercial scalability must be built.</div><div className="mt-8 text-3xl font-black text-white/75">Segment - Enable - Pilot - Measure - Scale</div></div><div className="glass rounded-[1.5rem] p-5"><TopicIllustration variant="methodology" size="sm" className="mb-4 w-fit" /><div className="kicker">Coherence checklist</div><div className="mt-4 space-y-2 text-sm font-bold leading-tight text-fiducial-anthracite/70">{coherenceChecklist.map((c) => <div key={c}>- {c}</div>)}</div></div></div>; }
