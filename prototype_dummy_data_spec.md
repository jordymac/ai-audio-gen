# Prototype Instructions: AI Audio Evaluation Tool

## What You're Building
A working prototype that demonstrates how users evaluate AI-generated audio and iterate on prompts. This uses dummy data (no real API calls) to show the complete flow from evaluation to generating improved versions.

## User Journey
1. User lands on input page to build a prompt
2. User fills in Global, Instruments, and Sections (or uses pre-filled example)
3. User clicks "Generate Audio" to create v1
4. User is taken to evaluation page with their prompt loaded as v1
5. User reads the prompt structure and writes evaluation notes
6. User clicks "Update Prompt from Notes" button
7. System analyses notes and shows a preview of suggested changes
8. User reviews changes and clicks "Generate v2"
9. New version (v2) appears with updated prompt based on notes
10. User can navigate between versions and continue iterating

---

## Input Page (Prompt Builder)

### What This Page Does
This is where users create their initial prompt (v1) before evaluating. For the prototype, the page should be pre-filled with the neo-soul example data so users can immediately see how it works.

### Page Layout

**Top Section: Page Title**
"Build Your Audio Prompt"

**Main Section: Three-Tier Input**

**1. Global Settings Section**
- Heading: "Global Settings"
- One text area (medium height, ~3-4 lines)
- Quick selects above text area:
  - BPM dropdown: [110 ▼]
  - Key dropdown: [D minor ▼]
  - Time Sig dropdown: [4/4 ▼]
- Helper badges below text area:
  - [Genre] [Mood] [Tempo] [More...]

**2. Instruments Section**
- Heading: "Instruments"
- Button: [+ Add Instrument]
- Multiple instrument blocks (each has):
  - Instrument name field at top
  - Text area for description
  - Delete button [×]
  - Helper badges: [Timbre] [Effects] [Vocal Tech] [Texture]

**3. Sections Section**
- Heading: "Sections"
- Button: [+ Add Section]
- Multiple section blocks (each has):
  - Section type dropdown (Intro, Verse, Chorus, etc.)
  - Text area for description
  - Delete button [×]
  - Helper badges: [Dynamics] [Performance] [Harmony]

**Bottom Section: Action Buttons**
- [Clear All] button (left side)
- [Generate Audio] button (right side, primary/highlighted)

### Pre-filled Data (Loads Automatically)

**Global Settings text area:**
```
a [neo-soul] track at 110bpm in [D minor] with [melancholic] mood, [lazy swing] drums, 4/4 time signature
```

**Instrument 1:**
- Name: `Vocal`
- Description:
```
[soulful] British female vocal, [intimate] delivery with [slight reverb]
```

**Instrument 2:**
- Name: `Bass`
- Description:
```
[analog moog] bass with [clean] tone, [funky] groove
```

**Instrument 3:**
- Name: `Keys`
- Description:
```
[smooth] electric piano with [warm] [reverb]
```

**Section 1:**
- Type: `Intro`
- Description:
```
vocals and keys only, [rubato] feel, [melancholic] delivery, no drums no bass
```

**Section 2:**
- Type: `Verse`
- Description:
```
all instruments enter, [stripped back] arrangement, [staccato] bass line, [lazy swing] drums
```

**Section 3:**
- Type: `Chorus`
- Description:
```
full arrangement, [powerful] vocals, [crescendo] into the hook, [emotional] delivery
```

### What Happens: Helper Badges

**When user clicks a badge (e.g., [Genre]):**
1. Dropdown appears with glossary terms from that category
2. User selects a term (e.g., "neo-soul")
3. Term is inserted at cursor position as `[neo-soul]` with highlighting
4. Dropdown closes

**When user clicks quick select (e.g., BPM dropdown):**
1. Dropdown shows common BPM values (60, 80, 90, 100, 110, 120, 140, 160, 180)
2. User selects value
3. Text "at 110bpm" is inserted at cursor position
4. Dropdown closes

### What Happens: Add/Delete Buttons

**[+ Add Instrument] button:**
- Creates new instrument block below existing ones
- Name field is empty and focused
- Description text area is empty
- Shows helper badges

**[+ Add Section] button:**
- Creates new section block below existing ones
- Section type defaults to "Verse"
- Description text area is empty
- Shows helper badges

**[×] Delete button:**
- Removes that specific instrument or section block
- No confirmation needed (it's a prototype)

### What Happens: "Generate Audio" Button

**When user clicks "Generate Audio":**
1. System collects all text from Global, Instruments, and Sections
2. Generates a master prompt (same format as shown in eval page)
3. For prototype: Show loading spinner for 2 seconds
4. Navigate to Evaluation page
5. Evaluation page loads with this data as Version 1

**Validation (optional for prototype):**
- Could require at least Global text to be filled
- Or just allow generation with whatever is there

### What Happens: "Clear All" Button

**When user clicks "Clear All":**
- Clears all text areas
- Removes all instruments except one empty one
- Removes all sections except one empty one
- Resets quick selects to defaults
- For prototype: Could show confirmation "Are you sure?" or just clear immediately

### Visual Styling

**Bracketed terms in text areas:**
- Real-time highlighting as user types (debounced 300ms)
- Light purple/blue background on `[bracketed]` terms
- Same styling as evaluation page

**Text areas:**
- Global: Medium height (~100px)
- Instrument descriptions: Smaller (~60px)
- Section descriptions: Medium (~80px)
- All have resize handles

**Helper badges:**
- Pill-shaped buttons
- Light grey background
- Hover shows darker grey
- Small dropdown arrow (▼) indicator

---

## Evaluation Page

### How User Gets Here
After clicking "Generate Audio" on the input page, user arrives here with their prompt loaded as Version 1.

## Page Layout

### Overall Structure
The evaluation page has three main areas:

**Top Section: Version Navigation**
- Shows current version number with left/right arrows: ◀ v1 ▶
- On initial load, only v1 exists (left arrow disabled)
- After generating v2, both arrows become active for navigation

**Middle Section: Two-Column Layout**

**Left Column - Prompt Structure (Read-only)**
Shows the prompt used to generate this version, organised in three tiers:
1. Global Settings (one text block)
2. Instruments (multiple text blocks, one per instrument)
3. Sections (multiple text blocks, one per section)

All glossary terms appear in [brackets] with light purple/blue background highlighting.

**Right Column - Evaluation Notes (Editable)**
Aligned text areas next to each prompt element:
- One text area for Global notes
- One text area per Instrument
- One text area per Section

Users can type freely to evaluate what worked/didn't work.

**Bottom Section: Master Prompt Preview**
Shows the complete formatted prompt that would be sent to the API. Updates when switching versions or generating new ones.

### Buttons
- **"Update Prompt from Notes"** - Appears below the notes column, analyses notes and opens preview modal
- **Version arrows (◀ ▶)** - Navigate between existing versions

---

## What Loads on Page Open (Version 1)

### Left Column Content

**Global Settings:**
```
a [neo-soul] track at 110bpm in [D minor] with [melancholic] mood, [lazy swing] drums, 4/4 time signature
```

**Instrument: Vocal**
```
[soulful] British female vocal, [intimate] delivery with [slight reverb]
```

**Instrument: Bass**
```
[analog moog] bass with [clean] tone, [funky] groove
```

**Instrument: Keys**
```
[smooth] electric piano with [warm] [reverb]
```

**Section: Intro**
```
vocals and keys only, [rubato] feel, [melancholic] delivery, no drums no bass
```

**Section: Verse**
```
all instruments enter, [stripped back] arrangement, [staccato] bass line, [lazy swing] drums
```

**Section: Chorus**
```
full arrangement, [powerful] vocals, [crescendo] into the hook, [emotional] delivery
```

### Right Column Content (Pre-filled Notes)

**Global Notes:**
```
Tempo feels too slow, try 120bpm for more energy. Keep the melancholic mood but make it more uplifting
```

**Vocal Notes:**
```
Perfect, keep this exactly as is
```

**Bass Notes:**
```
Too clean, needs more [distortion] and [saturation]
```

**Keys Notes:**
```
Good, no changes needed
```

**Intro Notes:**
```
Works well, keep this
```

**Verse Notes:**
```
Bass too prominent here, make it more [subtle] in the mix
```

**Chorus Notes:**
```
Needs a bigger [saxophone] presence to lift the energy
```

### Master Prompt Preview Display
```
GLOBAL:
a [neo-soul] track at 110bpm in [D minor] with [melancholic] mood, [lazy swing] drums, 4/4 time signature

INSTRUMENTS:
Vocal: [soulful] British female vocal, [intimate] delivery with [slight reverb]
Bass: [analog moog] bass with [clean] tone, [funky] groove
Keys: [smooth] electric piano with [warm] [reverb]

SECTIONS:
Intro: vocals and keys only, [rubato] feel, [melancholic] delivery, no drums no bass
Verse: all instruments enter, [stripped back] arrangement, [staccato] bass line, [lazy swing] drums
Chorus: full arrangement, [powerful] vocals, [crescendo] into the hook, [emotional] delivery
```

---

## What Happens: "Update Prompt from Notes" Button

### When User Clicks Button
1. System reads all the evaluation notes
2. Identifies what needs to change (for prototype, use hardcoded logic)
3. Opens a modal showing the preview

### Preview Modal Contents

**Title:** "Prompt Preview - Creating v2"

**Changes Summary Section:**
Display a bullet list of detected changes:
```
CHANGES DETECTED:
• Global: Tempo 110bpm → 120bpm
• Global: Added [uplifting] to mood
• Bass: Added [distortion] and [saturation]
• Instruments: Added Saxophone (new instrument)
• Verse: Bass now [subtle]
• Chorus: Added [saxophone] to arrangement
```

**Side-by-Side Comparison:**
Show old vs new for ONLY the parts that changed:

**Old Prompt (v1)** | **New Prompt (v2)**
- Show with red strikethrough for removed text
- Show with green highlight for added text

Example display:
```
Left side:                          Right side:
110bpm (red background)             120bpm (green background)
with [melancholic] mood             with [melancholic] [uplifting] mood
Bass: [clean] tone                  Bass: [distortion] and [saturation]
```

**Modal Buttons:**
- [Edit Manually] - For prototype, show alert "Coming soon"
- [Cancel] - Closes modal, no changes
- [Generate v2] - Proceeds to create version 2

---

## What Happens: "Generate v2" Button

### When User Clicks Generate
1. Modal closes
2. Page updates to show v2
3. Version navigation changes to: ◀ v2 ▶
4. Success message appears: "Version 2 generated successfully"

### Left Column Updates (v2 Content)

**Global Settings:**
```
a [neo-soul] track at 120bpm in [D minor] with [melancholic] [uplifting] mood, [lazy swing] drums, 4/4 time signature
```
*(Changed: 110bpm → 120bpm, added [uplifting])*

**Instrument: Vocal**
```
[soulful] British female vocal, [intimate] delivery with [slight reverb]
```
*(No changes)*

**Instrument: Bass**
```
[analog moog] bass with [distortion] and [saturation], [funky] groove
```
*(Changed: added [distortion] and [saturation], removed [clean])*

**Instrument: Keys**
```
[smooth] electric piano with [warm] [reverb]
```
*(No changes)*

**Instrument: Saxophone** *(NEW INSTRUMENT)*
```
[emotional] saxophone with [big] presence, [powerful] delivery
```

**Section: Intro**
```
vocals and keys only, [rubato] feel, [melancholic] delivery, no drums no bass
```
*(No changes)*

**Section: Verse**
```
all instruments enter, [stripped back] arrangement, [subtle] bass in background, [lazy swing] drums
```
*(Changed: [staccato] → [subtle], "bass line" → "bass in background")*

**Section: Chorus**
```
full arrangement with [saxophone], [powerful] vocals, [crescendo] into the hook, [emotional] delivery
```
*(Changed: added "with [saxophone]")*

### Right Column Updates (v2 Notes)
All evaluation note text areas are now **empty** - ready for user to evaluate v2.

### Master Prompt Preview Updates
```
GLOBAL:
a [neo-soul] track at 120bpm in [D minor] with [melancholic] [uplifting] mood, [lazy swing] drums, 4/4 time signature

INSTRUMENTS:
Vocal: [soulful] British female vocal, [intimate] delivery with [slight reverb]
Bass: [analog moog] bass with [distortion] and [saturation], [funky] groove
Keys: [smooth] electric piano with [warm] [reverb]
Sax: [emotional] saxophone with [big] presence, [powerful] delivery

SECTIONS:
Intro: vocals and keys only, [rubato] feel, [melancholic] delivery, no drums no bass
Verse: all instruments enter, [stripped back] arrangement, [subtle] bass in background, [lazy swing] drums
Chorus: full arrangement with [saxophone], [powerful] vocals, [crescendo] into the hook, [emotional] delivery
```

---

## What Happens: Version Navigation

### Clicking Left Arrow (◀)
When viewing v2, clicking left arrow:
1. Loads v1 content into left column
2. Shows v1 evaluation notes (the pre-filled ones) in right column
3. Updates master prompt preview to v1 version
4. Navigation shows: ◀ v1 ▶

### Clicking Right Arrow (▶)
When viewing v1 (after v2 exists), clicking right arrow:
1. Loads v2 content into left column
2. Shows v2 evaluation notes (empty) in right column
3. Updates master prompt preview to v2 version
4. Navigation shows: ◀ v2 ▶

### Arrow States
- Left arrow disabled when on v1
- Right arrow disabled when on latest version
- Both enabled when viewing middle versions (if more than 2 exist)

---

## Visual Styling Rules

### Bracketed Terms Highlighting
Any text inside [brackets] gets special styling:
- Background: Light purple/blue (like #E8E5FF)
- Text: Normal black/dark grey
- Padding: Small padding inside the brackets
- Example: `[neo-soul]` appears with coloured background

### Changed Text in Preview Modal
In the side-by-side comparison:
- **Removed text:** Red background with strikethrough
- **Added text:** Green background
- **Unchanged text:** Normal styling

### Button States
**"Update Prompt from Notes" button:**
- Enabled: When viewing a version that has evaluation notes
- Disabled: When viewing latest version with no notes

---

## Hardcoded Logic for Prototype

### What "Update Prompt from Notes" Should Detect
When moving from v1 to v2, the system should apply these specific changes:

**From Global Notes ("try 120bpm" and "more uplifting"):**
- Change: 110bpm → 120bpm
- Add: [uplifting] to mood

**From Bass Notes ("needs more [distortion] and [saturation]"):**
- Remove: [clean] tone
- Add: [distortion] and [saturation]

**From Verse Notes ("make it more [subtle]"):**
- Change: [staccato] bass line → [subtle] bass in background

**From Chorus Notes ("bigger [saxophone] presence"):**
- Add new instrument: Saxophone
- Add to Chorus: "with [saxophone]"

### Version Data Storage
The prototype needs to remember both versions:
- v1 with its prompt structure and pre-filled notes
- v2 with its updated prompt structure and empty notes

When navigating between versions, load the correct data set.

---

## Success Criteria

A working prototype where:
1. Page loads with v1 data pre-filled
2. User can read prompt structure and evaluation notes
3. Clicking "Update Prompt from Notes" opens preview modal
4. Preview modal shows changes clearly in side-by-side format
5. Clicking "Generate v2" creates new version
6. v2 appears with updated prompt content
7. User can navigate back to v1 and forward to v2
8. Master prompt preview updates correctly when switching versions
9. All [bracketed] terms are visually highlighted
10. Layout is clean and easy to understand

---

## What's Not Needed for Prototype

- Real AI/LLM to parse notes (use hardcoded logic)
- Actual API calls to generate audio
- Audio playback functionality
- More than 2 versions
- Ability to manually edit in preview modal (just show alert)
- Save/load functionality
- Export features
- User authentication
