"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X, ChevronDown, ChevronUp } from "lucide-react";
import { usePromptStore } from "@/lib/store/prompt-store";

const SECTION_TYPES = [
  { value: "Intro", description: "Opening section" },
  { value: "Verse", description: "Storytelling section" },
  { value: "Chorus", description: "Main hook" },
  { value: "Bridge", description: "Contrasting section" },
  { value: "Pre-Chorus", description: "Build to chorus" },
  { value: "Outro", description: "Ending section" },
  { value: "Break", description: "Breakdown or pause" },
  { value: "Drop", description: "High-energy climax" },
  { value: "Instrumental", description: "Solo or instrumental passage" },
];

const DYNAMICS = [
  "Crescendo",
  "Decrescendo",
  "Staccato",
  "Legato",
  "Accent",
  "Forte",
  "Piano",
  "Sforzando",
];

const RHYTHM = ["Syncopation", "Groove", "Rubato", "Swing", "Straight", "Polyrhythm"];

const MELODY = [
  "Arpeggio",
  "Chord Progression",
  "Dissonance",
  "Resolution",
  "Modulation",
  "Counter-melody",
  "Melisma",
];

interface PerformanceSettingsProps {
  sectionId: string;
  instrumentId: string;
  instrumentName: string;
}

function PerformanceSettings({
  sectionId,
  instrumentId,
  instrumentName,
}: PerformanceSettingsProps) {
  const { prompt, updateSectionPerformance } = usePromptStore();
  const section = prompt.sections.find((s) => s.id === sectionId);
  const performance = section?.performance[instrumentId] || {
    dynamics: [],
    rhythm: [],
    melody: [],
  };

  const [showDynamics, setShowDynamics] = useState(false);
  const [showRhythm, setShowRhythm] = useState(false);
  const [showMelody, setShowMelody] = useState(false);

  const addPerformance = (category: "dynamics" | "rhythm" | "melody", value: string) => {
    const current = performance[category];
    if (!current.includes(value)) {
      updateSectionPerformance(sectionId, instrumentId, {
        [category]: [...current, value],
      });
    }
    if (category === "dynamics") setShowDynamics(false);
    if (category === "rhythm") setShowRhythm(false);
    if (category === "melody") setShowMelody(false);
  };

  const removePerformance = (category: "dynamics" | "rhythm" | "melody", value: string) => {
    const current = performance[category];
    updateSectionPerformance(sectionId, instrumentId, {
      [category]: current.filter((v) => v !== value),
    });
  };

  return (
    <div className="pl-6 pr-3 py-3 bg-white rounded-lg border border-gray-200 space-y-3">
      <h5 className="text-xs font-semibold text-green-800 flex items-center gap-1">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
        {instrumentName}
      </h5>

      {/* Dynamics */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-gray-700">Dynamics & Expression</Label>
        <div className="flex flex-wrap gap-1">
          {performance.dynamics.map((dynamic) => (
            <Badge
              key={dynamic}
              variant="secondary"
              className="px-2 py-0.5 text-xs bg-orange-100 text-orange-800 flex items-center gap-1"
            >
              {dynamic}
              <button onClick={() => removePerformance("dynamics", dynamic)}>
                <X className="h-2.5 w-2.5" />
              </button>
            </Badge>
          ))}
          {!showDynamics && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDynamics(true)}
              className="h-5 text-xs px-2 border-dashed"
            >
              <Plus className="h-2.5 w-2.5" />
            </Button>
          )}
        </div>
        {showDynamics && (
          <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded border">
            {DYNAMICS.filter((d) => !performance.dynamics.includes(d)).map((dynamic) => (
              <Badge
                key={dynamic}
                variant="outline"
                className="cursor-pointer hover:bg-orange-50 text-xs"
                onClick={() => addPerformance("dynamics", dynamic)}
              >
                {dynamic}
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDynamics(false)}
              className="ml-auto h-5 text-xs"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Rhythm */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-gray-700">Tempo & Rhythm</Label>
        <div className="flex flex-wrap gap-1">
          {performance.rhythm.map((rhythm) => (
            <Badge
              key={rhythm}
              variant="secondary"
              className="px-2 py-0.5 text-xs bg-cyan-100 text-cyan-800 flex items-center gap-1"
            >
              {rhythm}
              <button onClick={() => removePerformance("rhythm", rhythm)}>
                <X className="h-2.5 w-2.5" />
              </button>
            </Badge>
          ))}
          {!showRhythm && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRhythm(true)}
              className="h-5 text-xs px-2 border-dashed"
            >
              <Plus className="h-2.5 w-2.5" />
            </Button>
          )}
        </div>
        {showRhythm && (
          <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded border">
            {RHYTHM.filter((r) => !performance.rhythm.includes(r)).map((rhythm) => (
              <Badge
                key={rhythm}
                variant="outline"
                className="cursor-pointer hover:bg-cyan-50 text-xs"
                onClick={() => addPerformance("rhythm", rhythm)}
              >
                {rhythm}
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRhythm(false)}
              className="ml-auto h-5 text-xs"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Melody & Harmony */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-gray-700">Melody & Harmony</Label>
        <div className="flex flex-wrap gap-1">
          {performance.melody.map((melody) => (
            <Badge
              key={melody}
              variant="secondary"
              className="px-2 py-0.5 text-xs bg-pink-100 text-pink-800 flex items-center gap-1"
            >
              {melody}
              <button onClick={() => removePerformance("melody", melody)}>
                <X className="h-2.5 w-2.5" />
              </button>
            </Badge>
          ))}
          {!showMelody && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMelody(true)}
              className="h-5 text-xs px-2 border-dashed"
            >
              <Plus className="h-2.5 w-2.5" />
            </Button>
          )}
        </div>
        {showMelody && (
          <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded border">
            {MELODY.filter((m) => !performance.melody.includes(m)).map((melody) => (
              <Badge
                key={melody}
                variant="outline"
                className="cursor-pointer hover:bg-pink-50 text-xs"
                onClick={() => addPerformance("melody", melody)}
              >
                {melody}
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMelody(false)}
              className="ml-auto h-5 text-xs"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface SectionCardProps {
  sectionId: string;
}

function SectionCard({ sectionId }: SectionCardProps) {
  const { prompt, removeSection, updateSection, toggleInstrumentInSection } = usePromptStore();
  const section = prompt.sections.find((s) => s.id === sectionId);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!section) return null;

  const sectionTypeInfo = SECTION_TYPES.find((t) => t.value === section.type);

  return (
    <div className="border-2 border-green-200 rounded-lg p-4 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 flex-1">
          <Select value={section.type} onValueChange={(value) => updateSection(sectionId, { type: value })}>
            <SelectTrigger className="w-auto min-w-[150px] bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SECTION_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{type.value}</span>
                    <span className="text-xs text-gray-500">{type.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {sectionTypeInfo && (
            <span className="text-xs text-gray-600 italic">{sectionTypeInfo.description}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeSection(sectionId)}
            className="h-8 w-8 text-red-600 hover:bg-red-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Instrument Selection */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold">Active Instruments</Label>
            {prompt.instruments.length === 0 ? (
              <p className="text-xs text-gray-500 italic">
                Add instruments in Tier 2 first
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {prompt.instruments.map((instrument) => {
                  const isIncluded = section.included_instrument_ids.includes(instrument.id);
                  return (
                    <button
                      key={instrument.id}
                      onClick={() => toggleInstrumentInSection(sectionId, instrument.id)}
                      className={`text-left px-3 py-2 rounded-md border-2 text-sm transition-all ${
                        isIncluded
                          ? "border-green-500 bg-green-100 text-green-900"
                          : "border-gray-200 bg-white text-gray-600 hover:border-green-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-sm border-2 flex items-center justify-center ${
                            isIncluded
                              ? "border-green-600 bg-green-600"
                              : "border-gray-400 bg-white"
                          }`}
                        >
                          {isIncluded && <X className="h-2 w-2 text-white" strokeWidth={4} />}
                        </div>
                        <span className="font-medium text-xs">
                          {instrument.name || "Unnamed"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Performance Settings for Active Instruments */}
          {section.included_instrument_ids.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Performance Settings</Label>
              <div className="space-y-2">
                {section.included_instrument_ids.map((instId) => {
                  const instrument = prompt.instruments.find((i) => i.id === instId);
                  if (!instrument) return null;
                  return (
                    <PerformanceSettings
                      key={instId}
                      sectionId={sectionId}
                      instrumentId={instId}
                      instrumentName={instrument.name || "Unnamed"}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function Tier3PerformanceArrangement() {
  const { prompt, addSection } = usePromptStore();
  const sectionCount = prompt.sections.length;

  return (
    <Card className="border-2 border-green-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-100">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
            3
          </span>
          Performance / Arrangement
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <Button
          onClick={addSection}
          variant="outline"
          className="w-full border-2 border-dashed border-green-300 hover:bg-green-50 text-green-700 font-medium"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>

        <div className="space-y-4">
          {prompt.sections.map((section) => (
            <SectionCard key={section.id} sectionId={section.id} />
          ))}
        </div>

        {sectionCount === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            No sections added yet. Click "Add Section" to define your arrangement.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
