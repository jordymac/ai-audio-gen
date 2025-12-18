"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThreeTierPrompt } from "@/lib/types";
import { compileToMasterPrompt } from "@/lib/compile-prompt";
import { FileText, Sparkles } from "lucide-react";

interface MasterPromptPreviewProps {
  oldPrompt: ThreeTierPrompt;
  newPrompt?: ThreeTierPrompt;
}

export function MasterPromptPreview({ oldPrompt, newPrompt }: MasterPromptPreviewProps) {
  const originalMasterPrompt = compileToMasterPrompt(oldPrompt);
  const newMasterPrompt = newPrompt ? compileToMasterPrompt(newPrompt) : null;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-bold text-gray-900">Master Prompt Preview</h3>
        <Badge variant="outline" className="ml-auto">
          {newMasterPrompt ? 'Before & After Comparison' : 'Current Version'}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Original Prompt from Builder */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 pb-2 border-b">
            <h4 className="text-sm font-semibold text-gray-700">
              Original Prompt from Builder
            </h4>
            <Badge variant="secondary" className="text-xs">
              Before
            </Badge>
          </div>
          <ScrollArea className="h-[600px] rounded-md border bg-gray-50 p-4">
            <pre className="text-xs font-mono text-gray-800 whitespace-pre-wrap">
              {originalMasterPrompt}
            </pre>
          </ScrollArea>
        </div>

        {/* New Prompt Preview from Eval Notes */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 pb-2 border-b">
            <h4 className="text-sm font-semibold text-gray-700">
              New Prompt Preview from Eval Notes
            </h4>
            <Badge
              variant={newMasterPrompt ? "default" : "outline"}
              className={newMasterPrompt ? "text-xs bg-purple-600" : "text-xs"}
            >
              {newMasterPrompt ? 'After' : 'No changes yet'}
            </Badge>
          </div>
          <ScrollArea className="h-[600px] rounded-md border bg-purple-50 p-4">
            {newMasterPrompt ? (
              <pre className="text-xs font-mono text-gray-800 whitespace-pre-wrap">
                {newMasterPrompt}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500 space-y-2">
                  <Sparkles className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="text-sm">Click "Interpret Notes" to see changes</p>
                  <p className="text-xs">Your evaluation notes will be applied here</p>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Info Footer */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-xs text-gray-600">
          {newMasterPrompt
            ? 'This comparison shows how your evaluation notes will update the master prompt sent to the audio generation API.'
            : 'Add evaluation notes above, then click "Interpret Notes" to see the proposed changes here.'}
        </p>
      </div>
    </Card>
  );
}
