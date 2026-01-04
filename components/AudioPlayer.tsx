"use client";

import { useRef, useState } from "react";

interface AudioPlayerProps {
  audioLabel: string;
  audioSrc: string;
}

/**
 * Minimal audio link component
 * Clicking toggles play/pause of the MP3
 */
export default function AudioPlayer({ audioLabel, audioSrc }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className="text-parchment/80 hover:text-white transition-colors text-sm font-body flex items-center gap-2"
        aria-label={audioLabel}
      >
        🎧 <span>Listen</span>
      </button>
      <audio ref={audioRef} src={audioSrc} />
    </>
  );
}
