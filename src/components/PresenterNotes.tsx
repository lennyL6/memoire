import { motion } from 'framer-motion';
import { Note } from '../data/presentationContent';

type Props = { note: Note; visible: boolean };

export default function PresenterNotes({ note, visible }: Props) {
  if (!visible) return null;
  return (
    <motion.aside
      className="no-print fixed bottom-24 right-6 top-24 z-50 w-[440px] overflow-y-auto rounded-3xl border border-white/70 bg-white/90 p-6 shadow-glass backdrop-blur-xl"
      initial={{ x: 24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 24, opacity: 0 }}
    >
      <div className="kicker">Presenter notes</div>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-fiducial-anthracite">{note.title}</h2>
      <div className="mt-5 space-y-4 text-sm leading-relaxed text-fiducial-anthracite/75">
        <Block label="Rôle de l’écran" text={note.purpose} />
        <Block label="Durée recommandée" text={note.duration} />
        <Block label="Script oral" text={note.scriptFR} />
        <Block label="Phrase clé" text={note.keySentence} />
        <Block label="Question jury probable" text={note.juryRisk} />
        <Block label="Réponse courte" text={note.shortAnswer} />
      </div>
    </motion.aside>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl bg-fiducial-offwhite p-4">
      <div className="text-xs font-black uppercase tracking-[.16em] text-fiducial-deep">{label}</div>
      <p className="mt-1">{text}</p>
    </div>
  );
}
