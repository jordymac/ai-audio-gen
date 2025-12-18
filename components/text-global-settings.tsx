"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SmartTextArea } from "./smart-textarea";
import { useTextPromptStore } from "@/lib/store/text-prompt-store";
import { Music2 } from "lucide-react";

const GENRE_OPTIONS = [
  "Pop",
  "Rock",
  "Hip Hop",
  "Electronic",
  "Jazz",
  "Classical",
  "R&B",
  "Country",
  "Blues",
  "Folk",
  "Metal",
  "Indie",
  "Soul",
  "Funk",
  "Reggae",
  "Latin",
  "Ambient",
  "House",
  "Techno",
  "Trap",
];

const BPM_OPTIONS = [60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180];

const KEY_OPTIONS = [
  { value: "C Major", label: "C Major", description: "bright, simple" },
  { value: "D Major", label: "D Major", description: "triumphant, festive" },
  { value: "E Major", label: "E Major", description: "bold, energetic" },
  { value: "F Major", label: "F Major", description: "pastoral, calm" },
  { value: "G Major", label: "G Major", description: "bright, common in pop" },
  { value: "A Major", label: "A Major", description: "cheerful, confident" },
  { value: "B Major", label: "B Major", description: "strong, brilliant" },
  { value: "C Minor", label: "C Minor", description: "dramatic, serious" },
  { value: "D Minor", label: "D Minor", description: "melancholic, solemn" },
  { value: "E Minor", label: "E Minor", description: "reflective, somber" },
  { value: "F Minor", label: "F Minor", description: "dark, tense" },
  { value: "G Minor", label: "G Minor", description: "emotional, melancholic" },
  { value: "A Minor", label: "A Minor", description: "introspective, natural" },
  { value: "B Minor", label: "B Minor", description: "lonely, tender" },
];

const TIME_SIGNATURE_OPTIONS = [
  { value: "4/4", label: "4/4 (Common Time)" },
  { value: "3/4", label: "3/4 (Waltz)" },
  { value: "6/8", label: "6/8 (Compound)" },
  { value: "5/4", label: "5/4 (Irregular)" },
  { value: "7/8", label: "7/8 (Complex)" },
  { value: "2/4", label: "2/4 (March)" },
];

const MOOD_OPTIONS = [
  "Uplifting",
  "Melancholic",
  "Energetic",
  "Calm",
  "Dark",
  "Dreamy",
  "Aggressive",
  "Romantic",
  "Mysterious",
  "Playful",
  "Intense",
  "Relaxed",
  "Nostalgic",
  "Epic",
  "Groovy",
];

export function TextGlobalSettings() {
  const { prompt, setGlobal, setNegativeGlobal } = useTextPromptStore();

  const insertAtCursor = (text: string) => {
    const currentValue = prompt.global;
    const newValue = currentValue + (currentValue ? " " : "") + text;
    setGlobal(newValue);
  };

  const handleQuickSelect = (type: string, value: string) => {
    insertAtCursor(value);
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center">
            <Music2 className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-purple-900">
              Global Settings
            </CardTitle>
            <p className="text-xs text-gray-600 mt-0.5">
              Describe the overall track characteristics
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Selects */}
        <div className="grid grid-cols-5 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1.5 block">
              Genre
            </label>
            <Select onValueChange={(value) => handleQuickSelect("genre", value)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select Genre" />
              </SelectTrigger>
              <SelectContent>
                {GENRE_OPTIONS.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 mb-1.5 block">
              BPM
            </label>
            <Select onValueChange={(value) => handleQuickSelect("bpm", `at ${value}bpm`)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select BPM" />
              </SelectTrigger>
              <SelectContent>
                {BPM_OPTIONS.map((bpm) => (
                  <SelectItem key={bpm} value={bpm.toString()}>
                    {bpm} BPM
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 mb-1.5 block">
              Key
            </label>
            <Select onValueChange={(value) => handleQuickSelect("key", `in ${value}`)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select Key" />
              </SelectTrigger>
              <SelectContent>
                {KEY_OPTIONS.map((key) => (
                  <SelectItem key={key.value} value={key.value}>
                    <div className="flex flex-col">
                      <span>{key.label}</span>
                      <span className="text-xs text-gray-500">
                        {key.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 mb-1.5 block">
              Time Signature
            </label>
            <Select onValueChange={(value) => handleQuickSelect("time", `${value}`)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SIGNATURE_OPTIONS.map((time) => (
                  <SelectItem key={time.value} value={time.value}>
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 mb-1.5 block">
              Mood
            </label>
            <Select onValueChange={(value) => handleQuickSelect("mood", value)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select Mood" />
              </SelectTrigger>
              <SelectContent>
                {MOOD_OPTIONS.map((mood) => (
                  <SelectItem key={mood} value={mood}>
                    {mood}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Text Area */}
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1.5 block">
            Describe Your Track
          </label>
          <SmartTextArea
            value={prompt.global}
            onChange={setGlobal}
            placeholder="e.g., a neo-soul track with uplifting vocals and lazy swing drums..."
            minRows={4}
          />
        </div>

        {/* Negative Prompt Area */}
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1.5 block">
            Negative (What to Avoid)
          </label>
          <SmartTextArea
            value={prompt.negativeGlobal}
            onChange={setNegativeGlobal}
            placeholder="e.g., avoid [aggressive] sounds, no [heavy drums], exclude [distortion]..."
            minRows={2}
          />
        </div>

        {/* Tip */}
        <div className="text-xs text-gray-500 bg-purple-50 p-3 rounded-lg">
          <strong>💡 Tip:</strong> Type naturally and glossary terms will be
          automatically detected and highlighted with [brackets].
        </div>
      </CardContent>
    </Card>
  );
}
