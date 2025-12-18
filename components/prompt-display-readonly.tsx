"use client";

import { PrototypePromptData } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { extractBracketedTerms } from "@/lib/term-detection";

interface PromptDisplayReadonlyProps {
  promptData: PrototypePromptData;
}

// Component to highlight [bracketed] terms
function HighlightedText({ text }: { text: string }) {
  const parts = [];
  let lastIndex = 0;
  const regex = /\[([^\]]+)\]/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex, match.index)}
        </span>
      );
    }

    // Add the highlighted term
    parts.push(
      <span
        key={`term-${match.index}`}
        className="bg-purple-100 text-purple-900 px-1 rounded"
      >
        [{match[1]}]
      </span>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(<span key={`text-${lastIndex}`}>{text.substring(lastIndex)}</span>);
  }

  return <>{parts}</>;
}

export function PromptDisplayReadonly({ promptData }: PromptDisplayReadonlyProps) {
  return (
    <div className="space-y-4">
      {/* Global Settings */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Global Settings</h3>
        <div className="text-sm text-gray-900 leading-relaxed">
          <HighlightedText text={promptData.global} />
        </div>
      </Card>

      {/* Instruments */}
      {promptData.instruments.map((instrument) => (
        <Card key={instrument.id} className="p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Instrument: {instrument.name}
          </h3>
          <div className="text-sm text-gray-900 leading-relaxed">
            <HighlightedText text={instrument.description} />
          </div>
        </Card>
      ))}

      {/* Sections */}
      {promptData.sections.map((section) => (
        <Card key={section.id} className="p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Section: {section.type}
          </h3>
          <div className="text-sm text-gray-900 leading-relaxed">
            <HighlightedText text={section.description} />
          </div>
        </Card>
      ))}
    </div>
  );
}
