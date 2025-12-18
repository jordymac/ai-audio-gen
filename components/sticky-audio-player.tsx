"use client";

import { Version } from "@/lib/types";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface StickyAudioPlayerProps {
  version: Version;
}

export function StickyAudioPlayer({ version }: StickyAudioPlayerProps) {
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

  if (version.generation_status !== 'complete' || !version.audio_url) {
    return null;
  }

  return (
    <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-3">
        <audio ref={audioRef} src={version.audio_url} preload="metadata" />

        {/* Compact waveform/progress bar */}
        <div className="relative mb-3">
          <div className="h-12 bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 rounded-lg flex items-center justify-center overflow-hidden">
            {/* Simple waveform visualization */}
            <div className="absolute inset-0 flex items-center justify-center gap-0.5 px-2">
              {Array.from({ length: 40 }).map((_, i) => (
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

        {/* Controls row: [play] [duration] [vol] */}
        <div className="flex items-center gap-4">
          {/* Play/Pause button */}
          <button
            onClick={togglePlayPause}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </button>

          {/* Time Display */}
          <div className="flex items-center gap-2 text-sm font-mono text-gray-600">
            <span>{formatTime(currentTime)}</span>
            <span className="text-gray-400">/</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4 text-gray-600" />
              ) : (
                <Volume2 className="h-4 w-4 text-gray-600" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgb(147, 51, 234) 0%, rgb(147, 51, 234) ${(isMuted ? 0 : volume) * 100}%, rgb(209, 213, 219) ${(isMuted ? 0 : volume) * 100}%, rgb(209, 213, 219) 100%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
