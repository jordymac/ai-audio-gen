"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Info, Plus, X } from "lucide-react";
import { usePromptStore } from "@/lib/store/prompt-store";
import { Button } from "@/components/ui/button";

const GENRES = [
  "Pop",
  "Rock",
  "Jazz",
  "Electronic",
  "Classical",
  "Hip-Hop",
  "R&B",
  "Country",
  "Blues",
  "Reggae",
  "Metal",
  "Folk",
  "Latin",
  "Soul",
  "Funk",
  "Indie",
];

const KEYS = [
  { value: "C Major", description: "Bright, clear, commonly used" },
  { value: "G Major", description: "Uplifting, commonly used in pop" },
  { value: "D Major", description: "Brilliant, festive" },
  { value: "A Major", description: "Bright, cheerful" },
  { value: "E Major", description: "Bold, heroic" },
  { value: "B Major", description: "Brilliant, sharp" },
  { value: "F Major", description: "Pastoral, peaceful" },
  { value: "Bb Major", description: "Warm, mellow" },
  { value: "Eb Major", description: "Rich, full" },
  { value: "Ab Major", description: "Warm, smooth" },
  { value: "Db Major", description: "Dreamy, floating" },
  { value: "A Minor", description: "Melancholic, introspective" },
  { value: "E Minor", description: "Pensive, serious" },
  { value: "D Minor", description: "Somber, heavy" },
  { value: "C Minor", description: "Dark, brooding" },
  { value: "G Minor", description: "Serious, dramatic" },
  { value: "F Minor", description: "Dark, ominous" },
  { value: "B Minor", description: "Lonely, reflective" },
];

const TIME_SIGNATURES = [
  { value: "4/4", description: "Standard time, most common" },
  { value: "3/4", description: "Waltz time, flowing" },
  { value: "6/8", description: "Compound meter, lilting" },
  { value: "5/4", description: "Unconventional, progressive" },
  { value: "7/8", description: "Complex, odd meter" },
  { value: "2/4", description: "March time, steady" },
];

const TEMPO_MARKINGS = [
  { name: "Grave", min: 40, max: 60 },
  { name: "Adagio", min: 66, max: 76 },
  { name: "Andante", min: 76, max: 108 },
  { name: "Moderato", min: 108, max: 120 },
  { name: "Allegro", min: 120, max: 156 },
  { name: "Vivace", min: 156, max: 176 },
  { name: "Presto", min: 168, max: 200 },
];

const MOODS = [
  "Energetic",
  "Melancholic",
  "Uplifting",
  "Dark",
  "Peaceful",
  "Aggressive",
  "Romantic",
  "Mysterious",
  "Playful",
  "Epic",
  "Nostalgic",
  "Triumphant",
];

function getTempoName(bpm: number): string {
  for (const tempo of TEMPO_MARKINGS) {
    if (bpm >= tempo.min && bpm <= tempo.max) {
      return tempo.name;
    }
  }
  return "Custom";
}

export function Tier1GlobalSettings() {
  const { prompt, updateGlobalSettings, setGenres, setMood, setTempo } = usePromptStore();
  const [showGenreInput, setShowGenreInput] = useState(false);
  const [genreInput, setGenreInput] = useState("");
  const [showMoodInput, setShowMoodInput] = useState(false);
  const [moodInput, setMoodInput] = useState("");

  const global = prompt.global_settings;
  const currentKey = KEYS.find((k) => k.value === global.key);

  const handleAddGenre = (genre: string) => {
    if (!global.genre.includes(genre)) {
      setGenres([...global.genre, genre]);
    }
    setShowGenreInput(false);
    setGenreInput("");
  };

  const handleRemoveGenre = (genre: string) => {
    setGenres(global.genre.filter((g) => g !== genre));
  };

  const handleAddMood = (mood: string) => {
    if (!global.mood.includes(mood)) {
      setMood([...global.mood, mood]);
    }
    setShowMoodInput(false);
    setMoodInput("");
  };

  const handleRemoveMood = (mood: string) => {
    setMood(global.mood.filter((m) => m !== mood));
  };

  const handleTempoChange = (value: number[]) => {
    const bpm = value[0];
    const named = getTempoName(bpm);
    setTempo(bpm, named);
  };

  return (
    <Card className="border-2 border-purple-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-100">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm">
            1
          </span>
          Global Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Genre Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Genre</Label>
          <div className="flex flex-wrap gap-2">
            {global.genre.map((genre) => (
              <Badge
                key={genre}
                variant="secondary"
                className="px-3 py-1.5 bg-purple-100 text-purple-800 hover:bg-purple-200 flex items-center gap-1.5"
              >
                {genre}
                <button
                  onClick={() => handleRemoveGenre(genre)}
                  className="hover:text-purple-950 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {!showGenreInput && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowGenreInput(true)}
                className="h-8 text-xs border-dashed border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Genre
              </Button>
            )}
          </div>
          {showGenreInput && (
            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md border border-gray-200">
              {GENRES.filter((g) => !global.genre.includes(g)).map((genre) => (
                <Badge
                  key={genre}
                  variant="outline"
                  className="cursor-pointer hover:bg-purple-100 hover:border-purple-300 transition-colors"
                  onClick={() => handleAddGenre(genre)}
                >
                  {genre}
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowGenreInput(false)}
                className="ml-auto text-xs"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Key Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Key</Label>
          <Select value={global.key} onValueChange={(value) => updateGlobalSettings({ key: value })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a key" />
            </SelectTrigger>
            <SelectContent>
              {KEYS.map((key) => (
                <SelectItem key={key.value} value={key.value}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{key.value}</span>
                    <span className="text-xs text-gray-500">• {key.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {currentKey && (
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <Info className="h-3 w-3" />
              {currentKey.description}
            </p>
          )}
        </div>

        {/* Time Signature */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Time Signature</Label>
          <Select
            value={global.time_signature}
            onValueChange={(value) => updateGlobalSettings({ time_signature: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select time signature" />
            </SelectTrigger>
            <SelectContent>
              {TIME_SIGNATURES.map((ts) => (
                <SelectItem key={ts.value} value={ts.value}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{ts.value}</span>
                    <span className="text-xs text-gray-500">• {ts.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tempo */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Tempo</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-purple-700">{global.tempo.bpm}</span>
              <span className="text-sm font-medium px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                {global.tempo.named}
              </span>
            </div>
            <Slider
              value={[global.tempo.bpm]}
              onValueChange={handleTempoChange}
              min={40}
              max={200}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>40 BPM</span>
              <span>120 BPM</span>
              <span>200 BPM</span>
            </div>
          </div>
        </div>

        {/* Mood Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Overall Mood / Vibe</Label>
          <div className="flex flex-wrap gap-2">
            {global.mood.map((mood) => (
              <Badge
                key={mood}
                variant="secondary"
                className="px-3 py-1.5 bg-pink-100 text-pink-800 hover:bg-pink-200 flex items-center gap-1.5"
              >
                {mood}
                <button
                  onClick={() => handleRemoveMood(mood)}
                  className="hover:text-pink-950 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {!showMoodInput && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMoodInput(true)}
                className="h-8 text-xs border-dashed border-pink-300 text-pink-700 hover:bg-pink-50"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Mood
              </Button>
            )}
          </div>
          {showMoodInput && (
            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md border border-gray-200">
              {MOODS.filter((m) => !global.mood.includes(m)).map((mood) => (
                <Badge
                  key={mood}
                  variant="outline"
                  className="cursor-pointer hover:bg-pink-100 hover:border-pink-300 transition-colors"
                  onClick={() => handleAddMood(mood)}
                >
                  {mood}
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMoodInput(false)}
                className="ml-auto text-xs"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
