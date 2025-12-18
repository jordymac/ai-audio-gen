import { SavedPrompt, GlobalPromptData, InstrumentPromptData, SectionPromptData } from './types';

// Global Settings Examples
export const globalPromptExamples: SavedPrompt[] = [
  {
    id: 'global-1',
    user_id: 'system',
    name: 'Upbeat Pop',
    description: 'Energetic pop music with major key and fast tempo',
    tags: ['pop', 'energetic', 'uplifting'],
    category: 'global',
    prompt_data: {
      genre: ['Pop'],
      key: 'C Major',
      time_signature: '4/4',
      tempo: { bpm: 128, named: 'Allegro' },
      mood: ['Energetic', 'Uplifting']
    } as GlobalPromptData,
    stats: {
      total_uses: 452,
      total_saves: 89,
      avg_rating: 4.7,
      approval_rate: 92
    },
    is_public: true,
    created_at: new Date('2024-01-15')
  },
  {
    id: 'global-2',
    user_id: 'system',
    name: 'Melancholic Indie',
    description: 'Introspective indie music with minor key and moderate tempo',
    tags: ['indie', 'melancholic', 'emotional'],
    category: 'global',
    prompt_data: {
      genre: ['Indie', 'Rock'],
      key: 'D Minor',
      time_signature: '4/4',
      tempo: { bpm: 95, named: 'Andante' },
      mood: ['Melancholic', 'Reflective']
    } as GlobalPromptData,
    stats: {
      total_uses: 328,
      total_saves: 67,
      avg_rating: 4.5,
      approval_rate: 88
    },
    is_public: true,
    created_at: new Date('2024-01-20')
  },
  {
    id: 'global-3',
    user_id: 'system',
    name: 'Epic Cinematic',
    description: 'Grand orchestral feel with dramatic mood',
    tags: ['cinematic', 'epic', 'dramatic'],
    category: 'global',
    prompt_data: {
      genre: ['Classical', 'Electronic'],
      key: 'G Major',
      time_signature: '4/4',
      tempo: { bpm: 140, named: 'Allegro' },
      mood: ['Epic', 'Triumphant', 'Dark']
    } as GlobalPromptData,
    stats: {
      total_uses: 567,
      total_saves: 123,
      avg_rating: 4.8,
      approval_rate: 94
    },
    is_public: true,
    created_at: new Date('2024-01-10')
  },
  {
    id: 'global-4',
    user_id: 'system',
    name: 'Chill Lo-fi',
    description: 'Relaxed lo-fi hip-hop vibe',
    tags: ['lofi', 'chill', 'peaceful'],
    category: 'global',
    prompt_data: {
      genre: ['Hip-Hop', 'Jazz'],
      key: 'F Major',
      time_signature: '4/4',
      tempo: { bpm: 85, named: 'Andante' },
      mood: ['Peaceful', 'Nostalgic']
    } as GlobalPromptData,
    stats: {
      total_uses: 612,
      total_saves: 145,
      avg_rating: 4.6,
      approval_rate: 90
    },
    is_public: true,
    created_at: new Date('2024-02-01')
  },
  {
    id: 'global-5',
    user_id: 'system',
    name: 'Dark Electronic',
    description: 'Mysterious electronic with minor key',
    tags: ['electronic', 'dark', 'mysterious'],
    category: 'global',
    prompt_data: {
      genre: ['Electronic'],
      key: 'C Minor',
      time_signature: '4/4',
      tempo: { bpm: 120, named: 'Moderato' },
      mood: ['Dark', 'Mysterious']
    } as GlobalPromptData,
    stats: {
      total_uses: 389,
      total_saves: 78,
      avg_rating: 4.4,
      approval_rate: 85
    },
    is_public: true,
    created_at: new Date('2024-01-25')
  },
  {
    id: 'global-6',
    user_id: 'system',
    name: 'Jazz Ballad',
    description: 'Smooth jazz with romantic feel',
    tags: ['jazz', 'romantic', 'smooth'],
    category: 'global',
    prompt_data: {
      genre: ['Jazz'],
      key: 'Bb Major',
      time_signature: '4/4',
      tempo: { bpm: 72, named: 'Adagio' },
      mood: ['Romantic', 'Peaceful']
    } as GlobalPromptData,
    stats: {
      total_uses: 234,
      total_saves: 52,
      avg_rating: 4.7,
      approval_rate: 91
    },
    is_public: true,
    created_at: new Date('2024-02-05')
  },
];

// Instrument Preset Examples
export const instrumentPromptExamples: SavedPrompt[] = [
  {
    id: 'inst-1',
    user_id: 'system',
    name: 'Warm Acoustic Guitar',
    description: 'Fingerstyle acoustic guitar with warm, mellow tone',
    tags: ['acoustic', 'guitar', 'warm'],
    category: 'instrument',
    prompt_data: {
      name: 'Acoustic Guitar',
      timbre: ['Warm', 'Mellow', 'Rich'],
      effects: [
        { type: 'Reverb', parameters: { room_size: 'Small' } },
        { type: 'Compression', parameters: { ratio: '3:1' } }
      ]
    } as InstrumentPromptData,
    stats: {
      total_uses: 523,
      total_saves: 98,
      avg_rating: 4.6,
      approval_rate: 89
    },
    is_public: true,
    created_at: new Date('2024-01-12')
  },
  {
    id: 'inst-2',
    user_id: 'system',
    name: 'Distorted Rock Guitar',
    description: 'Heavy distorted electric guitar for rock',
    tags: ['electric', 'guitar', 'rock', 'distorted'],
    category: 'instrument',
    prompt_data: {
      name: 'Electric Guitar',
      timbre: ['Bright', 'Harsh', 'Distorted'],
      effects: [
        { type: 'Distortion', parameters: { level: 'Heavy' } },
        { type: 'Reverb', parameters: { room_size: 'Medium' } }
      ]
    } as InstrumentPromptData,
    stats: {
      total_uses: 678,
      total_saves: 134,
      avg_rating: 4.7,
      approval_rate: 92
    },
    is_public: true,
    created_at: new Date('2024-01-18')
  },
  {
    id: 'inst-3',
    user_id: 'system',
    name: 'Soulful R&B Vocals',
    description: 'Expressive R&B vocals with melisma and vibrato',
    tags: ['vocals', 'rnb', 'soulful'],
    category: 'instrument',
    prompt_data: {
      name: 'Vocals',
      timbre: ['Rich', 'Warm', 'Smooth'],
      effects: [
        { type: 'Reverb', parameters: { room_size: 'Hall' } },
        { type: 'Compression', parameters: { ratio: '4:1' } },
        { type: 'Delay', parameters: { time: 'Short', feedback: 'Low' } }
      ],
      vocal_techniques: ['Melisma', 'Vibrato', 'Belt']
    } as InstrumentPromptData,
    stats: {
      total_uses: 445,
      total_saves: 89,
      avg_rating: 4.8,
      approval_rate: 93
    },
    is_public: true,
    created_at: new Date('2024-01-22')
  },
  {
    id: 'inst-4',
    user_id: 'system',
    name: 'Deep Bass Synth',
    description: 'Sub bass synth with dark, rich tone',
    tags: ['synth', 'bass', 'electronic'],
    category: 'instrument',
    prompt_data: {
      name: 'Synth',
      timbre: ['Dark', 'Rich', 'Thick', 'Layered'],
      effects: [
        { type: 'Compression', parameters: { ratio: '8:1' } },
        { type: 'EQ', parameters: { preset: 'Bass boost' } }
      ]
    } as InstrumentPromptData,
    stats: {
      total_uses: 567,
      total_saves: 112,
      avg_rating: 4.5,
      approval_rate: 87
    },
    is_public: true,
    created_at: new Date('2024-02-03')
  },
  {
    id: 'inst-5',
    user_id: 'system',
    name: 'Bright Piano',
    description: 'Clear, bright piano with natural reverb',
    tags: ['piano', 'bright', 'acoustic'],
    category: 'instrument',
    prompt_data: {
      name: 'Piano',
      timbre: ['Bright', 'Rich', 'Clean'],
      effects: [
        { type: 'Reverb', parameters: { room_size: 'Medium' } }
      ]
    } as InstrumentPromptData,
    stats: {
      total_uses: 789,
      total_saves: 156,
      avg_rating: 4.9,
      approval_rate: 95
    },
    is_public: true,
    created_at: new Date('2024-01-08')
  },
  {
    id: 'inst-6',
    user_id: 'system',
    name: '80s Synth Pad',
    description: 'Lush retro synth pad with chorus',
    tags: ['synth', '80s', 'pad'],
    category: 'instrument',
    prompt_data: {
      name: 'Synth Pad',
      timbre: ['Warm', 'Layered', 'Rich'],
      effects: [
        { type: 'Chorus' },
        { type: 'Reverb', parameters: { room_size: 'Large' } }
      ]
    } as InstrumentPromptData,
    stats: {
      total_uses: 412,
      total_saves: 87,
      avg_rating: 4.6,
      approval_rate: 88
    },
    is_public: true,
    created_at: new Date('2024-02-10')
  },
  {
    id: 'inst-7',
    user_id: 'system',
    name: 'Intimate Whisper Vocals',
    description: 'Soft, breathy vocals for intimate moments',
    tags: ['vocals', 'whisper', 'intimate'],
    category: 'instrument',
    prompt_data: {
      name: 'Vocals',
      timbre: ['Mellow', 'Soft'],
      effects: [
        { type: 'Compression', parameters: { ratio: '6:1' } },
        { type: 'Reverb', parameters: { room_size: 'Small' } }
      ],
      vocal_techniques: ['Whisper']
    } as InstrumentPromptData,
    stats: {
      total_uses: 298,
      total_saves: 61,
      avg_rating: 4.7,
      approval_rate: 90
    },
    is_public: true,
    created_at: new Date('2024-02-15')
  },
  {
    id: 'inst-8',
    user_id: 'system',
    name: 'Punchy Drums',
    description: 'Tight, compressed drums with punch',
    tags: ['drums', 'punchy', 'compressed'],
    category: 'instrument',
    prompt_data: {
      name: 'Drums',
      timbre: ['Bright', 'Clean'],
      effects: [
        { type: 'Compression', parameters: { ratio: '10:1' } },
        { type: 'EQ', parameters: { preset: 'Mid scoop' } }
      ]
    } as InstrumentPromptData,
    stats: {
      total_uses: 634,
      total_saves: 127,
      avg_rating: 4.8,
      approval_rate: 93
    },
    is_public: true,
    created_at: new Date('2024-01-30')
  },
];

// Section Template Examples
export const sectionPromptExamples: SavedPrompt[] = [
  {
    id: 'section-1',
    user_id: 'system',
    name: 'Explosive Chorus',
    description: 'High-energy chorus with all instruments, forte dynamics',
    tags: ['chorus', 'energetic', 'loud'],
    category: 'section',
    prompt_data: {
      type: 'Chorus',
      typical_instruments: ['All'],
      typical_performance: {
        'Electric Guitar': {
          dynamics: ['Forte', 'Accent'],
          rhythm: ['Groove'],
          melody: ['Chord Progression']
        },
        'Vocals': {
          dynamics: ['Forte', 'Crescendo'],
          rhythm: [],
          melody: ['Melisma']
        },
        'Drums': {
          dynamics: ['Forte', 'Accent'],
          rhythm: ['Groove', 'Syncopation'],
          melody: []
        }
      }
    } as SectionPromptData,
    stats: {
      total_uses: 567,
      total_saves: 114,
      avg_rating: 4.7,
      approval_rate: 91
    },
    is_public: true,
    created_at: new Date('2024-01-14')
  },
  {
    id: 'section-2',
    user_id: 'system',
    name: 'Intimate Verse',
    description: 'Quiet, intimate verse with sparse arrangement',
    tags: ['verse', 'intimate', 'sparse'],
    category: 'section',
    prompt_data: {
      type: 'Verse',
      typical_instruments: ['Acoustic Guitar', 'Vocals'],
      typical_performance: {
        'Acoustic Guitar': {
          dynamics: ['Piano', 'Legato'],
          rhythm: ['Straight'],
          melody: ['Arpeggio']
        },
        'Vocals': {
          dynamics: ['Piano'],
          rhythm: [],
          melody: []
        }
      }
    } as SectionPromptData,
    stats: {
      total_uses: 423,
      total_saves: 89,
      avg_rating: 4.6,
      approval_rate: 88
    },
    is_public: true,
    created_at: new Date('2024-01-19')
  },
  {
    id: 'section-3',
    user_id: 'system',
    name: 'Build-up Pre-Chorus',
    description: 'Crescendo building to chorus with increasing intensity',
    tags: ['pre-chorus', 'build', 'crescendo'],
    category: 'section',
    prompt_data: {
      type: 'Pre-Chorus',
      typical_instruments: ['Electric Guitar', 'Bass', 'Drums', 'Vocals'],
      typical_performance: {
        'Electric Guitar': {
          dynamics: ['Crescendo'],
          rhythm: ['Syncopation'],
          melody: []
        },
        'Drums': {
          dynamics: ['Crescendo', 'Accent'],
          rhythm: ['Groove'],
          melody: []
        },
        'Vocals': {
          dynamics: ['Crescendo'],
          rhythm: [],
          melody: []
        }
      }
    } as SectionPromptData,
    stats: {
      total_uses: 389,
      total_saves: 76,
      avg_rating: 4.5,
      approval_rate: 86
    },
    is_public: true,
    created_at: new Date('2024-02-02')
  },
  {
    id: 'section-4',
    user_id: 'system',
    name: 'Atmospheric Intro',
    description: 'Ambient intro with pads and minimal rhythm',
    tags: ['intro', 'atmospheric', 'ambient'],
    category: 'section',
    prompt_data: {
      type: 'Intro',
      typical_instruments: ['Synth Pad', 'Piano'],
      typical_performance: {
        'Synth Pad': {
          dynamics: ['Piano', 'Legato'],
          rhythm: [],
          melody: ['Dissonance', 'Resolution']
        },
        'Piano': {
          dynamics: ['Piano'],
          rhythm: ['Rubato'],
          melody: ['Arpeggio']
        }
      }
    } as SectionPromptData,
    stats: {
      total_uses: 512,
      total_saves: 103,
      avg_rating: 4.8,
      approval_rate: 92
    },
    is_public: true,
    created_at: new Date('2024-01-11')
  },
  {
    id: 'section-5',
    user_id: 'system',
    name: 'Contrasting Bridge',
    description: 'Bridge with different key/feel from rest of song',
    tags: ['bridge', 'contrast', 'modulation'],
    category: 'section',
    prompt_data: {
      type: 'Bridge',
      typical_instruments: ['Piano', 'Strings', 'Vocals'],
      typical_performance: {
        'Piano': {
          dynamics: ['Legato'],
          rhythm: [],
          melody: ['Modulation', 'Chord Progression']
        },
        'Strings': {
          dynamics: ['Legato', 'Crescendo'],
          rhythm: [],
          melody: ['Counter-melody']
        },
        'Vocals': {
          dynamics: ['Crescendo'],
          rhythm: [],
          melody: []
        }
      }
    } as SectionPromptData,
    stats: {
      total_uses: 345,
      total_saves: 71,
      avg_rating: 4.7,
      approval_rate: 89
    },
    is_public: true,
    created_at: new Date('2024-02-08')
  },
  {
    id: 'section-6',
    user_id: 'system',
    name: 'EDM Drop',
    description: 'High-energy electronic drop with bass and synths',
    tags: ['drop', 'edm', 'energetic'],
    category: 'section',
    prompt_data: {
      type: 'Drop',
      typical_instruments: ['Synth', 'Bass', 'Drums'],
      typical_performance: {
        'Synth': {
          dynamics: ['Forte', 'Accent'],
          rhythm: ['Syncopation'],
          melody: ['Chord Progression']
        },
        'Bass': {
          dynamics: ['Forte'],
          rhythm: ['Groove'],
          melody: []
        },
        'Drums': {
          dynamics: ['Forte', 'Accent'],
          rhythm: ['Groove', 'Syncopation'],
          melody: []
        }
      }
    } as SectionPromptData,
    stats: {
      total_uses: 689,
      total_saves: 142,
      avg_rating: 4.9,
      approval_rate: 94
    },
    is_public: true,
    created_at: new Date('2024-01-27')
  },
];

// Combined exports
export const allPromptExamples = [
  ...globalPromptExamples,
  ...instrumentPromptExamples,
  ...sectionPromptExamples,
];

export function getPromptsByCategory(category: 'global' | 'instrument' | 'section'): SavedPrompt[] {
  return allPromptExamples.filter(prompt => prompt.category === category);
}

export function searchPrompts(query: string): SavedPrompt[] {
  const lowerQuery = query.toLowerCase();
  return allPromptExamples.filter(
    prompt =>
      prompt.name.toLowerCase().includes(lowerQuery) ||
      prompt.description.toLowerCase().includes(lowerQuery) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
