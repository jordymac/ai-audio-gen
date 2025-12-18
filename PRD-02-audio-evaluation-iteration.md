# PRD 02: Audio Evaluation & Iteration System

## Executive Summary

### Overview
The Audio Evaluation & Iteration System replaces the current "Review Audio" step with a comprehensive evaluation and refinement workflow. This feature enables users to systematically evaluate generated audio against their original prompt, document observations, and generate improved variations through an intelligent notes-to-prompt interpretation system.

### Business Value
- **Reduced Iteration Time**: Users can pinpoint specific improvements without reconstructing entire prompts
- **Higher Quality Output**: Systematic evaluation leads to more targeted refinements
- **Improved User Experience**: Clear version history and structured feedback mechanism
- **Increased Engagement**: Users can explore multiple creative directions efficiently

### Key Features
1. Two-column evaluation interface (prompt structure vs. notes)
2. Version navigation and history tracking
3. Intelligent notes-to-prompt interpretation
4. Visual diff preview before generating new versions
5. Non-destructive iteration (all versions preserved)

### Target Users
- Music creators iterating on AI-generated compositions
- Audio producers refining specific musical elements
- Content creators exploring creative variations
- Production teams collaborating on audio assets

---

## Goals & Success Metrics

### Primary Goals

1. **Enable Targeted Iteration**
   - Allow users to modify specific elements (tempo, instrument effects, section arrangements) without starting over

2. **Preserve Context & History**
   - Maintain complete lineage of all attempts with prompts, notes, and generated audio

3. **Reduce Manual Work**
   - Automate prompt updates based on natural language evaluation notes

4. **Improve Audio Quality**
   - Enable systematic refinement through structured evaluation

### Success Metrics

**Quantitative:**
- **Iteration Efficiency**: 70%+ reduction in time to create refined variations
- **Note Interpretation Accuracy**: 80%+ of interpreted changes match user intent
- **Version Creation Rate**: Users create average of 3-5 versions per project
- **Completion Rate**: 85%+ of users who start evaluation complete at least one iteration

**Qualitative:**
- User satisfaction with evaluation workflow (target: 4.5/5)
- Confidence in notes-to-prompt interpretation (target: 4/5)
- Perceived improvement in audio quality across versions

**Technical:**
- Version history load time: <500ms
- Notes-to-prompt interpretation: <3s
- Diff preview generation: <1s

---

## User Stories

### Core User Stories

**As a music creator**, I want to:
- Evaluate generated audio against the exact prompt that created it, so I can identify what to change
- Add notes about what works and what doesn't at each level (global, instrument, section), so I can target specific improvements
- Generate a new version based on my notes, so I don't have to manually reconstruct the entire prompt
- See what changed between versions before generating, so I can verify the interpretation is correct
- Navigate between all versions, so I can compare different creative directions

**As a producer refining audio**, I want to:
- Focus on specific instruments without affecting others, so I can fine-tune the mix
- Adjust section-level performance details (dynamics, rhythm) independently, so I can perfect the arrangement
- Fork variations from any previous version, so I can explore multiple directions from a good base
- See a clear history of what I've tried, so I can avoid repeating unsuccessful approaches

**As a team collaborator**, I want to:
- Document my evaluation reasoning in notes, so team members understand the changes
- Review the complete version history with timestamps, so we can track progress
- Export or share evaluation notes (future), so we can discuss iterations

### Edge Case Stories

**As a user**, I want to:
- Manually edit the interpreted prompt if the AI misunderstood my notes, so I maintain control
- Cancel variation generation if the preview doesn't look right, so I don't waste API credits
- Return to a previous version and create a new branch, so I can try different approaches
- See which notes influenced which prompt changes, so I can learn the system's interpretation patterns

---

## Detailed Feature Specifications

### 1. Evaluation Interface

#### 1.1 Two-Column Layout

**Left Column: Prompt Structure (Read-Only)**

Display the complete 3-tier prompt structure used to generate the current version:

**Global Settings Section:**
```
┌─ GLOBAL SETTINGS ────────────────────┐
│ Genre:         Reggae, Dub           │
│ Key:           G Major               │
│ Tempo:         120 BPM (Andante)     │
│ Time Sig:      4/4                   │
│ Mood:          Chill, Laid-back      │
└──────────────────────────────────────┘
```

**Instrument Sections (Repeatable):**
```
┌─ INSTRUMENT: Bass ───────────────────┐
│ Name:          Moog Analog Bass      │
│ Timbre:        Deep, Warm            │
│ Effects:       Distortion (Light)    │
│                Compression (4:1)     │
└──────────────────────────────────────┘
```

**Section Sections (Repeatable):**
```
┌─ SECTION: Verse ─────────────────────┐
│ Type:          Verse                 │
│ Instruments:   ☑ Bass  ☑ Drums       │
│                ☑ Guitar ☐ Keys       │
│ Performance:                         │
│   Bass:        Staccato, Groove      │
│   Drums:       Syncopation           │
│   Guitar:      Legato, Piano         │
└──────────────────────────────────────┘
```

**Implementation Details:**
- Render using same components as original 3-tier input, but in read-only mode
- Visual style: Slightly muted/grayed to indicate read-only
- Clear section dividers between Global, each Instrument, and each Section
- Collapsible sections for long prompts (expand/collapse instrument and section details)

**Right Column: Evaluation Notes (Editable)**

Aligned text areas corresponding to each element in left column:

**Global Notes:**
```
┌─ GLOBAL NOTES ───────────────────────┐
│ [text area, 3-4 rows]                │
│ Need more energy, try faster tempo.  │
│ Maybe try a brighter mood overall.   │
└──────────────────────────────────────┘
```

**Per-Instrument Notes:**
```
┌─ BASS NOTES ─────────────────────────┐
│ [text area, 2-3 rows]                │
│ Too clean, needs heavier saturation. │
│ Maybe add some overdrive.            │
└──────────────────────────────────────┘
```

**Per-Section Notes:**
```
┌─ VERSE NOTES ────────────────────────┐
│ [text area, 2-3 rows]                │
│ Drums too prominent here, reduce or  │
│ remove from first verse.             │
└──────────────────────────────────────┘
```

**Implementation Details:**
- Auto-expanding text areas (min 2 rows, max 8 rows)
- Auto-save on blur or every 30 seconds
- Character count indicator (soft limit: 500 chars per field)
- Placeholder text: "What worked or didn't work about this [element]?"
- Optional: Rich text formatting (bold, bullet points) for structured notes

#### 1.2 Audio Playback Section

**Location:** Above the two-column layout

**Components:**
```
┌─────────────────────────────────────────────────┐
│ 🔊 Generated Audio - Version 2                  │
│ ━━━━━━━━━━●━━━━━━━━━ 1:23 / 3:45              │
│ [◄◄] [▶️] [►►] [🔁] [🔊]                       │
│                                                 │
│ Quality: [Excellent] [Good] [Fair] [Poor]       │
│ Overall Notes: [text area, 1 row]              │
└─────────────────────────────────────────────────┘
```

**Features:**
- Standard audio player controls (play, pause, seek, volume)
- Loop mode for repeated listening
- Quick quality rating (optional, for analytics)
- Overall impression notes (separate from detailed tier notes)

### 2. Version Navigation

#### 2.1 Version Header

**Location:** Top of evaluation interface

```
┌─────────────────────────────────────────────────┐
│  ◀ Version 2 of 4 ▶         Created: 2:35 PM   │
│                                                 │
│  v1 ─→ v2 ─→ v3 ─→ v4                         │
│        ^^^ (current)                            │
│                                                 │
│  [Update Prompt from Notes]                     │
└─────────────────────────────────────────────────┘
```

**Features:**
- Left/right arrows to navigate between versions
- Visual indicator of current version
- Timeline/breadcrumb showing version lineage
- Fork indicator if versions branch from non-sequential parent
- Timestamp for each version

**Navigation Behavior:**
- Keyboard shortcuts: Left/Right arrow keys
- Preserve scroll position when switching versions
- Loading state while fetching version data
- Unsaved notes warning if navigating away with unsaved changes

#### 2.2 Version Metadata

Each version stores:
```typescript
interface Version {
  id: string;                    // UUID
  version_number: number;        // Sequential: 1, 2, 3, ...
  parent_version_id: string | null;  // For branching
  created_at: timestamp;

  // Prompt data
  prompt_structure: {
    global: GlobalSettings;
    instruments: Instrument[];
    sections: Section[];
  };

  // Evaluation data
  evaluation_notes: {
    global: string;
    overall_audio: string;
    quality_rating: 'excellent' | 'good' | 'fair' | 'poor' | null;
    instruments: Record<string, string>;  // instrument_id → notes
    sections: Record<string, string>;     // section_id → notes
  };

  // Generated output
  audio_url: string;              // Path to generated MP3
  generation_status: 'pending' | 'generating' | 'complete' | 'failed';
  api_metadata: {
    request_id: string;
    duration_seconds: number;
    cost_credits: number;
  };
}
```

#### 2.3 Version History View (Optional Enhancement)

**Trigger:** "View History" button

**Modal/Sidebar:**
```
┌─ VERSION HISTORY ────────────────────┐
│                                      │
│ v4  2:45 PM  ⭐ Current              │
│ │   "Faster tempo, more energy"      │
│ │                                    │
│ v3  2:38 PM                          │
│ │   "Reduced drums in verse"         │
│ │                                    │
│ v2  2:35 PM                          │
│ │   "Added more bass saturation"     │
│ │                                    │
│ v1  2:30 PM  🌱 Original             │
│     "Initial generation"             │
│                                      │
│ [Export History] [Close]             │
└──────────────────────────────────────┘
```

**Features:**
- Compact summary of each version (excerpt from notes)
- Click to jump to that version
- Visual indicators: Original, Current, Branched versions
- Export as JSON or summary report (future)

### 3. Variation Generation Workflow

#### 3.1 Update Prompt from Notes

**Trigger:** "Update Prompt from Notes" button

**Process:**

1. **Collect Notes**
   - Gather all non-empty evaluation notes from current version
   - Include: global notes, instrument notes, section notes, overall notes

2. **Interpret Notes → Prompt Changes**

   **LLM Interpretation Call:**
   ```typescript
   interface InterpretationRequest {
     original_prompt: PromptStructure;
     evaluation_notes: EvaluationNotes;
     context: {
       user_preferences?: string[];
       previous_changes?: Change[];  // Learn from history
     };
   }

   interface InterpretationResponse {
     changes: Change[];
     confidence: number;  // 0-1
     explanation: string;
   }

   interface Change {
     tier: 'global' | 'instrument' | 'section';
     target_id?: string;  // For instruments/sections
     field: string;       // e.g., 'tempo', 'effects', 'included_instruments'
     old_value: any;
     new_value: any;
     reason: string;      // Why this change was made
     confidence: number;  // 0-1
   }
   ```

   **Interpretation Rules & Patterns:**

   | Note Pattern | Detected Intent | Prompt Change |
   |-------------|----------------|---------------|
   | "faster", "more energy", "uptempo" | Increase tempo | Increase BPM by 10-20 |
   | "slower", "more chill", "relaxed" | Decrease tempo | Decrease BPM by 10-20 |
   | "brighter", "happier", "uplifting" | Mood shift | Add/change mood tags |
   | "darker", "moodier", "melancholic" | Mood shift | Update mood to darker terms |
   | "too clean", "needs grit", "more saturation" | Add effects | Add distortion/saturation |
   | "too muddy", "cleaner mix" | Reduce effects | Remove/reduce effects |
   | "[instrument] too loud/prominent" | Reduce instrument | Change dynamics or remove from sections |
   | "[instrument] barely audible" | Emphasize instrument | Add to sections or boost dynamics |
   | "remove [instrument] from [section]" | Section change | Update section's included instruments |
   | "add [technique] to [section]" | Performance change | Add performance style to section |

3. **Generate Diff Preview**
   - Compare original prompt with interpreted changes
   - Highlight additions, removals, modifications
   - Calculate "change magnitude" score

4. **Show Preview Modal** (see next section)

#### 3.2 Prompt Preview Modal

**Layout:**

```
╔═══════════════════════════════════════════════════════╗
║ PROMPT PREVIEW - Creating v5 from v4                 ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║ DETECTED CHANGES (3):                                 ║
║                                                       ║
║ ✓ Global Settings                                     ║
║   • Tempo: 120 BPM → 140 BPM                         ║
║     Reason: "Need more energy, try faster tempo"     ║
║   • Mood: Add "Energetic"                            ║
║     Reason: Overall energy increase requested        ║
║                                                       ║
║ ✓ Instrument: Bass                                    ║
║   • Effects: Add "Heavy Saturation"                   ║
║     Reason: "Too clean, needs heavier saturation"    ║
║                                                       ║
║ ⚠ Low Confidence Change                               ║
║   • Section Verse: Remove Drums                       ║
║     Reason: "Drums too prominent here"               ║
║     Confidence: 65% - Please verify                   ║
║                                                       ║
║ ┌─────────────────────┬──────────────────────┐       ║
║ │ ORIGINAL (v4)       │ UPDATED (v5)         │       ║
║ ├─────────────────────┼──────────────────────┤       ║
║ │ GLOBAL              │ GLOBAL               │       ║
║ │ Genre: Reggae       │ Genre: Reggae        │       ║
║ │ Tempo: 120 BPM      │ Tempo: 140 BPM ←NEW  │       ║
║ │ Mood: Chill         │ Mood: Chill,         │       ║
║ │                     │   Energetic ←NEW     │       ║
║ │                     │                      │       ║
║ │ BASS                │ BASS                 │       ║
║ │ Effects:            │ Effects:             │       ║
║ │   Distortion        │   Distortion         │       ║
║ │   Compression       │   Compression        │       ║
║ │                     │   Heavy Saturation   │       ║
║ │                     │   ↑NEW               │       ║
║ │                     │                      │       ║
║ │ SECTION: Verse      │ SECTION: Verse       │       ║
║ │ Instruments:        │ Instruments:         │       ║
║ │   ☑ Bass            │   ☑ Bass             │       ║
║ │   ☑ Drums           │   ☐ Drums ←REMOVED   │       ║
║ │   ☑ Guitar          │   ☑ Guitar           │       ║
║ └─────────────────────┴──────────────────────┘       ║
║                                                       ║
║ Estimated Generation Time: ~30 seconds                ║
║ API Credits: 1.5 credits                              ║
║                                                       ║
║ ┌─────────────────────────────────────────────────┐  ║
║ │ ⚠ Unsure about these changes?                   │  ║
║ │ You can [Edit Manually] to adjust before        │  ║
║ │ generating, or [Generate] to proceed as-is.     │  ║
║ └─────────────────────────────────────────────────┘  ║
║                                                       ║
║        [Edit Manually] [Cancel] [Generate v5]        ║
╚═══════════════════════════════════════════════════════╝
```

**Features:**

1. **Change Summary**
   - Bulleted list of all detected changes
   - Reason (linked to original note text)
   - Confidence score for each change
   - Visual indicators: ✓ (high confidence), ⚠ (low confidence)

2. **Side-by-Side Comparison**
   - Left: Original prompt (v4)
   - Right: Updated prompt (v5)
   - Inline annotations: ←NEW, ←REMOVED, ←CHANGED
   - Syntax highlighting for changes (green = addition, red = removal, yellow = modification)

3. **Metadata**
   - Estimated generation time
   - API credit cost
   - Warning messages if needed (e.g., "Many changes detected - may diverge significantly")

4. **Actions**
   - **Edit Manually**: Opens full 3-tier editor with new prompt pre-filled (can modify before generating)
   - **Cancel**: Dismisses modal, returns to evaluation interface
   - **Generate v5**: Confirms changes, creates new version, calls API

#### 3.3 Manual Edit Mode

**Trigger:** "Edit Manually" button in preview modal

**Interface:**
- Full 3-tier input interface (same as original prompt creation)
- Pre-populated with the interpreted new prompt
- Editable state (all fields unlocked)
- "Save & Generate" button (creates new version)
- "Discard Changes" button (returns to preview modal)

**Use Cases:**
- User wants to tweak an interpreted change
- User wants to add changes the AI didn't detect
- User has low confidence in AI interpretation

#### 3.4 Generate New Version

**Process:**

1. **Create Version Record**
   ```typescript
   const newVersion: Version = {
     id: generateUUID(),
     version_number: currentVersion.version_number + 1,
     parent_version_id: currentVersion.id,
     created_at: Date.now(),
     prompt_structure: updatedPrompt,  // From interpretation or manual edit
     evaluation_notes: {
       // Empty for new version
       global: '',
       instruments: {},
       sections: {},
       overall_audio: '',
       quality_rating: null
     },
     audio_url: '',  // Will be populated after generation
     generation_status: 'pending',
     api_metadata: null
   };
   ```

2. **Call ElevenLabs API**
   - Convert `updatedPrompt` to ElevenLabs format
   - Make API call with timeout handling
   - Poll for completion or use webhooks

3. **Update Status**
   - Status: pending → generating → complete
   - On success: Populate `audio_url` and `api_metadata`
   - On failure: Status = 'failed', show error message, allow retry

4. **Navigate to New Version**
   - Automatically switch to new version (v5)
   - Show success toast: "Version 5 generated successfully!"
   - Audio player loads new audio automatically

### 4. Version Forking & Branching

#### 4.1 Fork from Any Version

**Scenario:** User is on v4, wants to create variation from v2

**Workflow:**
1. Navigate to v2 using version arrows
2. Add new evaluation notes to v2
3. Click "Update Prompt from Notes"
4. Preview shows changes from v2 → v5 (not v4 → v5)
5. Generate creates v5 with `parent_version_id = v2.id`

**Version Tree:**
```
v1 ──→ v2 ──→ v3 ──→ v4
        └───→ v5 (forked from v2)
```

#### 4.2 Branch Visualization

In version history, show branching:
```
v1 ─┬─→ v2 ──→ v3 ──→ v4
    │
    └─→ v5 (alternate path)
```

### 5. Data Persistence

#### 5.1 Storage Requirements

**Per Project:**
- Complete version history
- All audio files (or references to cloud storage)
- All evaluation notes
- Metadata (timestamps, API costs, etc.)

**Storage Options:**

**Option A: LocalStorage (for prototype/demo)**
- Pros: No backend required, works offline
- Cons: Limited to ~5-10MB, not persistent across devices
- Best for: MVP/Demo

**Option B: Backend Database (for production)**
- Pros: Unlimited storage, cross-device sync, collaboration-ready
- Cons: Requires backend infrastructure
- Schema: PostgreSQL with JSONB for prompt_structure
- Best for: Production app

**Option C: Hybrid**
- LocalStorage for active project
- Export/import JSON for backup
- Cloud storage for audio files

#### 5.2 Auto-Save Strategy

**Evaluation Notes:**
- Auto-save on blur (when user clicks away from text area)
- Debounced auto-save every 30 seconds while typing
- Visual indicator: "Saved 2 seconds ago" or "Saving..."

**Version Data:**
- Immutable after creation (except notes)
- Notes are mutable and auto-saved

---

## User Flows

### Flow 1: Basic Iteration (First Variation)

```
START: User has generated v1 audio
  ↓
1. Listen to v1 audio
  ↓
2. Add evaluation notes:
   - Global: "Need more energy, faster tempo"
   - Bass: "Too clean, add saturation"
   - Verse: "Drums too loud"
  ↓
3. Click "Update Prompt from Notes"
  ↓
4. System interprets notes → detects changes
  ↓
5. Preview Modal shows:
   - Tempo: 100 → 120 BPM
   - Bass: Add "Heavy Saturation" effect
   - Verse: Reduce drum dynamics
  ↓
6. User reviews preview
  ↓
7a. User clicks "Generate v2"
     ↓
    API call → v2 created → Navigate to v2
     ↓
    END: Listening to v2

7b. User clicks "Edit Manually"
     ↓
    3-tier editor opens with proposed changes
     ↓
    User tweaks tempo to 125 BPM instead of 120
     ↓
    Click "Save & Generate"
     ↓
    API call → v2 created → Navigate to v2
     ↓
    END: Listening to v2
```

### Flow 2: Exploring Multiple Directions

```
START: User has v1, v2, v3
  ↓
1. Navigate to v2 (liked the bass, but not the tempo)
  ↓
2. Add notes to v2: "Keep this bass, but try slower tempo"
  ↓
3. Click "Update Prompt from Notes"
  ↓
4. Preview shows tempo reduction
  ↓
5. Generate → Creates v4 (parent = v2, not v3)
  ↓
Version tree now:
  v1 → v2 → v3
        └→ v4
  ↓
END: User can compare v3 (original path) vs v4 (alternate path)
```

### Flow 3: Recovering from Bad Interpretation

```
START: User has v1, wants iteration
  ↓
1. Add notes: "More cowbell"
  ↓
2. Click "Update Prompt from Notes"
  ↓
3. Preview shows incorrect interpretation:
   - "Add Percussion: Cowbell" (correct)
   - "Increase Tempo" (incorrect - not mentioned in notes)
  ↓
4. User notices the wrong tempo change
  ↓
5. Click "Edit Manually"
  ↓
6. In 3-tier editor:
   - Keep the percussion change
   - Revert tempo to original value
  ↓
7. Click "Save & Generate"
  ↓
8. v2 created with correct changes
  ↓
END: User has v2 with only intended changes
```

---

## Technical Requirements

### 6.1 Frontend Architecture

**Components:**

```typescript
// Main evaluation page
<EvaluationInterface>
  <VersionNavigationHeader
    currentVersion={version}
    onNavigate={handleVersionChange}
    onUpdatePrompt={handleUpdatePrompt}
  />

  <AudioPlayerSection
    audioUrl={version.audio_url}
    onRatingChange={handleRatingChange}
    overallNotes={version.evaluation_notes.overall_audio}
    onOverallNotesChange={handleOverallNotesChange}
  />

  <TwoColumnLayout>
    <PromptStructureColumn
      promptStructure={version.prompt_structure}
      readOnly={true}
    />

    <EvaluationNotesColumn
      notes={version.evaluation_notes}
      onNotesChange={handleNotesChange}
      promptStructure={version.prompt_structure}  // For alignment
    />
  </TwoColumnLayout>
</EvaluationInterface>

// Preview modal
<PromptPreviewModal
  originalPrompt={currentVersion.prompt_structure}
  updatedPrompt={interpretedPrompt}
  changes={detectedChanges}
  onEditManually={openManualEditor}
  onGenerate={handleGenerateVersion}
  onCancel={closeModal}
/>

// Manual editor
<ManualPromptEditor
  initialPrompt={interpretedPrompt}
  onSave={handleSaveAndGenerate}
  onDiscard={returnToPreview}
/>
```

**State Management (Zustand):**

```typescript
interface EvaluationStore {
  // Project data
  projectId: string;
  versions: Version[];
  currentVersionId: string;

  // UI state
  isGenerating: boolean;
  previewModalOpen: boolean;
  manualEditorOpen: boolean;

  // Actions
  loadProject: (id: string) => Promise<void>;
  createVersion: (prompt: PromptStructure, parentId: string) => Promise<Version>;
  updateNotes: (versionId: string, notes: Partial<EvaluationNotes>) => void;
  navigateToVersion: (versionId: string) => void;
  interpretNotes: (versionId: string) => Promise<InterpretationResponse>;
  generateAudio: (versionId: string) => Promise<void>;
}
```

### 6.2 API Integration

#### Notes-to-Prompt Interpretation API

**Endpoint:** `POST /api/interpret-notes`

**Request:**
```json
{
  "original_prompt": {
    "global": { "tempo": 100, "mood": ["Chill"] },
    "instruments": [...],
    "sections": [...]
  },
  "evaluation_notes": {
    "global": "Need more energy, faster tempo",
    "instruments": {
      "bass_1": "Too clean, add saturation"
    },
    "sections": {
      "verse_1": "Drums too loud"
    }
  },
  "context": {
    "user_id": "user_123",
    "previous_changes": [...]  // Optional: learn from history
  }
}
```

**Response:**
```json
{
  "changes": [
    {
      "tier": "global",
      "field": "tempo",
      "old_value": 100,
      "new_value": 120,
      "reason": "User requested 'faster tempo' and 'more energy'",
      "confidence": 0.95
    },
    {
      "tier": "instrument",
      "target_id": "bass_1",
      "field": "effects",
      "old_value": ["Distortion"],
      "new_value": ["Distortion", "Heavy Saturation"],
      "reason": "User noted bass is 'too clean' and needs 'saturation'",
      "confidence": 0.88
    },
    {
      "tier": "section",
      "target_id": "verse_1",
      "field": "instrument_dynamics",
      "instrument_id": "drums_1",
      "old_value": "Forte",
      "new_value": "Piano",
      "reason": "User mentioned drums are 'too loud' in verse",
      "confidence": 0.72
    }
  ],
  "updated_prompt": {
    "global": { "tempo": 120, "mood": ["Chill", "Energetic"] },
    "instruments": [...],
    "sections": [...]
  },
  "overall_confidence": 0.85,
  "processing_time_ms": 1234
}
```

**Implementation Options:**

**Option A: OpenAI GPT-4 Function Calling**
```typescript
const interpretation = await openai.chat.completions.create({
  model: "gpt-4-turbo",
  messages: [
    { role: "system", content: INTERPRETATION_SYSTEM_PROMPT },
    { role: "user", content: JSON.stringify(request) }
  ],
  functions: [PROMPT_CHANGE_SCHEMA],
  function_call: { name: "generate_prompt_changes" }
});
```

**Option B: Claude with Structured Output**
```typescript
const interpretation = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20241022",
  system: INTERPRETATION_SYSTEM_PROMPT,
  messages: [{ role: "user", content: JSON.stringify(request) }],
  // Parse structured JSON from response
});
```

**Option C: Rule-Based + LLM Hybrid**
- Use regex patterns for common phrases (faster, more energy, etc.)
- Fall back to LLM for complex/ambiguous notes
- Cheaper and faster for simple cases

**System Prompt (for LLM):**
```
You are an expert music producer assistant. Given a music generation prompt and evaluation notes, your task is to interpret the notes and suggest specific changes to the prompt.

Rules:
1. Only suggest changes that are directly mentioned or strongly implied in the notes
2. Preserve all aspects not mentioned in notes
3. Provide confidence scores (0-1) for each change
4. Explain the reasoning linking notes to changes
5. For ambiguous notes, choose the most conservative interpretation

Prompt structure has three tiers:
- Global: genre, key, tempo, time signature, mood
- Instruments: name, timbre, effects, vocal techniques (if applicable)
- Sections: type, included instruments, performance styles per instrument

Common note patterns and their interpretations:
- "faster", "more energy" → Increase tempo by 10-20 BPM, add energetic mood
- "slower", "more relaxed" → Decrease tempo by 10-20 BPM, add chill mood
- "too clean", "needs grit" → Add distortion/saturation effects
- "[instrument] too loud" → Reduce dynamics or remove from certain sections
- "remove [instrument] from [section]" → Update section's included instruments
...
```

#### ElevenLabs Audio Generation API

**Endpoint:** `POST /api/generate-audio`

**Request:**
```json
{
  "version_id": "uuid-v5",
  "prompt": {
    // Converted from 3-tier structure to ElevenLabs format
    "text": "Reggae track in G Major at 140 BPM...",
    "voice_settings": {...},
    // Or structured format if ElevenLabs supports it
  }
}
```

**Response:**
```json
{
  "audio_url": "https://cdn.elevenlabs.io/audio/uuid.mp3",
  "request_id": "req_123",
  "duration_seconds": 185,
  "credits_used": 1.5,
  "status": "complete"
}
```

**Webhook (for async generation):**
```json
POST /api/webhooks/elevenlabs
{
  "request_id": "req_123",
  "status": "complete",
  "audio_url": "https://...",
  "metadata": {...}
}
```

### 6.3 Data Models

#### Version Model

```typescript
interface Version {
  // Identity
  id: string;  // UUID
  project_id: string;
  version_number: number;  // 1, 2, 3, ...
  parent_version_id: string | null;  // For branching

  // Timestamps
  created_at: Date;
  updated_at: Date;

  // Prompt data (immutable after creation)
  prompt_structure: PromptStructure;

  // Evaluation data (mutable)
  evaluation_notes: {
    global: string;
    overall_audio: string;
    quality_rating: 'excellent' | 'good' | 'fair' | 'poor' | null;
    instruments: Record<string, string>;  // instrument_id → notes
    sections: Record<string, string>;     // section_id → notes
    last_saved_at: Date;
  };

  // Generated output
  audio_url: string;
  audio_duration_seconds: number;
  generation_status: 'pending' | 'generating' | 'complete' | 'failed';
  generation_started_at: Date | null;
  generation_completed_at: Date | null;

  // API metadata
  api_request_id: string;
  api_credits_used: number;
  api_error: string | null;
}

interface PromptStructure {
  global: GlobalSettings;
  instruments: Instrument[];
  sections: Section[];
}

interface GlobalSettings {
  genre: string[];
  key: string;
  time_signature: string;
  tempo: {
    bpm: number;
    named: string;  // Adagio, Allegro, etc.
  };
  mood: string[];
}

interface Instrument {
  id: string;  // UUID
  name: string;
  timbre: string[];
  effects: Effect[];
  vocal_techniques?: string[];  // Only for vocal instruments
}

interface Effect {
  type: string;  // Reverb, Distortion, etc.
  parameters: Record<string, any>;  // Flexible params
}

interface Section {
  id: string;  // UUID
  type: string;  // Intro, Verse, Chorus, etc.
  included_instrument_ids: string[];
  performance: Record<string, PerformanceStyle>;  // instrument_id → style
}

interface PerformanceStyle {
  dynamics: string[];  // Crescendo, Forte, etc.
  rhythm: string[];    // Syncopation, Groove, etc.
  melody: string[];    // Arpeggio, Dissonance, etc.
}
```

#### Interpretation Model

```typescript
interface InterpretationRequest {
  version_id: string;
  original_prompt: PromptStructure;
  evaluation_notes: Version['evaluation_notes'];
  context?: {
    user_id: string;
    previous_changes: Change[];
    user_preferences: Record<string, any>;
  };
}

interface InterpretationResponse {
  changes: Change[];
  updated_prompt: PromptStructure;
  overall_confidence: number;  // 0-1
  processing_time_ms: number;
  warnings: string[];  // e.g., "Low confidence on change X"
}

interface Change {
  // Location
  tier: 'global' | 'instrument' | 'section';
  target_id?: string;  // For instruments/sections
  field: string;       // e.g., 'tempo', 'effects', 'included_instruments'

  // Values
  old_value: any;
  new_value: any;

  // Metadata
  reason: string;      // Human-readable explanation
  source_note: string; // Original note text that triggered this
  confidence: number;  // 0-1

  // For complex changes
  sub_changes?: Change[];  // e.g., adding effect includes sub-params
}
```

#### Project Model

```typescript
interface Project {
  id: string;
  user_id: string;

  // Metadata
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;

  // Version tracking
  version_ids: string[];  // All versions in this project
  current_version_id: string;

  // Settings
  settings: {
    auto_save_interval_seconds: number;
    max_versions: number | null;  // Null = unlimited
  };

  // Analytics
  total_api_credits_used: number;
  total_generation_time_seconds: number;
}
```

### 6.4 Database Schema (PostgreSQL)

```sql
-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  current_version_id UUID,
  settings JSONB DEFAULT '{}',
  total_api_credits_used DECIMAL(10, 2) DEFAULT 0,
  total_generation_time_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Versions
CREATE TABLE versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  parent_version_id UUID REFERENCES versions(id),

  -- Prompt data (JSONB for flexibility)
  prompt_structure JSONB NOT NULL,

  -- Evaluation notes (JSONB for flexibility)
  evaluation_notes JSONB DEFAULT '{}',

  -- Generated output
  audio_url TEXT,
  audio_duration_seconds INTEGER,
  generation_status VARCHAR(20) DEFAULT 'pending',
  generation_started_at TIMESTAMP,
  generation_completed_at TIMESTAMP,

  -- API metadata
  api_request_id VARCHAR(255),
  api_credits_used DECIMAL(10, 2),
  api_error TEXT,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(project_id, version_number)
);

-- Indexes
CREATE INDEX idx_versions_project_id ON versions(project_id);
CREATE INDEX idx_versions_parent ON versions(parent_version_id);
CREATE INDEX idx_versions_status ON versions(generation_status);

-- Interpretation cache (optional, for performance)
CREATE TABLE interpretation_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notes_hash VARCHAR(64) NOT NULL,  -- MD5 of notes
  original_prompt_hash VARCHAR(64) NOT NULL,  -- MD5 of prompt
  interpretation JSONB NOT NULL,
  confidence DECIMAL(3, 2),
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(notes_hash, original_prompt_hash)
);
```

---

## Implementation Phases

### Phase 1: Core Evaluation Interface (Week 1-2)

**Deliverables:**
- Two-column layout (prompt structure + notes)
- Audio player integration
- Auto-save for evaluation notes
- Read-only prompt display
- Basic version navigation (manual switching)

**Acceptance Criteria:**
- Users can view current prompt structure
- Users can add notes at global, instrument, and section levels
- Notes auto-save every 30 seconds
- Audio playback works correctly

### Phase 2: Version Management (Week 3)

**Deliverables:**
- Version data model and storage
- Version creation and persistence
- Version navigation with arrows
- Version history timeline view
- Parent-child relationships

**Acceptance Criteria:**
- Multiple versions can be created and stored
- Users can navigate between versions
- Version timeline shows lineage correctly
- All version data persists across page reloads

### Phase 3: Notes Interpretation (Week 4-5)

**Deliverables:**
- LLM integration for notes interpretation
- Change detection and structuring
- Confidence scoring
- Preview modal with diff view
- Side-by-side comparison

**Acceptance Criteria:**
- 80%+ of common note patterns correctly interpreted
- Changes are detected and categorized correctly
- Preview shows accurate before/after comparison
- Confidence scores are reasonable

### Phase 4: Variation Generation (Week 6)

**Deliverables:**
- "Update Prompt from Notes" workflow
- Manual edit mode
- API integration for audio generation
- Status tracking (pending, generating, complete)
- Error handling and retries

**Acceptance Criteria:**
- New versions generate successfully
- API integration works end-to-end
- Users can manually edit before generating
- Generation status updates in real-time

### Phase 5: Polish & Enhancement (Week 7-8)

**Deliverables:**
- Version branching/forking
- Keyboard shortcuts
- Performance optimizations
- Analytics tracking
- Error recovery flows
- User testing and refinement

**Acceptance Criteria:**
- Users can fork from any version
- Interface responds smoothly with 10+ versions
- All error cases handled gracefully
- User feedback incorporated

### Phase 6: Production Readiness (Week 9-10)

**Deliverables:**
- Backend database migration (if needed)
- Cloud storage for audio files
- Data export/import
- Documentation
- Load testing

**Acceptance Criteria:**
- System handles 100+ versions per project
- Audio files stored efficiently
- Users can export project data
- System passes load tests

---

## Open Questions & Assumptions

### Open Questions

1. **LLM Choice for Interpretation**
   - Q: Should we use OpenAI GPT-4, Claude, or a smaller specialized model?
   - Consider: Cost, latency, accuracy, rate limits

2. **Interpretation Confidence Threshold**
   - Q: At what confidence level should we warn users or block generation?
   - Proposed: Warn at <70%, require manual review at <50%

3. **Version Limit**
   - Q: Should there be a max number of versions per project?
   - Options: Unlimited (for beta), 50 (reasonable limit), paid tiers

4. **Audio Storage**
   - Q: Where should we store generated audio files long-term?
   - Options: S3, Cloudinary, ElevenLabs CDN (if persistent)

5. **Collaboration Features**
   - Q: Should multiple users be able to collaborate on evaluations?
   - Future consideration, out of scope for MVP

6. **Prompt Text Generation**
   - Q: How do we convert 3-tier structure to ElevenLabs text prompt?
   - Need: Prompt template system or structured API support

7. **Undo/Redo**
   - Q: Should we support undo/redo for note editing?
   - Complexity vs. benefit assessment needed

8. **Keyboard Shortcuts**
   - Q: Which shortcuts are most valuable?
   - Proposed: Left/Right arrow (navigate versions), Cmd+S (save notes), Cmd+Enter (generate)

9. **Mobile Support**
   - Q: Should evaluation interface work on mobile?
   - Consider: Two-column layout challenges on small screens

10. **Version Naming**
    - Q: Should users be able to name versions?
    - Benefit: "v2-faster-tempo" more memorable than "v2"

### Assumptions

1. **ElevenLabs API supports our prompt format** or we can convert it
2. **Users will generate 3-5 versions on average** per project
3. **Notes-to-prompt interpretation will be 80%+ accurate** with GPT-4
4. **Audio generation takes 20-60 seconds** per request
5. **Users prefer inline notes over separate comment threads**
6. **Most users will work on one project at a time** (single-project focus UI)
7. **Audio files average 3 minutes (180 seconds)** in duration
8. **LocalStorage is sufficient for MVP**, database needed for production
9. **Users will primarily use desktop/laptop** for this workflow
10. **Version history won't exceed 100 versions** per project in normal usage

### Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| LLM misinterprets notes frequently | High | Medium | Provide manual edit mode, show preview before generating |
| ElevenLabs API rate limits | High | Low | Implement request queuing, show estimated wait time |
| Audio files consume too much storage | Medium | High | Use cloud storage, compress audio, set retention policies |
| Users create too many versions | Low | Medium | Implement version limit, archive old versions |
| Interpretation API is too slow | Medium | Medium | Cache common patterns, use faster model for simple cases |
| Version navigation is confusing | Medium | Low | User testing, clear visual indicators, onboarding |

---

## Success Criteria Summary

### Must-Have (MVP)
- ✅ Users can evaluate audio with structured notes
- ✅ Users can navigate between versions
- ✅ Notes interpretation generates reasonable prompt changes
- ✅ Preview shows before/after comparison
- ✅ New versions generate successfully via API
- ✅ All version data persists

### Should-Have (V1)
- ✅ Version branching from any version
- ✅ Manual edit mode for prompt adjustment
- ✅ Confidence scores for changes
- ✅ Auto-save for notes
- ✅ Keyboard shortcuts
- ✅ Error recovery

### Nice-to-Have (Future)
- Version naming/tagging
- A/B comparison playback
- Export version history report
- Collaboration features
- Mobile-optimized interface
- Automatic "best version" recommendation

---

## Appendix: Example Scenarios

### Scenario 1: Simple Tempo Adjustment

**User Goal:** Make the track faster

1. Listen to v1 (100 BPM)
2. Add global note: "Too slow, need more energy"
3. Click "Update Prompt"
4. Preview shows: Tempo 100 → 120 BPM
5. Generate v2
6. Result: Track is faster, more energetic

**Expected Outcome:** ✓ Successful iteration

### Scenario 2: Multi-Instrument Refinement

**User Goal:** Adjust bass and drums independently

1. Listen to v1
2. Add notes:
   - Bass: "Too clean, add grit and saturation"
   - Drums: "Perfect, no changes"
   - Guitar: "Too loud in verse, reduce dynamics"
3. Click "Update Prompt"
4. Preview shows:
   - Bass: Add "Heavy Saturation" effect
   - Drums: No changes
   - Guitar (Verse section): Dynamics Forte → Mezzo-forte
5. Generate v2
6. Result: Bass has more grit, drums unchanged, guitar quieter in verse

**Expected Outcome:** ✓ Targeted changes only

### Scenario 3: Branching Exploration

**User Goal:** Explore two different directions from v2

**Path A:**
1. From v2, add notes: "Try minor key for darker mood"
2. Generate v3 (minor key variant)

**Path B:**
1. Go back to v2
2. Add notes: "Keep major key, but slow down"
3. Generate v4 (slower major key variant)

**Result:** Two branches from v2
```
v1 → v2 ──→ v3 (minor key)
       └──→ v4 (slower)
```

**Expected Outcome:** ✓ User can compare both directions

### Scenario 4: Recovery from Misinterpretation

**User Goal:** Fix AI's incorrect interpretation

1. Listen to v1
2. Add note: "Add subtle strings in background"
3. Click "Update Prompt"
4. Preview shows:
   - ✓ Add Instrument: Strings
   - ⚠ Add Reverb: Large Hall (confidence 60%)
   - ⚠ Increase Tempo (confidence 45%) ← WRONG
5. User clicks "Edit Manually"
6. In editor:
   - Keep strings addition
   - Keep reverb (good suggestion)
   - Remove tempo change (not intended)
7. Generate v2
8. Result: Strings added with reverb, tempo unchanged

**Expected Outcome:** ✓ User maintains control, overrides bad interpretation

---

## Glossary

- **Version**: A complete snapshot of prompt + audio + notes at a point in time
- **Branching**: Creating a new version from a non-sequential parent (e.g., v5 from v2)
- **Forking**: Same as branching
- **Tier**: Level of organization in prompt (Global, Instrument, Section)
- **Interpretation**: AI process of converting natural language notes to structured prompt changes
- **Diff**: Visual comparison showing changes between two versions
- **Confidence Score**: 0-1 metric indicating AI's certainty about an interpretation
- **Parent Version**: The version from which a new version is derived
- **Change Magnitude**: Measure of how many/large the changes are in a new version

---

## References

- PRD 01: Three-Tier Interface System (for prompt structure)
- ElevenLabs API Documentation
- OpenAI Function Calling Documentation
- User Research: Audio Production Workflows
- Competitor Analysis: Suno, Udio, MusicGen interfaces
