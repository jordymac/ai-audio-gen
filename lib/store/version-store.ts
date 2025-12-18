import { create } from 'zustand';
import { Version, EvaluationNotes, ThreeTierPrompt, InterpretationResponse, Change, GlobalSettings, Instrument, Section } from '@/lib/types';

interface VersionState {
  project_id: string;
  versions: Version[];
  current_version_id: string;
  is_generating: boolean;
  preview_modal_open: boolean;
  manual_editor_open: boolean;
  interpretation_result: InterpretationResponse | null;

  // Actions
  loadProject: (projectId: string, versions: Version[]) => void;
  createVersion: (prompt: ThreeTierPrompt, parentId: string) => string;
  updateNotes: (versionId: string, notes: Partial<EvaluationNotes>) => void;
  navigateToVersion: (versionId: string) => void;
  interpretNotes: (versionId: string) => Promise<InterpretationResponse>;
  generateAudio: (versionId: string, prompt: ThreeTierPrompt) => Promise<void>;
  setPreviewModalOpen: (open: boolean) => void;
  setManualEditorOpen: (open: boolean) => void;
  getCurrentVersion: () => Version | null;

  // Component-level generation
  generateFromGlobal: (versionId: string, updatedGlobal: GlobalSettings) => Promise<void>;
  generateFromInstrument: (versionId: string, instrumentId: string, updatedInstrument: Instrument) => Promise<void>;
  generateFromSection: (versionId: string, sectionId: string, updatedSection: Section) => Promise<void>;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

// Mock notes interpretation - simulates AI interpretation
const mockInterpretNotes = async (
  version: Version
): Promise<InterpretationResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const changes: Change[] = [];
  const notes = version.evaluation_notes;
  const prompt = version.prompt_structure;

  // Parse global notes
  if (notes.global) {
    const globalText = notes.global.toLowerCase();

    // Tempo changes
    if (globalText.includes('faster') || globalText.includes('more energy')) {
      changes.push({
        tier: 'global',
        field: 'tempo.bpm',
        old_value: prompt.global_settings.tempo.bpm,
        new_value: Math.min(200, prompt.global_settings.tempo.bpm + 20),
        reason: 'User requested faster tempo and more energy',
        source_note: notes.global,
        confidence: 0.92
      });
    }

    if (globalText.includes('slower') || globalText.includes('chill')) {
      changes.push({
        tier: 'global',
        field: 'tempo.bpm',
        old_value: prompt.global_settings.tempo.bpm,
        new_value: Math.max(40, prompt.global_settings.tempo.bpm - 20),
        reason: 'User requested slower, more relaxed tempo',
        source_note: notes.global,
        confidence: 0.90
      });
    }

    // Mood changes
    if (globalText.includes('energetic') || globalText.includes('uplifting')) {
      if (!prompt.global_settings.mood.includes('Energetic')) {
        changes.push({
          tier: 'global',
          field: 'mood',
          old_value: prompt.global_settings.mood,
          new_value: [...prompt.global_settings.mood, 'Energetic'],
          reason: 'Add energetic mood as requested',
          source_note: notes.global,
          confidence: 0.88
        });
      }
    }
  }

  // Parse instrument notes
  Object.entries(notes.instruments).forEach(([instrumentId, note]) => {
    if (!note) return;

    const noteText = note.toLowerCase();
    const instrument = prompt.instruments.find(i => i.id === instrumentId);
    if (!instrument) return;

    // Effect changes
    if (noteText.includes('saturation') || noteText.includes('grit') || noteText.includes('dirty')) {
      changes.push({
        tier: 'instrument',
        target_id: instrumentId,
        field: 'effects',
        old_value: instrument.effects,
        new_value: [...instrument.effects, { type: 'Heavy Saturation' }],
        reason: `Add saturation to ${instrument.name} for more grit`,
        source_note: note,
        confidence: 0.85
      });
    }

    if (noteText.includes('too clean') || noteText.includes('needs distortion')) {
      changes.push({
        tier: 'instrument',
        target_id: instrumentId,
        field: 'effects',
        old_value: instrument.effects,
        new_value: [...instrument.effects, { type: 'Distortion', parameters: { level: 'Medium' } }],
        reason: `Add distortion to ${instrument.name}`,
        source_note: note,
        confidence: 0.82
      });
    }
  });

  // Parse section notes
  Object.entries(notes.sections).forEach(([sectionId, note]) => {
    if (!note) return;

    const noteText = note.toLowerCase();
    const section = prompt.sections.find(s => s.id === sectionId);
    if (!section) return;

    // Check for instrument removal
    prompt.instruments.forEach((instrument) => {
      if (noteText.includes(`remove ${instrument.name.toLowerCase()}`)) {
        changes.push({
          tier: 'section',
          target_id: sectionId,
          field: 'included_instrument_ids',
          old_value: section.included_instrument_ids,
          new_value: section.included_instrument_ids.filter(id => id !== instrument.id),
          reason: `Remove ${instrument.name} from ${section.type} as requested`,
          source_note: note,
          confidence: 0.78
        });
      }
    });
  });

  // Build updated prompt with changes
  const updatedPrompt = JSON.parse(JSON.stringify(prompt)) as ThreeTierPrompt;

  changes.forEach(change => {
    if (change.tier === 'global') {
      if (change.field === 'tempo.bpm') {
        updatedPrompt.global_settings.tempo.bpm = change.new_value;
      } else if (change.field === 'mood') {
        updatedPrompt.global_settings.mood = change.new_value;
      }
    } else if (change.tier === 'instrument' && change.target_id) {
      const inst = updatedPrompt.instruments.find(i => i.id === change.target_id);
      if (inst && change.field === 'effects') {
        inst.effects = change.new_value;
      }
    } else if (change.tier === 'section' && change.target_id) {
      const sect = updatedPrompt.sections.find(s => s.id === change.target_id);
      if (sect && change.field === 'included_instrument_ids') {
        sect.included_instrument_ids = change.new_value;
      }
    }
  });

  return {
    changes,
    updated_prompt: updatedPrompt,
    overall_confidence: changes.length > 0
      ? changes.reduce((sum, c) => sum + c.confidence, 0) / changes.length
      : 1,
    processing_time_ms: 1000,
    warnings: changes.filter(c => c.confidence < 0.7).map(
      c => `Low confidence (${Math.round(c.confidence * 100)}%) on: ${c.reason}`
    )
  };
};

export const useVersionStore = create<VersionState>((set, get) => ({
  project_id: '',
  versions: [],
  current_version_id: '',
  is_generating: false,
  preview_modal_open: false,
  manual_editor_open: false,
  interpretation_result: null,

  loadProject: (projectId, versions) =>
    set({
      project_id: projectId,
      versions,
      current_version_id: versions.length > 0 ? versions[versions.length - 1].id : ''
    }),

  createVersion: (prompt, parentId) => {
    const state = get();
    const newId = generateId();
    const parentVersion = state.versions.find(v => v.id === parentId);
    const versionNumber = parentVersion ? parentVersion.version_number + 1 : 1;

    const newVersion: Version = {
      id: newId,
      project_id: state.project_id,
      version_number: versionNumber,
      parent_version_id: parentId,
      created_at: new Date(),
      updated_at: new Date(),
      prompt_structure: prompt,
      evaluation_notes: {
        global: '',
        overall_audio: '',
        quality_rating: null,
        instruments: {},
        sections: {}
      },
      change_scope: null,
      audio_url: '',
      audio_duration_seconds: 0,
      section_audio_urls: {},
      generation_status: 'pending',
      generation_started_at: null,
      generation_completed_at: null,
      api_request_id: '',
      api_credits_used: 0,
      api_error: null
    };

    set({
      versions: [...state.versions, newVersion],
      current_version_id: newId
    });

    return newId;
  },

  updateNotes: (versionId, noteUpdates) =>
    set(state => ({
      versions: state.versions.map(v =>
        v.id === versionId
          ? {
              ...v,
              evaluation_notes: {
                ...v.evaluation_notes,
                ...noteUpdates,
                last_saved_at: new Date()
              },
              updated_at: new Date()
            }
          : v
      )
    })),

  navigateToVersion: (versionId) =>
    set({ current_version_id: versionId }),

  interpretNotes: async (versionId) => {
    const state = get();
    const version = state.versions.find(v => v.id === versionId);

    if (!version) {
      throw new Error('Version not found');
    }

    const result = await mockInterpretNotes(version);
    set({ interpretation_result: result });
    return result;
  },

  generateAudio: async (versionId, prompt) => {
    set({ is_generating: true });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock audio URL
      const mockAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

      set(state => ({
        versions: state.versions.map(v =>
          v.id === versionId
            ? {
                ...v,
                audio_url: mockAudioUrl,
                audio_duration_seconds: 180,
                generation_status: 'complete' as const,
                generation_completed_at: new Date(),
                api_request_id: generateId(),
                api_credits_used: 1.5
              }
            : v
        ),
        is_generating: false,
        current_version_id: versionId
      }));
    } catch (error) {
      set(state => ({
        versions: state.versions.map(v =>
          v.id === versionId
            ? {
                ...v,
                generation_status: 'failed' as const,
                api_error: error instanceof Error ? error.message : 'Unknown error'
              }
            : v
        ),
        is_generating: false
      }));
    }
  },

  setPreviewModalOpen: (open) =>
    set({ preview_modal_open: open }),

  setManualEditorOpen: (open) =>
    set({ manual_editor_open: open }),

  getCurrentVersion: () => {
    const state = get();
    return state.versions.find(v => v.id === state.current_version_id) || null;
  },

  // Component-level generation - creates new version with only that component changed
  generateFromGlobal: async (versionId, updatedGlobal) => {
    const state = get();
    const currentVersion = state.versions.find(v => v.id === versionId);
    if (!currentVersion) return;

    // Create new version with updated global settings
    const updatedPrompt: ThreeTierPrompt = {
      ...currentVersion.prompt_structure,
      global_settings: updatedGlobal
    };

    const newId = generateId();
    const newVersion: Version = {
      id: newId,
      project_id: state.project_id,
      version_number: currentVersion.version_number + 1,
      parent_version_id: versionId,
      created_at: new Date(),
      updated_at: new Date(),
      prompt_structure: updatedPrompt,
      evaluation_notes: {
        global: '',
        overall_audio: '',
        quality_rating: null,
        instruments: {},
        sections: {}
      },
      change_scope: 'full', // Global change = full regeneration
      changed_component: { type: 'global' },
      audio_url: '',
      audio_duration_seconds: 0,
      section_audio_urls: {},
      generation_status: 'generating',
      generation_started_at: new Date(),
      generation_completed_at: null,
      api_request_id: generateId(),
      api_credits_used: 0,
      api_error: null
    };

    set({
      versions: [...state.versions, newVersion],
      current_version_id: newId,
      is_generating: true
    });

    // Simulate full audio generation (global changes regenerate entire song)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

    set(state => ({
      versions: state.versions.map(v =>
        v.id === newId
          ? {
              ...v,
              audio_url: mockAudioUrl,
              audio_duration_seconds: 180,
              generation_status: 'complete' as const,
              generation_completed_at: new Date(),
              api_credits_used: 2.0
            }
          : v
      ),
      is_generating: false
    }));
  },

  generateFromInstrument: async (versionId, instrumentId, updatedInstrument) => {
    const state = get();
    const currentVersion = state.versions.find(v => v.id === versionId);
    if (!currentVersion) return;

    // Create new version with updated instrument
    const updatedPrompt: ThreeTierPrompt = {
      ...currentVersion.prompt_structure,
      instruments: currentVersion.prompt_structure.instruments.map(inst =>
        inst.id === instrumentId ? updatedInstrument : inst
      )
    };

    const newId = generateId();
    const newVersion: Version = {
      id: newId,
      project_id: state.project_id,
      version_number: currentVersion.version_number + 1,
      parent_version_id: versionId,
      created_at: new Date(),
      updated_at: new Date(),
      prompt_structure: updatedPrompt,
      evaluation_notes: {
        global: '',
        overall_audio: '',
        quality_rating: null,
        instruments: {},
        sections: {}
      },
      change_scope: 'full', // Instrument change = full regeneration
      changed_component: { type: 'instrument', id: instrumentId },
      audio_url: '',
      audio_duration_seconds: 0,
      section_audio_urls: {},
      generation_status: 'generating',
      generation_started_at: new Date(),
      generation_completed_at: null,
      api_request_id: generateId(),
      api_credits_used: 0,
      api_error: null
    };

    set({
      versions: [...state.versions, newVersion],
      current_version_id: newId,
      is_generating: true
    });

    // Simulate full audio generation (instrument changes regenerate entire song)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';

    set(state => ({
      versions: state.versions.map(v =>
        v.id === newId
          ? {
              ...v,
              audio_url: mockAudioUrl,
              audio_duration_seconds: 180,
              generation_status: 'complete' as const,
              generation_completed_at: new Date(),
              api_credits_used: 2.0
            }
          : v
      ),
      is_generating: false
    }));
  },

  generateFromSection: async (versionId, sectionId, updatedSection) => {
    const state = get();
    const currentVersion = state.versions.find(v => v.id === versionId);
    if (!currentVersion) return;

    // Create new version with updated section
    const updatedPrompt: ThreeTierPrompt = {
      ...currentVersion.prompt_structure,
      sections: currentVersion.prompt_structure.sections.map(sect =>
        sect.id === sectionId ? updatedSection : sect
      )
    };

    const newId = generateId();
    const newVersion: Version = {
      id: newId,
      project_id: state.project_id,
      version_number: currentVersion.version_number + 1,
      parent_version_id: versionId,
      created_at: new Date(),
      updated_at: new Date(),
      prompt_structure: updatedPrompt,
      evaluation_notes: {
        global: '',
        overall_audio: '',
        quality_rating: null,
        instruments: {},
        sections: {}
      },
      change_scope: 'section', // Section change = only that section regenerated
      changed_component: { type: 'section', id: sectionId },
      audio_url: currentVersion.audio_url, // Keep existing full audio
      audio_duration_seconds: currentVersion.audio_duration_seconds,
      section_audio_urls: {
        ...currentVersion.section_audio_urls
      },
      generation_status: 'generating',
      generation_started_at: new Date(),
      generation_completed_at: null,
      api_request_id: generateId(),
      api_credits_used: 0,
      api_error: null
    };

    set({
      versions: [...state.versions, newVersion],
      current_version_id: newId,
      is_generating: true
    });

    // Simulate section-only audio generation (like ElevenLabs)
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockSectionAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3';

    set(state => ({
      versions: state.versions.map(v =>
        v.id === newId
          ? {
              ...v,
              section_audio_urls: {
                ...v.section_audio_urls,
                [sectionId]: mockSectionAudioUrl
              },
              generation_status: 'complete' as const,
              generation_completed_at: new Date(),
              api_credits_used: 0.5 // Cheaper to regenerate just a section
            }
          : v
      ),
      is_generating: false
    }));
  }
}));
