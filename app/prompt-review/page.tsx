"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePrototypeStore, v1Notes } from "@/lib/store/prototype-store";
import { ProtoMasterPrompt } from "@/components/proto-master-prompt";
import { ProtoDiffPreviewModal } from "@/components/proto-diff-preview-modal";
import { PrototypeEvaluationNotes } from "@/lib/types";

export default function PrototypeEvaluation() {
  const router = useRouter();
  const {
    versions,
    currentVersionIndex,
    getCurrentVersion,
    canNavigatePrev,
    canNavigateNext,
    navigateToVersion,
    updateNotes,
    analyzeNotesAndPreview,
    setPreviewModalOpen,
    previewModalOpen,
    detectedChanges,
    generateV2
  } = usePrototypeStore();

  const [localNotes, setLocalNotes] = useState<PrototypeEvaluationNotes>({
    global: '',
    instruments: {},
    sections: {}
  });

  const currentVersion = getCurrentVersion();

  // Initialize with v1 notes on mount if viewing v1
  useEffect(() => {
    if (currentVersion && currentVersion.versionNumber === 1 && versions.length === 1) {
      // Pre-fill v1 with evaluation notes
      const notesWithDefaults = { ...v1Notes };
      setLocalNotes(notesWithDefaults);
      updateNotes(notesWithDefaults);
    }
  }, []);

  // Update local notes when version changes
  useEffect(() => {
    if (currentVersion) {
      setLocalNotes(currentVersion.evaluationNotes);
    }
  }, [currentVersionIndex, currentVersion]);

  const handleNotesChange = (notes: PrototypeEvaluationNotes) => {
    setLocalNotes(notes);
    updateNotes(notes);
  };

  const handleNavigatePrev = () => {
    if (canNavigatePrev()) {
      navigateToVersion(currentVersionIndex - 1);
    }
  };

  const handleNavigateNext = () => {
    if (canNavigateNext()) {
      navigateToVersion(currentVersionIndex + 1);
    }
  };

  const handleUpdatePrompt = () => {
    analyzeNotesAndPreview();
  };

  // Redirect if no version available
  useEffect(() => {
    if (!currentVersion) {
      router.push('/');
    }
  }, [currentVersion, router]);

  if (!currentVersion) {
    return null;
  }

  const hasNotes =
    localNotes.global.length > 0 ||
    Object.values(localNotes.instruments).some(note => note.length > 0) ||
    Object.values(localNotes.sections).some(note => note.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Prompt Builder
        </Link>

        {/* Version Navigation */}
        <div className="flex items-center justify-center gap-4 py-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNavigatePrev}
            disabled={!canNavigatePrev()}
            className="disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="text-xl font-bold text-gray-900">
            v{currentVersion.versionNumber}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleNavigateNext}
            disabled={!canNavigateNext()}
            className="disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Row-by-Row Layout: Prompt + Evaluation */}
        <div className="space-y-4 mb-6">
          {/* Global Settings Row */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Global Settings</h3>
              <div className="text-sm text-gray-900 leading-relaxed">
                {currentVersion.promptData.global.split(/(\[[^\]]+\])/g).map((part, i) => {
                  if (part.match(/\[([^\]]+)\]/)) {
                    const term = part.match(/\[([^\]]+)\]/)?.[1];
                    return (
                      <span key={i} className="bg-purple-100 text-purple-900 px-1 rounded">
                        [{term}]
                      </span>
                    );
                  }
                  return <span key={i}>{part}</span>;
                })}
              </div>
              {currentVersion.promptData.negativeGlobal && (
                <div className="mt-3 pt-3 border-t">
                  <h4 className="text-xs font-semibold text-gray-600 mb-1">Negative:</h4>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {currentVersion.promptData.negativeGlobal.split(/(\[[^\]]+\])/g).map((part, i) => {
                      if (part.match(/\[([^\]]+)\]/)) {
                        const term = part.match(/\[([^\]]+)\]/)?.[1];
                        return (
                          <span key={i} className="bg-red-100 text-red-900 px-1 rounded">
                            [{term}]
                          </span>
                        );
                      }
                      return <span key={i}>{part}</span>;
                    })}
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Global Evaluation</h3>
              <Textarea
                value={localNotes.global}
                onChange={(e) => handleNotesChange({ ...localNotes, global: e.target.value })}
                placeholder="Evaluation notes for global settings..."
                className="min-h-[80px] resize-none text-sm mb-3"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleUpdatePrompt}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Update Prompt
                </Button>
                <Button
                  onClick={handleUpdatePrompt}
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Generate
                </Button>
              </div>
            </Card>
          </div>

          {/* Instrument Rows */}
          {currentVersion.promptData.instruments.map((instrument) => (
            <div key={instrument.id} className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Instrument: {instrument.name}
                </h3>
                <div className="text-sm text-gray-900 leading-relaxed">
                  {instrument.description.split(/(\[[^\]]+\])/g).map((part, i) => {
                    if (part.match(/\[([^\]]+)\]/)) {
                      const term = part.match(/\[([^\]]+)\]/)?.[1];
                      return (
                        <span key={i} className="bg-purple-100 text-purple-900 px-1 rounded">
                          [{term}]
                        </span>
                      );
                    }
                    return <span key={i}>{part}</span>;
                  })}
                </div>
                {instrument.negativeDescription && (
                  <div className="mt-3 pt-3 border-t">
                    <h4 className="text-xs font-semibold text-gray-600 mb-1">Negative:</h4>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {instrument.negativeDescription.split(/(\[[^\]]+\])/g).map((part, i) => {
                        if (part.match(/\[([^\]]+)\]/)) {
                          const term = part.match(/\[([^\]]+)\]/)?.[1];
                          return (
                            <span key={i} className="bg-red-100 text-red-900 px-1 rounded">
                              [{term}]
                            </span>
                          );
                        }
                        return <span key={i}>{part}</span>;
                      })}
                    </div>
                  </div>
                )}
              </Card>

              <Card className="p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  {instrument.name} Evaluation
                </h3>
                <Textarea
                  value={localNotes.instruments[instrument.id] || ''}
                  onChange={(e) => handleNotesChange({
                    ...localNotes,
                    instruments: { ...localNotes.instruments, [instrument.id]: e.target.value }
                  })}
                  placeholder={`Evaluation notes for ${instrument.name}...`}
                  className="min-h-[80px] resize-none text-sm mb-3"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleUpdatePrompt}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Update Prompt
                  </Button>
                  <Button
                    onClick={handleUpdatePrompt}
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Generate
                  </Button>
                </div>
              </Card>
            </div>
          ))}

          {/* Section Rows */}
          {currentVersion.promptData.sections.map((section) => (
            <div key={section.id} className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Section: {section.type}
                </h3>
                <div className="text-sm text-gray-900 leading-relaxed">
                  {section.description.split(/(\[[^\]]+\])/g).map((part, i) => {
                    if (part.match(/\[([^\]]+)\]/)) {
                      const term = part.match(/\[([^\]]+)\]/)?.[1];
                      return (
                        <span key={i} className="bg-purple-100 text-purple-900 px-1 rounded">
                          [{term}]
                        </span>
                      );
                    }
                    return <span key={i}>{part}</span>;
                  })}
                </div>
                {section.negativeDescription && (
                  <div className="mt-3 pt-3 border-t">
                    <h4 className="text-xs font-semibold text-gray-600 mb-1">Negative:</h4>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {section.negativeDescription.split(/(\[[^\]]+\])/g).map((part, i) => {
                        if (part.match(/\[([^\]]+)\]/)) {
                          const term = part.match(/\[([^\]]+)\]/)?.[1];
                          return (
                            <span key={i} className="bg-red-100 text-red-900 px-1 rounded">
                              [{term}]
                            </span>
                          );
                        }
                        return <span key={i}>{part}</span>;
                      })}
                    </div>
                  </div>
                )}
              </Card>

              <Card className="p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  {section.type} Evaluation
                </h3>
                <Textarea
                  value={localNotes.sections[section.id] || ''}
                  onChange={(e) => handleNotesChange({
                    ...localNotes,
                    sections: { ...localNotes.sections, [section.id]: e.target.value }
                  })}
                  placeholder={`Evaluation notes for ${section.type}...`}
                  className="min-h-[80px] resize-none text-sm mb-3"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleUpdatePrompt}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Update Prompt
                  </Button>
                  <Button
                    onClick={handleUpdatePrompt}
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Generate
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Global Action Buttons */}
        <div className="flex gap-4 mb-8 pt-6 border-t">
          <Button
            onClick={handleUpdatePrompt}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Update All
          </Button>
          <Button
            onClick={handleUpdatePrompt}
            size="lg"
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Generate Full New Song
          </Button>
        </div>

        {/* Approve & Submit Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => router.push('/submission')}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8"
          >
            Approve & Submit to Library
          </Button>
        </div>

        {/* Master Prompt Preview */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Master Prompt Preview</h2>
          <ProtoMasterPrompt promptData={currentVersion.promptData} />
        </div>
      </div>

      {/* Diff Preview Modal */}
      <ProtoDiffPreviewModal
        open={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        changes={detectedChanges}
        onGenerate={generateV2}
      />
    </div>
  );
}
