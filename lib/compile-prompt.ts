import { ThreeTierPrompt, Section, Instrument } from './types';

export function compileToMasterPrompt(prompt: ThreeTierPrompt): string {
  const sections: string[] = [];

  // TIER 1: Global Settings
  sections.push('=== GLOBAL SETTINGS ===');
  sections.push(`Genre: ${prompt.global_settings.genre.join(', ')}`);
  sections.push(`Key: ${prompt.global_settings.key}`);
  sections.push(`Time Signature: ${prompt.global_settings.time_signature}`);
  sections.push(`Tempo: ${prompt.global_settings.tempo.bpm} BPM (${prompt.global_settings.tempo.named})`);
  sections.push(`Mood: ${prompt.global_settings.mood.join(', ')}`);
  sections.push('');

  // TIER 2: Instruments
  sections.push('=== INSTRUMENTS ===');
  prompt.instruments.forEach((instrument, index) => {
    sections.push(`${index + 1}. ${instrument.name} (ID: ${instrument.id})`);
    sections.push(`   Timbre: ${instrument.timbre.join(', ')}`);

    if (instrument.vocal_techniques && instrument.vocal_techniques.length > 0) {
      sections.push(`   Vocal Techniques: ${instrument.vocal_techniques.join(', ')}`);
    }

    if (instrument.effects.length > 0) {
      const effectsStr = instrument.effects.map(e => {
        if (e.parameters && Object.keys(e.parameters).length > 0) {
          const params = Object.entries(e.parameters)
            .map(([k, v]) => `${k}: ${v}`)
            .join(', ');
          return `${e.type} (${params})`;
        }
        return e.type;
      }).join(', ');
      sections.push(`   Effects: ${effectsStr}`);
    }
    sections.push('');
  });

  // TIER 3: Sections
  sections.push('=== PERFORMANCE & ARRANGEMENT ===');
  prompt.sections.forEach((section, index) => {
    sections.push(`${index + 1}. ${section.type.toUpperCase()}`);

    // Get instrument names
    const includedInstruments = section.included_instrument_ids
      .map(id => prompt.instruments.find(i => i.id === id)?.name || id)
      .join(', ');
    sections.push(`   Instruments: ${includedInstruments}`);

    // Performance styles for each instrument
    Object.entries(section.performance).forEach(([instrumentId, style]) => {
      const instrumentName = prompt.instruments.find(i => i.id === instrumentId)?.name || instrumentId;
      sections.push(`   ${instrumentName}:`);

      if (style.dynamics.length > 0) {
        sections.push(`     - Dynamics: ${style.dynamics.join(', ')}`);
      }
      if (style.rhythm.length > 0) {
        sections.push(`     - Rhythm: ${style.rhythm.join(', ')}`);
      }
      if (style.melody.length > 0) {
        sections.push(`     - Melody: ${style.melody.join(', ')}`);
      }
    });
    sections.push('');
  });

  return sections.join('\n');
}
