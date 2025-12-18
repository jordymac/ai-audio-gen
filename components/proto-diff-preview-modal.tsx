"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PrototypeChange } from "@/lib/types";
import { Sparkles, X } from "lucide-react";

interface ProtoDiffPreviewModalProps {
  open: boolean;
  onClose: () => void;
  changes: PrototypeChange[];
  onGenerate: () => void;
}

export function ProtoDiffPreviewModal({
  open,
  onClose,
  changes,
  onGenerate
}: ProtoDiffPreviewModalProps) {
  const handleEditManually = () => {
    alert("Manual editing will be available in the full version.");
  };

  const handleGenerate = () => {
    onGenerate();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Prompt Preview - Creating v2
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Changes Summary */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">CHANGES DETECTED:</h3>
            <ul className="space-y-1.5">
              {changes.map((change, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-purple-600 mt-0.5">•</span>
                  <span>
                    {change.category === 'global' && 'Global: '}
                    {change.category === 'instrument' && change.targetName && `${change.targetName}: `}
                    {change.category === 'section' && change.targetName && `${change.targetName}: `}
                    {change.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Side-by-Side Comparison */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Side-by-Side Comparison:</h3>
            <div className="space-y-4">
              {changes.filter(c => c.oldValue && c.newValue).map((change, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Old Value */}
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-2">Old Prompt (v1)</div>
                      <div className="p-2 bg-red-50 border border-red-200 rounded text-sm">
                        <span className="line-through text-red-700">{change.oldValue}</span>
                      </div>
                    </div>

                    {/* New Value */}
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-2">New Prompt (v2)</div>
                      <div className="p-2 bg-green-50 border border-green-200 rounded text-sm">
                        <span className="text-green-700 font-medium">{change.newValue}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* New Items (no old value) */}
              {changes.filter(c => !c.oldValue).map((change, index) => (
                <Card key={`new-${index}`} className="p-4 bg-green-50 border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-green-700">NEW</span>
                    <span className="text-sm text-gray-700">{change.description}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleEditManually}
          >
            Edit Manually
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button
              onClick={handleGenerate}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              Generate v2
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
