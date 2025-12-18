# AI Audio Generation Tests

## Overview
Testing how ElevenLabs interprets prompts through their JSON structure to understand:
- Global vs local style influence
- Instrumentation specificity
- Genre constraints
- Performance consistency

---

## Test Categories

### 1. Global vs Section Influence
**Question:** How much do global settings override section-specific settings?

**Tests:**
- Global: "chill" + Section: "energetic" → Which wins?
- Global: "uptempo" + Section: "slow, stripped back" → Does tempo shift?
- Global: "acoustic" + Section: "heavily distorted synths" → Instrumentation conflict?

---

### 2. Specificity Tests
**Question:** Does detail level in prompts affect output quality/accuracy?

**Tests:**
- Vague: "bass" vs Detailed: "analog moog bass with slight distortion"
- Generic: "guitar" vs Specific: "Fender Stratocaster with chorus effect"
- Simple: "drums" vs Complex: "lazy swing drums with brush sticks on snare"
- Brand names: "Fender Jazz bass" vs Generic: "electric bass"

---

### 3. Conflict Tests
**Question:** What happens when instructions contradict?

**Tests:**
- Positive style: "distorted guitar" + Negative style: "clean" → Which wins?
- Global: "minor key, dark" + Section: "uplifting, bright" → Mood conflict?
- Instrument palette: "acoustic instruments" + Section: "synthesized pads" → Does it blend or choose?

---

### 4. Consistency Tests
**Question:** How reproducible are results?

**Tests:**
- Same prompt run 5 times → measure variation in output
- Shuffle section order with identical content → does sequence matter?
- Identical global + different section order → affects overall coherence?

---

### 5. Exclusion Tests
**Question:** Do negative styles actually work?

**Tests:**
- Negative style: "no saxophone" → does sax appear anyway?
- Section exclusion: intro marked "no drums" → are drums present?
- Empty/minimal sections with only negatives → what fills the space?

---

### 6. Terminology Tests
**Question:** Do technical terms work better than plain English?

**Tests:**
- Technical: "syncopated groove with polyrhythm" vs Plain: "funky complicated rhythm"
- Glossary terms: "staccato legato phrasing" vs Generic: "short and smooth notes"
- Production terms: "reverb-heavy with compression" vs "echoey and loud"
- Genre jargon: "breakbeat" vs "choppy drum pattern"

---

### 7. Genre Override Tests
**Question:** Does genre constrain instrumentation choices?

**Tests:**
- Global: "hip hop" + Instrument: "sitar, tabla" → Does it include non-standard instruments?
- Global: "rock" + Instrument: "synthesizer, electronic drums" → Genre wins or instrument choice?
- Global: "classical" + Instrument: "electric guitar, drum machine" → Anachronistic instruments allowed?

---

### 8. Fusion/Hybrid Tests
**Question:** Can we combine unusual instruments for fusion genres?

**Tests:**
- Global: "hip hop with middle eastern influences" → generic fusion
  - vs Global: "hip hop" + Instruments: "sitar, tabla, 808 drums" → explicit listing
  - Which gets closer to Timbaland/50 Cent eastern-influenced hip hop?
- Global: "electronic rock" + Instruments: "distorted guitar, synthesizer pads"
- Global: "jazz fusion" + Instruments: "electric bass, synthesizer, saxophone"

---

### 9. Explicit Instrument Priority
**Question:** Do explicit instrument calls override genre defaults?

**Tests:**
- Global: "rock" + Section instruments: "no guitar, synthesizer lead, electronic drums"
- Global: "acoustic folk" + Instruments: "heavily processed vocals, synthesized strings"
- Standard genre + non-standard instrument → which dominates?

---

## Test Structure Template

For each test:
1. **Hypothesis:** What do we expect to happen?
2. **Prompt structure:** Document exact global/section/instrument settings
3. **Output:** Generated audio + JSON analysis
4. **Evaluation:** Did it match expectations? What did it prioritize?
5. **Insights:** What does this tell us about the system?

---

## Priority Order
1. Global vs Section Influence (foundational)
2. Exclusion Tests (validate negative styles work)
3. Terminology Tests (optimize prompt vocabulary)
4. Genre Override Tests (understand constraints)
5. Fusion/Hybrid Tests (creative applications)
6. Specificity Tests (refinement)
7. Conflict Tests (edge cases)
8. Consistency Tests (reliability)
