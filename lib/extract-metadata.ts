import { PrototypePromptData } from "./types";
import { glossaryTerms } from "./glossary-data";

export interface TechnicalDetails {
  bpm?: number;
  key?: string;
  timeSignature?: string;
}

export interface CategorizedMetadata {
  genreTags: string[];
  moodTags: string[];
  instrumentTags: string[];
  performanceTags: string[];
  productionTags: string[];
  technicalDetails: TechnicalDetails;
  // Negative tags (exclusions)
  negativeGenreTags: string[];
  negativeMoodTags: string[];
  negativeInstrumentTags: string[];
  negativePerformanceTags: string[];
  negativeProductionTags: string[];
}

export interface SubmissionMetadata extends CategorizedMetadata {
  versionNumber: number;
  promptData: PrototypePromptData;
  masterPrompt: string;
  useCaseTags: string[];
  description: string;
}

/**
 * Extract all terms within [brackets] from text
 */
export function extractBracketedTerms(text: string): string[] {
  const matches = text.match(/\[([^\]]+)\]/g);
  if (!matches) return [];

  return matches.map(match => match.replace(/[\[\]]/g, '').toLowerCase().trim());
}

/**
 * Extract technical details from text (BPM, key, time signature)
 */
export function extractTechnicalDetails(text: string): TechnicalDetails {
  const details: TechnicalDetails = {};

  // Extract BPM: "120bpm" or "120 BPM"
  const bpmMatch = text.match(/(\d+)\s*bpm/i);
  if (bpmMatch) {
    details.bpm = parseInt(bpmMatch[1]);
  }

  // Extract key: "D minor", "C major", etc.
  const keyMatch = text.match(/\b([A-G](?:#|b)?)\s+(major|minor)\b/i);
  if (keyMatch) {
    details.key = `${keyMatch[1]} ${keyMatch[2]}`;
  }

  // Extract time signature: "4/4", "3/4", etc.
  const timeSigMatch = text.match(/\b(\d+\/\d+)\b/);
  if (timeSigMatch) {
    details.timeSignature = timeSigMatch[1];
  }

  return details;
}

/**
 * Categorize a term based on glossary data
 */
function categorizeTerm(term: string): string | null {
  // Find matching glossary term
  const glossaryTerm = glossaryTerms.find(
    gt => gt.term.toLowerCase() === term || gt.synonyms?.some(s => s.toLowerCase() === term)
  );

  if (glossaryTerm) {
    return glossaryTerm.category;
  }

  return null;
}

/**
 * Categorize terms based on rules from the prototype spec
 */
export function categorizeTerms(terms: string[]): Omit<CategorizedMetadata, 'technicalDetails'> {
  const categorized = {
    genreTags: [] as string[],
    moodTags: [] as string[],
    instrumentTags: [] as string[],
    performanceTags: [] as string[],
    productionTags: [] as string[],
  };

  // Hardcoded categorization rules based on prototype spec
  const genreKeywords = ['neo-soul', 'jazz', 'rock', 'hip-hop', 'reggae', 'funk', 'blues', 'pop', 'electronic'];
  const moodKeywords = ['melancholic', 'uplifting', 'intimate', 'emotional', 'powerful', 'dark', 'bright', 'soulful'];
  const instrumentKeywords = ['vocal', 'bass', 'keys', 'saxophone', 'sax', 'guitar', 'drums', 'piano', 'moog', 'electric piano', 'analog', 'synth'];
  const performanceKeywords = ['rubato', 'staccato', 'crescendo', 'funky', 'lazy swing', 'groove', 'stripped back', 'subtle'];
  const productionKeywords = ['reverb', 'distortion', 'delay', 'compression', 'saturation', 'eq', 'warm', 'clean', 'big', 'slight'];

  // Remove duplicates
  const uniqueTerms = [...new Set(terms)];

  uniqueTerms.forEach(term => {
    const lowerTerm = term.toLowerCase();

    // Check against hardcoded categories
    if (genreKeywords.some(k => lowerTerm.includes(k))) {
      categorized.genreTags.push(term);
    } else if (moodKeywords.some(k => lowerTerm.includes(k))) {
      categorized.moodTags.push(term);
    } else if (instrumentKeywords.some(k => lowerTerm.includes(k))) {
      categorized.instrumentTags.push(term);
    } else if (performanceKeywords.some(k => lowerTerm.includes(k))) {
      categorized.performanceTags.push(term);
    } else if (productionKeywords.some(k => lowerTerm.includes(k))) {
      categorized.productionTags.push(term);
    } else {
      // Try glossary categorization
      const category = categorizeTerm(term);

      if (category === 'Genres & Styles') {
        categorized.genreTags.push(term);
      } else if (category === 'Mood & Atmosphere') {
        categorized.moodTags.push(term);
      } else if (category === 'Instrumentation & Texture' || category === 'Timbre') {
        categorized.instrumentTags.push(term);
      } else if (category === 'Tempo & Rhythm' || category === 'Dynamics & Expression') {
        categorized.performanceTags.push(term);
      } else if (category === 'Production & Effects') {
        categorized.productionTags.push(term);
      } else {
        // Default to performance tags if unknown
        categorized.performanceTags.push(term);
      }
    }
  });

  return {
    ...categorized,
    negativeGenreTags: [],
    negativeMoodTags: [],
    negativeInstrumentTags: [],
    negativePerformanceTags: [],
    negativeProductionTags: [],
  };
}

/**
 * Extract instrument names from prompt data (even if not in brackets)
 */
function extractInstrumentNames(promptData: PrototypePromptData): string[] {
  const instruments = promptData.instruments.map(i => i.name.toLowerCase());

  // Also extract from descriptions
  const commonInstruments = ['vocal', 'vocals', 'bass', 'keys', 'keyboard', 'piano', 'guitar',
    'drums', 'saxophone', 'sax', 'trumpet', 'violin', 'strings', 'synth', 'synthesizer'];

  const found = new Set<string>();
  instruments.forEach(inst => found.add(inst));

  const allText = [
    promptData.global,
    ...promptData.instruments.map(i => i.description),
    ...promptData.sections.map(s => s.description)
  ].join(' ').toLowerCase();

  commonInstruments.forEach(inst => {
    if (allText.includes(inst)) {
      found.add(inst);
    }
  });

  return Array.from(found);
}

/**
 * Main extraction function - extracts all metadata from prompt data
 */
export function extractMetadata(promptData: PrototypePromptData): CategorizedMetadata {
  // Collect positive text
  const positiveText = [
    promptData.global,
    ...promptData.instruments.map(i => i.description),
    ...promptData.sections.map(s => s.description),
  ].join(' ');

  // Collect negative text
  const negativeText = [
    promptData.negativeGlobal || '',
    ...promptData.instruments.map(i => i.negativeDescription || ''),
    ...promptData.sections.map(s => s.negativeDescription || ''),
  ].join(' ');

  // Extract bracketed terms from positive and negative
  const positiveBracketedTerms = extractBracketedTerms(positiveText);
  const negativeBracketedTerms = extractBracketedTerms(negativeText);

  // Extract technical details
  const technicalDetails = extractTechnicalDetails(positiveText);

  // Categorize positive bracketed terms
  const positiveCategorized = categorizeTerms(positiveBracketedTerms);

  // Categorize negative bracketed terms
  const negativeCategorized = categorizeTerms(negativeBracketedTerms);

  // Add instrument names (even if not bracketed)
  const instrumentNames = extractInstrumentNames(promptData);
  const allInstruments = [...new Set([...positiveCategorized.instrumentTags, ...instrumentNames])];

  return {
    ...positiveCategorized,
    instrumentTags: allInstruments,
    technicalDetails,
    negativeGenreTags: negativeCategorized.genreTags,
    negativeMoodTags: negativeCategorized.moodTags,
    negativeInstrumentTags: negativeCategorized.instrumentTags,
    negativePerformanceTags: negativeCategorized.performanceTags,
    negativeProductionTags: negativeCategorized.productionTags,
  };
}

/**
 * Generate master prompt from prompt data
 */
export function generateMasterPrompt(promptData: PrototypePromptData): string {
  let prompt = `Positive: ${promptData.global}\n`;
  if (promptData.negativeGlobal) {
    prompt += `Negative: ${promptData.negativeGlobal}\n`;
  }
  prompt += '\n';

  prompt += 'Instruments:\n';
  promptData.instruments.forEach(inst => {
    prompt += `- ${inst.name}:\n  Positive: ${inst.description}\n`;
    if (inst.negativeDescription) {
      prompt += `  Negative: ${inst.negativeDescription}\n`;
    }
  });

  prompt += '\nSections:\n';
  promptData.sections.forEach(section => {
    prompt += `- ${section.type}:\n  Positive: ${section.description}\n`;
    if (section.negativeDescription) {
      prompt += `  Negative: ${section.negativeDescription}\n`;
    }
  });

  return prompt.trim();
}
