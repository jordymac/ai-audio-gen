import { PrototypePromptData } from "@/lib/types";

interface PromptReviewColumnProps {
  promptData: PrototypePromptData;
}

export function PromptReviewColumn({ promptData }: PromptReviewColumnProps) {
  // Helper function to highlight bracketed terms
  const highlightBracketedTerms = (text: string, isNegative: boolean = false) => {
    return text.split(/(\[[^\]]+\])/g).map((part, i) => {
      if (part.match(/\[([^\]]+)\]/)) {
        const term = part.match(/\[([^\]]+)\]/)?.[1];
        return (
          <span key={i} className={isNegative ? "bg-red-100 text-red-900 px-1 rounded" : "bg-purple-100 text-purple-900 px-1 rounded"}>
            [{term}]
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="space-y-6">
      {/* Global Settings */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2">Global Settings</h3>
        <div className="mb-2">
          <div className="text-xs font-semibold text-gray-600 mb-1">Positive:</div>
          <div className="text-sm text-gray-900 leading-relaxed">
            {highlightBracketedTerms(promptData.global)}
          </div>
        </div>
        {promptData.negativeGlobal && (
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">Negative:</div>
            <div className="text-sm text-gray-700 leading-relaxed">
              {highlightBracketedTerms(promptData.negativeGlobal, true)}
            </div>
          </div>
        )}
      </div>

      {/* Instruments */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3">Instruments</h3>
        <div className="space-y-4">
          {promptData.instruments.map((instrument) => (
            <div key={instrument.id}>
              <div className="text-xs font-semibold text-gray-600 mb-1">
                {instrument.name}:
              </div>
              <div className="mb-2">
                <div className="text-xs font-medium text-gray-500 mb-0.5">Positive:</div>
                <div className="text-sm text-gray-900 leading-relaxed">
                  {highlightBracketedTerms(instrument.description)}
                </div>
              </div>
              {instrument.negativeDescription && (
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-0.5">Negative:</div>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {highlightBracketedTerms(instrument.negativeDescription, true)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3">Sections</h3>
        <div className="space-y-4">
          {promptData.sections.map((section) => (
            <div key={section.id}>
              <div className="text-xs font-semibold text-gray-600 mb-1">
                {section.type}:
              </div>
              <div className="mb-2">
                <div className="text-xs font-medium text-gray-500 mb-0.5">Positive:</div>
                <div className="text-sm text-gray-900 leading-relaxed">
                  {highlightBracketedTerms(section.description)}
                </div>
              </div>
              {section.negativeDescription && (
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-0.5">Negative:</div>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {highlightBracketedTerms(section.negativeDescription, true)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
