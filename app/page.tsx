"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCaseOptions } from "@/lib/mock-data";

export default function BriefIntake() {
  const router = useRouter();
  const [brief, setBrief] = useState("");
  const [useCase, setUseCase] = useState("");
  const [referenceLinks, setReferenceLinks] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const briefData = {
      brief,
      useCase,
      referenceLinks: referenceLinks.split("\n").filter((link) => link.trim()),
    };
    localStorage.setItem("briefData", JSON.stringify(briefData));
    router.push("/prompt-review");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">New Audio Request</h1>
        <p className="text-gray-600">
          Describe what you need and we'll generate the perfect audio track
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Creative Brief</CardTitle>
            <CardDescription>
              Tell us about your project and audio requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="brief" className="text-sm font-medium">
                Brief Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="brief"
                placeholder="e.g., Need Japanese city pop track for lifestyle brand video, 2 minutes, upbeat nostalgic vibe, smooth and sophisticated..."
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="min-h-[200px] resize-none"
                required
              />
              <p className="text-xs text-gray-500">
                Be as specific as possible about mood, style, instrumentation, and intended use
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="use-case" className="text-sm font-medium">
                Use Case (Optional)
              </label>
              <Select value={useCase} onValueChange={setUseCase}>
                <SelectTrigger id="use-case">
                  <SelectValue placeholder="Select use case" />
                </SelectTrigger>
                <SelectContent>
                  {useCaseOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="reference-links" className="text-sm font-medium">
                Reference Links (Optional)
              </label>
              <Textarea
                id="reference-links"
                placeholder="Paste reference URLs (one per line)"
                value={referenceLinks}
                onChange={(e) => setReferenceLinks(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <p className="text-xs text-gray-500">
                Links to tracks with similar style or vibe
              </p>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
                disabled={!brief.trim()}
              >
                Continue to Prompt Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
