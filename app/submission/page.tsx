"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { usePrototypeStore } from "@/lib/store/prototype-store";
import { useSubmissionStore } from "@/lib/store/submission-store";
import { PromptReviewColumn } from "@/components/prompt-review-column";
import { MetadataExtractionColumn } from "@/components/metadata-extraction-column";
import { TagInput } from "@/components/tag-input";
import {
  extractMetadata,
  generateMasterPrompt,
} from "@/lib/extract-metadata";

export default function SubmissionPage() {
  const router = useRouter();
  const { getCurrentVersion } = usePrototypeStore();
  const { submitToLibrary } = useSubmissionStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [description, setDescription] = useState(
    "Melancholic neo-soul track with uplifting moments, perfect for reflective background music"
  );
  const [useCaseTags, setUseCaseTags] = useState<string[]>([
    "background music",
    "chill",
  ]);

  const currentVersion = getCurrentVersion();

  // Redirect if no version available
  useEffect(() => {
    if (!currentVersion) {
      router.push("/prompt-review");
    }
  }, [currentVersion, router]);

  if (!currentVersion) {
    return null;
  }

  // Extract metadata from current version
  const extractedMetadata = extractMetadata(currentVersion.promptData);
  const masterPrompt = generateMasterPrompt(currentVersion.promptData);

  const handleCancel = () => {
    router.push("/prompt-review");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Prepare submission data
    const submissionData = {
      versionNumber: currentVersion.versionNumber,
      promptData: currentVersion.promptData,
      masterPrompt,
      ...extractedMetadata,
      useCaseTags,
      description,
    };

    // Submit to store (logs to console for demo)
    submitToLibrary(submissionData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success state
    setShowSuccess(true);

    // Navigate back to home after 2 seconds
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Track submitted successfully!
          </h2>
          <p className="text-gray-600">Returning to prompt builder...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Back Link */}
        <Link
          href="/prompt-review"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Evaluation
        </Link>

        {/* Version Info Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Submitting Version {currentVersion.versionNumber} for Library
          </h1>
          <p className="text-gray-600 mt-2">
            Review your prompt and add searchable metadata
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {/* Left Column: Prompt Review (60%) */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Prompt Structure
              </h2>
              <PromptReviewColumn promptData={currentVersion.promptData} />
            </Card>
          </div>

          {/* Right Column: Metadata (40%) */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Searchable Metadata
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Auto-extracted from your prompt
              </p>
              <MetadataExtractionColumn metadata={extractedMetadata} />
            </Card>
          </div>
        </div>

        {/* Bottom Section: Additional Metadata */}
        <div className="space-y-6 mb-8">
          {/* Use Case Tags */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Add Use Case Tags
            </h3>
            <TagInput
              tags={useCaseTags}
              onChange={setUseCaseTags}
              placeholder="e.g., background music, workout, chill, study music"
            />
          </Card>

          {/* Description */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Description (Optional)
            </h3>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this track or how it should be used..."
              className="min-h-[120px] resize-none"
            />
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button
            onClick={handleCancel}
            variant="outline"
            size="lg"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            size="lg"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isSubmitting ? "Submitting..." : "Submit to Library"}
          </Button>
        </div>
      </div>
    </div>
  );
}
