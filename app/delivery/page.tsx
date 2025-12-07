"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Download,
  FileText,
  Clock,
  RefreshCw,
  Plus,
} from "lucide-react";

export default function Delivery() {
  const router = useRouter();
  const [metadata, setMetadata] = useState<any>(null);
  const [startTime] = useState(new Date().getTime());
  const [turnaroundTime, setTurnaroundTime] = useState("18 minutes");

  useEffect(() => {
    const stored = localStorage.getItem("assetMetadata");
    if (stored) {
      setMetadata(JSON.parse(stored));
    }

    // Calculate turnaround time (simulated)
    const elapsed = Math.floor((new Date().getTime() - startTime) / 60000);
    setTurnaroundTime(`${Math.max(1, elapsed)} minutes`);
  }, [startTime]);

  const handleCreateSimilar = () => {
    const briefData = localStorage.getItem("briefData");
    router.push("/?similar=true");
  };

  const handleNewRequest = () => {
    // Clear all stored data
    localStorage.removeItem("briefData");
    localStorage.removeItem("promptData");
    localStorage.removeItem("selectedVariationId");
    localStorage.removeItem("assetMetadata");
    localStorage.removeItem("rejectionFeedback");
    router.push("/");
  };

  const handleDownloadMetadata = () => {
    if (!metadata) return;
    const blob = new Blob([JSON.stringify(metadata, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${metadata.title || "metadata"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-green-600">
          Asset Ready for Delivery!
        </h1>
        <p className="text-gray-600">
          Your audio has been generated, approved, and is ready to use
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Asset Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {metadata && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Title</p>
                <p className="text-lg font-semibold">{metadata.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Genre</p>
                  <Badge>{metadata.genre}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Mood</p>
                  <div className="flex flex-wrap gap-1">
                    {metadata.mood?.map((m: string) => (
                      <Badge key={m} variant="secondary">
                        {m}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {metadata.tags?.map((tag: string) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Turnaround Time</p>
                <p className="text-lg font-semibold">{turnaroundTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">First-Pass Approval</p>
                <p className="text-lg font-semibold">✓ Yes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Asset ID</p>
                <p className="text-lg font-mono font-semibold">
                  #{Math.floor(Math.random() * 10000)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Download Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            size="lg"
            onClick={() => {
              // Simulated download
              alert("Audio file would be downloaded in a real application");
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Audio File (MP3)
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            size="lg"
            onClick={handleDownloadMetadata}
            disabled={!metadata}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Metadata (JSON)
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            size="lg"
            onClick={() => {
              alert("Generation report would be opened in a real application");
            }}
          >
            <FileText className="h-4 w-4 mr-2" />
            View Generation Report
          </Button>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={handleCreateSimilar}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Create Similar
        </Button>
        <Button
          size="lg"
          className="flex-1 bg-purple-600 hover:bg-purple-700"
          onClick={handleNewRequest}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>
    </div>
  );
}
