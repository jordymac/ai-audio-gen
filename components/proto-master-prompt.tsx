"use client";

import { PrototypePromptData } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface ProtoMasterPromptProps {
  promptData: PrototypePromptData;
}

export function ProtoMasterPrompt({ promptData }: ProtoMasterPromptProps) {
  const generateMasterPrompt = () => {
    let prompt = `GLOBAL:\nPositive: ${promptData.global}\n`;
    if (promptData.negativeGlobal) {
      prompt += `Negative: ${promptData.negativeGlobal}\n`;
    }
    prompt += '\n';

    if (promptData.instruments.length > 0) {
      prompt += `INSTRUMENTS:\n`;
      promptData.instruments.forEach((inst) => {
        prompt += `${inst.name}:\n  Positive: ${inst.description}\n`;
        if (inst.negativeDescription) {
          prompt += `  Negative: ${inst.negativeDescription}\n`;
        }
      });
      prompt += '\n';
    }

    if (promptData.sections.length > 0) {
      prompt += `SECTIONS:\n`;
      promptData.sections.forEach((section) => {
        prompt += `${section.type}:\n  Positive: ${section.description}\n`;
        if (section.negativeDescription) {
          prompt += `  Negative: ${section.negativeDescription}\n`;
        }
      });
    }

    return prompt;
  };

  return (
    <Card className="p-6 bg-gray-900">
      <pre className="text-gray-100 text-sm font-mono whitespace-pre-wrap leading-relaxed">
        {generateMasterPrompt()}
      </pre>
    </Card>
  );
}
