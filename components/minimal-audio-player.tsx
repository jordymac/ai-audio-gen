"use client";

import { Version } from "@/lib/types";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface MinimalAudioPlayerProps {
  version: Version;
}

export function MinimalAudioPlayer({ version }: MinimalAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (version.generation_status !== "complete" || !version.audio_url) {
    return (
      <div className="sticky top-16 z-40 bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-center gap-2 text-sm">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>
              {version.generation_status === "generating"
                ? "Generating audio..."
                : "Waiting for audio generation..."}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-16 z-40 bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <audio ref={audioRef} src={version.audio_url} preload="metadata" />

        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="h-10 w-10 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-colors flex-shrink-0"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </button>

          {/* Waveform / Progress */}
          <div className="flex-1 flex items-center gap-3">
            {/* Time */}
            <span className="text-xs font-mono text-gray-300 w-12">
              {formatTime(currentTime)}
            </span>

            {/* Waveform/Progress Bar */}
            <div className="flex-1 relative h-10">
              {/* Simple waveform bars */}
              <div className="absolute inset-0 flex items-center gap-0.5">
                {Array.from({ length: 60 }).map((_, i) => {
                  const height = 20 + Math.random() * 60;
                  const progress = (currentTime / duration) * 100;
                  const barProgress = (i / 60) * 100;
                  const isPast = barProgress < progress;

                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-full transition-colors"
                      style={{
                        height: `${height}%`,
                        backgroundColor: isPast
                          ? "rgb(147, 51, 234)"
                          : "rgb(75, 85, 99)",
                      }}
                    />
                  );
                })}
              </div>

              {/* Invisible seek bar overlay */}
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {/* Duration */}
            <span className="text-xs font-mono text-gray-300 w-12">
              {formatTime(duration)}
            </span>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="h-8 w-8 flex items-center justify-center hover:bg-gray-800 rounded transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                setIsMuted(false);
              }}
              className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
