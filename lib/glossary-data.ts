import { GlossaryTerm } from './types';

export const glossaryTerms: GlossaryTerm[] = [
  // ============= Tempo & Rhythm =============
  {
    id: 'tempo-1',
    term: 'Adagio',
    definition: 'A slow tempo marking, typically 66-76 BPM. Creates a calm, relaxed atmosphere.',
    category: 'Tempo & Rhythm',
    applies_to: ['global'],
    examples: ['Classical slow movements', 'Ballads', 'Meditation music'],
    related_terms: ['Largo', 'Andante']
  },
  {
    id: 'tempo-2',
    term: 'Allegro',
    definition: 'A fast, lively tempo marking, typically 120-156 BPM. Energetic and bright.',
    category: 'Tempo & Rhythm',
    applies_to: ['global'],
    examples: ['Pop choruses', 'Dance music', 'Upbeat classical movements'],
    related_terms: ['Presto', 'Vivace']
  },
  {
    id: 'tempo-3',
    term: 'Andante',
    definition: 'A moderate walking pace tempo, typically 76-108 BPM. Comfortable and flowing.',
    category: 'Tempo & Rhythm',
    applies_to: ['global'],
    examples: ['Folk songs', 'Mid-tempo pop', 'Walking scenes in film scores']
  },
  {
    id: 'tempo-4',
    term: 'Presto',
    definition: 'Very fast tempo marking, typically 168-200 BPM. Creates excitement and urgency.',
    category: 'Tempo & Rhythm',
    applies_to: ['global'],
    examples: ['Fast classical movements', 'Speed metal', 'Action sequences'],
    related_terms: ['Allegro', 'Prestissimo']
  },
  {
    id: 'rhythm-1',
    term: 'Syncopation',
    definition: 'Rhythmic emphasis on weak beats or off-beats, creating tension and groove.',
    category: 'Tempo & Rhythm',
    subcategory: 'Rhythmic Patterns',
    applies_to: ['section'],
    examples: ['Reggae', 'Jazz', 'Funk bass lines'],
    related_terms: ['Groove', 'Swing']
  },
  {
    id: 'rhythm-2',
    term: 'Swing',
    definition: 'A rhythmic feel where eighth notes are played unevenly in a long-short pattern.',
    category: 'Tempo & Rhythm',
    subcategory: 'Rhythmic Patterns',
    applies_to: ['section'],
    examples: ['Jazz standards', 'Big band', 'Blues shuffles'],
    related_terms: ['Groove', 'Triplet feel']
  },
  {
    id: 'rhythm-3',
    term: 'Rubato',
    definition: 'Expressive tempo flexibility where the performer speeds up and slows down for emotion.',
    category: 'Tempo & Rhythm',
    subcategory: 'Rhythmic Patterns',
    applies_to: ['section'],
    examples: ['Romantic piano pieces', 'Expressive vocal performances', 'Ballad verses']
  },
  {
    id: 'rhythm-4',
    term: 'Polyrhythm',
    definition: 'Multiple contrasting rhythms played simultaneously, creating complex textures.',
    category: 'Tempo & Rhythm',
    subcategory: 'Rhythmic Patterns',
    applies_to: ['section'],
    examples: ['African drumming', 'Progressive rock', 'Latin percussion'],
    related_terms: ['Cross-rhythm', 'Hemiola']
  },

  // ============= Dynamics & Expression =============
  {
    id: 'dynamics-1',
    term: 'Forte',
    definition: 'Loud volume marking. Creates power and emphasis.',
    category: 'Dynamics & Expression',
    applies_to: ['section'],
    examples: ['Chorus sections', 'Climactic moments', 'Rock guitar solos'],
    synonyms: ['f', 'loud'],
    related_terms: ['Fortissimo', 'Mezzo-forte']
  },
  {
    id: 'dynamics-2',
    term: 'Piano',
    definition: 'Soft volume marking. Creates intimacy and gentleness.',
    category: 'Dynamics & Expression',
    applies_to: ['section'],
    examples: ['Verses', 'Intimate moments', 'Whispered vocals'],
    synonyms: ['p', 'soft'],
    related_terms: ['Pianissimo', 'Mezzo-piano']
  },
  {
    id: 'dynamics-3',
    term: 'Crescendo',
    definition: 'Gradual increase in volume. Builds tension and excitement.',
    category: 'Dynamics & Expression',
    applies_to: ['section'],
    examples: ['Build-ups before chorus', 'Orchestral swells', 'EDM risers'],
    related_terms: ['Decrescendo', 'Swell']
  },
  {
    id: 'dynamics-4',
    term: 'Decrescendo',
    definition: 'Gradual decrease in volume. Creates release or fading effect.',
    category: 'Dynamics & Expression',
    applies_to: ['section'],
    examples: ['Song endings', 'Transitional passages', 'Echo effects'],
    synonyms: ['Diminuendo'],
    related_terms: ['Crescendo', 'Fade out']
  },
  {
    id: 'dynamics-5',
    term: 'Sforzando',
    definition: 'Sudden strong accent on a note or chord. Creates dramatic emphasis.',
    category: 'Dynamics & Expression',
    applies_to: ['section'],
    examples: ['Dramatic hits', 'Orchestral accents', 'Rock power chords'],
    synonyms: ['sfz'],
    related_terms: ['Accent', 'Marcato']
  },
  {
    id: 'expression-1',
    term: 'Legato',
    definition: 'Smooth, connected playing with no gaps between notes.',
    category: 'Dynamics & Expression',
    subcategory: 'Articulation',
    applies_to: ['section'],
    examples: ['String sections', 'Flowing melodies', 'Smooth vocal lines'],
    related_terms: ['Staccato', 'Smooth']
  },
  {
    id: 'expression-2',
    term: 'Staccato',
    definition: 'Short, detached notes with silence between them.',
    category: 'Dynamics & Expression',
    subcategory: 'Articulation',
    applies_to: ['section'],
    examples: ['Pizzicato strings', 'Choppy rhythms', 'Percussive accents'],
    related_terms: ['Legato', 'Marcato']
  },
  {
    id: 'expression-3',
    term: 'Accent',
    definition: 'Emphasized note that stands out from surrounding notes.',
    category: 'Dynamics & Expression',
    subcategory: 'Articulation',
    applies_to: ['section'],
    examples: ['Downbeats', 'Syncopated rhythms', 'Drum hits'],
    related_terms: ['Sforzando', 'Marcato']
  },

  // ============= Song Structure =============
  {
    id: 'structure-1',
    term: 'Verse',
    definition: 'Repeating section with same music but different lyrics, telling the story.',
    category: 'Song Structure',
    applies_to: ['section'],
    examples: ['Storytelling sections', 'Lower energy parts', 'Narrative progression'],
    related_terms: ['Chorus', 'Pre-Chorus']
  },
  {
    id: 'structure-2',
    term: 'Chorus',
    definition: 'Main repeated section with the hook, usually the most memorable and energetic part.',
    category: 'Song Structure',
    applies_to: ['section'],
    examples: ['Main hook', 'Sing-along sections', 'Peak energy moments'],
    related_terms: ['Verse', 'Bridge', 'Hook']
  },
  {
    id: 'structure-3',
    term: 'Bridge',
    definition: 'Contrasting section providing relief from verse-chorus repetition.',
    category: 'Song Structure',
    applies_to: ['section'],
    examples: ['Musical departure', 'Key change sections', 'Emotional shifts'],
    related_terms: ['Middle 8', 'C-Section']
  },
  {
    id: 'structure-4',
    term: 'Intro',
    definition: 'Opening section that sets the mood and introduces main musical elements.',
    category: 'Song Structure',
    applies_to: ['section'],
    examples: ['Song openings', 'Establishing atmosphere', 'Building anticipation'],
    related_terms: ['Outro', 'Verse']
  },
  {
    id: 'structure-5',
    term: 'Outro',
    definition: 'Closing section that brings the song to an end.',
    category: 'Song Structure',
    applies_to: ['section'],
    examples: ['Fade outs', 'Final choruses', 'Codas'],
    synonyms: ['Ending', 'Coda'],
    related_terms: ['Intro', 'Chorus']
  },
  {
    id: 'structure-6',
    term: 'Drop',
    definition: 'High-energy climactic section in electronic music, following a build-up.',
    category: 'Song Structure',
    applies_to: ['section'],
    examples: ['EDM drops', 'Bass drops', 'Post-buildup sections'],
    related_terms: ['Build-up', 'Break']
  },

  // ============= Melody & Harmony =============
  {
    id: 'melody-1',
    term: 'Arpeggio',
    definition: 'Notes of a chord played in sequence rather than simultaneously.',
    category: 'Melody & Harmony',
    applies_to: ['section'],
    examples: ['Guitar fingerpicking', 'Piano patterns', 'Harp glissandos'],
    related_terms: ['Chord', 'Broken chord']
  },
  {
    id: 'melody-2',
    term: 'Melisma',
    definition: 'Single syllable sung across multiple notes, common in R&B and gospel.',
    category: 'Melody & Harmony',
    applies_to: ['section'],
    examples: ['Gospel runs', 'R&B vocal flourishes', 'Mariah Carey-style runs'],
    related_terms: ['Vocal run', 'Riff']
  },
  {
    id: 'harmony-1',
    term: 'Chord Progression',
    definition: 'Sequence of chords that form the harmonic foundation.',
    category: 'Melody & Harmony',
    subcategory: 'Harmony',
    applies_to: ['global', 'section'],
    examples: ['I-V-vi-IV', 'ii-V-I in jazz', '12-bar blues'],
    related_terms: ['Harmony', 'Cadence']
  },
  {
    id: 'harmony-2',
    term: 'Dissonance',
    definition: 'Tension created by clashing notes or chords, seeking resolution.',
    category: 'Melody & Harmony',
    subcategory: 'Harmony',
    applies_to: ['section'],
    examples: ['Suspended chords', 'Jazz tensions', 'Modern classical'],
    related_terms: ['Consonance', 'Resolution', 'Tension']
  },
  {
    id: 'harmony-3',
    term: 'Resolution',
    definition: 'Movement from dissonant or tense harmony to consonant, stable harmony.',
    category: 'Melody & Harmony',
    subcategory: 'Harmony',
    applies_to: ['section'],
    examples: ['V to I cadence', 'Suspended to major chord', 'Tension release'],
    related_terms: ['Dissonance', 'Cadence']
  },
  {
    id: 'harmony-4',
    term: 'Modulation',
    definition: 'Changing from one key to another within a piece.',
    category: 'Melody & Harmony',
    subcategory: 'Harmony',
    applies_to: ['section'],
    examples: ['Key changes in choruses', 'Bridge key shifts', 'Final chorus lifts'],
    related_terms: ['Key change', 'Transposition']
  },
  {
    id: 'harmony-5',
    term: 'Counter-melody',
    definition: 'Secondary melody played simultaneously with the main melody.',
    category: 'Melody & Harmony',
    applies_to: ['section'],
    examples: ['Guitar leads over vocals', 'String counterlines', 'Background vocals'],
    related_terms: ['Harmony', 'Descant']
  },

  // ============= Instrumentation & Texture =============
  {
    id: 'timbre-1',
    term: 'Bright',
    definition: 'Tone quality with emphasized high frequencies, clarity and brilliance.',
    category: 'Instrumentation & Texture',
    subcategory: 'Timbre',
    applies_to: ['instrument'],
    examples: ['Brass instruments', 'Electric guitar with treble', 'Crisp cymbals'],
    related_terms: ['Dark', 'Warm']
  },
  {
    id: 'timbre-2',
    term: 'Dark',
    definition: 'Tone quality with emphasized low frequencies, warmth and depth.',
    category: 'Instrumentation & Texture',
    subcategory: 'Timbre',
    applies_to: ['instrument'],
    examples: ['Cello', 'Bass guitar', 'Muted horns'],
    related_terms: ['Bright', 'Warm']
  },
  {
    id: 'timbre-3',
    term: 'Warm',
    definition: 'Pleasant, rich tone with balanced mid-range frequencies.',
    category: 'Instrumentation & Texture',
    subcategory: 'Timbre',
    applies_to: ['instrument'],
    examples: ['Vintage analog synths', 'Acoustic guitar', 'Jazz saxophone'],
    related_terms: ['Rich', 'Mellow']
  },
  {
    id: 'timbre-4',
    term: 'Rich',
    definition: 'Full, complex tone with many harmonic overtones.',
    category: 'Instrumentation & Texture',
    subcategory: 'Timbre',
    applies_to: ['instrument'],
    examples: ['String sections', 'Grand piano', 'Layered synths'],
    related_terms: ['Warm', 'Thick']
  },
  {
    id: 'timbre-5',
    term: 'Mellow',
    definition: 'Soft, smooth tone without harshness.',
    category: 'Instrumentation & Texture',
    subcategory: 'Timbre',
    applies_to: ['instrument'],
    examples: ['Flute', 'Nylon string guitar', 'Soft vocals'],
    related_terms: ['Warm', 'Soft']
  },
  {
    id: 'texture-1',
    term: 'Monophonic',
    definition: 'Single melodic line with no harmony or accompaniment.',
    category: 'Instrumentation & Texture',
    subcategory: 'Texture',
    applies_to: ['section'],
    examples: ['Solo flute', 'Unaccompanied vocal', 'Single synth lead'],
    related_terms: ['Polyphonic', 'Homophonic']
  },
  {
    id: 'texture-2',
    term: 'Polyphonic',
    definition: 'Multiple independent melodic lines played simultaneously.',
    category: 'Instrumentation & Texture',
    subcategory: 'Texture',
    applies_to: ['section'],
    examples: ['Fugues', 'Counterpoint', 'Jazz improvisation'],
    related_terms: ['Monophonic', 'Contrapuntal']
  },
  {
    id: 'texture-3',
    term: 'Homophonic',
    definition: 'Main melody with chordal accompaniment.',
    category: 'Instrumentation & Texture',
    subcategory: 'Texture',
    applies_to: ['section'],
    examples: ['Pop songs', 'Hymns', 'Piano with chords + melody'],
    related_terms: ['Polyphonic', 'Melody-dominated']
  },
  {
    id: 'texture-4',
    term: 'Layered',
    definition: 'Multiple sounds or parts stacked on top of each other.',
    category: 'Instrumentation & Texture',
    subcategory: 'Texture',
    applies_to: ['instrument', 'section'],
    examples: ['Synth pads with multiple oscillators', 'Vocal harmonies', 'Orchestral sections'],
    related_terms: ['Dense', 'Thick']
  },
  {
    id: 'texture-5',
    term: 'Sparse',
    definition: 'Thin texture with few simultaneous sounds, emphasizing space.',
    category: 'Instrumentation & Texture',
    subcategory: 'Texture',
    applies_to: ['section'],
    examples: ['Minimal verses', 'Ambient music', 'Intimate performances'],
    related_terms: ['Dense', 'Minimal']
  },

  // ============= Genres & Styles =============
  {
    id: 'genre-1',
    term: 'Pop',
    definition: 'Popular music characterized by catchy melodies, verse-chorus structure, and broad appeal.',
    category: 'Genres & Styles',
    applies_to: ['global'],
    examples: ['Taylor Swift', 'The Weeknd', 'Ariana Grande'],
    related_terms: ['Contemporary', 'Mainstream']
  },
  {
    id: 'genre-2',
    term: 'Rock',
    definition: 'Genre featuring electric guitars, strong rhythms, and often rebellious themes.',
    category: 'Genres & Styles',
    applies_to: ['global'],
    examples: ['The Beatles', 'Led Zeppelin', 'Foo Fighters'],
    related_terms: ['Alternative', 'Indie Rock']
  },
  {
    id: 'genre-3',
    term: 'Jazz',
    definition: 'Improvisational genre with complex harmonies, syncopation, and swing feel.',
    category: 'Genres & Styles',
    applies_to: ['global'],
    examples: ['Miles Davis', 'John Coltrane', 'Billie Holiday'],
    related_terms: ['Blues', 'Bebop']
  },
  {
    id: 'genre-4',
    term: 'Electronic',
    definition: 'Music created using electronic instruments, synthesizers, and computers.',
    category: 'Genres & Styles',
    applies_to: ['global'],
    examples: ['Daft Punk', 'Deadmau5', 'Aphex Twin'],
    related_terms: ['EDM', 'Techno', 'House']
  },
  {
    id: 'genre-5',
    term: 'Hip-Hop',
    definition: 'Genre featuring rhythmic vocal delivery (rapping) over beats and samples.',
    category: 'Genres & Styles',
    applies_to: ['global'],
    examples: ['Kendrick Lamar', 'Jay-Z', 'Nas'],
    related_terms: ['Rap', 'Trap']
  },
  {
    id: 'genre-6',
    term: 'R&B',
    definition: 'Rhythm and Blues featuring soulful vocals, groove-oriented rhythms.',
    category: 'Genres & Styles',
    applies_to: ['global'],
    examples: ['Beyoncé', 'Usher', 'Alicia Keys'],
    related_terms: ['Soul', 'Neo-Soul']
  },

  // ============= Production & Effects =============
  {
    id: 'effect-1',
    term: 'Reverb',
    definition: 'Echo effect simulating acoustic space, from small rooms to large halls.',
    category: 'Production & Effects',
    applies_to: ['instrument'],
    examples: ['Vocal reverb', 'Drum room ambience', 'Guitar spaciousness'],
    related_terms: ['Delay', 'Echo', 'Ambience']
  },
  {
    id: 'effect-2',
    term: 'Distortion',
    definition: 'Effect that clips and alters the waveform, adding harmonics and aggression.',
    category: 'Production & Effects',
    applies_to: ['instrument'],
    examples: ['Distorted guitar', 'Bass saturation', 'Vocal grit'],
    related_terms: ['Overdrive', 'Saturation']
  },
  {
    id: 'effect-3',
    term: 'Delay',
    definition: 'Effect creating echoes by repeating the sound after a set time.',
    category: 'Production & Effects',
    applies_to: ['instrument'],
    examples: ['Slapback delay on vocals', 'Ping-pong delay', 'Dub reggae delays'],
    related_terms: ['Reverb', 'Echo']
  },
  {
    id: 'effect-4',
    term: 'Compression',
    definition: 'Effect reducing dynamic range by making loud parts quieter and quiet parts louder.',
    category: 'Production & Effects',
    applies_to: ['instrument'],
    examples: ['Vocal compression', 'Drum bus compression', 'Sidechain compression'],
    related_terms: ['Limiting', 'Dynamics']
  },
  {
    id: 'effect-5',
    term: 'Chorus',
    definition: 'Effect creating thickness by layering slightly detuned copies of the sound.',
    category: 'Production & Effects',
    applies_to: ['instrument'],
    examples: ['80s synths', 'Clean guitar', 'Thickened vocals'],
    related_terms: ['Flanger', 'Doubling']
  },
  {
    id: 'effect-6',
    term: 'EQ',
    definition: 'Equalization - adjusting the balance of frequency ranges to shape tone.',
    category: 'Production & Effects',
    applies_to: ['instrument'],
    examples: ['Bass boost', 'Treble cut', 'Midrange scoop'],
    synonyms: ['Equalization'],
    related_terms: ['Filter', 'Tone shaping']
  },

  // ============= Vocal Techniques =============
  {
    id: 'vocal-1',
    term: 'Falsetto',
    definition: 'High-pitched vocal register above normal range, light and airy quality.',
    category: 'Vocal Techniques',
    applies_to: ['instrument'],
    examples: ['Bee Gees', 'Maroon 5', 'Prince'],
    related_terms: ['Head voice', 'Upper register']
  },
  {
    id: 'vocal-2',
    term: 'Belt',
    definition: 'Powerful, chest-dominant vocal technique for high notes with strength.',
    category: 'Vocal Techniques',
    applies_to: ['instrument'],
    examples: ['Musical theater', 'Power ballads', 'Gospel singing'],
    related_terms: ['Chest voice', 'Power vocals']
  },
  {
    id: 'vocal-3',
    term: 'Vibrato',
    definition: 'Slight, rapid variation in pitch creating a warm, expressive quality.',
    category: 'Vocal Techniques',
    applies_to: ['instrument'],
    examples: ['Opera singing', 'Classical vocals', 'Expressive moments'],
    related_terms: ['Tremolo', 'Oscillation']
  },
  {
    id: 'vocal-4',
    term: 'Growl',
    definition: 'Rough, gritty vocal technique adding aggression and texture.',
    category: 'Vocal Techniques',
    applies_to: ['instrument'],
    examples: ['Metal vocals', 'Blues singing', 'Rock grit'],
    related_terms: ['Rasp', 'Distortion']
  },
  {
    id: 'vocal-5',
    term: 'Whisper',
    definition: 'Soft, breathy vocal delivery with minimal vocal cord vibration.',
    category: 'Vocal Techniques',
    applies_to: ['instrument'],
    examples: ['Intimate verses', 'ASMR vocals', 'Billie Eilish style'],
    related_terms: ['Breathy', 'Soft singing']
  },

  // ============= Mood & Atmosphere =============
  {
    id: 'mood-1',
    term: 'Energetic',
    definition: 'High-energy, exciting, and dynamic mood.',
    category: 'Mood & Atmosphere',
    applies_to: ['global'],
    examples: ['Dance tracks', 'Workout music', 'Upbeat pop'],
    related_terms: ['Uplifting', 'Powerful']
  },
  {
    id: 'mood-2',
    term: 'Melancholic',
    definition: 'Sad, reflective, and emotionally introspective mood.',
    category: 'Mood & Atmosphere',
    applies_to: ['global'],
    examples: ['Sad ballads', 'Rainy day playlists', 'Emotional scenes'],
    related_terms: ['Somber', 'Reflective']
  },
  {
    id: 'mood-3',
    term: 'Uplifting',
    definition: 'Positive, inspiring, and emotionally elevating mood.',
    category: 'Mood & Atmosphere',
    applies_to: ['global'],
    examples: ['Motivational tracks', 'Happy endings', 'Celebration music'],
    related_terms: ['Energetic', 'Joyful']
  },
  {
    id: 'mood-4',
    term: 'Dark',
    definition: 'Ominous, mysterious, or unsettling mood.',
    category: 'Mood & Atmosphere',
    applies_to: ['global'],
    examples: ['Horror soundtracks', 'Noir jazz', 'Gothic music'],
    related_terms: ['Mysterious', 'Eerie']
  },
  {
    id: 'mood-5',
    term: 'Peaceful',
    definition: 'Calm, serene, and tranquil mood.',
    category: 'Mood & Atmosphere',
    applies_to: ['global'],
    examples: ['Meditation music', 'Ambient soundscapes', 'Lullabies'],
    related_terms: ['Calm', 'Relaxing']
  }
];

// Helper function to get terms by category
export function getTermsByCategory(category: string): GlossaryTerm[] {
  return glossaryTerms.filter(term => term.category === category);
}

// Helper function to get all categories
export function getAllCategories(): string[] {
  const categories = new Set(glossaryTerms.map(term => term.category));
  return Array.from(categories);
}

// Helper function to search terms
export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return glossaryTerms.filter(term =>
    term.term.toLowerCase().includes(lowerQuery) ||
    term.definition.toLowerCase().includes(lowerQuery) ||
    term.synonyms?.some(syn => syn.toLowerCase().includes(lowerQuery))
  );
}

// Create regex pattern for term detection
export function createTermDetectionPattern(): RegExp {
  const termPatterns = glossaryTerms
    .flatMap(term => [term.term, ...(term.synonyms || [])])
    .sort((a, b) => b.length - a.length) // Longest first to avoid partial matches
    .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // Escape regex special chars

  return new RegExp(`\\b(${termPatterns.join('|')})\\b`, 'gi');
}
