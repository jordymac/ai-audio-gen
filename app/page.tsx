"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles, Plus, Eye, Lightbulb } from "lucide-react";
import { GlossarySidebar } from "@/components/glossary-sidebar";
import { PromptLibrarySidebar } from "@/components/prompt-library-sidebar";
import { TextGlobalSettings } from "@/components/text-global-settings";
import { TextInstrumentCard } from "@/components/text-instrument-card";
import { TextSectionCard } from "@/components/text-section-card";
import { SavedPrompt, PrototypePromptData, PrototypeEvaluationNotes } from "@/lib/types";
import { useTextPromptStore } from "@/lib/store/text-prompt-store";
import { usePrototypeStore, v1PromptData } from "@/lib/store/prototype-store";
import { useState, useEffect } from "react";

export default function TextFirstPromptBuilder() {
  const router = useRouter();
  const {
    prompt,
    addInstrument,
    updateInstrument,
    removeInstrument,
    addSection,
    updateSection,
    removeSection,
    getMasterPrompt,
    setGlobal,
    setNegativeGlobal,
    reset,
  } = useTextPromptStore();

  const { initializeV1 } = usePrototypeStore();

  const [showPreview, setShowPreview] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<SavedPrompt | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Pre-fill with v1 data on mount
  useEffect(() => {
    if (!isInitialized) {
      // Reset first
      reset();

      // Set global
      setGlobal(v1PromptData.global);
      setNegativeGlobal(v1PromptData.negativeGlobal || '');

      // Add instruments
      v1PromptData.instruments.forEach((inst) => {
        const id = addInstrument();
        updateInstrument(id, {
          name: inst.name,
          description: inst.description,
          negativeDescription: inst.negativeDescription || ''
        });
      });

      // Add sections
      v1PromptData.sections.forEach((sec) => {
        const id = addSection();
        updateSection(id, {
          type: sec.type,
          description: sec.description,
          negativeDescription: sec.negativeDescription || ''
        });
      });

      setIsInitialized(true);
    }
  }, [isInitialized, reset, setGlobal, setNegativeGlobal, addInstrument, updateInstrument, addSection, updateSection]);

  const handleSelectPrompt = (savedPrompt: SavedPrompt) => {
    setSelectedPrompt(savedPrompt);
    setTimeout(() => setSelectedPrompt(null), 3000);
  };

  const handleGenerate = async () => {
    // Convert current prompt to prototype format
    const prototypeData: PrototypePromptData = {
      global: prompt.global,
      negativeGlobal: prompt.negativeGlobal,
      instruments: prompt.instruments.map(inst => ({
        id: inst.id,
        name: inst.name,
        description: inst.description,
        negativeDescription: inst.negativeDescription
      })),
      sections: prompt.sections.map(sec => ({
        id: sec.id,
        type: sec.type,
        description: sec.description,
        negativeDescription: sec.negativeDescription
      }))
    };

    // Initialize notes (could be empty or pre-filled for prototype)
    const notes: PrototypeEvaluationNotes = {
      global: '',
      instruments: {},
      sections: {}
    };

    // Initialize the prototype store with v1
    initializeV1(prototypeData, notes);

    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Navigate to evaluation page
    router.push("/prompt-review");
  };

  const isValid =
    prompt.global.length > 0 &&
    prompt.instruments.length > 0 &&
    prompt.sections.length > 0;

  const masterPrompt = getMasterPrompt();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <PromptLibrarySidebar onSelectPrompt={handleSelectPrompt} />

      <div className="flex-1 px-6 py-12 overflow-auto min-w-0">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="h-8 w-8 text-purple-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Audio Generation
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Type naturally and let AI detect musical terms automatically
            </p>
          </div>

          {selectedPrompt && (
            <Alert className="mb-6 border-indigo-200 bg-indigo-50/50">
              <Lightbulb className="h-4 w-4 text-indigo-600" />
              <AlertDescription>
                Applied "{selectedPrompt.name}" template to {selectedPrompt.category} settings.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            {/* Tier 1: Global Settings */}
            <TextGlobalSettings />

            {/* Tier 2: Instruments */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Instruments
                  </h2>
                  <p className="text-sm text-gray-600">
                    Add instruments and describe their sound characteristics
                  </p>
                </div>
                <Button
                  onClick={addInstrument}
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Instrument
                </Button>
              </div>

              {prompt.instruments.length === 0 && (
                <Alert>
                  <AlertDescription>
                    Click "Add Instrument" to start building your instrument palette.
                    Each instrument can have its own unique timbre, effects, and characteristics.
                  </AlertDescription>
                </Alert>
              )}

              {prompt.instruments.map((instrument) => (
                <TextInstrumentCard
                  key={instrument.id}
                  instrument={instrument}
                  onUpdate={(updates) => updateInstrument(instrument.id, updates)}
                  onRemove={() => removeInstrument(instrument.id)}
                  showWarning={prompt.instruments.length > 8}
                />
              ))}
            </div>

            {/* Tier 3: Sections */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Sections
                  </h2>
                  <p className="text-sm text-gray-600">
                    Define how each part of your track should sound
                  </p>
                </div>
                <Button
                  onClick={addSection}
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Section
                </Button>
              </div>

              {prompt.sections.length === 0 && (
                <Alert>
                  <AlertDescription>
                    Click "Add Section" to define the structure of your track.
                    Describe what happens in each section (Intro, Verse, Chorus, etc.).
                  </AlertDescription>
                </Alert>
              )}

              {prompt.sections.map((section) => (
                <TextSectionCard
                  key={section.id}
                  section={section}
                  onUpdate={(updates) => updateSection(section.id, updates)}
                  onRemove={() => removeSection(section.id)}
                />
              ))}
            </div>

            {/* Preview Section */}
            {isValid && (
              <div className="pt-6 border-t">
                <Button
                  onClick={() => setShowPreview(!showPreview)}
                  variant="outline"
                  className="w-full mb-4"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {showPreview ? "Hide" : "Show"} Master Prompt Preview
                </Button>

                {showPreview && (
                  <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm whitespace-pre-wrap">
                    {masterPrompt}
                  </div>
                )}
              </div>
            )}

            {/* Generate Button */}
            <div className="pt-6">
              <Button
                onClick={handleGenerate}
                disabled={!isValid}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-6 shadow-lg"
                size="lg"
              >
                {!isValid && (
                  <span className="text-sm font-normal mr-2">
                    (Complete all tiers to continue)
                  </span>
                )}
                Generate Audio →
              </Button>
              {!isValid && (
                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  <p className="font-medium">Required to continue:</p>
                  <ul className="list-disc list-inside space-y-0.5 ml-2">
                    {prompt.global.length === 0 && (
                      <li>Add a description in Global Settings</li>
                    )}
                    {prompt.instruments.length === 0 && (
                      <li>Add at least one instrument</li>
                    )}
                    {prompt.sections.length === 0 && (
                      <li>Add at least one section</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <GlossarySidebar />
    </div>
  );
}
