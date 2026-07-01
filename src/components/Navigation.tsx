import { ChevronLeft, ChevronRight, Home, Maximize2, NotebookText, TimerReset, Layers, MonitorUp } from 'lucide-react';

type Props = {
  index: number;
  total: number;
  inAnnex: boolean;
  onPrev: () => void;
  onNext: () => void;
  onRoadmap: () => void;
  onToggleNotes: () => void;
  onToggleTimer: () => void;
  onToggleAnnex: () => void;
  onFullscreen: () => void;
  onOpenPresenter: () => void;
};

export default function Navigation({ index, total, inAnnex, onPrev, onNext, onRoadmap, onToggleNotes, onToggleTimer, onToggleAnnex, onFullscreen, onOpenPresenter }: Props) {
  return (
    <div className="no-print fixed bottom-0 left-1/2 z-50 flex -translate-x-1/2 translate-y-[70%] items-center gap-1.5 rounded-2xl border border-white/70 bg-white/70 p-1.5 opacity-35 shadow-glass backdrop-blur-xl transition duration-200 hover:translate-y-0 hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100">
      <button className="rounded-xl p-1.5 hover:bg-fiducial-mint" onClick={onPrev} aria-label="Previous slide"><ChevronLeft size={19} /></button>
      <div className="min-w-24 text-center text-xs font-bold text-fiducial-anthracite/70">{inAnnex ? 'Annex' : 'Main'} {index + 1}/{total}</div>
      <button className="rounded-xl p-1.5 hover:bg-fiducial-mint" onClick={onNext} aria-label="Next slide"><ChevronRight size={19} /></button>
      <div className="mx-1 h-6 w-px bg-fiducial-anthracite/15" />
      <button className="rounded-xl p-1.5 hover:bg-fiducial-mint" onClick={onRoadmap} title="R - Roadmap"><Home size={17} /></button>
      <button className="rounded-xl p-1.5 hover:bg-fiducial-mint" onClick={onToggleAnnex} title="A - Annexes"><Layers size={17} /></button>
      <button className="rounded-xl p-1.5 hover:bg-fiducial-mint" onClick={onToggleNotes} title="N - Notes"><NotebookText size={17} /></button>
      <button className="rounded-xl p-1.5 hover:bg-fiducial-mint" onClick={onToggleTimer} title="T - Timer"><TimerReset size={17} /></button>
      <button className="rounded-xl p-1.5 hover:bg-fiducial-mint" onClick={onOpenPresenter} title="P - Presenter view"><MonitorUp size={17} /></button>
      <button className="rounded-xl p-1.5 hover:bg-fiducial-mint" onClick={onFullscreen} title="F - Fullscreen"><Maximize2 size={17} /></button>
    </div>
  );
}
