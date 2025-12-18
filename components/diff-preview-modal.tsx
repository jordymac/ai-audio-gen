"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { InterpretationResponse, Change } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Check,
  X,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Edit3,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

interface DiffPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  interpretation: InterpretationResponse;
  onAcceptAll: () => void;
  onManualEdit: () => void;
}

export function DiffPreviewModal({
  open,
  onOpenChange,
  interpretation,
  onAcceptAll,
  onManualEdit,
}: DiffPreviewModalProps) {
  const [selectedChanges, setSelectedChanges] = useState<Set<number>>(
    new Set(interpretation.changes.map((_, i) => i))
  );

  const toggleChange = (index: number) => {
    const newSelected = new Set(selectedChanges);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedChanges(newSelected);
  };

  const handleAcceptSelected = () => {
    // In a real implementation, this would apply only selected changes
    onAcceptAll();
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600 bg-green-50";
    if (confidence >= 0.6) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return "High";
    if (confidence >= 0.6) return "Medium";
    return "Low";
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "global":
        return "bg-purple-100 text-purple-800";
      case "instrument":
        return "bg-blue-100 text-blue-800";
      case "section":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatValue = (value: any): string => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const selectedCount = selectedChanges.size;
  const totalChanges = interpretation.changes.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Interpreted Prompt Changes
          </DialogTitle>
          <DialogDescription>
            Review AI-interpreted changes based on your evaluation notes. Select which
            changes to apply.
          </DialogDescription>
        </DialogHeader>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 py-3 border-y">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {totalChanges}
            </div>
            <div className="text-xs text-gray-600">Changes Detected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(interpretation.overall_confidence * 100)}%
            </div>
            <div className="text-xs text-gray-600">Avg Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {interpretation.processing_time_ms}ms
            </div>
            <div className="text-xs text-gray-600">Processing Time</div>
          </div>
        </div>

        {/* Warnings */}
        {interpretation.warnings.length > 0 && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <div className="text-sm font-medium text-yellow-900">
                    Warnings
                  </div>
                  {interpretation.warnings.map((warning, i) => (
                    <div key={i} className="text-xs text-yellow-800">
                      {warning}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Changes List */}
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-3">
            {interpretation.changes.map((change, index) => {
              const isSelected = selectedChanges.has(index);

              return (
                <Card
                  key={index}
                  className={`transition-all ${
                    isSelected
                      ? "border-purple-300 bg-purple-50/30"
                      : "border-gray-200 opacity-60"
                  }`}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleChange(index)}
                        className={`mt-1 flex-shrink-0 h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-purple-600 border-purple-600"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3 text-white" />}
                      </button>

                      <div className="flex-1 space-y-2">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={getTierColor(change.tier)}>
                              {change.tier}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {change.field}
                            </Badge>
                            <Badge
                              className={`${getConfidenceColor(change.confidence)} text-xs`}
                            >
                              {getConfidenceLabel(change.confidence)}{" "}
                              {Math.round(change.confidence * 100)}%
                            </Badge>
                          </div>
                        </div>

                        {/* Reason */}
                        <p className="text-sm text-gray-700 font-medium">
                          {change.reason}
                        </p>

                        {/* Source Note */}
                        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border">
                          <span className="font-medium">From notes:</span> "
                          {change.source_note}"
                        </div>

                        {/* Value Change */}
                        <div className="flex items-start gap-2 text-sm">
                          <div className="flex-1 p-2 bg-red-50 border border-red-200 rounded">
                            <div className="text-xs font-medium text-red-700 mb-1">
                              Old Value
                            </div>
                            <div className="text-red-900 font-mono text-xs break-all">
                              {formatValue(change.old_value)}
                            </div>
                          </div>

                          <ArrowRight className="h-4 w-4 text-gray-400 mt-6 flex-shrink-0" />

                          <div className="flex-1 p-2 bg-green-50 border border-green-200 rounded">
                            <div className="text-xs font-medium text-green-700 mb-1">
                              New Value
                            </div>
                            <div className="text-green-900 font-mono text-xs break-all">
                              {formatValue(change.new_value)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <div className="flex-1 text-sm text-gray-600">
            {selectedCount} of {totalChanges} changes selected
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4 mr-1.5" />
              Cancel
            </Button>
            <Button variant="outline" onClick={onManualEdit}>
              <Edit3 className="h-4 w-4 mr-1.5" />
              Manual Edit Instead
            </Button>
            <Button
              onClick={handleAcceptSelected}
              disabled={selectedCount === 0}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Check className="h-4 w-4 mr-1.5" />
              Apply {selectedCount} Change{selectedCount !== 1 ? "s" : ""}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
