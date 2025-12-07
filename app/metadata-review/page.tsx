"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X, Plus, Play, Pause, CheckCircle2 } from "lucide-react";
import { metadata as mockMetadata, audioVariations } from "@/lib/mock-data";
import Link from "next/link";

export default function MetadataReview() {
  const router = useRouter();
  const [title, setTitle] = useState(mockMetadata.title);
  const [tags, setTags] = useState(mockMetadata.tags);
  const [newTag, setNewTag] = useState("");
  const [genre, setGenre] = useState(mockMetadata.genre);
  const [mood, setMood] = useState(mockMetadata.mood);
  const [newMood, setNewMood] = useState("");
  const [instruments, setInstruments] = useState(mockMetadata.instruments.join(", "));
  const [useCases, setUseCases] = useState(mockMetadata.use_cases);
  const [newUseCase, setNewUseCase] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedVariation, setSelectedVariation] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("selectedVariationId");
    if (storedId) {
      setSelectedVariation(parseInt(storedId));
    }
  }, []);

  const selectedAudio = audioVariations.find((v) => v.id === selectedVariation);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleAddMood = () => {
    if (newMood.trim() && !mood.includes(newMood.trim())) {
      setMood([...mood, newMood.trim()]);
      setNewMood("");
    }
  };

  const handleRemoveMood = (m: string) => {
    setMood(mood.filter((item) => item !== m));
  };

  const handleAddUseCase = () => {
    if (newUseCase.trim() && !useCases.includes(newUseCase.trim())) {
      setUseCases([...useCases, newUseCase.trim()]);
      setNewUseCase("");
    }
  };

  const handleRemoveUseCase = (uc: string) => {
    setUseCases(useCases.filter((item) => item !== uc));
  };

  const handleApprove = () => {
    const metadataData = {
      title,
      tags,
      genre,
      mood,
      instruments: instruments.split(",").map((i) => i.trim()),
      use_cases: useCases,
      notes,
    };
    localStorage.setItem("assetMetadata", JSON.stringify(metadataData));
    router.push("/delivery");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <Link
          href="/audio-review"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Audio Review
        </Link>
        <h1 className="text-3xl font-bold mb-2">Review Metadata</h1>
        <p className="text-gray-600">
          Verify and refine the auto-generated metadata for your audio asset
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Selected Track</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {selectedVariation}
                </div>
                <div className="text-sm text-gray-600">
                  Variation {selectedVariation}
                </div>
              </div>
            </div>
            {selectedAudio && (
              <div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-10 w-10 rounded-full"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4 ml-0.5" />
                    )}
                  </Button>
                  <div className="flex-1">
                    <p className="text-xs font-medium">Preview</p>
                    <p className="text-xs text-gray-500">
                      {selectedAudio.duration}s
                    </p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">Match Score</div>
                    <div className="font-medium">
                      {selectedAudio.ai_evaluation.match_score}%
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">Loudness</div>
                    <div className="font-medium">
                      {selectedAudio.technical_checks.loudness_lufs} LUFS
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Asset title..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="pl-3 pr-1 py-1"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    placeholder="Add tag..."
                    className="flex-1"
                  />
                  <Button onClick={handleAddTag} variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="genre" className="text-sm font-medium">
                    Genre
                  </label>
                  <Input
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="instruments" className="text-sm font-medium">
                    Instruments
                  </label>
                  <Input
                    id="instruments"
                    value={instruments}
                    onChange={(e) => setInstruments(e.target.value)}
                    placeholder="Comma-separated list..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mood</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {mood.map((m) => (
                  <Badge key={m} variant="secondary" className="pl-3 pr-1 py-1">
                    {m}
                    <button
                      onClick={() => handleRemoveMood(m)}
                      className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newMood}
                  onChange={(e) => setNewMood(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddMood()}
                  placeholder="Add mood..."
                  className="flex-1"
                />
                <Button onClick={handleAddMood} variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {useCases.map((uc) => (
                  <li key={uc} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{uc}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleRemoveUseCase(uc)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <Input
                  value={newUseCase}
                  onChange={(e) => setNewUseCase(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddUseCase()}
                  placeholder="Add use case..."
                  className="flex-1"
                />
                <Button onClick={handleAddUseCase} variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions or context for the delivery..."
                className="min-h-[100px] resize-none"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.push("/audio-review")}
          className="flex-1"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          size="lg"
          onClick={handleApprove}
          className="flex-1 bg-purple-600 hover:bg-purple-700"
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Approve & Deliver
        </Button>
      </div>
    </div>
  );
}
