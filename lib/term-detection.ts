import { glossaryTerms } from './glossary-data';

export interface DetectedTerm {
  term: string;
  start: number;
  end: number;
  category: string;
}

/**
 * Detects glossary terms in text that are not already bracketed
 * Returns array of detected terms with their positions
 */
export function detectTerms(text: string): DetectedTerm[] {
  const detected: DetectedTerm[] = [];

  // Build regex pattern from glossary terms (case-insensitive, word boundaries)
  const termPatterns = glossaryTerms
    .map(t => t.term.toLowerCase())
    .sort((a, b) => b.length - a.length); // Sort by length desc to match longer terms first

  for (const termPattern of termPatterns) {
    // Escape special regex characters
    const escapedPattern = termPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Match term but not if it's already in brackets or is part of [term]
    const regex = new RegExp(
      `(?<!\\[)\\b(${escapedPattern})\\b(?!\\])`,
      'gi'
    );

    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      const currentMatch = match; // Capture match for type safety
      const start = currentMatch.index;
      const end = start + currentMatch[0].length;

      // Check if this position is already inside brackets
      const beforeMatch = text.substring(0, start);
      const openBrackets = (beforeMatch.match(/\[/g) || []).length;
      const closeBrackets = (beforeMatch.match(/\]/g) || []).length;

      // If brackets are balanced before this match, it's not inside brackets
      if (openBrackets === closeBrackets) {
        const glossaryEntry = glossaryTerms.find(
          t => t.term.toLowerCase() === currentMatch[1].toLowerCase()
        );

        if (glossaryEntry) {
          detected.push({
            term: match[1],
            start,
            end,
            category: glossaryEntry.category
          });
        }
      }
    }
  }

  // Remove overlapping detections (keep first occurrence)
  const filtered: DetectedTerm[] = [];
  detected.sort((a, b) => a.start - b.start);

  for (const term of detected) {
    const overlaps = filtered.some(
      existing =>
        (term.start >= existing.start && term.start < existing.end) ||
        (term.end > existing.start && term.end <= existing.end)
    );

    if (!overlaps) {
      filtered.push(term);
    }
  }

  return filtered;
}

/**
 * Automatically wraps detected terms in brackets
 */
export function autoBracketTerms(text: string): string {
  const detected = detectTerms(text);

  if (detected.length === 0) return text;

  // Build new text with brackets, working backwards to maintain positions
  let result = text;
  for (let i = detected.length - 1; i >= 0; i--) {
    const { term, start, end } = detected[i];
    result = result.substring(0, start) + `[${term}]` + result.substring(end);
  }

  return result;
}

/**
 * Extracts all bracketed terms from text
 */
export function extractBracketedTerms(text: string): string[] {
  const regex = /\[([^\]]+)\]/g;
  const terms: string[] = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    terms.push(match[1]);
  }

  return terms;
}

/**
 * Checks if a term is a valid glossary term
 */
export function isGlossaryTerm(term: string): boolean {
  return glossaryTerms.some(
    t => t.term.toLowerCase() === term.toLowerCase()
  );
}

/**
 * Gets glossary terms by category
 */
export function getTermsByCategory(category: string): string[] {
  return glossaryTerms
    .filter(t => t.category === category)
    .map(t => t.term)
    .sort();
}

/**
 * Gets glossary terms applicable to a tier
 */
export function getTermsByTier(tier: 'global' | 'instrument' | 'section'): string[] {
  return glossaryTerms
    .filter(t => t.applies_to.includes(tier))
    .map(t => t.term)
    .sort();
}

/**
 * Categories for helper badges
 */
export const GLOBAL_CATEGORIES = [
  'Tempo & Rhythm',
  'Melody & Harmony',
  'Genres & Styles',
  'Song Structure'
];

export const INSTRUMENT_CATEGORIES = [
  'Instrumentation & Texture',
  'Production & Effects',
  'Vocal Techniques'
];

export const SECTION_CATEGORIES = [
  'Dynamics & Expression',
  'Tempo & Rhythm',
  'Melody & Harmony',
  'Song Structure'
];
