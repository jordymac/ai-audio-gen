"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Play,
  Pause,
  Copy,
  Check,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { soundLibraryExamples } from "@/lib/mock-data";
import { SoundLibraryExample } from "@/lib/types";

interface SoundLibrarySidebarProps {
  onSelectExample?: (example: SoundLibraryExample) => void;
}

interface Filter {
  type: "genre" | "mood" | "instruments" | "purpose";
  value: string;
}

export function SoundLibrarySidebar({ onSelectExample }: SoundLibrarySidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [categoryType, setCategoryType] = useState<"genre" | "mood" | "instruments" | "purpose">("genre");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach((audio) => audio.pause());
    };
  }, []);

  const togglePlay = (id: string, url: string) => {
    const audio = audioRefs.current[id];

    if (playingId === id && audio) {
      audio.pause();
      setPlayingId(null);
    } else {
      Object.values(audioRefs.current).forEach((a) => a.pause());
      if (audio) {
        audio.play();
        setPlayingId(id);
      }
    }
  };

  const copyPrompt = (example: SoundLibraryExample) => {
    const promptText = `${example.prompt}${
      example.negative_prompt ? `\n\nNegative: ${example.negative_prompt}` : ""
    }`;
    navigator.clipboard.writeText(promptText);
    setCopiedId(example.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const addFilter = (type: "genre" | "mood" | "instruments" | "purpose", value: string) => {
    // Don't add if already exists
    if (activeFilters.some((f) => f.type === type && f.value === value)) {
      return;
    }
    setActiveFilters([...activeFilters, { type, value }]);
  };

  const removeFilter = (index: number) => {
    setActiveFilters(activeFilters.filter((_, i) => i !== index));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const getCategories = () => {
    const allExamples = soundLibraryExamples;
    const categories = new Set<string>();

    allExamples.forEach((example) => {
      if (categoryType === "genre") {
        categories.add(example.genre);
      } else if (categoryType === "mood") {
        example.mood.forEach((m) => categories.add(m));
      } else if (categoryType === "instruments") {
        example.instruments.forEach((i) => categories.add(i));
      } else if (categoryType === "purpose") {
        example.purpose.forEach((p) => categories.add(p));
      }
    });

    return Array.from(categories).sort();
  };

  const filteredExamples = soundLibraryExamples.filter((example) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      example.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      example.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      example.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Category filters (AND logic - must match all active filters)
    const matchesFilters =
      activeFilters.length === 0 ||
      activeFilters.every((filter) => {
        if (filter.type === "genre") {
          return example.genre === filter.value;
        } else if (filter.type === "mood") {
          return example.mood.includes(filter.value);
        } else if (filter.type === "instruments") {
          return example.instruments.includes(filter.value);
        } else if (filter.type === "purpose") {
          return example.purpose.includes(filter.value);
        }
        return true;
      });

    return matchesSearch && matchesFilters;
  });

  return (
    <div
      className={`bg-white border-r transition-all duration-300 flex-shrink-0 relative h-screen sticky top-0 ${
        isOpen ? "w-1/3" : "w-12"
      }`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 bg-white border shadow-md rounded-full h-8 w-8 z-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      {isOpen && (
        <div className="h-full flex flex-col p-4 overflow-hidden">
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-1">Sound Library</h2>
            <p className="text-xs text-gray-600">
              Browse examples and copy prompts
            </p>
          </div>

          <div className="space-y-3 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex gap-2">
              <Select
                value={categoryType}
                onValueChange={(value: any) => setCategoryType(value)}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="genre">Genre</SelectItem>
                  <SelectItem value="mood">Mood</SelectItem>
                  <SelectItem value="instruments">Instruments</SelectItem>
                  <SelectItem value="purpose">Purpose</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value=""
                onValueChange={(value) => {
                  if (value) {
                    addFilter(categoryType, value);
                  }
                }}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Add filter..." />
                </SelectTrigger>
                <SelectContent>
                  {getCategories().map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {activeFilters.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600">
                    Active Filters
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-6 text-xs"
                  >
                    Clear all
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeFilters.map((filter, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="pl-2 pr-1 py-1 text-xs"
                    >
                      <span className="text-gray-500 mr-1">
                        {filter.type}:
                      </span>
                      {filter.value}
                      <button
                        onClick={() => removeFilter(index)}
                        className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {filteredExamples.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                No examples found
              </div>
            ) : (
              filteredExamples.map((example) => (
                <Card
                  key={example.id}
                  className="hover:border-purple-300 transition-colors cursor-pointer"
                  onClick={() => onSelectExample?.(example)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm font-semibold mb-1 truncate">
                          {example.title}
                        </CardTitle>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {example.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay(example.id, example.audio_url);
                        }}
                      >
                        {playingId === example.id ? (
                          <Pause className="h-3 w-3" />
                        ) : (
                          <Play className="h-3 w-3 ml-0.5" />
                        )}
                      </Button>
                      <div className="flex-1 min-w-0">
                        <Badge variant="outline" className="text-xs">
                          {example.genre}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyPrompt(example);
                        }}
                      >
                        {copiedId === example.id ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>{example.stats.approval_rate}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{example.stats.total_uses}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{example.stats.avg_rating}</span>
                      </div>
                    </div>

                    <audio
                      ref={(el) => {
                        if (el) audioRefs.current[example.id] = el;
                      }}
                      src={example.audio_url}
                      onEnded={() => setPlayingId(null)}
                    />
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div className="mt-3 pt-3 border-t text-xs text-gray-500">
            Showing {filteredExamples.length} of {soundLibraryExamples.length} examples
          </div>
        </div>
      )}

      {!isOpen && (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="writing-mode-vertical text-xs font-medium text-gray-600">
            Sound Library
          </div>
        </div>
      )}
    </div>
  );
}
