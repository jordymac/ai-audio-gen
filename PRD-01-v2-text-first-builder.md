# Prompt for Claude Code: PRD v2 for AI Audio Prompt Builder

## Context
I'm building an AI audio generation tool that uses ElevenLabs API. I need you to create a Product Requirements Document (PRD) for the prompt building interface that uses a text-area-first approach with smart term detection and helper tools.

## Core Philosophy
**Text-first with intelligent assistance**: Users should be able to type naturally but get help from glossary terms, quick selects, and term suggestions. The interface helps structure prompts without forcing rigid form inputs.

## Three-Tier Prompt Structure

### Tier 1: Global Settings (Single Text Area)
One text area where users describe overall track characteristics.

**Example prompt:**
```
a [neo-soul] track with [uplifting] vocals at 120bpm in [G major] with [lazy swing] drums and [ethereal] pads
```

**Features:**
- Free-form text input
- Glossary terms auto-detected and highlighted with `[brackets]` and colour
- Quick select widgets above text area:
  - BPM dropdown (common values + custom input)
  - Key dropdown (all major/minor keys with helper text like "G major - common in pop")
  - Time Signature dropdown (4/4, 3/4, 6/8, etc.)
- Helper badges that insert terms at cursor position:
  - [Genre] - inserts genre from glossary
  - [Mood] - inserts mood descriptors
  - [Tempo Name] - inserts Adagio, Allegro, etc.
  - [More...] - access other glossary categories

### Tier 2: Instrument Palette (Multiple Text Areas)
Users can add multiple instruments, each with its own text area describing timbre, effects, and characteristics.

**Interface:**
```
INSTRUMENTS
[+ Add Instrument]

┌─────────────────────────────────────────┐
│ Instrument: Bass                    [×] │
├─────────────────────────────────────────┤
│ [analog] [moog] bass with [distortion]  │
│ and [heavy saturation], [compressed]    │
│ with [slight reverb]                    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Instrument: Drums                   [×] │
├─────────────────────────────────────────┤
│ [lazy swing] drums with [brush sticks]  │
│ on snare, [sparse] kick pattern         │
└─────────────────────────────────────────┘
```

**Features per instrument:**
- Instrument name field (text input at top)
- Text area for describing the instrument
- Delete button [×] to remove instrument
- Helper badges specific to instruments:
  - [Timbre] - sound quality descriptors
  - [Effects] - reverb, distortion, compression, etc.
  - [Vocal Techniques] - for vocal instruments only
  - [Texture] - layering, sparse, dense, etc.

**Warnings:**
- Show warning if >8 instruments added: "Too many instruments may reduce generation quality"

### Tier 3: Performance/Arrangement (Multiple Text Areas)
Users can add multiple sections (Intro, Verse, Chorus, etc.), each with its own text area describing what happens in that section.

**Interface:**
```
SECTIONS
[+ Add Section]

┌─────────────────────────────────────────┐
│ Section: Intro                      [×] │
├─────────────────────────────────────────┤
│ vocals and keys only, [rubato] feel,    │
│ [intimate] female vocal, [melancholic]  │
│ delivery, no drums no bass              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Section: Verse                      [×] │
├─────────────────────────────────────────┤
│ [lazy swing] drums enter, [funky] moog  │
│ bassline, [smooth] keys, [staccato]     │
│ guitar licks, no saxophone              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Section: Chorus                     [×] │
├─────────────────────────────────────────┤
│ all instruments, big [emotional]         │
│ saxophone, [powerful] layered vocals,   │
│ [crescendo] into the hook               │
└─────────────────────────────────────────┘
```

**Features per section:**
- Section type dropdown (Intro, Verse, Chorus, Bridge, Pre-Chorus, Outro, Break, Drop)
- Text area for describing the section
- Delete button [×] to remove section
- Helper badges specific to sections:
  - [Dynamics] - crescendo, staccato, legato, etc.
  - [Performance] - groove, syncopation, rubato
  - [Harmony] - arpeggio, dissonance, resolution
  - [Structure] - build, drop, breakdown terms

## Smart Term Detection & Highlighting

### Auto-Detection Behavior
As users type in any text area:
1. System detects glossary terms in real-time (debounced ~300ms after typing stops)
2. Detected terms are wrapped in brackets: `[term]`
3. Bracketed terms are highlighted with colour (e.g., light blue/purple background)
4. Terms remain editable - users can modify or delete brackets manually

### Glossary Term Categories
Parse the attached music glossary and categorise into:

**Global Settings terms:**
- Genres & Styles (entire section)
- Tempo names (Adagio, Allegro, Andante, Presto)
- Time Signature, Key/Major/Minor
- Mood descriptors

**Instrument Palette terms:**
- Instrumentation & Texture (Timbre, Orchestration)
- Production & Effects (Reverb, Distortion, EQ, Compression)
- Vocal Techniques (Falsetto, Belt, Crooning)

**Performance/Arrangement terms:**
- Song Structure types (Verse, Chorus, Bridge, etc.)
- Dynamics & Expression (Crescendo, Staccato, Legato, Accent)
- Tempo & Rhythm performance (Syncopation, Groove, Rubato)
- Melody & Harmony (Arpeggio, Dissonance, Resolution)

### Visual Treatment
**Bracketed terms:**
- Text colour: Keep original black/dark
- Background: Light blue/purple tint (subtle, not overwhelming)
- Border: None
- Cursor: Remains text cursor (editable)

**Example:**
```
Normal text with [highlighted term] and more [terms] here
         ^^^^^^^^^^^^^^^^^^^^    ^^^^^^^
         (light blue background)
```

## Helper Badges & Quick Selects

### Quick Selects (Always Visible)
Positioned above or beside text areas:
- **BPM Selector**: Dropdown with common values (60, 80, 90, 100, 120, 140, etc.) + custom input
- **Key Selector**: Dropdown with all keys, grouped by major/minor, with helper text
  - Example: "G Major (bright, common in pop)"
  - Example: "A Minor (melancholic, introspective)"
- **Time Signature**: Dropdown (4/4, 3/4, 6/8, 5/4, 7/8)

Clicking these inserts the value at cursor position in text area.

### Helper Badges (Collapsible/Expandable)
Each text area has contextual helper badges below it:

**For Global:**
```
Add: [Genre ▼] [Mood ▼] [Tempo ▼] [More... ▼]
```

**For Instruments:**
```
Add: [Timbre ▼] [Effects ▼] [Vocal Tech ▼] [Texture ▼]
```

**For Sections:**
```
Add: [Dynamics ▼] [Performance ▼] [Harmony ▼]
```

**Badge Interaction:**
1. Click badge → dropdown appears with glossary terms from that category
2. Select term → inserts `[term]` at current cursor position in text area
3. If no cursor position, appends to end of text
4. Dropdown searchable/filterable

## Master Prompt Generation

### Output Format
The system combines all text areas into a structured master prompt that gets sent to ElevenLabs API.

**Example structure:**
```
GLOBAL:
a [neo-soul] track with [uplifting] vocals at 120bpm in [G major]

INSTRUMENTS:
Bass: [analog] [moog] bass with [distortion] and [heavy saturation]
Drums: [lazy swing] drums with [brush sticks] on snare
Keys: [smooth] [ethereal] keys with [reverb]

SECTIONS:
Intro: vocals and keys only, [rubato] feel, [intimate] vocal
Verse: drums enter, [funky] bassline, [staccato] guitar
Chorus: all instruments, big saxophone, [powerful] vocals
```

This master prompt is then formatted according to ElevenLabs API requirements (refer to previous conversation about their JSON structure with global/local styles and sections).

### Prompt Preview
Before generating, show users a "Prompt Preview" modal/section:
- Displays the master prompt in readable format
- Shows detected terms highlighted
- Allows final edits
- Button: [Edit] [Generate Audio]

## User Flow

### Creating a Prompt
1. User lands on prompt builder interface
2. Starts typing in Global Settings text area: "a neo-soul track"
3. Clicks [Genre] badge → selects "neo-soul" → inserts `[neo-soul]`
4. Uses BPM selector → picks 120 → inserts "at 120bpm"
5. Continues typing naturally, terms auto-detect and bracket
6. Clicks [+ Add Instrument]
7. Names it "Bass", describes: "moog bass with distortion"
8. Clicks [Effects] → adds `[distortion]` term
9. Repeats for other instruments
10. Clicks [+ Add Section] → selects "Intro" type
11. Describes intro performance
12. Repeats for Verse, Chorus, etc.
13. Clicks [Preview Prompt] → reviews master prompt
14. Clicks [Generate Audio] → sends to ElevenLabs API

### Editing Existing Prompt
- All text areas remain editable
- Can add/remove instruments and sections
- Can modify text freely
- Bracketed terms can be edited or removed manually
- Changes reflected in master prompt preview

## Technical Requirements

### Frontend
- React-based interface
- Text areas with rich text capabilities (for term highlighting)
- Real-time term detection with debouncing (300ms delay)
- Efficient string matching algorithm for glossary terms
- State management for multiple instruments and sections
- Drag-and-drop reordering for sections (optional enhancement)

### Data Structure
```typescript
interface Prompt {
  global: string;
  instruments: Array<{
    name: string;
    description: string;
  }>;
  sections: Array<{
    type: SectionType; // "Intro" | "Verse" | "Chorus" | etc.
    description: string;
  }>;
}

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  applies_to: ("global" | "instrument" | "section")[];
}
```

### Term Detection Logic
```javascript
// Pseudo-code
const glossaryTerms = loadGlossary();
const termRegex = new RegExp(`\\b(${glossaryTerms.join('|')})\\b`, 'gi');

function detectAndBracket(text: string): string {
  // Find terms not already in brackets
  return text.replace(termRegex, (match) => {
    if (isAlreadyBracketed(match)) return match;
    return `[${match}]`;
  });
}
```

### Master Prompt Generation
```javascript
function generateMasterPrompt(prompt: Prompt): string {
  let master = `GLOBAL:\n${prompt.global}\n\n`;

  if (prompt.instruments.length > 0) {
    master += `INSTRUMENTS:\n`;
    prompt.instruments.forEach(inst => {
      master += `${inst.name}: ${inst.description}\n`;
    });
    master += '\n';
  }

  if (prompt.sections.length > 0) {
    master += `SECTIONS:\n`;
    prompt.sections.forEach(section => {
      master += `${section.type}: ${section.description}\n`;
    });
  }

  return master;
}
```

## Integration with ElevenLabs API

The master prompt needs to be transformed into ElevenLabs' JSON structure:
- Global text → `generation_settings.prompt` and `lyrics.positive_global_styles`
- Instrument descriptions → inform instrument choices in sections
- Section descriptions → `lyrics.sections[]` with `positive_local_styles` and `negative_local_styles`

Refer to previous conversation about ElevenLabs JSON structure for exact mapping.

## Glossary Integration

### Collapsible Sidebar
- Small help icon `[?]` in top-right corner
- Click to expand glossary sidebar (300px width)
- Slide-in animation from right
- Contains full glossary with categories and search
- See separate glossary implementation document for full details

### Term Tooltips
- Click any bracketed term → tooltip shows definition
- Tooltip contains: term name, category, definition
- Click outside or ESC to close
- See separate glossary implementation document for full details

## Success Criteria
- Users can create structured prompts without rigid form constraints
- Natural typing experience with smart assistance
- Glossary term usage increases prompt quality and consistency
- 80%+ of prompts use at least 3 glossary terms
- Users spend <5 minutes creating first prompt
- Master prompt generates valid ElevenLabs API calls

## Out of Scope (for initial version)
- Prompt templates/presets
- Collaborative prompt editing
- Version control within prompt builder (this is in PRD 2)
- AI-assisted prompt suggestions
- Audio preview within prompt builder

---

## Your Task
Create a comprehensive PRD that includes:
1. Executive Summary
2. Goals & Success Metrics
3. User Stories
4. Detailed Feature Specifications
5. User Flows (with diagrams if helpful)
6. Technical Requirements
7. UI/UX Mockup Descriptions
8. Component Architecture
9. Data Models
10. API Integration Requirements
11. Implementation Phases/Milestones
12. Open Questions & Assumptions

Use the information above as the foundation, but expand with proper PRD structure and any additional details needed for implementation.
