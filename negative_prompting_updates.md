# Adding Negative Prompting - Update Instructions

## Overview
Add negative prompting capability across all three pages (Input, Evaluation, Submission). Negative prompts specify what to avoid/exclude in the generation. This matches the ElevenLabs API structure that uses both positive and negative styles.

## Reference Existing Codebase
Before making changes, review the current implementation of:
- Input page component structure
- Evaluation page layout
- Submission page metadata extraction
- How text areas are currently rendered
- How bracketed terms are highlighted

---

## 1. Input Page Updates

### Global Settings Section

**Current structure:**
- One text area for positive prompt
- Quick selects (BPM, Key, Time Sig)
- Helper badges

**Add below positive text area:**
- Label: "Negative (What to Avoid)"
- Smaller text area (about 60% height of positive area)
- Same helper badges available
- Same bracketed term highlighting
- Placeholder: "e.g., avoid [aggressive] sounds, no [heavy drums], exclude [distortion]"

**Pre-filled negative example for prototype:**
```
no [aggressive] elements, avoid [fast tempo], exclude [harsh] sounds
```

### Instruments Section

**For each instrument block:**

**Current structure:**
- Instrument name
- One text area for positive description
- Helper badges

**Add below positive text area:**
- Label: "Negative (Avoid for this instrument)"
- Smaller text area (about 60% height of positive area)
- Same helper badges
- Placeholder: "e.g., no [distortion], avoid [staccato], exclude [reverb]"

**Pre-filled negative examples for prototype:**

**Bass negative:**
```
no [muddy] low end, avoid [overcompression]
```

**Vocal negative:**
```
avoid [breathy] delivery, no [autotune]
```

**Keys negative:**
```
no [harsh] tones, avoid [excessive reverb]
```

**Saxophone negative:**
```
avoid [screechy] high notes, no [overblown] sounds
```

### Sections Section

**For each section block:**

**Current structure:**
- Section type dropdown
- One text area for positive description
- Helper badges

**Add below positive text area:**
- Label: "Negative (Exclude from this section)"
- Smaller text area (about 60% height of positive area)
- Same helper badges
- Placeholder: "e.g., no [drums], exclude [bass], avoid [loud] dynamics"

**Pre-filled negative examples for prototype:**

**Intro negative:**
```
no [drums], no [bass], avoid [loud] elements
```

**Verse negative:**
```
avoid [overcrowding], no [saxophone]
```

**Chorus negative:**
```
no [thin] sound, avoid [weak] vocals
```

### Visual Layout Example

```
┌─────────────────────────────────────────┐
│ Global Settings                         │
├─────────────────────────────────────────┤
│ a [neo-soul] track at 110bpm in         │
│ [D minor] with [melancholic] mood       │
│                                         │
└─────────────────────────────────────────┘

Negative (What to Avoid)
┌─────────────────────────────────────────┐
│ no [aggressive] elements, avoid [fast   │
│ tempo], exclude [harsh] sounds          │
└─────────────────────────────────────────┘
```

---

## 2. Evaluation Page Updates

### Left Column: Prompt Structure

**For each tier (Global, each Instrument, each Section):**

**Current structure:**
- Shows positive prompt only

**Add below each positive block:**
- Label: "Negative:"
- Slightly smaller text or indented
- Display negative prompt content
- Same bracketed term highlighting

### Right Column: Evaluation Notes

**Current structure:**
- One notes text area per element

**Keep as is:**
- Notes area covers both positive AND negative aspects
- No need for separate negative notes area
- Users write combined feedback like: "Positive works, but negative should also exclude [staccato]"

### Visual Layout Example

```
┌────────────────────────────┬────────────────────────────┐
│ GLOBAL SETTINGS            │ GLOBAL NOTES               │
│ a [neo-soul] track at      │ [text area]                │
│ 120bpm in [D minor]        │                            │
│                            │                            │
│ Negative:                  │                            │
│ no [aggressive] elements   │                            │
├────────────────────────────┼────────────────────────────┤
│ INSTRUMENT: Bass           │ BASS NOTES                 │
│ [analog moog] bass with    │ [text area]                │
│ [distortion]               │                            │
│                            │                            │
│ Negative:                  │                            │
│ no [muddy] low end         │                            │
└────────────────────────────┴────────────────────────────┘
```

### Master Prompt Preview

**Update format to include negatives:**

```
GLOBAL:
Positive: a [neo-soul] track at 120bpm in [D minor] with [melancholic] mood
Negative: no [aggressive] elements, avoid [fast tempo]

INSTRUMENTS:
Bass:
  Positive: [analog moog] bass with [distortion]
  Negative: no [muddy] low end, avoid [overcompression]

Vocal:
  Positive: [soulful] British female vocal
  Negative: avoid [breathy] delivery

SECTIONS:
Intro:
  Positive: vocals and keys only, [rubato] feel
  Negative: no [drums], no [bass], avoid [loud] elements

Verse:
  Positive: all instruments, [stripped back] arrangement
  Negative: avoid [overcrowding], no [saxophone]
```

### Version 2 Updates

**When generating v2 from notes:**

If evaluation notes mention things to avoid, update negative prompts accordingly.

**Example v1 → v2 changes:**

**Verse evaluation note says:** "Too much going on, needs to be more minimal"

**v2 Verse negative updates to:**
```
avoid [overcrowding], no [saxophone], exclude [busy] arrangements
```

---

## 3. Submission Page Updates

### Left Column: Prompt Review

**Update to show both positive and negative:**

**Global Settings:**
```
Positive: a [neo-soul] track at 120bpm in [D minor]
Negative: no [aggressive] elements, avoid [fast tempo]
```

**Instruments:**
```
Bass:
  Positive: [analog moog] bass with [distortion]
  Negative: no [muddy] low end

Vocal:
  Positive: [soulful] British female vocal
  Negative: avoid [breathy] delivery
```

**Sections:**
```
Intro:
  Positive: vocals and keys only, [rubato] feel
  Negative: no [drums], no [bass]
```

### Right Column: Searchable Metadata

**Add new category: Exclusions**

**Auto-extract from negative prompts:**
- Find all bracketed terms in negative text areas
- Categorise same way as positive terms
- Display separately

**Example metadata structure:**

**Positive Tags:**
```
Genre: neo-soul
Mood: melancholic, uplifting
Instruments: vocal, bass, keys, saxophone
Performance: rubato, stripped back, subtle
Production: reverb, distortion, saturation
```

**Negative Tags (Exclusions):**
```
Avoid Mood: aggressive, harsh
Avoid Instruments: (none specified)
Avoid Performance: fast tempo, overcrowding, busy
Avoid Production: muddy, overcompression
Avoid Dynamics: loud
```

### Visual Layout Example

```
┌─────────────────────────────────────────┐
│ Searchable Metadata                     │
├─────────────────────────────────────────┤
│ POSITIVE TAGS                           │
│                                         │
│ Genre Tags: neo-soul                    │
│ Mood Tags: melancholic, uplifting       │
│ Instrument Tags: vocal, bass, keys, sax │
│                                         │
├─────────────────────────────────────────┤
│ NEGATIVE TAGS (EXCLUSIONS)              │
│                                         │
│ Avoid Mood: aggressive, harsh           │
│ Avoid Performance: fast tempo, busy     │
│ Avoid Production: muddy, overcompression│
│ Avoid Dynamics: loud                    │
└─────────────────────────────────────────┘
```

### Database Storage Update

**Add to track record:**
```
Negative Prompts:
- negative_global: "no [aggressive] elements..."
- negative_instruments: JSON array with each instrument's negative
- negative_sections: JSON array with each section's negative

Negative Metadata:
- exclude_mood_tags: ["aggressive", "harsh"]
- exclude_performance_tags: ["fast tempo", "overcrowding", "busy"]
- exclude_production_tags: ["muddy", "overcompression"]
- exclude_dynamics_tags: ["loud"]
```

### Search Query Examples with Negatives

**Query:** "chill neo-soul without aggressive sounds"
- Matches genre: "neo-soul"
- Matches use_case: "chill"
- Confirms exclude_mood: "aggressive" ✓
- Would return this track

**Query:** "uplifting track without drums in intro"
- Matches mood: "uplifting"
- Checks section negatives: Intro excludes drums ✓
- Would return this track

---

## Implementation Checklist

### Input Page
- [ ] Add negative text area under Global positive area
- [ ] Add negative text area under each Instrument positive area
- [ ] Add negative text area under each Section positive area
- [ ] Apply same bracketed term highlighting to negative areas
- [ ] Make negative text areas ~60% height of positive areas
- [ ] Add helper badges to negative areas
- [ ] Pre-fill with prototype negative examples
- [ ] Update "Generate Audio" to capture negative data

### Evaluation Page
- [ ] Display negative prompts under each positive block (left column)
- [ ] Format with "Negative:" label
- [ ] Apply same bracketed highlighting
- [ ] Update Master Prompt Preview format to show positives and negatives
- [ ] Update v1 dummy data to include negatives
- [ ] Update v2 dummy data to include updated negatives
- [ ] Keep notes area combined (no separate negative notes)

### Submission Page
- [ ] Update left column to show positive/negative format
- [ ] Add "Negative Tags (Exclusions)" section to metadata
- [ ] Extract bracketed terms from all negative text areas
- [ ] Categorise negative terms same way as positive
- [ ] Display with clear "Avoid" prefixes
- [ ] Update database storage structure (conceptual)
- [ ] Add search query examples that use exclusions

### Cross-Page
- [ ] Ensure consistent visual styling for negative areas
- [ ] Ensure bracketed term highlighting works in negative text
- [ ] Test data flow: Input → Eval → Submission includes negatives
- [ ] Verify negative data in Master Prompt Preview matches input

---

## Notes for Claude Code

1. **Reference existing components** before modifying:
   - Check how text areas are currently structured
   - Review bracketed term highlighting implementation
   - Look at helper badge system
   - Understand data flow between pages

2. **Consistent styling** across all pages:
   - Negative areas should feel like natural extensions
   - Use same highlighting for bracketed terms
   - Maintain visual hierarchy (positive more prominent)

3. **Data structure** needs to accommodate:
   - Positive and negative for Global
   - Positive and negative for each Instrument
   - Positive and negative for each Section

4. **For prototype**, all negative examples are pre-filled - no need for complex logic, just display the dummy data properly.

5. **Master Prompt Preview** format change is important - clearly separate positive/negative in the output.
