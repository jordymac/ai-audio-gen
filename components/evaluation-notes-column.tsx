"use client";

import { PrototypePromptData, PrototypeEvaluationNotes } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface EvaluationNotesColumnProps {
  promptData: PrototypePromptData;
  notes: PrototypeEvaluationNotes;
  onNotesChange: (notes: PrototypeEvaluationNotes) => void;
}

export function EvaluationNotesColumn({
  promptData,
  notes,
  onNotesChange
}: EvaluationNotesColumnProps) {
  const updateGlobalNote = (value: string) => {
    onNotesChange({ ...notes, global: value });
  };

  const updateInstrumentNote = (instrumentId: string, value: string) => {
    onNotesChange({
      ...notes,
      instruments: { ...notes.instruments, [instrumentId]: value }
    });
  };

  const updateSectionNote = (sectionId: string, value: string) => {
    onNotesChange({
      ...notes,
      sections: { ...notes.sections, [sectionId]: value }
    });
  };

  return (
    <div className="space-y-4">
      {/* Global Notes */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Global Notes</h3>
        <Textarea
          value={notes.global}
          onChange={(e) => updateGlobalNote(e.target.value)}
          placeholder="Evaluation notes for global settings..."
          className="min-h-[60px] resize-none text-sm"
        />
      </Card>

      {/* Instrument Notes */}
      {promptData.instruments.map((instrument) => (
        <Card key={instrument.id} className="p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            {instrument.name} Notes
          </h3>
          <Textarea
            value={notes.instruments[instrument.id] || ''}
            onChange={(e) => updateInstrumentNote(instrument.id, e.target.value)}
            placeholder={`Evaluation notes for ${instrument.name}...`}
            className="min-h-[60px] resize-none text-sm"
          />
        </Card>
      ))}

      {/* Section Notes */}
      {promptData.sections.map((section) => (
        <Card key={section.id} className="p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            {section.type} Notes
          </h3>
          <Textarea
            value={notes.sections[section.id] || ''}
            onChange={(e) => updateSectionNote(section.id, e.target.value)}
            placeholder={`Evaluation notes for ${section.type}...`}
            className="min-h-[60px] resize-none text-sm"
          />
        </Card>
      ))}
    </div>
  );
}
