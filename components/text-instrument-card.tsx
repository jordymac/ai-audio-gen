"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SmartTextArea } from "./smart-textarea";
import { HelperBadge } from "./helper-badge";
import { TextInstrument } from "@/lib/store/text-prompt-store";
import { X, AlertTriangle } from "lucide-react";

interface TextInstrumentCardProps {
  instrument: TextInstrument;
  onUpdate: (updates: Partial<TextInstrument>) => void;
  onRemove: () => void;
  showWarning?: boolean;
}

export function TextInstrumentCard({
  instrument,
  onUpdate,
  onRemove,
  showWarning = false,
}: TextInstrumentCardProps) {
  const insertAtCursor = (text: string) => {
    const currentValue = instrument.description;
    const newValue = currentValue + (currentValue ? " " : "") + text;
    onUpdate({ description: newValue });
  };

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50/50 to-cyan-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 space-y-1">
            <span className="text-xs font-medium text-gray-700">Instrument</span>
            <Input
              value={instrument.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="Instrument name (e.g., Bass, Drums, Keys)"
              className="font-semibold text-blue-900 bg-white/50"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50 mt-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {showWarning && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-xs text-yellow-800">
              Too many instruments may reduce generation quality. Consider combining
              or removing some.
            </AlertDescription>
          </Alert>
        )}

        {/* Text Area */}
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1.5 block">
            Describe This Instrument
          </label>
          <SmartTextArea
            value={instrument.description}
            onChange={(value) => onUpdate({ description: value })}
            placeholder="e.g., analog moog bass with distortion and heavy saturation, compressed with slight reverb..."
            minRows={3}
          />
        </div>

        {/* Negative Text Area */}
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1.5 block">
            Negative (Avoid for this instrument)
          </label>
          <SmartTextArea
            value={instrument.negativeDescription}
            onChange={(value) => onUpdate({ negativeDescription: value })}
            placeholder="e.g., no [distortion], avoid [staccato], exclude [reverb]..."
            minRows={2}
          />
        </div>

        {/* Helper Badges */}
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <span className="text-xs font-medium text-gray-600 mr-1">Add:</span>
          <HelperBadge
            label="Timbre"
            category="Instrumentation & Texture"
            onInsert={insertAtCursor}
          />
          <HelperBadge
            label="Effects"
            category="Production & Effects"
            onInsert={insertAtCursor}
          />
          <HelperBadge
            label="Vocal Tech"
            category="Vocal Techniques"
            onInsert={insertAtCursor}
          />
          <HelperBadge
            label="Expression"
            category="Dynamics & Expression"
            onInsert={insertAtCursor}
          />
        </div>
      </CardContent>
    </Card>
  );
}
