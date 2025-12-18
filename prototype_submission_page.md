# Prototype Instructions: Submission Page

## What You're Building
The final step in the workflow where users approve a version and submit it with searchable metadata. This page demonstrates how the taxonomy/ontology system makes AI-generated audio discoverable by extracting and categorising all the bracketed terms from the prompt.

## User Journey
1. User has iterated through versions on the evaluation page
2. User finds a version they're happy with
3. User clicks "Approve & Submit" button on eval page
4. User is taken to submission page
5. System auto-extracts all `[bracketed]` terms and categorises them
6. User reviews the metadata and can add custom tags
7. User clicks "Submit to Library"
8. Success confirmation appears
9. User returns to input page to start a new prompt

---

## How User Gets Here

### From Evaluation Page
Add a new button on the evaluation page:
- **"Approve & Submit"** button
- Positioned near the version navigation or below master prompt preview
- Can be clicked while viewing any version (v1, v2, etc.)
- Button takes the **currently viewed version** to submission page

### What Gets Passed
When navigating to submission page, bring:
- The version number (e.g., v2)
- Complete prompt structure (Global, Instruments, Sections)
- Master prompt text
- (For prototype: use v2 data as the example)

---

## Page Layout

### Top Section: Version Info
Display which version is being submitted:
```
Submitting Version 2 for Library
```

### Left Column: Prompt Review (Read-only)
Shows the prompt structure for the version being submitted, same format as evaluation page:

**Global Settings:**
```
a [neo-soul] track at 120bpm in [D minor] with [melancholic] [uplifting] mood, [lazy swing] drums, 4/4 time signature
```

**Instruments:**
```
Vocal: [soulful] British female vocal, [intimate] delivery with [slight reverb]
Bass: [analog moog] bass with [distortion] and [saturation], [funky] groove
Keys: [smooth] electric piano with [warm] [reverb]
Sax: [emotional] saxophone with [big] presence, [powerful] delivery
```

**Sections:**
```
Intro: vocals and keys only, [rubato] feel, [melancholic] delivery
Verse: all instruments, [stripped back] arrangement, [subtle] bass
Chorus: full arrangement with [saxophone], [powerful] vocals, [crescendo]
```

All `[bracketed]` terms remain highlighted as before.

### Right Column: Auto-Extracted Metadata

**Heading: "Searchable Metadata"**
**Subheading: "Auto-extracted from your prompt"**

Display extracted terms organised by category:

**Genre Tags:**
- neo-soul

**Mood Tags:**
- melancholic
- uplifting
- intimate
- emotional
- powerful

**Instrument Tags:**
- vocal
- bass
- keys
- saxophone
- moog
- electric piano

**Performance Tags:**
- rubato
- stripped back
- subtle
- crescendo
- soulful
- funky
- lazy swing

**Production Tags:**
- reverb
- distortion
- saturation
- warm

**Technical Details:**
- BPM: 120
- Key: D minor
- Time Signature: 4/4

### Bottom Section: Additional Metadata

**Manual Tag Input:**
- Heading: "Add Use Case Tags"
- Text input field with placeholder: "e.g., background music, workout, chill, study music"
- Tags appear as pills/badges as user types and presses enter
- For prototype, can be pre-filled with: "background music", "chill"

**Description Field:**
- Heading: "Description (Optional)"
- Text area for free-form description
- Placeholder: "Describe this track or how it should be used..."
- For prototype, can be empty or pre-filled with: "Melancholic neo-soul track with uplifting moments, perfect for reflective background music"

### Action Buttons
- **[Cancel]** - Returns to evaluation page without submitting
- **[Submit to Library]** - Saves to database and returns to input page

---

## What Loads: Version 2 Data (Example)

### Prompt Structure (Left Column)
Use the full v2 prompt from the evaluation page prototype (already defined in that doc).

### Auto-Extracted Metadata (Right Column)

**Genre Tags:**
```
neo-soul
```

**Mood Tags:**
```
melancholic, uplifting, intimate, emotional, powerful
```

**Instrument Tags:**
```
vocal, bass, keys, saxophone, moog, electric piano
```

**Performance Tags:**
```
rubato, stripped back, subtle, crescendo, soulful, funky, lazy swing
```

**Production Tags:**
```
reverb, distortion, saturation, warm
```

**Technical Details:**
```
BPM: 120
Key: D minor
Time Signature: 4/4
```

### Manual Additions (Bottom Section)

**Use Case Tags (pre-filled for demo):**
```
background music, chill
```

**Description (pre-filled for demo):**
```
Melancholic neo-soul track with uplifting moments, perfect for reflective background music
```

---

## How Metadata Auto-Extraction Works

### What Gets Extracted
The system scans the entire prompt (Global + all Instruments + all Sections) and:
1. Finds all text within `[brackets]`
2. Removes duplicates
3. Categorises each term based on glossary category

### Categorisation Rules (Hardcoded for Prototype)

**Genre Tags:**
- Terms from "Genres & Styles" glossary section
- Examples: neo-soul, jazz, rock, hip-hop, reggae

**Mood Tags:**
- Emotional descriptors and vibes
- Examples: melancholic, uplifting, intimate, emotional, powerful, dark, bright

**Instrument Tags:**
- Specific instruments mentioned (even if not in brackets, extract from context)
- Also includes instrument modifiers: moog, electric, analog
- Examples: vocal, bass, saxophone, keys, guitar, drums

**Performance Tags:**
- Terms from "Dynamics & Expression" and "Tempo & Rhythm" sections
- Examples: rubato, staccato, crescendo, funky, lazy swing, groove

**Production Tags:**
- Terms from "Production & Effects" section
- Examples: reverb, distortion, delay, compression, saturation, EQ

**Technical Details:**
- Extract numbers and keys from text:
  - BPM: Look for pattern "XXbpm" or "XX BPM"
  - Key: Look for pattern "[Letter] major/minor"
  - Time Signature: Look for pattern "X/X"

### Example Extraction Process

**Input text:**
```
a [neo-soul] track at 120bpm in [D minor] with [melancholic] mood
```

**Extracted:**
- Genre: neo-soul
- Technical: BPM = 120, Key = D minor
- Mood: melancholic

---

## What Happens: User Actions

### Adding Use Case Tags

**User types in tag input field:**
1. User types "workout" and presses Enter
2. "workout" appears as a pill/badge below the input
3. Input field clears, ready for next tag
4. User can click × on any badge to remove it

**Pre-filled tags for prototype:**
- "background music"
- "chill"

### Editing Description

**User can type freely in description text area:**
- No character limit for prototype
- Pre-filled with example text (as shown above)
- Optional field - can be left empty

### Clicking "Cancel"

**What happens:**
1. No data is saved
2. User returns to evaluation page
3. Still viewing the same version they were on
4. No confirmation needed (it's a prototype)

### Clicking "Submit to Library"

**What happens:**
1. Show loading spinner briefly (1 second)
2. Collect all data:
   - Version number
   - Complete prompt structure
   - All auto-extracted metadata (categorised)
   - Manual use case tags
   - Description text
3. For prototype: Log to console or show alert with data
4. Show success message: "Track submitted successfully!"
5. After 2 seconds, navigate to input page
6. Input page loads fresh (empty/reset, ready for new prompt)

---

## Visual Styling

### Metadata Display

**Category Headings:**
- Bold text
- Slightly larger than body text
- Margin below heading

**Tag Pills/Badges:**
- Light grey background
- Rounded corners
- Small padding
- Displayed inline with wrapping
- Small gap between each tag

**Example visual:**
```
Genre Tags:
┌──────────┐
│ neo-soul │
└──────────┘

Mood Tags:
┌──────────────┐ ┌───────────┐ ┌──────────┐
│ melancholic  │ │ uplifting │ │ intimate │
└──────────────┘ ┌───────────┐ └──────────┘
                 │ emotional │
                 └───────────┘
```

### Use Case Tag Input

**Visual behavior:**
```
Add Use Case Tags
┌─────────────────────────────────────────┐
│ Type and press Enter...                 │
└─────────────────────────────────────────┘

Added tags appear below:
┌────────────────────┐ ┌───────┐
│ background music × │ │ chill ×│
└────────────────────┘ └───────┘
```

### Buttons
- **Cancel:** Secondary style (grey/outlined)
- **Submit to Library:** Primary style (blue/green, solid)

---

## Database Storage (Conceptual)

### What Gets Saved
For the prototype, demonstrate what would be stored in SQLite:

```
Track Record:
- id: auto-generated
- version_number: 2
- created_at: timestamp
- prompt_global: "a [neo-soul] track at 120bpm..."
- prompt_instruments: JSON array
- prompt_sections: JSON array
- master_prompt: full text

Metadata:
- track_id: links to track
- genre_tags: ["neo-soul"]
- mood_tags: ["melancholic", "uplifting", "intimate", "emotional", "powerful"]
- instrument_tags: ["vocal", "bass", "keys", "saxophone", "moog", "electric piano"]
- performance_tags: ["rubato", "stripped back", "subtle", "crescendo", "soulful", "funky", "lazy swing"]
- production_tags: ["reverb", "distortion", "saturation", "warm"]
- bpm: 120
- key: "D minor"
- time_signature: "4/4"
- use_case_tags: ["background music", "chill"]
- description: "Melancholic neo-soul track..."
```

### How This Enables Search (Demonstration Purpose)

**Example search queries that would work:**

**Query:** "chill background music"
- Matches use_case_tags: ["background music", "chill"]
- Would return this track

**Query:** "neo-soul with saxophone"
- Matches genre_tags: ["neo-soul"] AND instrument_tags: ["saxophone"]
- Would return this track

**Query:** "uplifting 120bpm"
- Matches mood_tags: ["uplifting"] AND bpm: 120
- Would return this track

**Query:** "melancholic piano keys"
- Matches mood_tags: ["melancholic"] AND instrument_tags: ["keys", "electric piano"]
- Would return this track

This demonstrates the value of the taxonomy/ontology system - proper tagging makes everything searchable.

---

## Success Criteria

A working submission page where:
1. User can see their approved prompt version
2. System auto-extracts all bracketed terms
3. Terms are correctly categorised (Genre, Mood, Instruments, Performance, Production)
4. User can add custom use case tags
5. User can add optional description
6. Clicking "Submit" shows success and returns to input page
7. The metadata structure demonstrates searchability
8. Visual layout clearly shows the taxonomy at work

---

## What's Not Needed for Prototype

- Actual SQLite database implementation (just log/show what would be saved)
- Real search functionality (just demonstrate query examples conceptually)
- Audio file upload/storage
- Edit/delete submitted tracks
- User authentication
- Library/browse view of submitted tracks
- Actual audio playback
