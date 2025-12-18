"use client";

import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ThreeTierPrompt, Instrument, Section } from "@/lib/types";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";
import { usePromptStore } from "@/lib/store/prompt-store";

interface GlobalPromptEvalRowProps {
  prompt: ThreeTierPrompt;
  note: string;
  onNoteChange: (value: string) => void;
  onGenerate?: () => Promise<void>;
  isGenerating?: boolean;
}

export function GlobalPromptEvalRow({ prompt, note, onNoteChange, onGenerate, isGenerating }: GlobalPromptEvalRowProps) {
  const { updateGlobalVersion } = usePromptStore();

  // Generate text representation of global settings
  const promptText = `${prompt.global_settings.genre.join(', ')} in ${prompt.global_settings.key}, ${prompt.global_settings.time_signature} at ${prompt.global_settings.tempo.bpm} BPM (${prompt.global_settings.tempo.named}). Mood: ${prompt.global_settings.mood.join(', ')}.`;

  const hasNote = note.trim().length > 0;

  return (
    <div className="grid grid-cols-2 gap-6 p-4 bg-purple-50/50 rounded-lg border border-purple-200">
      {/* Left: Prompt Display */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-purple-900">Global Settings</h3>
          <span className="text-xs text-gray-500 font-mono">
            &lt; v{prompt.global_settings.version || 1} &gt;
          </span>
        </div>

        {/* Initial Prompt Text */}
        <Textarea
          value={promptText}
          readOnly
          className="min-h-[100px] text-sm resize-none bg-white/80 text-gray-700"
        />

        {onGenerate && (
          <Button
            size="sm"
            variant="outline"
            onClick={onGenerate}
            disabled={!hasNote || isGenerating}
            className="h-7 text-xs bg-purple-600 text-white hover:bg-purple-700 border-purple-600"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Generating Full Song...
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3 mr-1" />
                Generate
              </>
            )}
          </Button>
        )}

        {/* Musical Phrases as Badges */}
        <div className="space-y-1.5">
          {prompt.global_settings.genre.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {prompt.global_settings.genre.map((g) => (
                <Badge key={g} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                  {g}
                </Badge>
              ))}
            </div>
          )}
          {prompt.global_settings.mood.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {prompt.global_settings.mood.map((m) => (
                <Badge key={m} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                  {m}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {onGenerate && hasNote && (
          <p className="text-xs text-purple-700">
            ⚠️ Global changes regenerate the entire song
          </p>
        )}
      </div>

      {/* Right: Evaluation Notes */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-purple-900 mb-2">Evaluation Notes</h3>
        <Textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Notes on genre, tempo, mood, key, time signature..."
          className="min-h-[180px] text-sm resize-none bg-white"
        />
        <Button
          onClick={updateGlobalVersion}
          size="sm"
          className="h-7 text-xs bg-purple-600 hover:bg-purple-700"
        >
          <RefreshCw className="h-3 w-3 mr-1.5" />
          Update Prompt
        </Button>
      </div>
    </div>
  );
}

interface InstrumentPromptEvalRowProps {
  instrument: Instrument;
  note: string;
  onNoteChange: (value: string) => void;
  onGenerate?: () => Promise<void>;
  isGenerating?: boolean;
}

export function InstrumentPromptEvalRow({ instrument, note, onNoteChange, onGenerate, isGenerating }: InstrumentPromptEvalRowProps) {
  const { updateInstrumentVersion } = usePromptStore();

  // Generate text representation of instrument
  let promptText = `${instrument.name}`;
  if (instrument.timbre.length > 0) {
    promptText += ` with ${instrument.timbre.join(', ')} timbre`;
  }
  if (instrument.effects.length > 0) {
    promptText += `. Effects: ${instrument.effects.map(e => e.type).join(', ')}`;
  }
  if (instrument.vocal_techniques && instrument.vocal_techniques.length > 0) {
    promptText += `. Vocal techniques: ${instrument.vocal_techniques.join(', ')}`;
  }

  const hasNote = note.trim().length > 0;

  return (
    <div className="grid grid-cols-2 gap-6 p-4 bg-blue-50/50 rounded-lg border border-blue-200">
      {/* Left: Prompt Display */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-blue-900">{instrument.name || "Unnamed"}</h3>
          <span className="text-xs text-gray-500 font-mono">
            &lt; v{instrument.version || 1} &gt;
          </span>
        </div>

        {/* Initial Prompt Text */}
        <Textarea
          value={promptText}
          readOnly
          className="min-h-[80px] text-sm resize-none bg-white/80 text-gray-700"
        />

        {onGenerate && (
          <Button
            size="sm"
            variant="outline"
            onClick={onGenerate}
            disabled={!hasNote || isGenerating}
            className="h-7 text-xs bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Generating Full Song...
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3 mr-1" />
                Generate
              </>
            )}
          </Button>
        )}

        {/* Musical Phrases as Badges */}
        <div className="space-y-1.5">
          {instrument.timbre.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {instrument.timbre.map((t) => (
                <Badge key={t} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                  {t}
                </Badge>
              ))}
            </div>
          )}
          {instrument.effects.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {instrument.effects.map((effect, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                  {effect.type}
                </Badge>
              ))}
            </div>
          )}
          {instrument.vocal_techniques && instrument.vocal_techniques.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {instrument.vocal_techniques.map((vt) => (
                <Badge key={vt} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                  {vt}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {onGenerate && hasNote && (
          <p className="text-xs text-blue-700">
            ⚠️ Instrument changes regenerate the entire song
          </p>
        )}
      </div>

      {/* Right: Evaluation Notes */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Evaluation Notes</h3>
        <Textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder={`Notes on ${instrument.name}: timbre, effects, performance...`}
          className="min-h-[140px] text-sm resize-none bg-white"
        />
        <Button
          onClick={() => updateInstrumentVersion(instrument.id)}
          size="sm"
          className="h-7 text-xs bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCw className="h-3 w-3 mr-1.5" />
          Update Prompt
        </Button>
      </div>
    </div>
  );
}

interface SectionPromptEvalRowProps {
  section: Section;
  prompt: ThreeTierPrompt;
  note: string;
  onNoteChange: (value: string) => void;
  onGenerate?: () => Promise<void>;
  isGenerating?: boolean;
}

export function SectionPromptEvalRow({ section, prompt, note, onNoteChange, onGenerate, isGenerating }: SectionPromptEvalRowProps) {
  const { updateSectionVersion } = usePromptStore();

  const includedInstruments = prompt.instruments.filter((i) =>
    section.included_instrument_ids.includes(i.id)
  );

  // Generate text representation of section
  let promptText = `${section.type} section with ${includedInstruments.map(i => i.name).join(', ')}.`;

  const performanceDetails: string[] = [];
  Object.entries(section.performance).forEach(([instId, perf]) => {
    const instrument = prompt.instruments.find((i) => i.id === instId);
    if (!instrument) return;

    const perfParts: string[] = [];
    if (perf.dynamics.length > 0) perfParts.push(`dynamics: ${perf.dynamics.join(', ')}`);
    if (perf.rhythm.length > 0) perfParts.push(`rhythm: ${perf.rhythm.join(', ')}`);
    if (perf.melody.length > 0) perfParts.push(`melody: ${perf.melody.join(', ')}`);

    if (perfParts.length > 0) {
      performanceDetails.push(`${instrument.name}: ${perfParts.join('; ')}`);
    }
  });

  if (performanceDetails.length > 0) {
    promptText += ` Performance: ${performanceDetails.join('. ')}.`;
  }

  // Collect all expression badges (dynamics, rhythm, melody)
  const allExpressions: string[] = [];
  Object.entries(section.performance).forEach(([_, perf]) => {
    allExpressions.push(...perf.dynamics, ...perf.rhythm, ...perf.melody);
  });

  const hasNote = note.trim().length > 0;

  return (
    <div className="grid grid-cols-2 gap-6 p-4 bg-green-50/50 rounded-lg border border-green-200">
      {/* Left: Prompt Display */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-green-900">{section.type}</h3>
          <span className="text-xs text-gray-500 font-mono">
            &lt; v{section.version || 1} &gt;
          </span>
        </div>

        {/* Initial Prompt Text */}
        <Textarea
          value={promptText}
          readOnly
          className="min-h-[100px] text-sm resize-none bg-white/80 text-gray-700"
        />

        {onGenerate && (
          <Button
            size="sm"
            variant="outline"
            onClick={onGenerate}
            disabled={!hasNote || isGenerating}
            className="h-7 text-xs bg-green-600 text-white hover:bg-green-700 border-green-600"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Generating Section...
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3 mr-1" />
                Generate
              </>
            )}
          </Button>
        )}

        {/* Musical Phrases as Badges */}
        <div className="space-y-1.5">
          {allExpressions.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {allExpressions.map((expr, idx) => (
                <Badge key={`${expr}-${idx}`} variant="secondary" className="text-xs bg-green-100 text-green-700">
                  {expr}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {onGenerate && hasNote && (
          <p className="text-xs text-green-700">
            ✓ Only this section will be regenerated
          </p>
        )}
      </div>

      {/* Right: Evaluation Notes */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-green-900 mb-2">Evaluation Notes</h3>
        <Textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder={`Notes on ${section.type}: arrangement, performance, transitions...`}
          className="min-h-[140px] text-sm resize-none bg-white"
        />
        <Button
          onClick={() => updateSectionVersion(section.id)}
          size="sm"
          className="h-7 text-xs bg-green-600 hover:bg-green-700"
        >
          <RefreshCw className="h-3 w-3 mr-1.5" />
          Update Prompt
        </Button>
      </div>
    </div>
  );
}
