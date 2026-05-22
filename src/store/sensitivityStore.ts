import { create } from 'zustand';
import { SensitivityInput, SensitivityResult } from '@/types/sensitivity';

interface SensitivityStore {
  // Estado
  currentInput: SensitivityInput | null;
  currentResult: SensitivityResult | null;
  selectedInfluencerId: string | null;
  dragStartTime: number | null;
  dragStartX: number | null;
  dragStartY: number | null;
  dragSpeed: number | null;
  savedResults: SensitivityResult[];

  // Ações
  setCurrentInput: (input: SensitivityInput) => void;
  setCurrentResult: (result: SensitivityResult) => void;
  setSelectedInfluencer: (id: string | null) => void;
  startDragDetection: (x: number, y: number) => void;
  updateDragSpeed: (x: number, y: number) => number;
  stopDragDetection: () => void;
  saveResult: (result: SensitivityResult) => void;
  clearResults: () => void;
  removeResult: (index: number) => void;
}

export const useSensitivityStore = create<SensitivityStore>((set, get) => ({
  currentInput: null,
  currentResult: null,
  selectedInfluencerId: null,
  dragStartTime: null,
  dragStartX: null,
  dragStartY: null,
  dragSpeed: null,
  savedResults: [],

  setCurrentInput: (input: SensitivityInput) => {
    set({ currentInput: input });
  },

  setCurrentResult: (result: SensitivityResult) => {
    set({ currentResult: result });
  },

  setSelectedInfluencer: (id: string | null) => {
    set({ selectedInfluencerId: id });
  },

  startDragDetection: (x: number, y: number) => {
    set({
      dragStartTime: Date.now(),
      dragStartX: x,
      dragStartY: y,
    });
  },

  updateDragSpeed: (x: number, y: number) => {
    const state = get();
    if (!state.dragStartTime || state.dragStartX === null || state.dragStartY === null) {
      return 0;
    }

    const timeDiff = Date.now() - state.dragStartTime;
    const distanceX = Math.abs(x - state.dragStartX);
    const distanceY = Math.abs(y - state.dragStartY);
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // pixels por milissegundo
    const speed = distance / (timeDiff || 1);

    set({ dragSpeed: speed });
    return speed;
  },

  stopDragDetection: () => {
    set({
      dragStartTime: null,
      dragStartX: null,
      dragStartY: null,
    });
  },

  saveResult: (result: SensitivityResult) => {
    set((state) => ({
      savedResults: [result, ...state.savedResults],
    }));
  },

  clearResults: () => {
    set({ savedResults: [] });
  },

  removeResult: (index: number) => {
    set((state) => ({
      savedResults: state.savedResults.filter((_, i) => i !== index),
    }));
  },
}));
