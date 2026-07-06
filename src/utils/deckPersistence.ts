import { Slide } from '../data/presentationContent';

export type SlideStyle = {
  fontFamily?: string;
  titleScale?: number;
  bodyScale?: number;
};

export type TextOverride = {
  html?: string;
  fontFamily?: string;
  fontSize?: string;
  color?: string;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
};

export type EditableSlide = Slide & {
  deleted?: boolean;
  style?: SlideStyle;
  textOverrides?: Record<string, TextOverride>;
};

export type DeckState = {
  slides: EditableSlide[];
  annexes: EditableSlide[];
  updatedAt?: string;
};

const endpoint = '/api/deck';

export async function loadDeckState(): Promise<DeckState | null> {
  const response = await fetch(endpoint, { headers: { Accept: 'application/json' } });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Load failed: ${response.status}`);
  return response.json();
}

export async function saveDeckState(deck: DeckState): Promise<void> {
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...deck, updatedAt: new Date().toISOString() })
  });
  if (!response.ok) throw new Error(`Save failed: ${response.status}`);
}

export function visibleSlides(deck: EditableSlide[]) {
  return deck.filter((slide) => !slide.deleted);
}
