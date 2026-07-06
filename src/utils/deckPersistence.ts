import { Slide } from '../data/presentationContent';

export type SlideStyle = {
  fontFamily?: string;
  titleScale?: number;
  bodyScale?: number;
};

export type EditableSlide = Slide & {
  deleted?: boolean;
  presenterScript?: string;
  style?: SlideStyle;
};

export type DeckState = {
  slides: EditableSlide[];
  annexes: EditableSlide[];
  presenterScriptVersion?: string;
  updatedAt?: string;
};

const endpoint = '/api/deck';
const localStorageKey = 'fpsg-deck-state-local';

const readLocalDeck = (): DeckState | null => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(localStorageKey);
  return stored ? JSON.parse(stored) : null;
};

const writeLocalDeck = (deck: DeckState) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(localStorageKey, JSON.stringify({ ...deck, updatedAt: new Date().toISOString() }));
};

export async function loadDeckState(): Promise<DeckState | null> {
  try {
    const response = await fetch(endpoint, { headers: { Accept: 'application/json' } });
    if (response.status === 404) return readLocalDeck();
    if (!response.ok) throw new Error(`Load failed: ${response.status}`);
    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) return readLocalDeck();
    return response.json();
  } catch {
    return readLocalDeck();
  }
}

export async function saveDeckState(deck: DeckState): Promise<void> {
  const payload = { ...deck, updatedAt: new Date().toISOString() };
  writeLocalDeck(payload);
  try {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`Save failed: ${response.status}`);
  } catch {
    // Local browser persistence is enough for offline rehearsal mode.
  }
}

export function visibleSlides(deck: EditableSlide[]) {
  return deck.filter((slide) => !slide.deleted);
}
