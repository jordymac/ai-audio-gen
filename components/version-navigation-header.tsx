"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Version } from "@/lib/types";
import { useVersionStore } from "@/lib/store/version-store";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Edit3,
  GitBranch,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface VersionNavigationHeaderProps {
  currentVersion: Version;
  projectTitle: string;
  onInterpretNotes: () => void;
  onManualEdit: () => void;
  onGenerateNew: () => void;
}

export function VersionNavigationHeader({
  currentVersion,
  projectTitle,
  onInterpretNotes,
  onManualEdit,
  onGenerateNew,
}: VersionNavigationHeaderProps) {
  const { versions, navigateToVersion, current_version_id } = useVersionStore();
  const [showVersionTree, setShowVersionTree] = useState(false);

  // Find siblings and children
  const currentIndex = versions.findIndex((v) => v.id === current_version_id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < versions.length - 1;

  const goToPrevious = () => {
    if (hasPrevious) {
      navigateToVersion(versions[currentIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (hasNext) {
      navigateToVersion(versions[currentIndex + 1].id);
    }
  };

  // Build version tree structure
  const versionTree = versions.map((v) => {
    const parent = versions.find((pv) => pv.id === v.parent_version_id);
    const children = versions.filter((cv) => cv.parent_version_id === v.id);
    return {
      version: v,
      parent,
      children,
      depth: parent ? 1 : 0, // Simplified depth calculation
    };
  });

  const hasNotes =
    currentVersion.evaluation_notes.global.length > 0 ||
    currentVersion.evaluation_notes.overall_audio.length > 0 ||
    Object.keys(currentVersion.evaluation_notes.instruments).length > 0 ||
    Object.keys(currentVersion.evaluation_notes.sections).length > 0;

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-start justify-between">
          {/* Left: Project Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{projectTitle}</h1>
              <Badge variant="outline" className="text-sm">
                v{currentVersion.version_number}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500">Created:</span>
                <span className="font-medium">
                  {new Date(currentVersion.created_at).toLocaleDateString()}
                </span>
              </div>
              {currentVersion.parent_version_id && (
                <div className="flex items-center gap-1.5">
                  <GitBranch className="h-3.5 w-3.5 text-purple-600" />
                  <span className="text-gray-500">Branched from v{versions.find((v) => v.id === currentVersion.parent_version_id)?.version_number}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowVersionTree(!showVersionTree)}
            >
              <GitBranch className="h-4 w-4 mr-1.5" />
              Version Tree
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onInterpretNotes}
              disabled={!hasNotes}
            >
              <Sparkles className="h-4 w-4 mr-1.5" />
              Interpret Notes
            </Button>
            <Button variant="outline" size="sm" onClick={onManualEdit}>
              <Edit3 className="h-4 w-4 mr-1.5" />
              Manual Edit
            </Button>
            <Button
              size="sm"
              onClick={onGenerateNew}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Zap className="h-4 w-4 mr-1.5" />
              Generate New Version
            </Button>
          </div>
        </div>

        {/* Version Navigation */}
        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrevious}
            disabled={!hasPrevious}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous Version
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Version {currentIndex + 1} of {versions.length}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={goToNext}
            disabled={!hasNext}
          >
            Next Version
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Interpret Notes Hint */}
        {hasNotes && (
          <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-purple-900">
              <span className="font-medium">Ready to interpret:</span> You've added
              evaluation notes. Click "Interpret Notes" to see AI-suggested prompt
              changes.
            </div>
          </div>
        )}
      </Card>

      {/* Version Tree Dropdown */}
      {showVersionTree && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Version History</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVersionTree(false)}
            >
              Close
            </Button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {versionTree.map((item) => (
              <button
                key={item.version.id}
                onClick={() => {
                  navigateToVersion(item.version.id);
                  setShowVersionTree(false);
                }}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  item.version.id === current_version_id
                    ? "border-purple-300 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                style={{ marginLeft: `${item.depth * 24}px` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.depth > 0 && (
                      <GitBranch className="h-3.5 w-3.5 text-gray-400" />
                    )}
                    <span className="font-medium text-sm">
                      Version {item.version.version_number}
                    </span>
                    {item.version.id === current_version_id && (
                      <Badge variant="secondary" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        item.version.generation_status === "complete"
                          ? "default"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {item.version.generation_status}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(item.version.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {item.children.length > 0 && (
                  <div className="mt-1.5 text-xs text-gray-500">
                    {item.children.length} child version
                    {item.children.length > 1 ? "s" : ""}
                  </div>
                )}
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
