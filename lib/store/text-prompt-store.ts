import { create } from 'zustand';

export interface TextInstrument {
  id: string;
  name: string;
  description: string;
  negativeDescription: string;
  version: number;
}

export interface TextSection {
  id: string;
  type: string;
  description: string;
  negativeDescription: string;
  version: number;
}

export interface TextPrompt {
  global: string;
  negativeGlobal: string;
  globalVersion: number;
  instruments: TextInstrument[];
  sections: TextSection[];
}

interface TextPromptState {
  prompt: TextPrompt;

  // Global actions
  setGlobal: (text: string) => void;
  setNegativeGlobal: (text: string) => void;
  updateGlobalPrompt: () => void;

  // Instrument actions
  addInstrument: () => string;
  updateInstrument: (id: string, updates: Partial<TextInstrument>) => void;
  updateInstrumentPrompt: (id: string) => void;
  removeInstrument: (id: string) => void;

  // Section actions
  addSection: () => string;
  updateSection: (id: string, updates: Partial<TextSection>) => void;
  updateSectionPrompt: (id: string) => void;
  removeSection: (id: string) => void;

  // Utility
  reset: () => void;
  getMasterPrompt: () => string;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

const initialState: TextPrompt = {
  global: '',
  negativeGlobal: '',
  globalVersion: 1,
  instruments: [],
  sections: [],
};

export const useTextPromptStore = create<TextPromptState>((set, get) => ({
  prompt: initialState,

  setGlobal: (text) =>
    set((state) => ({
      prompt: { ...state.prompt, global: text }
    })),

  setNegativeGlobal: (text) =>
    set((state) => ({
      prompt: { ...state.prompt, negativeGlobal: text }
    })),

  updateGlobalPrompt: () =>
    set((state) => ({
      prompt: { ...state.prompt, globalVersion: state.prompt.globalVersion + 1 }
    })),

  addInstrument: () => {
    const id = generateId();
    set((state) => ({
      prompt: {
        ...state.prompt,
        instruments: [
          ...state.prompt.instruments,
          { id, name: '', description: '', negativeDescription: '', version: 1 }
        ]
      }
    }));
    return id;
  },

  updateInstrument: (id, updates) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        instruments: state.prompt.instruments.map((inst) =>
          inst.id === id ? { ...inst, ...updates } : inst
        )
      }
    })),

  updateInstrumentPrompt: (id) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        instruments: state.prompt.instruments.map((inst) =>
          inst.id === id ? { ...inst, version: inst.version + 1 } : inst
        )
      }
    })),

  removeInstrument: (id) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        instruments: state.prompt.instruments.filter((inst) => inst.id !== id)
      }
    })),

  addSection: () => {
    const id = generateId();
    set((state) => ({
      prompt: {
        ...state.prompt,
        sections: [
          ...state.prompt.sections,
          { id, type: 'Verse', description: '', negativeDescription: '', version: 1 }
        ]
      }
    }));
    return id;
  },

  updateSection: (id, updates) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        sections: state.prompt.sections.map((section) =>
          section.id === id ? { ...section, ...updates } : section
        )
      }
    })),

  updateSectionPrompt: (id) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        sections: state.prompt.sections.map((section) =>
          section.id === id ? { ...section, version: section.version + 1 } : section
        )
      }
    })),

  removeSection: (id) =>
    set((state) => ({
      prompt: {
        ...state.prompt,
        sections: state.prompt.sections.filter((section) => section.id !== id)
      }
    })),

  reset: () => set({ prompt: initialState }),

  getMasterPrompt: () => {
    const { prompt } = get();
    let master = `GLOBAL:\nPositive: ${prompt.global}\n`;
    if (prompt.negativeGlobal) {
      master += `Negative: ${prompt.negativeGlobal}\n`;
    }
    master += '\n';

    if (prompt.instruments.length > 0) {
      master += `INSTRUMENTS:\n`;
      prompt.instruments.forEach((inst) => {
        if (inst.name && inst.description) {
          master += `${inst.name}:\n  Positive: ${inst.description}\n`;
          if (inst.negativeDescription) {
            master += `  Negative: ${inst.negativeDescription}\n`;
          }
        }
      });
      master += '\n';
    }

    if (prompt.sections.length > 0) {
      master += `SECTIONS:\n`;
      prompt.sections.forEach((section) => {
        if (section.description) {
          master += `${section.type}:\n  Positive: ${section.description}\n`;
          if (section.negativeDescription) {
            master += `  Negative: ${section.negativeDescription}\n`;
          }
        }
      });
    }

    return master;
  },
}));
