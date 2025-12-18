"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Copy,
  Check,
  Star,
  TrendingUp,
  Users,
  BookOpen,
} from "lucide-react";
import {
  allPromptExamples,
  getPromptsByCategory,
  searchPrompts,
} from "@/lib/prompt-library-data";
import { SavedPrompt, GlobalPromptData, InstrumentPromptData, SectionPromptData } from "@/lib/types";
import { usePromptStore } from "@/lib/store/prompt-store";

interface PromptLibrarySidebarProps {
  onSelectPrompt?: (prompt: SavedPrompt) => void;
}

export function PromptLibrarySidebar({ onSelectPrompt }: PromptLibrarySidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"global" | "instrument" | "section">("global");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const {
    updateGlobalSettings,
    addInstrument,
    updateInstrument,
    addSection,
    updateSection,
    prompt,
  } = usePromptStore();

  const filteredPrompts = searchQuery
    ? searchPrompts(searchQuery).filter((p) => p.category === activeCategory)
    : getPromptsByCategory(activeCategory);

  const handleApplyPrompt = (savedPrompt: SavedPrompt) => {
    if (savedPrompt.category === "global") {
      const data = savedPrompt.prompt_data as GlobalPromptData;
      updateGlobalSettings(data);
    } else if (savedPrompt.category === "instrument") {
      const data = savedPrompt.prompt_data as InstrumentPromptData;
      addInstrument();
      const newInstrument = prompt.instruments[prompt.instruments.length];
      if (newInstrument) {
        updateInstrument(newInstrument.id, {
          name: data.name,
          timbre: data.timbre,
          effects: data.effects,
          vocal_techniques: data.vocal_techniques,
        });
      }
    } else if (savedPrompt.category === "section") {
      const data = savedPrompt.prompt_data as SectionPromptData;
      addSection();
      const newSection = prompt.sections[prompt.sections.length];
      if (newSection) {
        updateSection(newSection.id, {
          type: data.type,
        });
      }
    }

    onSelectPrompt?.(savedPrompt);
  };

  const copyPromptDetails = (savedPrompt: SavedPrompt) => {
    const text = JSON.stringify(savedPrompt.prompt_data, null, 2);
    navigator.clipboard.writeText(text);
    setCopiedId(savedPrompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className={`bg-white border-r transition-all duration-300 flex-shrink-0 relative h-screen sticky top-0 ${
        isOpen ? "w-96" : "w-12"
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
        <div className="h-full flex flex-col overflow-hidden">
          <div className="p-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-indigo-900">Prompt Library</h2>
            </div>
            <p className="text-xs text-gray-600">
              Browse and apply pre-made prompts
            </p>
          </div>

          <div className="p-4 space-y-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <Tabs value={activeCategory} onValueChange={(v: any) => setActiveCategory(v)} className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="w-full grid grid-cols-3 mx-4 my-2">
              <TabsTrigger value="global" className="text-xs">Global</TabsTrigger>
              <TabsTrigger value="instrument" className="text-xs">Instrument</TabsTrigger>
              <TabsTrigger value="section" className="text-xs">Section</TabsTrigger>
            </TabsList>

            <TabsContent value={activeCategory} className="flex-1 overflow-y-auto px-4 pb-4 mt-0">
              <div className="space-y-3">
                {filteredPrompts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    No prompts found
                  </div>
                ) : (
                  filteredPrompts.map((savedPrompt) => (
                    <Card
                      key={savedPrompt.id}
                      className="hover:border-indigo-300 transition-colors cursor-pointer"
                      onClick={() => handleApplyPrompt(savedPrompt)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-sm font-semibold mb-1 truncate">
                              {savedPrompt.name}
                            </CardTitle>
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {savedPrompt.description}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {savedPrompt.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs px-2 py-0"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              <span>{savedPrompt.stats.approval_rate}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{savedPrompt.stats.total_uses}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{savedPrompt.stats.avg_rating}</span>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyPromptDetails(savedPrompt);
                            }}
                          >
                            {copiedId === savedPrompt.id ? (
                              <Check className="h-3 w-3 text-green-600" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="p-3 border-t text-xs text-gray-500 bg-gray-50">
            Showing {filteredPrompts.length} {activeCategory} prompts
          </div>
        </div>
      )}

      {!isOpen && (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="writing-mode-vertical text-xs font-medium text-gray-600">
            Prompt Library
          </div>
        </div>
      )}
    </div>
  );
}
