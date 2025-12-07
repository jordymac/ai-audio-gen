import {
  Brief,
  GeneratedPrompt,
  AudioVariation,
  AssetMetadata,
  AnalyticsData,
  SoundLibraryExample,
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

export const soundLibraryExamples: SoundLibraryExample[] = [
  {
    id: "sl-001",
    title: "Smooth City Pop Nostalgia",
    description: "Classic Japanese city pop with warm Rhodes and sophisticated vibe",
    genre: "City Pop",
    mood: ["Nostalgic", "Sophisticated", "Upbeat"],
    instruments: ["Electric Piano", "Guitar", "Bass", "Drums"],
    purpose: ["Brand Video", "Lifestyle Content", "Background Music"],
    duration: 120,
    audio_url: "/audio/variation-1.mp3",
    prompt: "Smooth Japanese city pop track, late 70s/early 80s style. Warm electric piano (Rhodes character) and clean electric guitar with subtle funk bass line. Lush string pads in background, light jazz-fusion drumming with crisp hi-hats. Sophisticated and nostalgic, polished production with analog warmth. Mid-tempo groove (~100 BPM feel), romantic urban energy.",
    negative_prompt: "Avoid lo-fi aesthetic, no vinyl crackle, no distortion, no modern EDM elements, no trap drums, no harsh digital synths, no muddy mix",
    stats: {
      approval_rate: 89,
      total_uses: 47,
      avg_rating: 4.6,
    },
    tags: ["city-pop", "japanese", "retro", "80s", "smooth", "rhodes"],
  },
  {
    id: "sl-002",
    title: "Lo-fi Study Beats",
    description: "Relaxed lo-fi hip hop perfect for focus and concentration",
    genre: "Lo-fi Hip Hop",
    mood: ["Relaxed", "Calm", "Focused"],
    instruments: ["Piano", "Vinyl Samples", "Drums", "Bass"],
    purpose: ["Background Music", "Study Content", "Meditation"],
    duration: 180,
    audio_url: "/audio/variation-2.mp3",
    prompt: "Chill lo-fi hip hop beat with warm vinyl crackle texture. Soft dusty drums with laid-back swing, mellow piano chords with slight pitch wobble. Warm bass line, ambient rain sounds in background. Nostalgic and peaceful, perfect for studying. ~75 BPM, lots of space and breathing room in the mix.",
    negative_prompt: "No aggressive drums, no EDM elements, no heavy bass, no bright aggressive sounds, no fast tempo",
    stats: {
      approval_rate: 94,
      total_uses: 132,
      avg_rating: 4.8,
    },
    tags: ["lo-fi", "chill", "study", "ambient", "relaxing"],
  },
  {
    id: "sl-003",
    title: "Synthwave Sunset Drive",
    description: "Retro 80s synthwave with driving energy and neon aesthetics",
    genre: "Synthwave",
    mood: ["Energetic", "Nostalgic", "Cinematic"],
    instruments: ["Synthesizer", "Drums", "Bass", "Arpeggiator"],
    purpose: ["Brand Video", "Social Media", "Product Demo"],
    duration: 150,
    audio_url: "/audio/variation-3.mp3",
    prompt: "Retro synthwave track with lush analog synth pads and punchy drums. Bright lead synth melody over driving bassline. Arpeggiated synths creating movement, gated reverb on snare. Nostalgic 80s vibe but with modern production clarity. ~120 BPM, build to epic chorus with layered synths.",
    negative_prompt: "No EDM drops, no dubstep wobbles, no modern trap elements, no auto-tune vocals",
    stats: {
      approval_rate: 76,
      total_uses: 58,
      avg_rating: 4.3,
    },
    tags: ["synthwave", "80s", "retro", "electronic", "cinematic"],
  },
  {
    id: "sl-004",
    title: "Uplifting Corporate",
    description: "Inspiring corporate background music with positive energy",
    genre: "Corporate",
    mood: ["Uplifting", "Professional", "Motivating"],
    instruments: ["Piano", "Guitar", "Strings", "Drums"],
    purpose: ["Brand Video", "Product Demo", "Corporate Presentation"],
    duration: 90,
    audio_url: "/audio/variation-1.mp3",
    prompt: "Uplifting corporate track with bright acoustic piano and clean electric guitar. Gentle building structure with warm string pads. Steady, confident drums (not too aggressive). Professional and inspiring, modern production. ~110 BPM, crescendo to optimistic conclusion.",
    negative_prompt: "No cheesy stock music clichés, no over-the-top enthusiasm, no aggressive sounds",
    stats: {
      approval_rate: 82,
      total_uses: 91,
      avg_rating: 4.4,
    },
    tags: ["corporate", "business", "professional", "uplifting", "inspiring"],
  },
  {
    id: "sl-005",
    title: "Ambient Ethereal Soundscape",
    description: "Atmospheric ambient texture for meditation and relaxation",
    genre: "Ambient",
    mood: ["Peaceful", "Ethereal", "Meditative"],
    instruments: ["Synth Pads", "Texture", "Atmospheric Effects"],
    purpose: ["Meditation", "Background Music", "Wellness Content"],
    duration: 240,
    audio_url: "/audio/variation-2.mp3",
    prompt: "Ethereal ambient soundscape with lush evolving synth pads. Gentle swells and subtle textures, no rhythm or drums. Spacious reverb creating sense of vastness. Peaceful and meditative, slowly evolving harmonic progressions. Micro-details and subtle movement throughout.",
    negative_prompt: "No drums, no rhythm, no sharp transients, no sudden changes, no aggressive sounds",
    stats: {
      approval_rate: 91,
      total_uses: 73,
      avg_rating: 4.7,
    },
    tags: ["ambient", "meditation", "peaceful", "atmospheric", "healing"],
  },
  {
    id: "sl-006",
    title: "Funky Indie Pop",
    description: "Playful indie pop with funk elements and catchy groove",
    genre: "Indie Pop",
    mood: ["Playful", "Upbeat", "Fun"],
    instruments: ["Guitar", "Bass", "Drums", "Synth"],
    purpose: ["Social Media", "Lifestyle Content", "Brand Video"],
    duration: 135,
    audio_url: "/audio/variation-3.mp3",
    prompt: "Upbeat indie pop track with funky guitar riffs and bouncy bass line. Crisp drums with tight groove, playful synth accents. Bright and energetic, modern indie production with vintage funk touches. ~115 BPM, infectious energy and movement.",
    negative_prompt: "No heavy EDM, no aggressive distortion, no dark moods, no slow tempo",
    stats: {
      approval_rate: 85,
      total_uses: 64,
      avg_rating: 4.5,
    },
    tags: ["indie", "pop", "funky", "upbeat", "playful"],
  },
  {
    id: "sl-007",
    title: "Minimal Tech House",
    description: "Clean minimal house with hypnotic groove and subtle progression",
    genre: "Electronic",
    mood: ["Focused", "Hypnotic", "Energetic"],
    instruments: ["Drums", "Bass", "Synth", "Percussion"],
    purpose: ["Background Music", "Social Media", "Fashion Content"],
    duration: 180,
    audio_url: "/audio/variation-1.mp3",
    prompt: "Minimal tech house track with tight kick drum and rolling percussion. Deep but not aggressive bass line, subtle synth stabs. Hypnotic and repetitive but evolving, clean production. ~124 BPM, space between elements, building intensity through subtle changes.",
    negative_prompt: "No big room EDM, no massive drops, no cheesy synths, no vocals",
    stats: {
      approval_rate: 79,
      total_uses: 41,
      avg_rating: 4.2,
    },
    tags: ["house", "minimal", "electronic", "techno", "groove"],
  },
  {
    id: "sl-008",
    title: "Acoustic Folk Warmth",
    description: "Warm acoustic folk with storytelling feel and organic instruments",
    genre: "Folk",
    mood: ["Warm", "Intimate", "Heartfelt"],
    instruments: ["Acoustic Guitar", "Piano", "Strings", "Light Percussion"],
    purpose: ["Brand Video", "Lifestyle Content", "Documentary"],
    duration: 165,
    audio_url: "/audio/variation-2.mp3",
    prompt: "Warm acoustic folk track with fingerpicked guitar and gentle piano. Subtle string arrangement adding emotional depth. Light percussion with brushes on drums. Intimate and heartfelt, organic recording feel. ~85 BPM, gentle ebb and flow.",
    negative_prompt: "No heavy production, no electronic elements, no aggressive drums, no modern pop sounds",
    stats: {
      approval_rate: 88,
      total_uses: 56,
      avg_rating: 4.6,
    },
    tags: ["folk", "acoustic", "warm", "organic", "storytelling"],
  },
];
