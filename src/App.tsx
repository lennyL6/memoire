import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, ArrowRight, BadgeEuro, BookOpenCheck, BrainCircuit, CalendarDays, CheckCircle2, ClipboardList, Gauge, LineChart, Mail, MessageSquareText, MonitorUp, MousePointer2, NotebookPen, PhoneCall, Presentation, Save, Send, ShieldCheck, SlidersHorizontal, Target, Trash2, Undo2, UsersRound } from 'lucide-react';
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
import TopicIllustration, { TopicVariant } from './components/TopicIllustration';
import { annexes as defaultAnnexes, benchmarkActors, brand, budgetItems, coherenceChecklist, financialBaseline, getPresenterScriptEN, kpis, presenterScriptVersion, roiScenarios, segmentation, slides as defaultSlides, timingPlan, Slide } from './data/presentationContent';
import { DeckState, EditableSlide, loadDeckState, saveDeckState, visibleSlides } from './utils/deckPersistence';
import { formatEuro } from './utils/format';

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const printMode = params.get('print') === '1';
  const presenterMode = params.get('presenter') === '1';
  const initialSlide = Number(params.get('slide') ?? 0);
  const initialAnnex = params.get('annex') === '1';

  const [deckState, setDeckState] = useState<DeckState>(() => ({ slides: defaultSlides, annexes: defaultAnnexes, presenterScriptVersion }));
  const [saveStatus, setSaveStatus] = useState('Chargement…');
  const [editorOpen, setEditorOpen] = useState(false);
  const slides = useMemo(() => visibleSlides(deckState.slides), [deckState.slides]);
  const annexes = useMemo(() => visibleSlides(deckState.annexes), [deckState.annexes]);
  const [index, setIndex] = useState(Number.isFinite(initialSlide) ? Math.max(0, Math.min(initialSlide, defaultSlides.length - 1)) : 0);
  const [annexIndex, setAnnexIndex] = useState(0);
  const [inAnnex, setInAnnex] = useState(initialAnnex);
  const [showNotes, setShowNotes] = useState(params.get('notes') === '1');
  const [showTimer, setShowTimer] = useState(false);
  const [black, setBlack] = useState(false);
  const processedCommandId = useRef<string | null>(null);
  const deckLoaded = useRef(false);

  const activeDeck = inAnnex ? annexes : slides;
  const activeIndex = inAnnex ? annexIndex : index;
  const activeSlide = activeDeck[Math.min(activeIndex, Math.max(0, activeDeck.length - 1))] ?? slides[0] ?? annexes[0];

  const goNext = () => {
    if (inAnnex) setAnnexIndex((i) => Math.min(Math.max(0, annexes.length - 1), i + 1));
    else setIndex((i) => Math.min(Math.max(0, slides.length - 1), i + 1));
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
  const updateActiveSlide = (patch: Partial<EditableSlide>) => {
    const id = activeSlide?.id;
    if (!id) return;
    const key = inAnnex ? 'annexes' : 'slides';
    setDeckState((current) => ({
      ...current,
      [key]: current[key].map((slide) => slide.id === id ? { ...slide, ...patch } : slide)
    }));
  };
  const deleteActiveSlide = () => {
    if (!activeSlide) return;
    updateActiveSlide({ deleted: true });
    if (inAnnex) setAnnexIndex((i) => Math.max(0, Math.min(i, annexes.length - 2)));
    else setIndex((i) => Math.max(0, Math.min(i, slides.length - 2)));
  };
  const restoreAllSlides = () => setDeckState((current) => ({ ...current, slides: current.slides.map((slide) => ({ ...slide, deleted: false })), annexes: current.annexes.map((slide) => ({ ...slide, deleted: false })) }));

  const sendPresenterCommand = (command: 'next' | 'prev' | 'roadmap' | 'annex') => {
    const payload = { type: 'command', command, id: `${Date.now()}-${Math.random().toString(16).slice(2)}` };
    const channel = new BroadcastChannel('fpsg-defense');
    channel.postMessage(payload);
    channel.close();
  };

  useEffect(() => {
    loadDeckState()
      .then((saved) => {
        if (saved) {
          const normalized = saved.presenterScriptVersion === presenterScriptVersion
            ? saved
            : {
                ...saved,
                presenterScriptVersion,
                slides: saved.slides.map((slide) => ({ ...slide, presenterScript: getPresenterScriptEN(slide) }))
              };
          setDeckState(normalized);
          setSaveStatus(`Dernière sauvegarde chargée${saved.updatedAt ? ` (${new Date(saved.updatedAt).toLocaleString()})` : ''}`);
        } else {
          setSaveStatus('Aucune sauvegarde serveur — version initiale');
        }
        deckLoaded.current = true;
      })
      .catch(() => {
        deckLoaded.current = true;
        setSaveStatus('Serveur de sauvegarde indisponible');
      });
  }, []);

  useEffect(() => {
    if (!deckLoaded.current) return;
    const id = window.setTimeout(() => {
      saveDeckState(deckState)
        .then(() => setSaveStatus(`Sauvegardé à ${new Date().toLocaleTimeString()}`))
        .catch(() => setSaveStatus('Sauvegarde serveur impossible'));
    }, 700);
    return () => window.clearTimeout(id);
  }, [deckState]);

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
      const target = e.target as HTMLElement | null;
      const isEditing = target?.tagName === 'TEXTAREA' || target?.tagName === 'INPUT' || target?.isContentEditable;
      if (isEditing) return;
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
      if (e.key.toLowerCase() === 'e') setEditorOpen((v) => !v);
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
        onChangeSlide={updateActiveSlide}
        saveStatus={saveStatus}
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
      {editorOpen && activeSlide && (
        <SlideEditor
          slide={activeSlide as EditableSlide}
          saveStatus={saveStatus}
          onChange={updateActiveSlide}
          onDelete={deleteActiveSlide}
          onRestoreAll={restoreAllSlides}
          onClose={() => setEditorOpen(false)}
        />
      )}
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
    case 'thankYou': return <ThankYou />;
    case 'annex': return <AnnexContent slide={slide} />;
    default: return null;
  }
}

function ThankYou() {
  return (
    <div className="deep-card flex h-full flex-col items-center justify-center rounded-[1.8rem] p-10 text-center">
      <TopicIllustration variant="summary" size="lg" tone="deep" className="mb-8" />
      <div className="text-[clamp(3rem,6vw,7rem)] font-black leading-none tracking-[-0.06em] text-white">Thank you for listening</div>
      <div className="mt-8 rounded-3xl bg-white/15 px-8 py-5 text-[clamp(1.5rem,2.2vw,2.7rem)] font-black tracking-[-0.04em] text-white">Ready to answer your questions.</div>
    </div>
  );
}

function Opening({ slide }: { slide: Slide }) {
  const data = slide.data as Record<string, string>;
  return (
    <div className="opening-cover relative h-full overflow-hidden rounded-[2rem]">
      <img className="absolute inset-0 h-full w-full object-cover" src="/cover-commercial-growth.png" alt="" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,250,248,.96)_0%,rgba(247,250,248,.88)_34%,rgba(247,250,248,.36)_66%,rgba(247,250,248,.04)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/65 to-transparent" />
      <div className="relative z-10 flex h-full max-w-[760px] flex-col justify-between px-12 py-10 text-fiducial-anthracite">
        <div className="flex items-center justify-between gap-5">
          <img className="brand-logo brand-logo-opening" src="/fiducial-fpsg-logo.png" alt="Fiducial FPSG" />
          <span className="rounded-full border border-fiducial-deep/10 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-fiducial-deep">MBA defense</span>
        </div>
        <div>
          <div className="kicker mb-4">Mission d'expertise - 2026</div>
          <h1 className="max-w-[720px] text-[clamp(3rem,5.1vw,6.2rem)] font-black leading-[.92] tracking-[-0.055em]">
            High-value training offers
          </h1>
          <p className="mt-5 max-w-[600px] text-[clamp(1.25rem,1.75vw,2rem)] font-black leading-tight tracking-[-0.025em] text-fiducial-deep">
            From existing innovation to structured commercial growth.
          </p>
        </div>
        <div className="grid gap-3 text-sm font-bold leading-relaxed text-fiducial-anthracite/70">
          <div className="inline-flex w-fit rounded-full bg-white/72 px-4 py-2 text-fiducial-deep">E-learning - Augmented Reality - Virtual Reality</div>
          <div>{data.author} - {data.programme} - {data.school}</div>
        </div>
      </div>
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
        <p className="text-balance text-[clamp(1.2rem,2.45vw,2.75rem)] font-black leading-[1.14] tracking-[-0.025em]" style={{ fontFamily: 'Arial, sans-serif' }}>{slide.message}</p>
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
        <div className="text-[clamp(1.55rem,2.35vw,2.85rem)] font-black leading-[1.16] tracking-[-0.025em]" style={{ fontFamily: 'Arial, sans-serif' }}>{slide.message}</div>
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

function PresenterView({
  activeSlide,
  activeIndex,
  activeDeck,
  inAnnex,
  sendCommand,
  onChangeSlide,
  saveStatus
}: {
  activeSlide: EditableSlide;
  activeIndex: number;
  activeDeck: EditableSlide[];
  inAnnex: boolean;
  sendCommand: (command: 'next' | 'prev' | 'roadmap' | 'annex') => void;
  onChangeSlide: (patch: Partial<EditableSlide>) => void;
  saveStatus: string;
}) {
  const [seconds, setSeconds] = useState(0);
  const [script, setScript] = useState(activeSlide.presenterScript ?? getPresenterScriptEN(activeSlide));
  useEffect(() => {
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);
  useEffect(() => {
    setScript(activeSlide.presenterScript ?? getPresenterScriptEN(activeSlide));
  }, [activeSlide.id, activeSlide.presenterScript]);
  const label = useMemo(() => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }, [seconds]);
  const nextSlide = activeDeck[Math.min(activeDeck.length - 1, activeIndex + 1)];
  const progress = ((activeIndex + 1) / activeDeck.length) * 100;
  const usesCueEditor = script.includes('🟢') || script.includes('🔵');
  const updateScript = (value: string) => {
    setScript(value);
    onChangeSlide({ presenterScript: value });
  };
  return (
    <div className="presenter-view h-screen overflow-hidden bg-[#101716] p-4 text-white">
      <div className="grid h-full gap-4" style={{ gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)' }}>
        <section className="flex min-h-0 min-w-0 flex-col rounded-[1.5rem] border border-white/10 bg-white/[.06] p-4 shadow-2xl">
          <div className="flex shrink-0 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MonitorUp className="text-fiducial-accent" />
              <div>
                <div className="text-xs font-black uppercase tracking-[.18em] text-fiducial-accent">Private presenter view</div>
                <div className="text-sm font-semibold text-white/52">Live slide preview and controls</div>
              </div>
            </div>
            <div className="rounded-2xl bg-fiducial-accent px-4 py-2 text-sm font-black text-[#10201b]">{inAnnex ? 'Annex' : 'Main'} {activeIndex + 1}/{activeDeck.length}</div>
          </div>

          <PresenterSlidePreview activeSlide={activeSlide} activeDeck={activeDeck} activeIndex={activeIndex} />

          <div className="mt-3 grid shrink-0 grid-cols-[.55fr_.9fr] gap-3">
            <div className="rounded-[1rem] bg-white/[.08] p-3">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.16em] text-fiducial-accent"><CalendarDays size={14} /> Timer</div>
              <div className="mt-1 text-3xl font-black tracking-[-0.05em]">{label}</div>
              <button className="mt-2 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-black text-white/75 hover:bg-white/16" onClick={() => setSeconds(0)}>Reset</button>
            </div>
            <div className="grid grid-cols-[1fr_1fr_1.35fr] gap-2">
              <button className="rounded-xl bg-white px-3 py-3 text-xs font-black text-fiducial-anthracite" onClick={() => sendCommand('prev')}>Previous slide</button>
              <button className="rounded-xl bg-fiducial-accent px-3 py-3 text-xs font-black text-[#10201b]" onClick={() => sendCommand('next')}>Next slide</button>
              <div className="rounded-xl bg-white/[.08] p-3">
                <div className="text-[10px] font-black uppercase tracking-[.16em] text-fiducial-accent">Next</div>
                <div className="mt-1 line-clamp-2 text-sm font-black leading-tight tracking-[-0.02em]">{nextSlide.title}</div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex shrink-0 items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-fiducial-accent" style={{ width: `${progress}%` }} />
            </div>
            <button className="rounded-xl bg-white/10 px-3 py-2 text-xs font-black text-white" onClick={() => sendCommand('roadmap')}>Roadmap</button>
            <button className="rounded-xl bg-white/10 px-3 py-2 text-xs font-black text-white" onClick={() => sendCommand('annex')}>Annexes</button>
          </div>
        </section>

        <section className="flex min-h-0 min-w-0 flex-col rounded-[1.5rem] border border-white/10 bg-white/[.08] p-4 shadow-2xl">
          <div className="shrink-0">
            <div className="text-xs font-black uppercase tracking-[.18em] text-fiducial-accent">Oral script</div>
            <div className="mt-2 text-xs font-bold text-white/48">{saveStatus}</div>
          </div>
          {usesCueEditor ? (
            <PresenterCueEditor script={script} onChange={updateScript} />
          ) : (
            <textarea
              className="mt-4 min-h-0 flex-1 resize-none rounded-[1.2rem] border border-white/10 bg-[#0b1110] p-5 text-[1.04rem] font-semibold leading-[1.55] text-white/90 outline-none ring-fiducial-accent/40 transition focus:ring-4"
              value={script}
              onChange={(event) => updateScript(event.target.value)}
              spellCheck={false}
            />
          )}
        </section>
      </div>
    </div>
  );
}

function PresenterSlidePreview({
  activeSlide,
  activeDeck,
  activeIndex
}: {
  activeSlide: EditableSlide;
  activeDeck: EditableSlide[];
  activeIndex: number;
}) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.34);

  useLayoutEffect(() => {
    const node = frameRef.current;
    if (!node) return;
    const updateScale = () => {
      const rect = node.getBoundingClientRect();
      const nextScale = Math.min(rect.width / 1600, rect.height / 900, 1);
      setScale(Math.max(0.2, nextScale));
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className="presenter-slide-preview mt-4 flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[1.2rem] bg-black/25 p-3">
      <div style={{ width: 1600 * scale, height: 900 * scale }}>
        <div style={{ width: 1600, height: 900, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <SlideShell slide={activeSlide} total={activeDeck.length} index={activeIndex}>
            <SlideContent slide={activeSlide} />
          </SlideShell>
        </div>
      </div>
    </div>
  );
}

type PresenterCue = {
  marker: '🟢' | '🔵';
  label: string;
  text: string;
};

const cueOrder = [
  { marker: '🟢' as const, label: 'Message clé' },
  { marker: '🟢' as const, label: 'Preuve à ne pas oublier' },
  { marker: '🟢' as const, label: 'Conclusion de la slide' },
  { marker: '🟢' as const, label: 'Transition' },
  { marker: '🔵' as const, label: 'Useful detail if time' }
];

function parsePresenterCues(script: string): PresenterCue[] {
  const lines = script.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const parsed = lines.map((line) => {
    const match = line.match(/^(🟢|🔵)\s*([^:]+?)\s*:\s*(.*)$/);
    if (!match) return null;
    return { marker: match[1] as '🟢' | '🔵', label: match[2].trim(), text: match[3].trim() };
  }).filter(Boolean) as PresenterCue[];
  return cueOrder
    .map((cue) => parsed.find((item) => item.label === cue.label) ?? (cue.label === 'Useful detail if time' ? null : { ...cue, text: '' }))
    .filter(Boolean) as PresenterCue[];
}

function serializePresenterCues(cues: PresenterCue[]) {
  return cues
    .filter((cue) => cue.text.trim())
    .map((cue) => `${cue.marker} ${cue.label} : ${cue.text.trim()}`)
    .join('\n\n');
}

function PresenterCueEditor({ script, onChange }: { script: string; onChange: (value: string) => void }) {
  const cues = parsePresenterCues(script);
  const updateCue = (index: number, text: string) => {
    const next = cues.map((cue, i) => i === index ? { ...cue, text } : cue);
    onChange(serializePresenterCues(next));
  };
  return (
    <div className="mt-2 flex min-h-0 flex-1 flex-col gap-1 overflow-hidden">
      {cues.map((cue, index) => {
        const isBlue = cue.marker === '🔵';
        const rows = Math.min(5, Math.max(2, Math.ceil(cue.text.length / 58)));
        return (
          <div key={cue.label} className={isBlue ? 'rounded-[.9rem] border border-sky-400/35 bg-sky-500/12 p-1.5' : 'rounded-[.9rem] border border-fiducial-accent/25 bg-fiducial-accent/12 p-1.5'}>
            <div className={isBlue ? 'text-[10px] font-black uppercase tracking-[.14em] text-sky-300' : 'text-[10px] font-black uppercase tracking-[.14em] text-fiducial-accent'}>
              {cue.marker} {cue.label}
            </div>
            <textarea
              className="mt-0.5 w-full resize-none overflow-hidden rounded-xl border border-white/10 bg-[#0b1110] p-1.5 text-[0.94rem] font-semibold leading-[1.22] text-white outline-none ring-fiducial-accent/40 transition placeholder:text-white/35 focus:ring-4"
              rows={rows}
              style={{ backgroundColor: '#0b1110', color: '#ffffff' }}
              value={cue.text}
              onChange={(event) => updateCue(index, event.target.value)}
              spellCheck={false}
            />
          </div>
        );
      })}
    </div>
  );
}

function Final({ slide }: { slide: Slide }) {
  const data = slide.data as { path: string[]; successConditions: string[]; conclusion: string; finalMessage: string };
  return (
    <div className="grid h-full grid-cols-[1.15fr_.85fr] gap-4">
      <div className="deep-card flex flex-col justify-between rounded-[1.7rem] p-4">
        <div>
          <TopicIllustration variant="summary" size="xs" tone="deep" className="mb-3 w-fit" />
          <p className="text-[1.45rem] font-black leading-tight tracking-[-0.03em] text-white">{data.conclusion}</p>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {data.path.map((step, index) => (
            <div key={step} className="flex items-center gap-1.5">
              <div className="flex min-h-10 flex-1 items-center justify-center rounded-xl bg-white/[.12] px-2 text-center text-[11px] font-black uppercase tracking-[.08em] text-white">{step}</div>
              {index < data.path.length - 1 && <ArrowRight size={14} className="shrink-0 text-fiducial-accent" />}
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-2xl bg-fiducial-accent p-3 text-lg font-black leading-tight tracking-[-0.02em] text-white">{data.finalMessage}</div>
      </div>
      <div className="grid grid-rows-[auto_1fr] gap-3">
        <div className="deep-card rounded-[1.5rem] p-4">
          <div className="flex items-center gap-3">
            <Target className="text-white" size={28} />
            <div>
              <div className="text-xs font-black uppercase tracking-[.18em] text-white/70">Decision path</div>
              <div className="mt-1 text-2xl font-black tracking-[-0.04em] text-white">Structure, activate, scale</div>
            </div>
          </div>
          <p className="mt-3 rounded-2xl bg-white/15 p-3 text-xs font-bold leading-relaxed text-white/82">Existing offers become a managed commercial growth engine through sequenced execution and monthly value monitoring.</p>
        </div>
        <div className="deep-card rounded-[1.5rem] p-4">
          <div className="text-xs font-black uppercase tracking-[.18em] text-white/70">Success conditions</div>
          <div className="mt-3 grid gap-2">
            {data.successConditions.map((condition) => (
              <div key={condition} className="flex items-center gap-3 rounded-2xl bg-white/15 p-2.5 text-sm font-black text-white">
                <CheckCircle2 className="shrink-0 text-white" size={22} />
                <span>{condition}</span>
              </div>
            ))}
          </div>
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
  return <div className="grid h-full grid-cols-4 gap-4">{budgetItems.map((item, i) => <div key={item.name} className="glass rounded-[1.5rem] p-5"><TopicIllustration variant={variants[i] ?? 'budget'} size="md" className="mb-4" /><div className="text-xl font-black tracking-[-0.04em]">{item.name}</div><div className="mt-8 text-3xl font-black text-fiducial-deep">{formatEuro(item.directCost)}</div></div>)}<div className="glass col-span-2 rounded-[1.5rem] p-6"><div className="kicker">Internal time valuation</div><div className="mt-3 text-3xl font-black text-fiducial-deep">{financialBaseline.internalHours}h x €{financialBaseline.internalHourlyRate.toFixed(2)} = {formatEuro(financialBaseline.internalTimeCost)}</div></div><div className="deep-card col-span-2 rounded-[1.5rem] p-6 text-4xl font-black tracking-[-0.06em]"><TopicIllustration variant="budget" size="sm" tone="deep" className="mb-4 w-fit" />Total action budget: {formatEuro(financialBaseline.budgetTotal)}</div></div>;
}
function RoiAnnex() {
  return <div className="grid h-full grid-cols-3 gap-4">{roiScenarios.map((s) => <div key={s.name} className={s.name === 'Realistic' ? 'deep-card rounded-[1.5rem] p-6' : 'glass rounded-[1.5rem] p-6'}><TopicIllustration variant={s.name === 'Conservative' ? 'risk' : s.name === 'Realistic' ? 'conversion' : 'revenue'} size="lg" tone={s.name === 'Realistic' ? 'deep' : 'light'} className="mb-5" /><div className="text-2xl font-black">{s.name} {s.growth}</div><div className={s.name === 'Realistic' ? 'mt-6 text-3xl font-black text-white' : 'mt-6 text-3xl font-black text-fiducial-deep'}>{formatEuro(s.additionalRevenue)}</div><div className={s.name === 'Realistic' ? 'mt-3 text-xl font-black text-white/80' : 'mt-3 text-xl font-black text-fiducial-anthracite/70'}>Margin: {formatEuro(s.additionalMargin)}</div><div className={s.name === 'Realistic' ? 'mt-4 rounded-2xl bg-fiducial-accent p-4 text-xl font-black text-[#10201b]' : 'mt-4 rounded-2xl bg-fiducial-mint p-4 text-xl font-black text-fiducial-deep'}>ROI: {s.roi > 0 ? '+' : ''}{s.roi.toFixed(1)}%</div></div>)}</div>;
}
function QuestionsAnnex() {
  const qs = [
    ['Why these benchmark actors?', 'They cover competitor, pedagogy, key account client and B2B sales perspectives.'],
    ['How is ROI calculated?', 'On additional margin: additional signed revenue multiplied by 35%, then compared with the €9,396 action budget.'],
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

function SlideEditor({ slide, saveStatus, onChange, onDelete, onRestoreAll, onClose }: { slide: EditableSlide; saveStatus: string; onChange: (patch: Partial<EditableSlide>) => void; onDelete: () => void; onRestoreAll: () => void; onClose: () => void }) {
  const style = slide.style ?? {};
  const updateStyle = (patch: NonNullable<EditableSlide['style']>) => onChange({ style: { ...style, ...patch } });
  return (
    <aside className="fixed right-5 top-5 z-50 flex max-h-[calc(100vh-2.5rem)] w-[25rem] flex-col overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/95 shadow-2xl backdrop-blur">
      <div className="flex items-center justify-between border-b border-fiducial-light p-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="text-fiducial-deep" size={20} />
          <div>
            <div className="text-sm font-black uppercase tracking-[.14em] text-fiducial-deep">Éditeur de slide</div>
            <div className="text-xs font-bold text-fiducial-anthracite/55">{saveStatus}</div>
          </div>
        </div>
        <button className="rounded-xl bg-fiducial-light px-3 py-2 text-sm font-black" onClick={onClose}>Fermer</button>
      </div>
      <div className="space-y-4 overflow-auto p-4 text-sm">
        <label className="block font-black">Surtitre
          <input className="mt-1 w-full rounded-xl border border-fiducial-light p-2 font-semibold" value={slide.eyebrow ?? ''} onChange={(e) => onChange({ eyebrow: e.target.value })} />
        </label>
        <label className="block font-black">Titre
          <textarea className="mt-1 h-24 w-full rounded-xl border border-fiducial-light p-2 font-semibold" value={slide.title} onChange={(e) => onChange({ title: e.target.value })} />
        </label>
        <label className="block font-black">Sous-titre
          <textarea className="mt-1 h-20 w-full rounded-xl border border-fiducial-light p-2 font-semibold" value={slide.subtitle ?? ''} onChange={(e) => onChange({ subtitle: e.target.value })} />
        </label>
        <label className="block font-black">Message principal
          <textarea className="mt-1 h-24 w-full rounded-xl border border-fiducial-light p-2 font-semibold" value={slide.message ?? ''} onChange={(e) => onChange({ message: e.target.value })} />
        </label>
        <label className="block font-black">Puces (une par ligne)
          <textarea className="mt-1 h-32 w-full rounded-xl border border-fiducial-light p-2 font-semibold" value={(slide.bullets ?? []).join('\n')} onChange={(e) => onChange({ bullets: e.target.value.split('\n').filter(Boolean) })} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block font-black">Police
            <select className="mt-1 w-full rounded-xl border border-fiducial-light p-2" value={style.fontFamily ?? 'Inter, system-ui, sans-serif'} onChange={(e) => updateStyle({ fontFamily: e.target.value })}>
              <option value="Inter, system-ui, sans-serif">Inter</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Arial, sans-serif">Arial</option>
              <option value="Verdana, sans-serif">Verdana</option>
              <option value="'Trebuchet MS', sans-serif">Trebuchet</option>
            </select>
          </label>
          <label className="block font-black">Taille titre
            <input type="number" min="0.7" max="1.4" step="0.05" className="mt-1 w-full rounded-xl border border-fiducial-light p-2" value={style.titleScale ?? 1} onChange={(e) => updateStyle({ titleScale: Number(e.target.value) })} />
          </label>
          <label className="block font-black">Taille contenu
            <input type="number" min="0.75" max="1.35" step="0.05" className="mt-1 w-full rounded-xl border border-fiducial-light p-2" value={style.bodyScale ?? 1} onChange={(e) => updateStyle({ bodyScale: Number(e.target.value) })} />
          </label>
        </div>
        <div className="rounded-2xl bg-fiducial-mint/70 p-3 text-xs font-bold text-fiducial-anthracite/70"><Save size={15} className="mb-1 inline" /> Sauvegarde automatique côté serveur. Sur Vercel, ajoutez Vercel KV (KV_REST_API_URL et KV_REST_API_TOKEN) pour une persistance durable entre redéploiements.</div>
        <div className="flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2 font-black text-red-700" onClick={onDelete}><Trash2 size={16} /> Supprimer</button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-fiducial-light px-3 py-2 font-black" onClick={onRestoreAll}><Undo2 size={16} /> Restaurer</button>
        </div>
      </div>
    </aside>
  );
}
