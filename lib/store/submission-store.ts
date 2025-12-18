import { create } from "zustand";
import { PrototypePromptData } from "@/lib/types";
import { SubmissionMetadata } from "@/lib/extract-metadata";

interface SubmissionState {
  // Current submission data
  currentVersionNumber: number | null;
  currentPromptData: PrototypePromptData | null;

  // Last submitted data (for demo purposes)
  lastSubmitted: SubmissionMetadata | null;

  // Actions
  setCurrentVersion: (versionNumber: number, promptData: PrototypePromptData) => void;
  submitToLibrary: (metadata: SubmissionMetadata) => void;
  reset: () => void;
}

export const useSubmissionStore = create<SubmissionState>((set) => ({
  currentVersionNumber: null,
  currentPromptData: null,
  lastSubmitted: null,

  setCurrentVersion: (versionNumber, promptData) => {
    set({
      currentVersionNumber: versionNumber,
      currentPromptData: promptData,
    });
  },

  submitToLibrary: (metadata) => {
    // In a real app, this would make an API call to save to database
    console.log("=== SUBMISSION DATA ===");
    console.log(JSON.stringify(metadata, null, 2));

    set({ lastSubmitted: metadata });
  },

  reset: () => {
    set({
      currentVersionNumber: null,
      currentPromptData: null,
    });
  },
}));
