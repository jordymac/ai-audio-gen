import { create } from 'zustand';
import { ThreeTierPrompt, GlobalSettings, Instrument, Section, Effect, PerformanceStyle } from '@/lib/types';

interface PromptState {
  prompt: ThreeTierPrompt;

  // Global Settings actions
  updateGlobalSettings: (settings: Partial<GlobalSettings>) => void;
  updateGlobalVersion: () => void;
  setGenres: (genres: string[]) => void;
  setKey: (key: string) => void;
  setTimeSignature: (timeSignature: string) => void;
  setTempo: (bpm: number, named: string) => void;
  setMood: (mood: string[]) => void;

  // Instrument actions
  addInstrument: () => void;
  removeInstrument: (id: string) => void;
  updateInstrument: (id: string, updates: Partial<Instrument>) => void;
  updateInstrumentVersion: (id: string) => void;
  addEffect: (instrumentId: string, effect: Effect) => void;
  removeEffect: (instrumentId: string, effectType: string) => void;

  // Section actions
  addSection: () => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, updates: Partial<Section>) => void;
  updateSectionVersion: (id: string) => void;
  toggleInstrumentInSection: (sectionId: string, instrumentId: string) => void;
  updateSectionPerformance: (sectionId: string, instrumentId: string, performance: Partial<PerformanceStyle>) => void;

  // Utility actions
  resetPrompt: () => void;
  loadPrompt: (prompt: ThreeTierPrompt) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

const initialState: ThreeTierPrompt = {
  global_settings: {
    genre: [],
    key: '',
    time_signature: '4/4',
    tempo: {
      bpm: 120,
      named: 'Allegro'
    },
    mood: [],
    version: 1
  },
  instruments: [],
  sections: []
};

export const usePromptStore = create<PromptState>((set) => ({
  prompt: initialState,

  // Global Settings actions
  updateGlobalSettings: (settings) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        global_settings: {
          ...state.prompt.global_settings,
          ...settings
        }
      }
    })),

  updateGlobalVersion: () =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        global_settings: {
          ...state.prompt.global_settings,
          version: state.prompt.global_settings.version + 1
        }
      }
    })),

  setGenres: (genres) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        global_settings: {
          ...state.prompt.global_settings,
          genre: genres
        }
      }
    })),

  setKey: (key) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        global_settings: {
          ...state.prompt.global_settings,
          key
        }
      }
    })),

  setTimeSignature: (timeSignature) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        global_settings: {
          ...state.prompt.global_settings,
          time_signature: timeSignature
        }
      }
    })),

  setTempo: (bpm, named) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        global_settings: {
          ...state.prompt.global_settings,
          tempo: { bpm, named }
        }
      }
    })),

  setMood: (mood) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        global_settings: {
          ...state.prompt.global_settings,
          mood
        }
      }
    })),

  // Instrument actions
  addInstrument: () =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        instruments: [
          ...state.prompt.instruments,
          {
            id: generateId(),
            name: '',
            timbre: [],
            effects: [],
            version: 1
          }
        ]
      }
    })),

  removeInstrument: (id) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        instruments: state.prompt.instruments.filter((inst) => inst.id !== id),
        // Also remove from sections
        sections: state.prompt.sections.map((section) => ({
          ...section,
          included_instrument_ids: section.included_instrument_ids.filter(
            (instId) => instId !== id
          ),
          performance: Object.fromEntries(
            Object.entries(section.performance).filter(
              ([instId]) => instId !== id
            )
          )
        }))
      }
    })),

  updateInstrument: (id, updates) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        instruments: state.prompt.instruments.map((inst) =>
          inst.id === id ? { ...inst, ...updates } : inst
        )
      }
    })),

  updateInstrumentVersion: (id) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        instruments: state.prompt.instruments.map((inst) =>
          inst.id === id ? { ...inst, version: inst.version + 1 } : inst
        )
      }
    })),

  addEffect: (instrumentId, effect) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        instruments: state.prompt.instruments.map((inst) =>
          inst.id === instrumentId
            ? { ...inst, effects: [...inst.effects, effect] }
            : inst
        )
      }
    })),

  removeEffect: (instrumentId, effectType) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        instruments: state.prompt.instruments.map((inst) =>
          inst.id === instrumentId
            ? {
                ...inst,
                effects: inst.effects.filter((e) => e.type !== effectType)
              }
            : inst
        )
      }
    })),

  // Section actions
  addSection: () =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        sections: [
          ...state.prompt.sections,
          {
            id: generateId(),
            type: 'Verse',
            included_instrument_ids: [],
            performance: {},
            version: 1
          }
        ]
      }
    })),

  removeSection: (id) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        sections: state.prompt.sections.filter((section) => section.id !== id)
      }
    })),

  updateSection: (id, updates) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        sections: state.prompt.sections.map((section) =>
          section.id === id ? { ...section, ...updates } : section
        )
      }
    })),

  updateSectionVersion: (id) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        sections: state.prompt.sections.map((section) =>
          section.id === id ? { ...section, version: section.version + 1 } : section
        )
      }
    })),

  toggleInstrumentInSection: (sectionId, instrumentId) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        sections: state.prompt.sections.map((section) => {
          if (section.id !== sectionId) return section;

          const isIncluded = section.included_instrument_ids.includes(instrumentId);

          if (isIncluded) {
            // Remove instrument
            const newPerformance = { ...section.performance };
            delete newPerformance[instrumentId];

            return {
              ...section,
              included_instrument_ids: section.included_instrument_ids.filter(
                (id) => id !== instrumentId
              ),
              performance: newPerformance
            };
          } else {
            // Add instrument with default performance
            return {
              ...section,
              included_instrument_ids: [...section.included_instrument_ids, instrumentId],
              performance: {
                ...section.performance,
                [instrumentId]: {
                  dynamics: [],
                  rhythm: [],
                  melody: []
                }
              }
            };
          }
        })
      }
    })),

  updateSectionPerformance: (sectionId, instrumentId, performanceUpdates) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        sections: state.prompt.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                performance: {
                  ...section.performance,
                  [instrumentId]: {
                    ...section.performance[instrumentId],
                    ...performanceUpdates
                  }
                }
              }
            : section
        )
      }
    })),

  // Utility actions
  resetPrompt: () => set({ prompt: initialState }),

  loadPrompt: (prompt) => set({ prompt })
}));
