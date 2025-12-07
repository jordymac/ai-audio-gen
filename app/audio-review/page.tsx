"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  XCircle,
  Download,
  Play,
  Pause,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { audioVariations, sampleBrief, rejectionReasons } from "@/lib/mock-data";
import { AudioVariation } from "@/lib/types";

export default function AudioReview() {
  const router = useRouter();
  const [selectedVariation, setSelectedVariation] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [customReason, setCustomReason] = useState("");
  const [notes, setNotes] = useState("");
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement }>({});

  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
      });
    };
  }, []);

  const togglePlay = (id: number) => {
    const audio = audioRefs.current[id];
    if (!audio) return;

    if (playingId === id) {
      audio.pause();
      setPlayingId(null);
    } else {
      Object.values(audioRefs.current).forEach((a) => a.pause());
      audio.play();
      setPlayingId(id);
    }
  };

  const handleReasonToggle = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleReject = () => {
    const feedback = {
      reasons: selectedReasons,
      customReason: selectedReasons.includes("Other") ? customReason : undefined,
      notes,
    };
    localStorage.setItem("rejectionFeedback", JSON.stringify(feedback));
    router.push("/prompt-review");
  };

  const handleApprove = () => {
    if (selectedVariation === null) return;
    localStorage.setItem("selectedVariationId", selectedVariation.toString());
    router.push("/metadata-review");
  };

  const renderVariationCard = (variation: AudioVariation) => {
    const isSelected = selectedVariation === variation.id;
    const isPlaying = playingId === variation.id;

    return (
      <Card
        key={variation.id}
        className={`transition-all ${
          isSelected
            ? "ring-2 ring-purple-600 bg-purple-50/50"
            : "hover:border-gray-400"
        }`}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Variation {variation.id}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{variation.duration}s</Badge>
              <Badge
                className={
                  variation.ai_evaluation.match_score >= 85
                    ? "bg-green-600"
                    : variation.ai_evaluation.match_score >= 75
                    ? "bg-yellow-600"
                    : "bg-orange-600"
                }
              >
                {variation.ai_evaluation.match_score}% match
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Button
                variant="outline"
                size="icon"
                onClick={() => togglePlay(variation.id)}
                className="h-12 w-12 rounded-full"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 transition-all"
                    style={{ width: isPlaying ? "45%" : "0%" }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {variation.duration} seconds
                </p>
              </div>
              <audio
                ref={(el) => {
                  if (el) audioRefs.current[variation.id] = el;
                }}
                src={variation.audio_url}
                onEnded={() => setPlayingId(null)}
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                AI Evaluation
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Match Score:</span>
                  <span className="font-medium">
                    {variation.ai_evaluation.match_score}%
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Confidence:</span>
                  <span className="font-medium">
                    {variation.ai_evaluation.confidence}%
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Technical Checks</p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Clipping:</span>
                  <span
                    className={`flex items-center gap-1 ${
                      variation.technical_checks.clipping
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {variation.technical_checks.clipping ? (
                      <>
                        <XCircle className="h-4 w-4" />
                        Detected
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        None
                      </>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Loudness (LUFS):</span>
                  <span className="font-medium">
                    {variation.technical_checks.loudness_lufs}
                  </span>
                </div>
              </div>
              {variation.technical_checks.warnings.length > 0 && (
                <div className="mt-2 space-y-1">
                  {variation.technical_checks.warnings.map((warning, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-orange-600 bg-orange-50 p-2 rounded"
                    >
                      <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span>{warning}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant={isSelected ? "default" : "outline"}
              className={`flex-1 ${
                isSelected ? "bg-purple-600 hover:bg-purple-700" : ""
              }`}
              onClick={() => setSelectedVariation(variation.id)}
            >
              {isSelected ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Selected
                </>
              ) : (
                "Select This"
              )}
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Review Audio Variations</h1>
        <p className="text-gray-600">
          Listen to each variation and select the best one for your project
        </p>
      </div>

      <Card className="mb-6 bg-gray-50 border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Original Brief</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">{sampleBrief.raw_text}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="grid" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {audioVariations.map(renderVariationCard)}
        </TabsContent>
        <TabsContent value="list" className="space-y-4">
          {audioVariations.map(renderVariationCard)}
        </TabsContent>
      </Tabs>

      {showFeedback && (
        <Card className="mb-6 border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle>Rejection Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                What's wrong with the variations? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {rejectionReasons.map((reason) => (
                  <Button
                    key={reason}
                    variant={
                      selectedReasons.includes(reason) ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleReasonToggle(reason)}
                    className={
                      selectedReasons.includes(reason)
                        ? "bg-orange-600 hover:bg-orange-700"
                        : ""
                    }
                  >
                    {reason}
                  </Button>
                ))}
              </div>
            </div>

            {selectedReasons.includes("Other") && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Please specify:
                </label>
                <Textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Describe what's wrong..."
                  className="min-h-[80px]"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Additional Notes (Optional)
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional context or instructions..."
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
          onClick={() => {
            if (showFeedback) {
              handleReject();
            } else {
              setShowFeedback(true);
            }
          }}
        >
          <XCircle className="h-4 w-4 mr-2" />
          {showFeedback ? "Submit Feedback & Regenerate" : "Reject & Regenerate"}
        </Button>
        <Button
          size="lg"
          className="flex-1 bg-green-600 hover:bg-green-700"
          onClick={handleApprove}
          disabled={selectedVariation === null}
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Approve Selected
        </Button>
      </div>
    </div>
  );
}
