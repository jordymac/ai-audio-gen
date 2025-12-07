"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, Clock } from "lucide-react";

type VariationStatus = "processing" | "queued" | "complete";

export default function GenerationProgress() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [variationStates, setVariationStates] = useState<Array<{ id: number; status: VariationStatus }>>([
    { id: 1, status: "processing" },
    { id: 2, status: "queued" },
    { id: 3, status: "queued" },
  ]);

  useEffect(() => {
    const duration = 5000;
    const interval = 50;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => router.push("/audio-review"), 500);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    const variationTimer1 = setTimeout(() => {
      setVariationStates([
        { id: 1, status: "complete" },
        { id: 2, status: "processing" },
        { id: 3, status: "queued" },
      ]);
    }, 1500);

    const variationTimer2 = setTimeout(() => {
      setVariationStates([
        { id: 1, status: "complete" },
        { id: 2, status: "complete" },
        { id: 3, status: "processing" },
      ]);
    }, 3000);

    const variationTimer3 = setTimeout(() => {
      setVariationStates([
        { id: 1, status: "complete" },
        { id: 2, status: "complete" },
        { id: 3, status: "complete" },
      ]);
    }, 4500);

    return () => {
      clearInterval(timer);
      clearTimeout(variationTimer1);
      clearTimeout(variationTimer2);
      clearTimeout(variationTimer3);
    };
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Generating Your Audio</h1>
        <p className="text-gray-600">
          This usually takes 30-60 seconds
        </p>
      </div>

      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Loader2 className="h-12 w-12 text-purple-600 animate-spin" />
          </div>
          <CardTitle className="text-xl">Processing Request</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Overall Progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Generating 3 variations
            </p>
            <div className="space-y-2">
              {variationStates.map((variation) => (
                <div
                  key={variation.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    {variation.status === "processing" && (
                      <Loader2 className="h-4 w-4 text-purple-600 animate-spin" />
                    )}
                    {variation.status === "complete" && (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    )}
                    {variation.status === "queued" && (
                      <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                    )}
                    <span className="font-medium text-sm">
                      Variation {variation.id}
                    </span>
                  </div>
                  <Badge
                    variant={
                      variation.status === "complete"
                        ? "default"
                        : variation.status === "processing"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      variation.status === "complete"
                        ? "bg-green-600"
                        : variation.status === "processing"
                        ? "bg-purple-600"
                        : ""
                    }
                  >
                    {variation.status === "complete"
                      ? "Complete"
                      : variation.status === "processing"
                      ? "Processing"
                      : "Queued"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-500">
              Estimated time remaining:{" "}
              <span className="font-medium text-gray-700">
                {Math.max(0, Math.round((100 - progress) / 20))} seconds
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
