export interface Brief {
  id: string;
  raw_text: string;
  use_case?: string;
  reference_links?: string[];
  created_at: string;
}

export interface GeneratedPrompt {
  main_prompt: string;
  negative_prompt: string;
  parameters: {
    duration: number;
    variations: number;
    model: string;
  };
  knowledge_used: {
    prompt_version: string;
    genre: string;
    success_rate: number;
  };
}

export interface AudioVariation {
  id: number;
  audio_url: string;
  duration: number;
  ai_evaluation: {
    match_score: number;
    confidence: number;
  };
  technical_checks: {
    clipping: boolean;
    loudness_lufs: number;
    warnings: string[];
  };
}

export interface AssetMetadata {
  title: string;
  tags: string[];
  genre: string;
  mood: string[];
  instruments: string[];
  use_cases: string[];
  notes?: string;
}

export interface RejectionFeedback {
  reasons: string[];
  custom_reason?: string;
  notes?: string;
}

export interface AnalyticsData {
  key_metrics: {
    first_pass_approval: { value: number; trend: number };
    avg_turnaround_min: { value: number; trend: number };
    overall_approval: { value: number; trend: number };
  };
  approval_trend: Array<{ week: string; rate: number }>;
  genres: Array<{
    name: string;
    approval: number;
    count: number;
    status: "excellent" | "good" | "needs_work";
  }>;
  rejection_reasons: Array<{
    reason: string;
    count: number;
    percentage: number;
    trend: "up" | "down" | "stable";
  }>;
}

export interface DeliveryInfo {
  asset_id: string;
  turnaround_time_minutes: number;
  first_pass_approval: boolean;
}

export interface SoundLibraryExample {
  id: string;
  title: string;
  description: string;
  genre: string;
  mood: string[];
  instruments: string[];
  purpose: string[];
  duration: number;
  audio_url: string;
  prompt: string;
  negative_prompt?: string;
  stats: {
    approval_rate: number;
    total_uses: number;
    avg_rating: number;
  };
  tags: string[];
}

// ============= 3-Tier Prompt System Types =============

export interface Effect {
  type: string;
  parameters?: Record<string, string | number>;
}

export interface GlobalSettings {
  genre: string[];
  key: string;
  time_signature: string;
  tempo: {
    bpm: number;
    named: string;
  };
  mood: string[];
  version: number;
}

export interface Instrument {
  id: string;
  name: string;
  timbre: string[];
  effects: Effect[];
  vocal_techniques?: string[];
  version: number;
}

export interface PerformanceStyle {
  dynamics: string[];
  rhythm: string[];
  melody: string[];
}

export interface Section {
  id: string;
  type: string;
  included_instrument_ids: string[];
  performance: Record<string, PerformanceStyle>;
  version: number;
}

export interface ThreeTierPrompt {
  global_settings: GlobalSettings;
  instruments: Instrument[];
  sections: Section[];
}

// Prompt Library Types
export interface GlobalPromptData {
  genre: string[];
  key: string;
  time_signature: string;
  tempo: { bpm: number; named: string };
  mood: string[];
}

export interface InstrumentPromptData {
  name: string;
  timbre: string[];
  effects: Effect[];
  vocal_techniques?: string[];
}

export interface SectionPromptData {
  type: string;
  typical_instruments: string[];
  typical_performance: Record<string, PerformanceStyle>;
}

export type PromptData = GlobalPromptData | InstrumentPromptData | SectionPromptData;

export interface SavedPrompt {
  id: string;
  user_id: string;
  name: string;
  description: string;
  tags: string[];
  category: 'global' | 'instrument' | 'section';
  prompt_data: PromptData;
  stats: {
    total_uses: number;
    total_saves: number;
    avg_rating: number;
    approval_rate: number;
  };
  is_public: boolean;
  created_at: Date;
}

// Glossary Types
export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  subcategory?: string;
  applies_to: ('global' | 'instrument' | 'section')[];
  examples?: string[];
  related_terms?: string[];
  synonyms?: string[];
  audio_example_url?: string;
}

// ============= Version & Evaluation Types (PRD 02) =============

export interface EvaluationNotes {
  global: string;
  overall_audio: string;
  quality_rating: 'excellent' | 'good' | 'fair' | 'poor' | null;
  instruments: Record<string, string>;
  sections: Record<string, string>;
  last_saved_at?: Date;
}

export interface Version {
  id: string;
  project_id: string;
  version_number: number;
  parent_version_id: string | null;

  created_at: Date;
  updated_at: Date;

  prompt_structure: ThreeTierPrompt;
  evaluation_notes: EvaluationNotes;

  // Track what changed to determine regeneration scope
  change_scope: 'full' | 'section' | null; // null = initial version
  changed_component?: {
    type: 'global' | 'instrument' | 'section';
    id?: string; // For instrument/section
  };

  // Full audio (for global/instrument changes)
  audio_url: string;
  audio_duration_seconds: number;

  // Section-level audio (for section-only changes)
  section_audio_urls: Record<string, string>; // sectionId -> audio URL

  generation_status: 'pending' | 'generating' | 'complete' | 'failed';
  generation_started_at: Date | null;
  generation_completed_at: Date | null;

  api_request_id: string;
  api_credits_used: number;
  api_error: string | null;
}

export interface Change {
  tier: 'global' | 'instrument' | 'section';
  target_id?: string;
  field: string;
  old_value: any;
  new_value: any;
  reason: string;
  source_note: string;
  confidence: number;
}

export interface InterpretationResponse {
  changes: Change[];
  updated_prompt: ThreeTierPrompt;
  overall_confidence: number;
  processing_time_ms: number;
  warnings: string[];
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  version_ids: string[];
  current_version_id: string;
  settings: {
    auto_save_interval_seconds: number;
    max_versions: number | null;
  };
  total_api_credits_used: number;
  total_generation_time_seconds: number;
}

// ============= Prototype Types (Simple Text-Based) =============

export interface PrototypeInstrument {
  id: string;
  name: string;
  description: string;
  negativeDescription?: string;
}

export interface PrototypeSection {
  id: string;
  type: string;
  description: string;
  negativeDescription?: string;
}

export interface PrototypePromptData {
  global: string;
  negativeGlobal?: string;
  instruments: PrototypeInstrument[];
  sections: PrototypeSection[];
}

export interface PrototypeEvaluationNotes {
  global: string;
  instruments: Record<string, string>; // instrumentId -> notes
  sections: Record<string, string>; // sectionId -> notes
}

export interface PrototypeVersion {
  versionNumber: number;
  promptData: PrototypePromptData;
  evaluationNotes: PrototypeEvaluationNotes;
  createdAt: Date;
}

export interface PrototypeChange {
  category: 'global' | 'instrument' | 'section';
  targetId?: string; // For instrument/section changes
  targetName?: string; // Display name
  description: string; // Human-readable description
  oldValue?: string;
  newValue?: string;
}
