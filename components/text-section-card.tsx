"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SmartTextArea } from "./smart-textarea";
import { HelperBadge } from "./helper-badge";
import { TextSection } from "@/lib/store/text-prompt-store";
import { X } from "lucide-react";

const SECTION_TYPES = [
  "Intro",
  "Verse",
  "Pre-Chorus",
  "Chorus",
  "Bridge",
  "Outro",
  "Break",
  "Drop",
  "Build",
  "Breakdown",
];

interface TextSectionCardProps {
  section: TextSection;
  onUpdate: (updates: Partial<TextSection>) => void;
  onRemove: () => void;
}

export function TextSectionCard({
  section,
  onUpdate,
  onRemove,
}: TextSectionCardProps) {
  const insertAtCursor = (text: string) => {
    const currentValue = section.description;
    const newValue = currentValue + (currentValue ? " " : "") + text;
    onUpdate({ description: newValue });
  };

  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50/50 to-emerald-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label className="text-xs font-medium text-gray-700 mb-1.5 block">
              Section Type
            </label>
            <Select
              value={section.type}
              onValueChange={(value) => onUpdate({ type: value })}
            >
              <SelectTrigger className="h-9 font-semibold text-green-900 bg-white/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SECTION_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50 mt-5"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Text Area */}
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1.5 block">
            Describe What Happens in This Section
          </label>
          <SmartTextArea
            value={section.description}
            onChange={(value) => onUpdate({ description: value })}
            placeholder="e.g., vocals and keys only, rubato feel, intimate female vocal, melancholic delivery..."
            minRows={3}
          />
        </div>

        {/* Negative Text Area */}
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1.5 block">
            Negative (Exclude from this section)
          </label>
          <SmartTextArea
            value={section.negativeDescription}
            onChange={(value) => onUpdate({ negativeDescription: value })}
            placeholder="e.g., no [drums], exclude [bass], avoid [loud] dynamics..."
            minRows={2}
          />
        </div>

        {/* Helper Badges */}
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <span className="text-xs font-medium text-gray-600 mr-1">Add:</span>
          <HelperBadge
            label="Dynamics"
            category="Dynamics & Expression"
            onInsert={insertAtCursor}
          />
          <HelperBadge
            label="Performance"
            category="Tempo & Rhythm"
            onInsert={insertAtCursor}
          />
          <HelperBadge
            label="Harmony"
            category="Melody & Harmony"
            onInsert={insertAtCursor}
          />
        </div>
      </CardContent>
    </Card>
  );
}
