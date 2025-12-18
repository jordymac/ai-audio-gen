import { create } from 'zustand';
import {
  PrototypeVersion,
  PrototypePromptData,
  PrototypeEvaluationNotes,
  PrototypeChange,
  PrototypeInstrument,
  PrototypeSection
} from '@/lib/types';

interface PrototypeState {
  versions: PrototypeVersion[];
  currentVersionIndex: number;
  previewModalOpen: boolean;
  detectedChanges: PrototypeChange[];

  // Actions
  initializeV1: (promptData: PrototypePromptData, notes: PrototypeEvaluationNotes) => void;
  navigateToVersion: (index: number) => void;
  updateNotes: (notes: Partial<PrototypeEvaluationNotes>) => void;
  analyzeNotesAndPreview: () => void;
  generateV2: () => void;
  setPreviewModalOpen: (open: boolean) => void;
  getCurrentVersion: () => PrototypeVersion | null;
  canNavigatePrev: () => boolean;
  canNavigateNext: () => boolean;
}

// Hardcoded v1 data
const v1PromptData: PrototypePromptData = {
  global: 'a [neo-soul] track at 110bpm in [D minor] with [melancholic] mood, [lazy swing] drums, 4/4 time signature',
  negativeGlobal: 'no [aggressive] elements, avoid [fast tempo], exclude [harsh] sounds',
  instruments: [
    {
      id: 'vocal',
      name: 'Vocal',
      description: '[soulful] British female vocal, [intimate] delivery with [slight reverb]',
      negativeDescription: 'avoid [breathy] delivery, no [autotune]'
    },
    {
      id: 'bass',
      name: 'Bass',
      description: '[analog moog] bass with [clean] tone, [funky] groove',
      negativeDescription: 'no [muddy] low end, avoid [overcompression]'
    },
    {
      id: 'keys',
      name: 'Keys',
      description: '[smooth] electric piano with [warm] [reverb]',
      negativeDescription: 'no [harsh] tones, avoid [excessive reverb]'
    }
  ],
  sections: [
    {
      id: 'intro',
      type: 'Intro',
      description: 'vocals and keys only, [rubato] feel, [melancholic] delivery, no drums no bass',
      negativeDescription: 'no [drums], no [bass], avoid [loud] elements'
    },
    {
      id: 'verse',
      type: 'Verse',
      description: 'all instruments enter, [stripped back] arrangement, [staccato] bass line, [lazy swing] drums',
      negativeDescription: 'avoid [overcrowding], no [saxophone]'
    },
    {
      id: 'chorus',
      type: 'Chorus',
      description: 'full arrangement, [powerful] vocals, [crescendo] into the hook, [emotional] delivery',
      negativeDescription: 'no [thin] sound, avoid [weak] vocals'
    }
  ]
};

const v1Notes: PrototypeEvaluationNotes = {
  global: 'Tempo feels too slow, try 120bpm for more energy. Keep the melancholic mood but make it more uplifting',
  instruments: {
    vocal: 'Perfect, keep this exactly as is',
    bass: 'Too clean, needs more [distortion] and [saturation]',
    keys: 'Good, no changes needed'
  },
  sections: {
    intro: 'Works well, keep this',
    verse: 'Bass too prominent here, make it more [subtle] in the mix',
    chorus: 'Needs a bigger [saxophone] presence to lift the energy'
  }
};

// Hardcoded logic to generate v2 from v1 notes
const generateV2FromV1 = (): { promptData: PrototypePromptData; changes: PrototypeChange[] } => {
  const changes: PrototypeChange[] = [
    {
      category: 'global',
      description: 'Tempo 110bpm → 120bpm',
      oldValue: '110bpm',
      newValue: '120bpm'
    },
    {
      category: 'global',
      description: 'Added [uplifting] to mood',
      oldValue: 'with [melancholic] mood',
      newValue: 'with [melancholic] [uplifting] mood'
    },
    {
      category: 'instrument',
      targetId: 'bass',
      targetName: 'Bass',
      description: 'Added [distortion] and [saturation]',
      oldValue: '[clean] tone',
      newValue: '[distortion] and [saturation]'
    },
    {
      category: 'instrument',
      targetId: 'sax',
      targetName: 'Saxophone',
      description: 'Added Saxophone (new instrument)'
    },
    {
      category: 'section',
      targetId: 'verse',
      targetName: 'Verse',
      description: 'Bass now [subtle]',
      oldValue: '[staccato] bass line',
      newValue: '[subtle] bass in background'
    },
    {
      category: 'section',
      targetId: 'chorus',
      targetName: 'Chorus',
      description: 'Added [saxophone] to arrangement',
      oldValue: 'full arrangement,',
      newValue: 'full arrangement with [saxophone],'
    }
  ];

  const v2PromptData: PrototypePromptData = {
    global: 'a [neo-soul] track at 120bpm in [D minor] with [melancholic] [uplifting] mood, [lazy swing] drums, 4/4 time signature',
    negativeGlobal: 'no [aggressive] elements, avoid [fast tempo], exclude [harsh] sounds',
    instruments: [
      {
        id: 'vocal',
        name: 'Vocal',
        description: '[soulful] British female vocal, [intimate] delivery with [slight reverb]',
        negativeDescription: 'avoid [breathy] delivery, no [autotune]'
      },
      {
        id: 'bass',
        name: 'Bass',
        description: '[analog moog] bass with [distortion] and [saturation], [funky] groove',
        negativeDescription: 'no [muddy] low end, avoid [overcompression]'
      },
      {
        id: 'keys',
        name: 'Keys',
        description: '[smooth] electric piano with [warm] [reverb]',
        negativeDescription: 'no [harsh] tones, avoid [excessive reverb]'
      },
      {
        id: 'sax',
        name: 'Saxophone',
        description: '[emotional] saxophone with [big] presence, [powerful] delivery',
        negativeDescription: 'avoid [screechy] high notes, no [overblown] sounds'
      }
    ],
    sections: [
      {
        id: 'intro',
        type: 'Intro',
        description: 'vocals and keys only, [rubato] feel, [melancholic] delivery, no drums no bass',
        negativeDescription: 'no [drums], no [bass], avoid [loud] elements'
      },
      {
        id: 'verse',
        type: 'Verse',
        description: 'all instruments enter, [stripped back] arrangement, [subtle] bass in background, [lazy swing] drums',
        negativeDescription: 'avoid [overcrowding], no [saxophone], exclude [busy] arrangements'
      },
      {
        id: 'chorus',
        type: 'Chorus',
        description: 'full arrangement with [saxophone], [powerful] vocals, [crescendo] into the hook, [emotional] delivery',
        negativeDescription: 'no [thin] sound, avoid [weak] vocals'
      }
    ]
  };

  return { promptData: v2PromptData, changes };
};

export const usePrototypeStore = create<PrototypeState>((set, get) => ({
  versions: [],
  currentVersionIndex: 0,
  previewModalOpen: false,
  detectedChanges: [],

  initializeV1: (promptData, notes) => {
    const v1: PrototypeVersion = {
      versionNumber: 1,
      promptData,
      evaluationNotes: notes,
      createdAt: new Date()
    };
    set({ versions: [v1], currentVersionIndex: 0 });
  },

  navigateToVersion: (index) => {
    const state = get();
    if (index >= 0 && index < state.versions.length) {
      set({ currentVersionIndex: index });
    }
  },

  updateNotes: (noteUpdates) => {
    const state = get();
    const currentVersion = state.versions[state.currentVersionIndex];
    if (!currentVersion) return;

    const updatedVersion = {
      ...currentVersion,
      evaluationNotes: {
        ...currentVersion.evaluationNotes,
        ...noteUpdates
      }
    };

    const updatedVersions = [...state.versions];
    updatedVersions[state.currentVersionIndex] = updatedVersion;
    set({ versions: updatedVersions });
  },

  analyzeNotesAndPreview: () => {
    const state = get();
    if (state.currentVersionIndex === 0) {
      // Hardcoded v1 to v2 transition
      const { changes } = generateV2FromV1();
      set({ detectedChanges: changes, previewModalOpen: true });
    }
  },

  generateV2: () => {
    const state = get();
    if (state.currentVersionIndex === 0 && state.versions.length === 1) {
      const { promptData } = generateV2FromV1();
      const v2: PrototypeVersion = {
        versionNumber: 2,
        promptData,
        evaluationNotes: {
          global: '',
          instruments: {},
          sections: {}
        },
        createdAt: new Date()
      };

      set({
        versions: [...state.versions, v2],
        currentVersionIndex: 1,
        previewModalOpen: false,
        detectedChanges: []
      });
    }
  },

  setPreviewModalOpen: (open) => set({ previewModalOpen: open }),

  getCurrentVersion: () => {
    const state = get();
    return state.versions[state.currentVersionIndex] || null;
  },

  canNavigatePrev: () => {
    const state = get();
    return state.currentVersionIndex > 0;
  },

  canNavigateNext: () => {
    const state = get();
    return state.currentVersionIndex < state.versions.length - 1;
  }
}));

// Export initial data for use in components
export { v1PromptData, v1Notes };
