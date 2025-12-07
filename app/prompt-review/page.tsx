"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Sparkles, TrendingUp } from "lucide-react";
import { generatedPrompt } from "@/lib/mock-data";
import Link from "next/link";

export default function PromptReview() {
  const router = useRouter();
  const [briefData, setBriefData] = useState<any>(null);
  const [mainPrompt, setMainPrompt] = useState(generatedPrompt.main_prompt);
  const [negativePrompt, setNegativePrompt] = useState(generatedPrompt.negative_prompt);
  const [duration, setDuration] = useState(generatedPrompt.parameters.duration);
  const [variations, setVariations] = useState(generatedPrompt.parameters.variations);

  useEffect(() => {
    const stored = localStorage.getItem("briefData");
    if (stored) {
      setBriefData(JSON.parse(stored));
    }
  }, []);

  const handleGenerate = () => {
    const promptData = {
      mainPrompt,
      negativePrompt,
      duration,
      variations,
    };
    localStorage.setItem("promptData", JSON.stringify(promptData));
    router.push("/generation-progress");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Brief
        </Link>
        <h1 className="text-3xl font-bold mb-2">Review Generated Prompt</h1>
        <p className="text-gray-600">
          Review and refine the AI-generated prompt before creating your audio
        </p>
      </div>

      <div className="space-y-6">
        {briefData && (
          <Card className="bg-gray-50 border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Original Brief</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{briefData.brief}</p>
              {briefData.useCase && (
                <Badge variant="secondary" className="mt-2">
                  {briefData.useCase}
                </Badge>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Main Prompt
                </CardTitle>
                <CardDescription>
                  Describes what you want in the generated audio
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={mainPrompt}
              onChange={(e) => setMainPrompt(e.target.value)}
              className="min-h-[150px] resize-none"
              placeholder="Describe the audio you want to generate..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Negative Prompt</CardTitle>
            <CardDescription>
              Specify what to avoid in the generation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              className="min-h-[100px] resize-none"
              placeholder="Describe what to avoid..."
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Generation Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="duration" className="text-sm font-medium">
                  Duration (seconds)
                </label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min={30}
                  max={300}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="variations" className="text-sm font-medium">
                  Number of Variations
                </label>
                <Input
                  id="variations"
                  type="number"
                  value={variations}
                  onChange={(e) => setVariations(Number(e.target.value))}
                  min={1}
                  max={5}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Model</label>
                <Input
                  value={generatedPrompt.parameters.model}
                  disabled
                  className="bg-gray-50"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Knowledge Used
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Prompt Version</p>
                <Badge variant="outline" className="font-mono">
                  {generatedPrompt.knowledge_used.prompt_version}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Genre Template</p>
                <div className="flex items-center gap-2">
                  <Badge>{generatedPrompt.knowledge_used.genre}</Badge>
                  <span className="text-sm text-green-600 font-medium">
                    {generatedPrompt.knowledge_used.success_rate}% success rate
                  </span>
                </div>
              </div>
              <Alert>
                <AlertDescription className="text-xs">
                  This prompt template has been optimized based on previous
                  successful generations in this genre.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/")}
            className="flex-1"
          >
            Back to Brief
          </Button>
          <Button
            size="lg"
            onClick={handleGenerate}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            Generate Audio ({variations} {variations === 1 ? "variation" : "variations"})
          </Button>
        </div>
      </div>
    </div>
  );
}
