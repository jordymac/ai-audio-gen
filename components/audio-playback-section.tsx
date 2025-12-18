"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Version } from "@/lib/types";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock,
  Coins,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface AudioPlaybackSectionProps {
  version: Version;
}

export function AudioPlaybackSection({ version }: AudioPlaybackSectionProps) {
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

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusDisplay = () => {
    switch (version.generation_status) {
      case 'pending':
        return {
          icon: <Clock className="h-4 w-4" />,
          label: 'Pending',
          color: 'bg-gray-100 text-gray-800',
          message: 'Waiting to generate audio...'
        };
      case 'generating':
        return {
          icon: <Loader2 className="h-4 w-4 animate-spin" />,
          label: 'Generating',
          color: 'bg-blue-100 text-blue-800',
          message: 'AI is generating your audio track...'
        };
      case 'complete':
        return {
          icon: <CheckCircle2 className="h-4 w-4" />,
          label: 'Complete',
          color: 'bg-green-100 text-green-800',
          message: 'Audio generation completed successfully'
        };
      case 'failed':
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          label: 'Failed',
          color: 'bg-red-100 text-red-800',
          message: version.api_error || 'Audio generation failed'
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3 bg-gradient-to-r from-slate-50 to-gray-50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-slate-900">
            Audio Playback
          </CardTitle>
          <Badge className={statusDisplay.color}>
            <span className="flex items-center gap-1.5">
              {statusDisplay.icon}
              {statusDisplay.label}
            </span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {/* Status Message */}
        <div className="text-sm text-gray-600 flex items-center gap-2">
          {statusDisplay.icon}
          <span>{statusDisplay.message}</span>
        </div>

        {/* Audio Player */}
        {version.generation_status === 'complete' && version.audio_url && (
          <div className="space-y-3">
            <audio ref={audioRef} src={version.audio_url} preload="metadata" />

            {/* Waveform / Progress Bar */}
            <div className="relative">
              <div className="h-20 bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 rounded-lg flex items-center justify-center overflow-hidden">
                {/* Simple waveform visualization placeholder */}
                <div className="absolute inset-0 flex items-center justify-center gap-0.5 px-2">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-purple-400 rounded-full opacity-60"
                      style={{
                        height: `${20 + Math.random() * 60}%`,
                        minWidth: '2px'
                      }}
                    />
                  ))}
                </div>

                {/* Progress overlay */}
                <div
                  className="absolute inset-0 bg-purple-500/20"
                  style={{
                    width: `${(currentTime / duration) * 100}%`,
                    transition: 'width 0.1s linear'
                  }}
                />
              </div>

              {/* Seek bar */}
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                onClick={togglePlayPause}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>

              {/* Time Display */}
              <div className="flex-1 flex items-center justify-between text-sm text-gray-600">
                <span className="font-mono">{formatTime(currentTime)}</span>
                <span className="font-mono">{formatTime(duration)}</span>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleMute}
                  className="h-8 w-8"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Generation in Progress */}
        {version.generation_status === 'generating' && (
          <div className="py-8 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
            <p className="text-sm text-gray-600">
              Generating audio... This may take a few moments.
            </p>
          </div>
        )}

        {/* Pending State */}
        {version.generation_status === 'pending' && (
          <div className="py-8 flex flex-col items-center justify-center space-y-3 text-gray-500">
            <Clock className="h-12 w-12" />
            <p className="text-sm">Audio generation not started yet.</p>
          </div>
        )}

        {/* Failed State */}
        {version.generation_status === 'failed' && (
          <div className="py-8 flex flex-col items-center justify-center space-y-3">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <p className="text-sm text-red-600 text-center max-w-md">
              {version.api_error || 'An error occurred during audio generation.'}
            </p>
            <Button variant="outline" size="sm">
              Retry Generation
            </Button>
          </div>
        )}

        {/* Generation Stats */}
        {version.generation_status === 'complete' && (
          <div className="pt-3 border-t grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Coins className="h-4 w-4 text-amber-600" />
              <span className="text-xs">API Credits:</span>
              <span className="font-semibold text-gray-900">
                {version.api_credits_used.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-xs">Duration:</span>
              <span className="font-semibold text-gray-900">
                {version.audio_duration_seconds}s
              </span>
            </div>
          </div>
        )}

        {/* Generation Time */}
        {version.generation_completed_at && version.generation_started_at && (
          <div className="text-xs text-gray-500">
            Generated on {new Date(version.generation_completed_at).toLocaleString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
