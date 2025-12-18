# PRD 01: Three-Tier AI Audio Generation Interface

## Overview

Redesign the AI audio generation interface into a structured 3-tier system that organizes music generation inputs into Global Settings, Instrument Palette, and Performance/Arrangement sections. This system will use categorized glossary terms with dropdown badges for improved user experience and structured JSON output.

## Problem Statement

The current audio generation interface lacks structured organization for music composition parameters. Users need a more intuitive way to:
- Define global musical parameters (genre, key, tempo)
- Configure individual instruments with their characteristics and effects
- Specify section-by-section arrangement and performance details

## Goals & Objectives

1. Create a hierarchical 3-tier input system for music generation
2. Transform free-form text inputs into structured, categorized selections
3. Improve discoverability of musical terms through organized glossaries
4. Generate structured JSON output compatible with ElevenLabs format
5. Provide contextual help and guidance throughout the composition process

## Target Users

- Music creators using AI audio generation
- Users with varying levels of music theory knowledge
- Production teams needing precise control over generated audio

## System Architecture

### Tier 1: Global Settings
**Scope:** One instance only - applies to entire composition

**Input Fields:**

1. **Genre**
   - Type: Dropdown badges (multi-select)
   - Source: Genres & Styles section from glossary
   - Examples: Pop, Rock, Jazz, Electronic, Classical, Hip-Hop, R&B, Country
   - UI: Badge selector with search/filter capability

2. **Key**
   - Type: Dropdown with helper text
   - Options: All major and minor keys (C Major, A Minor, etc.)
   - Helper text: Context-aware suggestions
     - Example: "G Major - commonly used in pop, uplifting feel"
     - Example: "D Minor - somber, introspective tone"
   - UI: Dropdown with inline descriptions

3. **Time Signature**
   - Type: Dropdown
   - Common options: 4/4, 3/4, 6/8, 5/4, 7/8
   - Helper text: Brief explanation of each (e.g., "4/4 - Standard time, most common")

4. **Tempo**
   - Type: Dual input (BPM slider + Named tempo dropdown)
   - BPM Range: 40-200
   - Named Tempos:
     - Adagio (66-76 BPM)
     - Andante (76-108 BPM)
     - Allegro (120-156 BPM)
     - Presto (168-200 BPM)
   - UI: Slider with named tempo labels, or dropdown that auto-sets BPM range

5. **Overall Mood/Vibe**
   - Type: Dropdown badges (multi-select)
   - Examples: Energetic, Melancholic, Uplifting, Dark, Peaceful, Aggressive, Romantic
   - UI: Badge selector with color coding

**UI Layout:**
```
┌─ Global Settings ────────────────────────────┐
│ Genre:         [Pop] [Electronic] [+]        │
│ Key:           [G Major ▼] ℹ️ Uplifting feel │
│ Time Sig:      [4/4 ▼]                       │
│ Tempo:         [120 BPM ←─●─→] Allegro       │
│ Mood:          [Energetic] [Uplifting] [+]   │
└──────────────────────────────────────────────┘
```

### Tier 2: Instrument Palette
**Scope:** Repeatable - multiple instances via "Add Instrument" button

**Input Fields per Instrument:**

1. **Instrument Name**
   - Type: Text input with autocomplete
   - Examples: Electric Guitar, Piano, Bass, Drums, Synth Pad, Vocals
   - UI: Text field with suggested instruments dropdown

2. **Timbre/Sound Characteristics**
   - Type: Dropdown badges (multi-select)
   - Source: Instrumentation & Texture glossary
   - Categories:
     - Timbre: Bright, Dark, Warm, Cold, Rich, Thin, Mellow, Harsh
     - Texture: Monophonic, Polyphonic, Homophonic, Layered, Sparse, Dense
   - UI: Categorized badge selector

3. **Production Effects**
   - Type: Dropdown badges with intensity controls
   - Effects:
     - Reverb (with room size: Small, Medium, Large, Hall)
     - Distortion (level: Light, Medium, Heavy)
     - EQ (preset curves or custom)
     - Compression (ratio selector)
     - Delay (time and feedback)
     - Chorus, Flanger, Phaser
   - UI: Effect badges that expand to show parameters

4. **Vocal Techniques** (conditional - only for vocal instruments)
   - Type: Dropdown badges
   - Options: Falsetto, Belt, Crooning, Vibrato, Whisper, Growl, Melisma
   - UI: Badge selector (only visible when instrument is vocal-related)

**Validation:**
- Warning when >8 instruments added
- Warning message: "⚠️ Adding many instruments may result in muddy mix. Consider reducing for clarity."

**UI Layout:**
```
┌─ Instrument Palette ─────────────────────────┐
│ [+ Add Instrument]                           │
│                                              │
│ ┌─ Instrument 1 ──────────────────── [×] ─┐ │
│ │ Name: [Electric Guitar           ]      │ │
│ │ Timbre: [Bright] [Warm] [+]             │ │
│ │ Effects: [Reverb: Medium] [Distortion]  │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ ┌─ Instrument 2 ──────────────────── [×] ─┐ │
│ │ Name: [Vocals                    ]      │ │
│ │ Timbre: [Rich] [Warm] [+]               │ │
│ │ Techniques: [Belt] [Vibrato] [+]        │ │
│ │ Effects: [Reverb: Hall] [Compression]   │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ ⚠️ 8+ instruments may affect mix clarity    │
└──────────────────────────────────────────────┘
```

### Tier 3: Performance/Arrangement
**Scope:** Repeatable - multiple instances via "Add Section" button

**Input Fields per Section:**

1. **Section Type**
   - Type: Dropdown
   - Options: Intro, Verse, Chorus, Bridge, Pre-Chorus, Outro, Break, Drop, Instrumental
   - Helper text: Brief description of typical section purpose
   - UI: Dropdown with descriptions

2. **Instrument Selection**
   - Type: Checkbox list of instruments from Tier 2
   - UI: List of all defined instruments with include/exclude toggles
   - Visual: Active instruments highlighted, inactive grayed out

3. **Performance Style per Instrument**
   - Type: Expandable per-instrument settings
   - Categories (dropdown badges for each):

   **a) Dynamics & Expression**
   - Options: Crescendo, Decrescendo, Staccato, Legato, Accent, Forte, Piano, Sforzando
   - Multi-select badges

   **b) Tempo & Rhythm Performance**
   - Options: Syncopation, Groove, Rubato, Swing, Straight, Polyrhythm
   - Multi-select badges

   **c) Melody & Harmony**
   - Options: Arpeggio, Chord Progression, Dissonance, Resolution, Modulation, Counter-melody
   - Multi-select badges

**UI Layout:**
```
┌─ Performance/Arrangement ────────────────────┐
│ [+ Add Section]                              │
│                                              │
│ ┌─ Section 1: Verse ────────────────── [×] ─┐│
│ │ Type: [Verse ▼]                           ││
│ │                                           ││
│ │ Active Instruments:                       ││
│ │ ☑ Electric Guitar  ☑ Bass  ☑ Drums       ││
│ │ ☐ Synth Pad        ☑ Vocals              ││
│ │                                           ││
│ │ ┌─ Electric Guitar Performance ─────┐    ││
│ │ │ Dynamics: [Legato] [Piano] [+]    │    ││
│ │ │ Rhythm: [Groove] [+]              │    ││
│ │ │ Melody: [Arpeggio] [+]            │    ││
│ │ └───────────────────────────────────┘    ││
│ │                                           ││
│ │ ┌─ Vocals Performance ───────────────┐   ││
│ │ │ Dynamics: [Crescendo] [Forte] [+] │   ││
│ │ │ Melody: [Melisma] [+]             │   ││
│ │ └───────────────────────────────────┘   ││
│ └───────────────────────────────────────────┘│
│                                              │
│ ┌─ Section 2: Chorus ───────────────── [×] ─┐│
│ │ Type: [Chorus ▼]                          ││
│ │ Active Instruments: All ☑                 ││
│ │ ...                                       ││
│ └───────────────────────────────────────────┘│
└──────────────────────────────────────────────┘
```

## Glossary Categories Implementation

### Data Structure Requirements

Parse the music glossary (Prompt_Glossary) and categorize terms into:

**1. Global Settings Terms**
- Genres & Styles
- Tempo names (Adagio, Allegro, Andante, Presto, etc.)
- Time Signatures
- Keys (Major/Minor)
- Moods/Vibes

**2. Instrument Settings Terms**
- Instrumentation & Texture (Timbre descriptions)
- Production & Effects (Reverb, Distortion, EQ, Compression, etc.)
- Vocal Techniques (Falsetto, Belt, Crooning, etc.)

**3. Performance Settings Terms**
- Song Structure types (Intro, Verse, Chorus, Bridge, etc.)
- Dynamics & Expression (Crescendo, Staccato, Legato, Accent, etc.)
- Tempo & Rhythm performance terms (Syncopation, Groove, Rubato, etc.)
- Melody & Harmony (Arpeggio, Dissonance, Resolution, etc.)

### Glossary Data Format

```typescript
interface GlossaryTerm {
  term: string;
  category: string;
  subcategory?: string;
  description: string;
  tier: 1 | 2 | 3;
  examples?: string[];
  relatedTerms?: string[];
}
```

## Prompt Library Sidebar

### Overview

A collapsible sidebar that provides quick access to saved prompt templates organized by the 3-tier system. Users can browse, search, filter, and apply pre-configured prompts for Global Settings, Instruments, and Sections.

### Purpose

- **Accelerate prompt creation** by providing reusable templates
- **Share best practices** through community-curated prompts
- **Discover new combinations** via browsing popular prompts
- **Maintain consistency** across projects with saved presets

### Sidebar Layout

```
┌─ PROMPT LIBRARY ─────────────────────┐
│ [< Collapse]                         │
│                                      │
│ [Search prompts...]                  │
│                                      │
│ Filter by: [Category ▼] [Add ▼]     │
│ Active: [Global] [×] [Pop] [×]       │
│                                      │
│ ┌─────────────────────────────────┐  │
│ │ 📂 Global Settings (42)         │  │
│ │ 🎸 Instrument Presets (128)     │  │
│ │ 🎵 Section Templates (87)       │  │
│ └─────────────────────────────────┘  │
│                                      │
│ ┌─ Upbeat Pop Global ───────[💾]─┐  │
│ │ Pop, G Major, 120 BPM           │  │
│ │ Energetic, Uplifting            │  │
│ │ ⭐ 4.8  👥 1.2k  ✓ 94%          │  │
│ │ [Apply to Global]               │  │
│ └─────────────────────────────────┘  │
│                                      │
│ ┌─ Moog Bass Heavy ─────────[💾]─┐  │
│ │ Bass: Deep, Warm                │  │
│ │ Effects: Distortion, Saturation │  │
│ │ ⭐ 4.6  👥 856  ✓ 91%           │  │
│ │ [Add Instrument]                │  │
│ └─────────────────────────────────┘  │
│                                      │
│ ┌─ Energetic Chorus ─────────[💾]─┐  │
│ │ Type: Chorus, All Instruments   │  │
│ │ Style: Forte, Syncopation       │  │
│ │ ⭐ 4.7  👥 623  ✓ 89%           │  │
│ │ [Add Section]                   │  │
│ └─────────────────────────────────┘  │
│                                      │
│ Showing 12 of 257 prompts           │
└──────────────────────────────────────┘
```

### Sidebar States

**1. Expanded (Default: 25-30% width)**
- Full search and filter interface
- Scrollable prompt cards
- Category tabs/sections
- Stats and actions visible

**2. Collapsed (Minimal width: ~48px)**
- Vertical "Prompt Library" text
- Toggle button to expand
- Minimal visual footprint

**3. Loading States**
- Skeleton cards while fetching prompts
- Spinner for search/filter operations

### Prompt Categories

#### 1. Global Settings Prompts

**What they contain:**
- Genre(s)
- Key
- Time Signature
- Tempo (BPM + named)
- Mood(s)

**Example prompts:**
- "Upbeat Pop" - Pop, G Major, 4/4, 120 BPM, Energetic/Uplifting
- "Lo-Fi Chill" - Lo-Fi/Hip-Hop, D Minor, 4/4, 85 BPM, Relaxed/Mellow
- "Epic Orchestral" - Classical/Cinematic, C Major, 4/4, 140 BPM, Dramatic/Powerful

**Use case:** User clicks "Apply to Global" → replaces/fills Tier 1 fields

#### 2. Instrument Presets

**What they contain:**
- Instrument name
- Timbre characteristics (array)
- Effects with parameters (array)
- Vocal techniques (if applicable)

**Example prompts:**
- "Moog Bass Heavy" - Bass: Moog Analog, Timbre: [Deep, Warm], Effects: [Distortion (Light), Saturation (Heavy)]
- "Smooth Jazz Sax" - Saxophone, Timbre: [Smooth, Rich], Effects: [Reverb (Medium Hall)]
- "Soulful Vocals" - Vocals, Timbre: [Rich, Warm], Techniques: [Belt, Vibrato], Effects: [Reverb (Large), Compression]

**Use case:** User clicks "Add Instrument" → creates new instrument in Tier 2 with these settings

#### 3. Section Templates

**What they contain:**
- Section type (Intro, Verse, Chorus, etc.)
- Included instruments (by reference or generic placeholders)
- Performance styles per instrument
  - Dynamics & Expression
  - Tempo & Rhythm
  - Melody & Harmony

**Example prompts:**
- "Energetic Chorus" - Type: Chorus, Instruments: All, Dynamics: [Forte], Rhythm: [Syncopation]
- "Stripped Verse" - Type: Verse, Instruments: Vocals + Guitar only, Dynamics: [Piano, Legato]
- "Build-up Bridge" - Type: Bridge, Instruments: All, Dynamics: [Crescendo], Rhythm: [Syncopation]

**Use case:** User clicks "Add Section" → creates new section in Tier 3 with these settings

**Note on Instrument References:**
- Section templates use **generic placeholders** (e.g., "Bass", "Drums", "Vocals")
- When applied, user maps placeholders to their actual instruments from Tier 2
- Or, system auto-matches by instrument type if names align

### Search & Filter System

#### Search Functionality

**Search across:**
- Prompt name/title
- Description text
- Genre/mood tags
- Instrument names
- Section types

**Search behavior:**
- Real-time filtering (debounced, ~300ms)
- Case-insensitive
- Partial match supported
- Highlights matching terms (optional enhancement)

#### Filter System

**Filter categories:**

1. **By Type** (primary category)
   - Global Settings
   - Instrument Presets
   - Section Templates

2. **By Genre** (for Global prompts)
   - Pop, Rock, Jazz, Electronic, Classical, etc.

3. **By Mood** (for Global prompts)
   - Energetic, Chill, Dark, Uplifting, etc.

4. **By Instrument Type** (for Instrument presets)
   - Bass, Guitar, Drums, Synth, Vocals, Piano, etc.

5. **By Section Type** (for Section templates)
   - Intro, Verse, Chorus, Bridge, Outro, etc.

6. **By Popularity** (across all types)
   - Most Used
   - Highest Rated
   - Recently Added

**Filter UI:**
- Multi-select badge system
- "Clear all filters" button
- Active filters displayed as removable badges
- AND logic (all filters must match)

**Example filter combinations:**
```
Type: Global + Genre: Pop + Mood: Energetic
→ Shows only Global Setting prompts for energetic pop music

Type: Instrument + Instrument Type: Bass
→ Shows only bass instrument presets

Type: Section + Section Type: Chorus
→ Shows only chorus section templates
```

### Prompt Card Design

#### Card Structure

```
┌─ [Prompt Title] ──────────────────[💾 Save]─┐
│ [Short description or key features]         │
│                                             │
│ [Visual representation of prompt content]   │
│                                             │
│ Stats: ⭐ Rating  👥 Uses  ✓ Approval Rate │
│                                             │
│ [Primary Action Button]                     │
└─────────────────────────────────────────────┘
```

#### Card Variants

**Global Settings Card:**
```
┌─ Upbeat Pop Global ─────────────────[💾]──┐
│ Perfect for energetic pop tracks           │
│                                            │
│ 🎵 Pop, Electronic                         │
│ 🎹 G Major, 4/4, 120 BPM (Allegro)        │
│ 💫 Energetic, Uplifting                    │
│                                            │
│ ⭐ 4.8  👥 1,234  ✓ 94%                   │
│                                            │
│ [Apply to Global Settings]                 │
└────────────────────────────────────────────┘
```

**Instrument Card:**
```
┌─ Moog Bass Heavy ───────────────────[💾]──┐
│ Powerful analog bass with grit             │
│                                            │
│ 🎸 Bass: Moog Analog                       │
│ 🎨 Deep, Warm, Rich                        │
│ 🎛️ Distortion (Light), Saturation (Heavy) │
│                                            │
│ ⭐ 4.6  👥 856  ✓ 91%                     │
│                                            │
│ [Add This Instrument]                      │
└────────────────────────────────────────────┘
```

**Section Card:**
```
┌─ Energetic Chorus ──────────────────[💾]──┐
│ High-energy chorus with all instruments    │
│                                            │
│ 📍 Type: Chorus                            │
│ 🎼 All instruments active                  │
│ 🎭 Forte, Syncopation, Accent              │
│                                            │
│ ⭐ 4.7  👥 623  ✓ 89%                     │
│                                            │
│ [Add This Section]                         │
└────────────────────────────────────────────┘
```

#### Card Actions

**Primary actions (large button):**
- Global: "Apply to Global Settings"
- Instrument: "Add This Instrument"
- Section: "Add This Section"

**Secondary actions (icon buttons):**
- 💾 Save to my library (star/bookmark)
- 📋 Copy as JSON
- 👁️ Preview details (expand card or modal)
- ⚙️ Customize before applying

#### Card Stats

**Metrics displayed:**
- ⭐ **Average Rating** (1-5 stars)
- 👥 **Total Uses** (how many times applied)
- ✓ **Approval Rate** (% of users who kept it)

**Stats behavior:**
- Updated in real-time (or periodic sync)
- Helps users discover high-quality prompts
- Sorting by stats available

### User Interactions

#### Applying Prompts

**Global Settings Prompt:**
1. User clicks "Apply to Global Settings"
2. Confirmation: "Replace current global settings?" (if already filled)
3. Tier 1 fields populate with prompt values
4. Success toast: "Global settings applied!"

**Instrument Preset:**
1. User clicks "Add This Instrument"
2. New instrument card created in Tier 2
3. Pre-filled with preset values
4. User can edit immediately or keep as-is
5. Success toast: "Instrument added!"

**Section Template:**
1. User clicks "Add This Section"
2. Modal: "Map instruments to template"
   - Shows template's instrument placeholders (Bass, Drums, etc.)
   - User selects from their Tier 2 instruments to map
   - Or option: "Use generic names (I'll add instruments later)"
3. New section created in Tier 3
4. Success toast: "Section added!"

**Instrument Mapping Modal:**
```
┌─ Map Instruments to Section Template ──────┐
│                                            │
│ Template uses these instruments:           │
│                                            │
│ Bass    → [Select your bass ▼]            │
│             └─ Electric Bass               │
│             └─ Synth Bass                  │
│             └─ [Skip this instrument]      │
│                                            │
│ Drums   → [Select your drums ▼]           │
│             └─ Acoustic Kit                │
│             └─ [Skip this instrument]      │
│                                            │
│ Guitar  → [Select your guitar ▼]          │
│             └─ [No guitar added yet]       │
│                                            │
│ ☐ Use generic names (I'll configure later) │
│                                            │
│ [Cancel]  [Apply Section]                  │
└────────────────────────────────────────────┘
```

#### Saving Prompts

**Save current configuration:**

**From Tier 1 (Global):**
- "Save Global Settings" button
- Modal: Name, description, tags
- Saves to user's library under Global category

**From Tier 2 (Instrument):**
- Each instrument card has "Save as Preset" icon
- Modal: Name, description, tags
- Saves individual instrument configuration

**From Tier 3 (Section):**
- Each section card has "Save as Template" icon
- Modal: Name, description, instrument mapping options
- Saves section with generic instrument placeholders

**Save Modal:**
```
┌─ Save Prompt to Library ──────────────────┐
│                                           │
│ Name: [Upbeat Pop Global_____________]    │
│                                           │
│ Description: [Perfect for energetic pop   │
│              tracks with modern feel___]  │
│                                           │
│ Tags: [Pop] [Energetic] [+Add tag]        │
│                                           │
│ Category: ● Global Settings               │
│           ○ Instrument Preset             │
│           ○ Section Template              │
│                                           │
│ Visibility: ● Private (only me)           │
│             ○ Public (community library)  │
│                                           │
│ [Cancel]  [Save Prompt]                   │
└───────────────────────────────────────────┘
```

### Data Models

#### Prompt Model

```typescript
interface SavedPrompt {
  id: string;  // UUID
  user_id: string;

  // Metadata
  name: string;
  description: string;
  tags: string[];
  category: 'global' | 'instrument' | 'section';

  // Content (varies by category)
  prompt_data: GlobalPromptData | InstrumentPromptData | SectionPromptData;

  // Stats
  stats: {
    total_uses: number;
    total_saves: number;  // Bookmarks
    avg_rating: number;  // 0-5
    approval_rate: number;  // 0-100
  };

  // Visibility
  is_public: boolean;
  created_by_user: boolean;  // vs community/official

  // Timestamps
  created_at: Date;
  updated_at: Date;
}

interface GlobalPromptData {
  genre: string[];
  key: string;
  time_signature: string;
  tempo: { bpm: number; named: string };
  mood: string[];
}

interface InstrumentPromptData {
  name: string;
  timbre: string[];
  effects: Effect[];
  vocal_techniques?: string[];
}

interface SectionPromptData {
  type: string;  // Intro, Verse, etc.
  instrument_placeholders: string[];  // ["Bass", "Drums", "Guitar"]
  performance: Record<string, PerformanceStyle>;  // placeholder → style
}

interface PerformanceStyle {
  dynamics: string[];
  rhythm: string[];
  melody: string[];
}
```

#### User Library Model

```typescript
interface UserLibrary {
  user_id: string;

  // Collections
  saved_prompts: string[];  // Prompt IDs the user created
  bookmarked_prompts: string[];  // Prompt IDs the user bookmarked

  // Recently used
  recent_global: string[];  // Last 10 global prompts used
  recent_instruments: string[];  // Last 10 instrument presets used
  recent_sections: string[];  // Last 10 section templates used

  // Usage tracking
  usage_stats: Record<string, number>;  // prompt_id → times_used
}
```

### Technical Implementation

#### Component Structure

```typescript
<PromptLibrarySidebar>
  <SidebarHeader
    isOpen={isOpen}
    onToggle={toggleSidebar}
  />

  {isOpen && (
    <>
      <SearchBar
        query={searchQuery}
        onSearch={setSearchQuery}
      />

      <FilterControls
        activeFilters={activeFilters}
        onAddFilter={addFilter}
        onRemoveFilter={removeFilter}
        onClearAll={clearAllFilters}
      />

      <CategoryTabs
        categories={['Global', 'Instrument', 'Section']}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      <PromptList
        prompts={filteredPrompts}
        onApply={handleApplyPrompt}
        onSave={handleSavePrompt}
        onPreview={handlePreviewPrompt}
      />

      <SidebarFooter
        resultsCount={filteredPrompts.length}
        totalCount={allPrompts.length}
      />
    </>
  )}
</PromptLibrarySidebar>
```

#### State Management

```typescript
interface PromptLibraryStore {
  // UI state
  isOpen: boolean;
  activeCategory: 'global' | 'instrument' | 'section' | 'all';
  searchQuery: string;
  activeFilters: Filter[];

  // Data
  prompts: SavedPrompt[];
  userLibrary: UserLibrary;

  // Actions
  toggleSidebar: () => void;
  searchPrompts: (query: string) => void;
  filterPrompts: (filters: Filter[]) => void;
  applyPrompt: (promptId: string) => void;
  savePrompt: (prompt: SavedPrompt) => Promise<void>;
  deletePrompt: (promptId: string) => Promise<void>;
  ratePrompt: (promptId: string, rating: number) => Promise<void>;
}
```

#### API Endpoints

```typescript
// Fetch prompts
GET /api/prompts?category=global&genre=pop&limit=50

// Create prompt
POST /api/prompts
Body: { name, description, category, prompt_data, is_public }

// Update prompt
PATCH /api/prompts/:id
Body: { name?, description?, tags?, is_public? }

// Delete prompt
DELETE /api/prompts/:id

// Rate prompt
POST /api/prompts/:id/rate
Body: { rating: 1-5 }

// Track usage
POST /api/prompts/:id/use

// Bookmark prompt
POST /api/prompts/:id/bookmark
DELETE /api/prompts/:id/bookmark
```

### Integration with Main Interface

#### Layout

**Desktop (>1280px):**
```
┌────────────────────────────────────────────┐
│ [Logo] [Navigation]                        │
├──────────┬─────────────────────────────────┤
│ Prompt   │ Main Prompt Builder             │
│ Library  │                                 │
│ Sidebar  │ Tier 1: Global Settings         │
│          │ [filled from sidebar prompts]   │
│ [Search] │                                 │
│ [Filter] │ Tier 2: Instrument Palette      │
│          │ [add instruments from sidebar]  │
│ [Prompts]│                                 │
│ [...]    │ Tier 3: Performance/Arrangement │
│          │ [add sections from sidebar]     │
│          │                                 │
│ 25-30%   │ 70-75%                          │
└──────────┴─────────────────────────────────┘
```

**Collapsed sidebar:**
```
┌────────────────────────────────────────────┐
│ [Logo] [Navigation]                        │
├─┬──────────────────────────────────────────┤
│P│ Main Prompt Builder                      │
│r│                                          │
│o│ Tier 1: Global Settings                  │
│m│                                          │
│p│ Tier 2: Instrument Palette               │
│t│                                          │
│ │ Tier 3: Performance/Arrangement          │
│L│                                          │
│i│                                          │
│b│                                          │
│ │ 95%+                                     │
└─┴──────────────────────────────────────────┘
```

#### Interaction Flow

1. **User opens page** → Sidebar expanded by default
2. **User searches "pop"** → Filters prompts in sidebar
3. **User clicks "Upbeat Pop Global"** → Tier 1 auto-fills
4. **User clicks "Moog Bass Heavy"** → New instrument added to Tier 2
5. **User clicks "Energetic Chorus"** → Instrument mapping modal → Section added to Tier 3
6. **User configures custom settings** → Clicks "Save as Preset" → Adds to their library
7. **User collapses sidebar** → More space for main interface

### Future Enhancements

**Community Features:**
- Public prompt sharing
- Upvote/downvote system
- Comments and discussions
- Featured/official prompts from team
- User profiles and reputation

**Advanced Filtering:**
- Filter by BPM range
- Filter by key signature
- Filter by complexity (beginner/intermediate/advanced)
- "Similar to this" recommendations

**Smart Suggestions:**
- "Users who used X also used Y"
- Auto-suggest complementary instruments
- Genre-appropriate section templates
- Mood-based recommendations

**Bulk Operations:**
- Import/export library as JSON
- Duplicate and modify prompts
- Batch delete
- Merge/combine prompts

**Analytics:**
- Track most-used prompts
- Success rate by prompt type
- User preferences over time
- A/B testing new prompts

## Glossary Integration Feature

### Overview

Integrate the music glossary throughout the interface to help users understand terminology and maintain consistent vocabulary across prompts and evaluations. The glossary provides contextual help via a collapsible sidebar and auto-detection with tooltips for glossary terms used in text.

### Purpose

- **Educational** - Help users learn music terminology
- **Consistency** - Maintain consistent vocabulary across prompts
- **Discovery** - Users discover relevant terms while building prompts
- **Confidence** - Reduce uncertainty about musical concepts

### Glossary Data Structure

Parse and categorize the music glossary (`Prompt_Glossary`) into sections:

**Categories:**
1. **Tempo & Rhythm** - Tempo, BPM, Rubato, Syncopation, Groove, etc.
2. **Dynamics & Expression** - Crescendo, Decrescendo, Staccato, Legato, Accent, Forte, Piano, etc.
3. **Song Structure** - Intro, Verse, Chorus, Bridge, Pre-Chorus, Outro, Drop, Break, etc.
4. **Melody & Harmony** - Arpeggio, Chord Progression, Dissonance, Resolution, Modulation, etc.
5. **Genres & Styles** - Pop, Rock, Jazz, Electronic, Classical, Hip-Hop, R&B, etc.
6. **Instrumentation & Texture** - Timbre, Monophonic, Polyphonic, Layered, Dense, Sparse, etc.
7. **Vocal Techniques** - Falsetto, Belt, Crooning, Vibrato, Whisper, Growl, Melisma, etc.
8. **Production & Effects** - Reverb, Distortion, EQ, Compression, Delay, Chorus, Phaser, etc.
9. **Advanced Concepts** - Polyrhythm, Cross-rhythm, Metric modulation, etc.

**Term Data Model:**

```typescript
interface GlossaryTerm {
  id: string;  // Unique identifier
  term: string;  // Display name
  definition: string;  // Clear, concise explanation
  category: string;  // One of the categories above
  subcategory?: string;  // Optional sub-grouping
  applies_to: ('global' | 'instrument' | 'section')[];  // Which tiers use this term

  // Optional enrichment
  examples?: string[];  // Usage examples
  related_terms?: string[];  // IDs of related terms
  synonyms?: string[];  // Alternative names
  audio_example_url?: string;  // Future: audio demonstration
}
```

**Example Terms:**

```json
[
  {
    "id": "rubato",
    "term": "Rubato",
    "definition": "Flexible tempo where the performer speeds up and slows down expressively, creating a more natural, human feel.",
    "category": "Tempo & Rhythm",
    "applies_to": ["global", "section"],
    "examples": [
      "Add rubato feel in the intro",
      "Use rubato for emotional emphasis in the bridge"
    ],
    "related_terms": ["tempo", "groove"]
  },
  {
    "id": "staccato",
    "term": "Staccato",
    "definition": "Short, detached notes that are played crisply and separated from each other.",
    "category": "Dynamics & Expression",
    "applies_to": ["section"],
    "examples": [
      "Staccato piano in the verse",
      "Drums with staccato accent pattern"
    ],
    "related_terms": ["legato", "accent"],
    "synonyms": ["detached"]
  },
  {
    "id": "distortion",
    "term": "Distortion",
    "definition": "Intentional clipping of audio signal that adds harmonic overtones and grit. Common in rock/metal guitars.",
    "category": "Production & Effects",
    "applies_to": ["instrument"],
    "examples": [
      "Heavy distortion on electric guitar",
      "Light distortion for warmth"
    ],
    "related_terms": ["saturation", "overdrive"]
  }
]
```

### Implementation: Collapsible Glossary Sidebar

#### Sidebar States

**1. Collapsed (Default)**
- Small help icon `[?]` or `[📖]` in top-right corner of main interface
- Tooltip on hover: "Open Music Glossary"
- Minimal visual footprint
- Click to expand

**2. Expanded**
- Slides in from right side of screen
- Width: ~300-350px
- Overlays or pushes main content (design choice)
- Smooth animation (200-300ms)

#### Expanded Sidebar Layout

```
┌─────────────────────────────────────┐
│ Music Glossary            [X Close] │
├─────────────────────────────────────┤
│ [🔍 Search terms...]                │
├─────────────────────────────────────┤
│ ▼ Tempo & Rhythm (12)               │
│   • Tempo - The speed of a piece... │
│   • Rubato - Flexible tempo...      │
│   • Syncopation - Rhythmic...       │
│   • Groove - Sense of rhythm...     │
│                                     │
│ ▶ Dynamics & Expression (15)        │
│                                     │
│ ▶ Song Structure (9)                │
│                                     │
│ ▼ Production & Effects (18)         │
│   • Reverb - Effect simulating...   │
│   • Distortion - Intentional...     │
│   • EQ - Equalization adjusts...    │
│                                     │
│ ▶ Genres & Styles (25)              │
│                                     │
│ ▶ Instrumentation & Texture (14)    │
│                                     │
│ ▶ Vocal Techniques (10)             │
│                                     │
│ ▶ Melody & Harmony (16)             │
│                                     │
│ ▶ Advanced Concepts (8)             │
└─────────────────────────────────────┘
```

#### Sidebar Features

**Search Functionality:**
- Real-time filtering as user types
- Searches term names and definitions
- Case-insensitive
- Highlights matching text
- Shows "No results found" if no matches
- Clear button (×) to reset search

**Category Accordion:**
- Click category header to expand/collapse
- Shows term count in each category
- Can have multiple categories expanded simultaneously
- Default: Most relevant categories expanded (based on current tier)

**Term Display:**
- Bullet list under each category
- Term name in bold
- Definition text in smaller font
- Truncate long definitions with "..." and "Read more" link

**Term Click Behavior:**
- Click term → Expands full definition in-place or in modal
- Shows all metadata (examples, related terms, etc.)
- "Copy to clipboard" button for term name
- "See related terms" links

**Expanded Term View:**
```
┌─────────────────────────────────────┐
│ ← Back to Glossary                  │
├─────────────────────────────────────┤
│ Rubato                              │
│ Category: Tempo & Rhythm            │
│                                     │
│ Flexible tempo where the performer  │
│ speeds up and slows down            │
│ expressively, creating a more       │
│ natural, human feel.                │
│                                     │
│ Examples:                           │
│ • "Add rubato feel in the intro"    │
│ • "Use rubato for emotional         │
│   emphasis in the bridge"           │
│                                     │
│ Related Terms:                      │
│ • Tempo • Groove                    │
│                                     │
│ [🔊 Play Audio Example]             │
│ [📋 Copy Term]                      │
└─────────────────────────────────────┘
```

**Persistence:**
- Glossary state (open/closed) persists during session
- Last search query cleared on close
- Scroll position resets on close

#### Sidebar Component Structure

```typescript
<GlossarySidebar>
  <SidebarHeader onClose={closeSidebar} />

  <SearchInput
    value={searchQuery}
    onChange={handleSearch}
    onClear={clearSearch}
    placeholder="Search terms..."
  />

  <CategoryList>
    {filteredCategories.map(category => (
      <CategoryAccordion
        key={category.name}
        category={category}
        isExpanded={expandedCategories.includes(category.name)}
        onToggle={toggleCategory}
      >
        <TermList
          terms={category.terms}
          onTermClick={handleTermClick}
        />
      </CategoryAccordion>
    ))}
  </CategoryList>

  {selectedTerm && (
    <TermDetailView
      term={selectedTerm}
      onBack={clearSelectedTerm}
      onCopyTerm={copyTermToClipboard}
    />
  )}
</GlossarySidebar>
```

### Implementation: Auto-Detection & Tooltips

#### Where Auto-Detection Works

1. **Text Areas in Evaluation Interface (PRD 02)**
   - Global notes
   - Instrument notes
   - Section notes
   - Overall audio notes

2. **Prompt Preview Modal (PRD 02)**
   - Old prompt text
   - New prompt text

3. **Prompt Structure Display (PRD 02)**
   - Read-only prompt fields (optional, lower priority)

4. **3-Tier Input Fields (PRD 01)**
   - Instrument name inputs
   - Custom text fields

#### Auto-Detection Behavior

**Real-time Detection:**
- Detects glossary terms as user types
- Debounced to avoid performance issues (~300-500ms after user stops typing)
- Case-insensitive matching
- Whole word matching (not partial within larger words)
- Partial word stems accepted (e.g., "distorted" matches "distortion")

**Matching Strategy:**

**Option A: Exact Match**
```javascript
// Only match exact term names
"rubato" → ✓ Matches
"Rubato feel" → ✓ Matches (rubato)
"rubatos" → ✗ No match
```

**Option B: Stem Matching (Recommended)**
```javascript
// Match word stems
"rubato" → ✓ Matches
"distorted" → ✓ Matches (distortion)
"reverbed" → ✓ Matches (reverb)
"crescendos" → ✓ Matches (crescendo)
```

**Visual Styling for Detected Terms:**
- Subtle dotted underline (blue/purple color)
- Slight background tint on hover (#f0f0ff)
- Cursor changes to `help` or `pointer` on hover
- Non-intrusive - shouldn't distract from writing

**Example Styled Text:**
```
"Need more rubato feel and heavier distortion"
         ^^^^^^         ^^^^^^^^^^
         (dotted underline, clickable)
```

#### Tooltip Interaction

**Triggering Tooltips:**
- Click on highlighted term → tooltip appears
- Or hover for 1 second → tooltip appears (optional UX enhancement)
- Click outside tooltip or press ESC to close
- Only one tooltip visible at a time

**Tooltip Content:**
```
┌──────────────────────────────────┐
│ Rubato                    [X]    │
│ Tempo & Rhythm                   │
│                                  │
│ Flexible tempo where the         │
│ performer speeds up and slows    │
│ down expressively.               │
│                                  │
│ [View in Glossary]               │
└──────────────────────────────────┘
```

**Tooltip Positioning:**
- Positioned near clicked word (above or below based on available space)
- Smart positioning to avoid going off-screen
- Arrow pointing to the term

**Tooltip Actions:**
- **[X] Close** - Dismiss tooltip
- **[View in Glossary]** - Opens glossary sidebar with this term selected
- Click outside - Dismiss tooltip

#### Tooltip Component

```typescript
interface TooltipProps {
  term: GlossaryTerm;
  anchorElement: HTMLElement;  // The highlighted word
  onClose: () => void;
  onViewInGlossary: (termId: string) => void;
}

<GlossaryTooltip
  term={term}
  anchorElement={element}
  onClose={handleCloseTooltip}
  onViewInGlossary={handleOpenGlossary}
  position="auto"  // Smart positioning
/>
```

### Technical Requirements

#### Frontend Implementation

**Glossary Data Loading:**
```typescript
// Load glossary from JSON file or embed in app
import glossaryData from '@/data/glossary.json';

// Or fetch from API
const glossary = await fetch('/api/glossary').then(r => r.json());

// Index for fast lookup
const glossaryIndex = new Map(
  glossaryData.map(term => [term.term.toLowerCase(), term])
);
```

**Efficient Term Detection:**

**Approach 1: Pre-compile Regex (Fast)**
```typescript
// Build regex once on app load
const termPattern = glossaryData
  .map(t => t.term)
  .sort((a, b) => b.length - a.length)  // Longest first
  .map(t => escapeRegex(t))
  .join('|');

const glossaryRegex = new RegExp(`\\b(${termPattern})\\b`, 'gi');

function detectTerms(text: string): DetectedTerm[] {
  const matches: DetectedTerm[] = [];
  let match;

  while ((match = glossaryRegex.exec(text)) !== null) {
    matches.push({
      term: match[1],
      startIndex: match.index,
      endIndex: match.index + match[1].length,
      glossaryEntry: glossaryIndex.get(match[1].toLowerCase())
    });
  }

  return matches;
}
```

**Approach 2: Trie Data Structure (Most Efficient)**
```typescript
class GlossaryTrie {
  root = new TrieNode();

  constructor(terms: GlossaryTerm[]) {
    terms.forEach(term => this.insert(term));
  }

  insert(term: GlossaryTerm) {
    // Build trie for O(1) lookups
  }

  search(text: string): DetectedTerm[] {
    // Fast term detection
  }
}

const glossaryTrie = new GlossaryTrie(glossaryData);
```

**Debounced Detection:**
```typescript
import { debounce } from 'lodash';

const detectTermsDebounced = debounce((text: string) => {
  const detected = detectTerms(text);
  setDetectedTerms(detected);
}, 300);

// In text area onChange
const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  const text = e.target.value;
  setNoteText(text);
  detectTermsDebounced(text);
};
```

**Highlighted Text Rendering:**

**Option A: Mark.js Library**
```typescript
import Mark from 'mark.js';

const markInstance = new Mark(textAreaElement);
markInstance.mark(detectedTerms.map(t => t.term), {
  className: 'glossary-term',
  element: 'span'
});
```

**Option B: Custom Component**
```typescript
<HighlightedTextArea
  value={noteText}
  onChange={handleChange}
  detectedTerms={detectedTerms}
  onTermClick={handleTermClick}
/>

// Renders as:
// <div contentEditable>
//   "Need more "
//   <span class="glossary-term" data-term-id="rubato">rubato</span>
//   " feel"
// </div>
```

#### Performance Optimizations

1. **Lazy Loading**
   - Load glossary data on first use (not on app load)
   - Only detect terms when text area is focused

2. **Memoization**
   - Memoize term detection results
   - Cache regex compilation

3. **Throttling**
   - Debounce detection to 300-500ms
   - Only re-detect on text change, not on every keystroke

4. **Virtualization**
   - For glossary sidebar with 100+ terms, use virtual scrolling
   - Only render visible terms

#### Edge Cases & Handling

**1. Overlapping Terms**
```typescript
// "tempo" and "rubato tempo"
// Strategy: Prioritize longest match
const terms = ["tempo", "rubato tempo"];
text = "Use rubato tempo here";

// Detects: "rubato tempo" (not "tempo" alone)
```

**2. False Positives**
```typescript
// "key" as musical term vs "key" as in keyboard
text = "Press the key on your keyboard";

// Accept false positive for simplicity
// Or: Use context-aware detection (more complex)
```

**3. Multiple Terms in Sentence**
```typescript
text = "Add staccato and crescendo with heavy distortion";

// Detects all three independently:
// - staccato
// - crescendo
// - distortion
```

**4. Terms in Different Case**
```typescript
text = "RUBATO feel with Staccato notes";

// Case-insensitive matching detects both:
// - RUBATO
// - Staccato
```

**5. Stemming Variations**
```typescript
// Use simple stemming rules
"distorted" → "distortion"
"reverbed" → "reverb"
"crescendos" → "crescendo"

// Library: natural.js for stemming
import { PorterStemmer } from 'natural';
```

### Integration with Badge/Dropdown Systems

**When user selects from dropdown/badges:**

1. **In 3-Tier Input (PRD 01)**
   - User selects "Staccato" from Dynamics dropdown
   - Selected badge displays "Staccato"
   - Badge is highlighted as glossary term
   - Clicking badge shows tooltip with definition

2. **In Prompt Preview (PRD 02)**
   - All glossary terms in old/new prompts are highlighted
   - Clickable for tooltips
   - Helps users understand changes

**Badge Enhancement:**
```typescript
<Badge
  variant="secondary"
  className="glossary-badge"
  onClick={() => showTooltip('staccato')}
>
  Staccato
  <InfoIcon className="ml-1 h-3 w-3" />
</Badge>
```

### User Flow Examples

#### Example 1: Learning While Writing

1. User writing evaluation notes in PRD 02 interface
2. Types: "Need more rubato feel in the intro"
3. As they type "rubato", it gets underlined (glossary term detected)
4. User isn't sure what rubato means
5. Clicks on "rubato" → tooltip appears with definition
6. Reads: "Flexible tempo where performer speeds up/slows down"
7. Understands the term, continues writing
8. Tooltip auto-dismisses when user continues typing

#### Example 2: Exploring Glossary

1. User isn't sure what effects to add to bass
2. Clicks `[?]` help icon → glossary sidebar opens
3. Clicks "▶ Production & Effects" to expand
4. Browses list: Reverb, Distortion, Compression, EQ...
5. Clicks "Distortion" → full definition appears
6. Reads definition and examples
7. Clicks [Copy Term] → "Distortion" copied to clipboard
8. Pastes into instrument effects field
9. Glossary stays open for reference

#### Example 3: Cross-Reference Discovery

1. User reading tooltip for "Crescendo"
2. Sees "Related Terms: Decrescendo, Dynamics"
3. Clicks "Decrescendo" → tooltip switches to that term
4. Learns about opposite concept
5. Clicks [View in Glossary] → glossary sidebar opens with Decrescendo highlighted

### State Management

```typescript
interface GlossaryStore {
  // Data
  terms: GlossaryTerm[];
  categories: GlossaryCategory[];

  // UI State
  sidebarOpen: boolean;
  searchQuery: string;
  expandedCategories: string[];
  selectedTermId: string | null;

  // Tooltip State
  activeTooltip: {
    termId: string;
    anchorElement: HTMLElement;
  } | null;

  // Actions
  loadGlossary: () => Promise<void>;
  toggleSidebar: () => void;
  searchTerms: (query: string) => void;
  expandCategory: (categoryName: string) => void;
  collapseCategory: (categoryName: string) => void;
  selectTerm: (termId: string) => void;
  showTooltip: (termId: string, element: HTMLElement) => void;
  hideTooltip: () => void;

  // Computed
  filteredTerms: () => GlossaryTerm[];
  termsByCategory: () => Record<string, GlossaryTerm[]>;
}
```

### API Endpoints (if glossary is server-managed)

```typescript
// Fetch all glossary terms
GET /api/glossary
Response: GlossaryTerm[]

// Fetch single term by ID
GET /api/glossary/:termId
Response: GlossaryTerm

// Search glossary
GET /api/glossary/search?q=rubato
Response: GlossaryTerm[]

// Get terms by category
GET /api/glossary/category/:categoryName
Response: GlossaryTerm[]

// Track term views (analytics)
POST /api/glossary/:termId/view
```

### Success Metrics

**Adoption Metrics:**
- Glossary sidebar opened at least once per session: **60%+ of users**
- Tooltips clicked per evaluation session: **3-5 times average**
- Terms searched in glossary: **2-3 per session**

**Learning Metrics:**
- Reduction in invalid/unclear terminology in prompts: **30% reduction**
- Increased use of technical terms in evaluations: **40% increase**
- User confidence in using musical terminology: **+2 points on 5-point scale**

**Engagement Metrics:**
- Time spent with glossary open: **2-3 minutes per session**
- Terms expanded for full definition: **50% of clicked terms**
- "View in Glossary" clicked from tooltip: **20% of tooltip interactions**

**Quality Metrics:**
- Prompt quality score improvement: **15% increase** (based on AI interpretation accuracy)
- Support tickets about terminology: **40% reduction**

### Accessibility Requirements

**Keyboard Navigation:**
- `Tab` to navigate between glossary terms
- `Enter` to expand term or category
- `Esc` to close tooltip or glossary sidebar
- `Arrow keys` to navigate term list

**Screen Reader Support:**
- ARIA labels for all interactive elements
- Announce when glossary opens/closes
- Announce tooltip content when displayed
- Proper heading hierarchy in glossary

**Visual Accessibility:**
- High contrast for highlighted terms
- Configurable tooltip size/font
- Support for dark mode
- Glossary term underline visible in both light/dark modes

### Out of Scope (Initial Version)

**Excluded Features:**
1. **Audio Examples** - No audio demonstrations for each term
2. **User-Contributed Terms** - Users cannot add custom glossary entries
3. **Autocomplete** - No glossary term suggestions while typing
4. **Custom Glossary** - No per-user or per-project glossary customization
5. **Multi-Language** - English only for MVP
6. **Glossary Versioning** - No tracking of glossary updates over time
7. **Term Analytics** - No tracking which terms are most/least viewed
8. **Collaborative Glossary** - No team shared glossaries

**Future Enhancements:**
- Community-contributed term definitions
- Audio/visual examples for terms
- Context-aware term suggestions based on current tier
- Glossary quiz/learning mode
- Export glossary as PDF reference
- Integration with external music theory resources

## UI/UX Requirements

### Visual Hierarchy
1. **Tier Distinction**: Each tier should be visually distinct
   - Use cards/panels with clear headers
   - Different background colors or borders
   - Progressive disclosure (collapse/expand sections)

2. **Badge System**
   - Consistent badge design across all dropdowns
   - Color coding by category
   - Selected vs unselected states
   - Remove/deselect capability (× icon)

3. **Helper Text & Tooltips**
   - Inline help text for complex terms
   - Hover tooltips for glossary definitions
   - Context-aware suggestions (e.g., key recommendations based on mood)
   - Info icons (ℹ️) for expandable help

4. **Responsive Actions**
   - "Add Instrument" button clearly visible
   - "Add Section" button clearly visible
   - Delete/remove buttons (×) on each repeatable item
   - Drag-to-reorder for sections (optional enhancement)

### Validation & Warnings

1. **Required Fields**
   - At least one instrument required
   - At least one section required
   - Genre and Key required in Global Settings

2. **Warning States**
   - >8 instruments warning
   - Empty sections (no instruments selected)
   - Conflicting settings (e.g., very slow tempo with energetic mood)

3. **Error Messages**
   - Clear, actionable error messages
   - Inline validation with visual indicators

## Output Format

### JSON Structure

Generate structured JSON output compatible with ElevenLabs API format:

```json
{
  "globalSettings": {
    "genre": ["Pop", "Electronic"],
    "key": "G Major",
    "timeSignature": "4/4",
    "tempo": {
      "bpm": 120,
      "named": "Allegro"
    },
    "mood": ["Energetic", "Uplifting"]
  },
  "instruments": [
    {
      "id": "inst_1",
      "name": "Electric Guitar",
      "timbre": ["Bright", "Warm"],
      "effects": [
        {
          "type": "Reverb",
          "parameters": { "roomSize": "Medium" }
        },
        {
          "type": "Distortion",
          "parameters": { "level": "Light" }
        }
      ]
    },
    {
      "id": "inst_2",
      "name": "Vocals",
      "timbre": ["Rich", "Warm"],
      "techniques": ["Belt", "Vibrato"],
      "effects": [
        {
          "type": "Reverb",
          "parameters": { "roomSize": "Hall" }
        }
      ]
    }
  ],
  "sections": [
    {
      "type": "Verse",
      "instruments": ["inst_1", "inst_2"],
      "performance": {
        "inst_1": {
          "dynamics": ["Legato", "Piano"],
          "rhythm": ["Groove"],
          "melody": ["Arpeggio"]
        },
        "inst_2": {
          "dynamics": ["Crescendo", "Forte"],
          "melody": ["Melisma"]
        }
      }
    },
    {
      "type": "Chorus",
      "instruments": ["inst_1", "inst_2"],
      "performance": {
        "inst_1": {
          "dynamics": ["Forte", "Accent"],
          "rhythm": ["Syncopation"]
        },
        "inst_2": {
          "dynamics": ["Forte", "Sforzando"]
        }
      }
    }
  ]
}
```

## Technical Requirements

### Frontend Components

1. **Tier 1 Component**: GlobalSettings
   - Genre selector (multi-select badges)
   - Key dropdown with helper text
   - Time signature dropdown
   - Tempo dual input (BPM + named)
   - Mood selector (multi-select badges)

2. **Tier 2 Component**: InstrumentPalette
   - Add/Remove instrument functionality
   - Instrument card component (repeatable)
   - Conditional vocal techniques display
   - Instrument count validation

3. **Tier 3 Component**: PerformanceArrangement
   - Add/Remove section functionality
   - Section card component (repeatable)
   - Instrument checkbox list
   - Per-instrument performance settings (expandable)

### Data Management

- State management for all three tiers
- Instrument ID generation and tracking
- Section ordering and management
- JSON serialization/deserialization
- Form validation logic

### Accessibility

- Keyboard navigation for all controls
- ARIA labels for screen readers
- Focus management for dynamic elements
- High contrast mode support

## Success Metrics

1. **Usability**
   - Reduced time to create structured prompts
   - Decreased user errors in composition inputs
   - Increased discoverability of musical terms

2. **Output Quality**
   - Valid JSON generation rate: 100%
   - Compatibility with ElevenLabs API
   - Structured prompt completeness

3. **User Satisfaction**
   - User feedback on interface clarity
   - Completion rate of multi-tier forms
   - Return usage rate

## Implementation Phases

### Phase 1: Core Structure
- Implement Tier 1 (Global Settings)
- Basic JSON output generation
- UI shell for all three tiers

### Phase 2: Instrument Palette
- Implement Tier 2 (Instruments)
- Add/Remove instrument functionality
- Effects and timbre selection

### Phase 3: Performance/Arrangement
- Implement Tier 3 (Sections)
- Per-instrument performance controls
- Section management

### Phase 4: Polish & Integration
- Helper text and tooltips
- Validation and warnings
- Complete JSON output integration
- ElevenLabs API compatibility testing

## Dependencies

- Music glossary data (Prompt_Glossary)
- Component library (Radix UI, shadcn/ui)
- Form management (React Hook Form or similar)
- State management (Zustand)

## Open Questions

1. Should we allow custom terms not in the glossary?
2. Do we need a "preview" mode to show the generated prompt text?
3. Should sections have duration/bar count specifications?
4. Do we need preset templates (e.g., "Pop Song Structure")?
5. Should we support importing/exporting configurations?

## Appendix

### Example User Flow

1. User selects Global Settings (Genre: Pop, Key: G Major, Tempo: 120 BPM)
2. User adds instruments:
   - Electric Guitar (Bright, Warm, Reverb)
   - Vocals (Rich, Belt, Vibrato)
   - Bass (Deep, Compressed)
   - Drums (Punchy, Tight)
3. User creates sections:
   - Intro: Guitar + Bass (Legato, Piano)
   - Verse: All instruments (Groove, Staccato)
   - Chorus: All instruments (Forte, Syncopation)
   - Bridge: Guitar + Vocals (Rubato, Crescendo)
   - Outro: Guitar only (Decrescendo, Legato)
4. System generates structured JSON
5. JSON sent to ElevenLabs API for audio generation
