import {
  Brief,
  GeneratedPrompt,
  AudioVariation,
  AssetMetadata,
  AnalyticsData,
} from "./types";

export const sampleBrief: Brief = {
  id: "brief-001",
  raw_text:
    "Need Japanese city pop track for lifestyle brand video, 2 minutes, upbeat nostalgic vibe, smooth and sophisticated",
  use_case: "Brand Video",
  created_at: "2024-12-07T14:00:00Z",
};

export const generatedPrompt: GeneratedPrompt = {
  main_prompt:
    "Smooth Japanese city pop track, late 70s/early 80s style. Warm electric piano (Rhodes character) and clean electric guitar with subtle funk bass line. Lush string pads in background, light jazz-fusion drumming with crisp hi-hats. Sophisticated and nostalgic, polished production with analog warmth. Mid-tempo groove (~100 BPM feel), romantic urban energy.",
  negative_prompt:
    "Avoid lo-fi aesthetic, no vinyl crackle, no distortion, no modern EDM elements, no trap drums, no harsh digital synths, no muddy mix",
  parameters: {
    duration: 120,
    variations: 3,
    model: "ElevenLabs Music v1",
  },
  knowledge_used: {
    prompt_version: "city_pop_v1.3",
    genre: "City Pop",
    success_rate: 78,
  },
};

export const audioVariations: AudioVariation[] = [
  {
    id: 1,
    audio_url: "/audio/variation-1.mp3",
    duration: 118,
    ai_evaluation: {
      match_score: 87,
      confidence: 82,
    },
    technical_checks: {
      clipping: false,
      loudness_lufs: -14.2,
      warnings: ["2s shorter than requested"],
    },
  },
  {
    id: 2,
    audio_url: "/audio/variation-2.mp3",
    duration: 119,
    ai_evaluation: {
      match_score: 85,
      confidence: 79,
    },
    technical_checks: {
      clipping: false,
      loudness_lufs: -13.8,
      warnings: ["1s shorter than requested"],
    },
  },
  {
    id: 3,
    audio_url: "/audio/variation-3.mp3",
    duration: 117,
    ai_evaluation: {
      match_score: 82,
      confidence: 75,
    },
    technical_checks: {
      clipping: false,
      loudness_lufs: -15.1,
      warnings: ["3s shorter than requested", "Slightly lower energy in intro"],
    },
  },
];

export const metadata: AssetMetadata = {
  title: "CityPop_Smooth_Nostalgic_120s_v1",
  tags: [
    "city-pop",
    "japanese",
    "retro",
    "80s",
    "nostalgic",
    "smooth",
    "rhodes",
    "vintage",
  ],
  genre: "City Pop",
  mood: ["Nostalgic", "Sophisticated", "Upbeat"],
  instruments: ["Electric piano", "Guitar", "Bass", "Drums"],
  use_cases: ["Lifestyle content", "Background music", "Brand videos"],
};

export const analyticsData: AnalyticsData = {
  key_metrics: {
    first_pass_approval: { value: 72, trend: 8 },
    avg_turnaround_min: { value: 22, trend: -3 },
    overall_approval: { value: 74, trend: 6 },
  },
  approval_trend: [
    { week: "Week 1", rate: 58 },
    { week: "Week 2", rate: 62 },
    { week: "Week 3", rate: 60 },
    { week: "Week 4", rate: 64 },
    { week: "Week 5", rate: 66 },
    { week: "Week 6", rate: 65 },
    { week: "Week 7", rate: 68 },
    { week: "Week 8", rate: 70 },
    { week: "Week 9", rate: 69 },
    { week: "Week 10", rate: 71 },
    { week: "Week 11", rate: 73 },
    { week: "Week 12", rate: 72 },
  ],
  genres: [
    { name: "Lo-fi Hip Hop", approval: 89, count: 34, status: "excellent" },
    { name: "City Pop", approval: 78, count: 18, status: "good" },
    { name: "Synthwave", approval: 71, count: 29, status: "needs_work" },
    { name: "Ambient", approval: 82, count: 22, status: "excellent" },
    { name: "Chillhop", approval: 76, count: 15, status: "good" },
  ],
  rejection_reasons: [
    { reason: "Tempo too fast", count: 12, percentage: 33, trend: "up" },
    { reason: "Too modern", count: 9, percentage: 25, trend: "stable" },
    {
      reason: "Wrong instruments",
      count: 7,
      percentage: 19,
      trend: "down",
    },
    { reason: "Unclear mix", count: 5, percentage: 14, trend: "down" },
    { reason: "Other", count: 3, percentage: 8, trend: "stable" },
  ],
};

export const useCaseOptions = [
  "Brand Video",
  "Lifestyle Content",
  "Background Music",
  "Product Demo",
  "Social Media",
  "Podcast Intro",
  "Other",
];

export const rejectionReasons = [
  "Tempo too fast",
  "Tempo too slow",
  "Too modern sounding",
  "Too dated sounding",
  "Wrong instrumentation",
  "Energy too high",
  "Energy too low",
  "Mix issues",
  "Other",
];
