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
