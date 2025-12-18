"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, X, AlertTriangle, Music2 } from "lucide-react";
import { usePromptStore } from "@/lib/store/prompt-store";
import { Effect } from "@/lib/types";

const INSTRUMENT_SUGGESTIONS = [
  "Electric Guitar",
  "Acoustic Guitar",
  "Bass Guitar",
  "Drums",
  "Piano",
  "Keyboards",
  "Synth",
  "Vocals",
  "Strings",
  "Brass",
  "Woodwinds",
  "Percussion",
];

const TIMBRE_OPTIONS = [
  "Bright",
  "Dark",
  "Warm",
  "Cold",
  "Rich",
  "Thin",
  "Mellow",
  "Harsh",
  "Smooth",
  "Rough",
  "Clean",
  "Distorted",
];

const TEXTURE_OPTIONS = [
  "Monophonic",
  "Polyphonic",
  "Homophonic",
  "Layered",
  "Sparse",
  "Dense",
  "Thick",
  "Thin",
];

const EFFECT_TYPES = [
  { value: "Reverb", params: ["room_size"] },
  { value: "Distortion", params: ["level"] },
  { value: "Delay", params: ["time", "feedback"] },
  { value: "Compression", params: ["ratio"] },
  { value: "Chorus", params: [] },
  { value: "Flanger", params: [] },
  { value: "Phaser", params: [] },
  { value: "EQ", params: ["preset"] },
];

const VOCAL_TECHNIQUES = [
  "Falsetto",
  "Belt",
  "Crooning",
  "Vibrato",
  "Whisper",
  "Growl",
  "Melisma",
  "Rasp",
];

interface InstrumentCardProps {
  instrumentId: string;
}

function InstrumentCard({ instrumentId }: InstrumentCardProps) {
  const { prompt, removeInstrument, updateInstrument, addEffect, removeEffect } = usePromptStore();
  const instrument = prompt.instruments.find((i) => i.id === instrumentId);

  const [showTimbreInput, setShowTimbreInput] = useState(false);
  const [showVocalInput, setShowVocalInput] = useState(false);
  const [showEffectInput, setShowEffectInput] = useState(false);
  const [selectedEffect, setSelectedEffect] = useState("");

  if (!instrument) return null;

  const isVocal = instrument.name.toLowerCase().includes("vocal");
  const allTimbre = Array.from(new Set([...TIMBRE_OPTIONS, ...TEXTURE_OPTIONS]));

  const handleAddTimbre = (timbre: string) => {
    if (!instrument.timbre.includes(timbre)) {
      updateInstrument(instrumentId, {
        timbre: [...instrument.timbre, timbre],
      });
    }
    setShowTimbreInput(false);
  };

  const handleRemoveTimbre = (timbre: string) => {
    updateInstrument(instrumentId, {
      timbre: instrument.timbre.filter((t) => t !== timbre),
    });
  };

  const handleAddVocalTechnique = (technique: string) => {
    const techniques = instrument.vocal_techniques || [];
    if (!techniques.includes(technique)) {
      updateInstrument(instrumentId, {
        vocal_techniques: [...techniques, technique],
      });
    }
    setShowVocalInput(false);
  };

  const handleRemoveVocalTechnique = (technique: string) => {
    updateInstrument(instrumentId, {
      vocal_techniques: (instrument.vocal_techniques || []).filter((t) => t !== technique),
    });
  };

  const handleAddEffect = () => {
    if (selectedEffect) {
      addEffect(instrumentId, { type: selectedEffect });
      setSelectedEffect("");
      setShowEffectInput(false);
    }
  };

  return (
    <div className="border-2 border-blue-200 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Music2 className="h-5 w-5 text-blue-600" />
          <h4 className="font-semibold text-blue-900">
            {instrument.name || "Unnamed Instrument"}
          </h4>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeInstrument(instrumentId)}
          className="h-8 w-8 text-red-600 hover:bg-red-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {/* Instrument Name */}
        <div className="space-y-2">
          <Label className="text-xs font-medium">Instrument Name</Label>
          <Input
            value={instrument.name}
            onChange={(e) => updateInstrument(instrumentId, { name: e.target.value })}
            placeholder="e.g., Electric Guitar"
            list={`suggestions-${instrumentId}`}
          />
          <datalist id={`suggestions-${instrumentId}`}>
            {INSTRUMENT_SUGGESTIONS.map((suggestion) => (
              <option key={suggestion} value={suggestion} />
            ))}
          </datalist>
        </div>

        {/* Timbre/Texture */}
        <div className="space-y-2">
          <Label className="text-xs font-medium">Timbre & Texture</Label>
          <div className="flex flex-wrap gap-1.5">
            {instrument.timbre.map((timbre) => (
              <Badge
                key={timbre}
                variant="secondary"
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 flex items-center gap-1"
              >
                {timbre}
                <button
                  onClick={() => handleRemoveTimbre(timbre)}
                  className="hover:text-blue-950"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </Badge>
            ))}
            {!showTimbreInput && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTimbreInput(true)}
                className="h-6 text-xs border-dashed"
              >
                <Plus className="h-2.5 w-2.5 mr-1" />
                Add
              </Button>
            )}
          </div>
          {showTimbreInput && (
            <div className="flex flex-wrap gap-1.5 p-2 bg-white rounded border">
              {allTimbre
                .filter((t) => !instrument.timbre.includes(t))
                .map((timbre) => (
                  <Badge
                    key={timbre}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50 text-xs"
                    onClick={() => handleAddTimbre(timbre)}
                  >
                    {timbre}
                  </Badge>
                ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTimbreInput(false)}
                className="ml-auto h-6 text-xs"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Vocal Techniques (conditional) */}
        {isVocal && (
          <div className="space-y-2">
            <Label className="text-xs font-medium">Vocal Techniques</Label>
            <div className="flex flex-wrap gap-1.5">
              {(instrument.vocal_techniques || []).map((technique) => (
                <Badge
                  key={technique}
                  variant="secondary"
                  className="px-2 py-1 text-xs bg-purple-100 text-purple-800 flex items-center gap-1"
                >
                  {technique}
                  <button
                    onClick={() => handleRemoveVocalTechnique(technique)}
                    className="hover:text-purple-950"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              ))}
              {!showVocalInput && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowVocalInput(true)}
                  className="h-6 text-xs border-dashed"
                >
                  <Plus className="h-2.5 w-2.5 mr-1" />
                  Add
                </Button>
              )}
            </div>
            {showVocalInput && (
              <div className="flex flex-wrap gap-1.5 p-2 bg-white rounded border">
                {VOCAL_TECHNIQUES.filter(
                  (t) => !(instrument.vocal_techniques || []).includes(t)
                ).map((technique) => (
                  <Badge
                    key={technique}
                    variant="outline"
                    className="cursor-pointer hover:bg-purple-50 text-xs"
                    onClick={() => handleAddVocalTechnique(technique)}
                  >
                    {technique}
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowVocalInput(false)}
                  className="ml-auto h-6 text-xs"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Effects */}
        <div className="space-y-2">
          <Label className="text-xs font-medium">Effects</Label>
          <div className="flex flex-wrap gap-1.5">
            {instrument.effects.map((effect, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="px-2 py-1 text-xs bg-green-100 text-green-800 flex items-center gap-1"
              >
                {effect.type}
                <button
                  onClick={() => removeEffect(instrumentId, effect.type)}
                  className="hover:text-green-950"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </Badge>
            ))}
            {!showEffectInput && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEffectInput(true)}
                className="h-6 text-xs border-dashed"
              >
                <Plus className="h-2.5 w-2.5 mr-1" />
                Add Effect
              </Button>
            )}
          </div>
          {showEffectInput && (
            <div className="p-2 bg-white rounded border space-y-2">
              <Select value={selectedEffect} onValueChange={setSelectedEffect}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select effect..." />
                </SelectTrigger>
                <SelectContent>
                  {EFFECT_TYPES.map((effect) => (
                    <SelectItem key={effect.value} value={effect.value}>
                      {effect.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button
                  onClick={handleAddEffect}
                  size="sm"
                  className="h-7 text-xs flex-1"
                  disabled={!selectedEffect}
                >
                  Add
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowEffectInput(false);
                    setSelectedEffect("");
                  }}
                  className="h-7 text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Tier2InstrumentPalette() {
  const { prompt, addInstrument } = usePromptStore();
  const instrumentCount = prompt.instruments.length;

  return (
    <Card className="border-2 border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
            2
          </span>
          Instrument Palette
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {instrumentCount >= 8 && (
          <Alert variant="destructive" className="bg-amber-50 border-amber-300 text-amber-900">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Adding many instruments may result in muddy mix. Consider reducing for clarity.
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={addInstrument}
          variant="outline"
          className="w-full border-2 border-dashed border-blue-300 hover:bg-blue-50 text-blue-700 font-medium"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Instrument
        </Button>

        <div className="space-y-4">
          {prompt.instruments.map((instrument) => (
            <InstrumentCard key={instrument.id} instrumentId={instrument.id} />
          ))}
        </div>

        {instrumentCount === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            No instruments added yet. Click "Add Instrument" to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
