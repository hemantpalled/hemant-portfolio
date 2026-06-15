import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, Music } from "lucide-react";

// Ambient track source for browser playback
const TRACK_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [volume, setVolume] = useState(0.35);

  // Show tooltip briefly on first mount to hint at music
  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(true), 2000);
    const t2 = setTimeout(() => setShowTooltip(false), 6000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.loop = true;
  }, [volume]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!playing) {
      audio.play().catch(() => {});
      setPlaying(true);
    } else {
      const nextMuted = !muted;
      audio.muted = nextMuted;
      setMuted(nextMuted);
    }
    setShowTooltip(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
    if (v === 0) setMuted(true);
    else if (muted) {
      setMuted(false);
      if (audioRef.current) audioRef.current.muted = false;
    }
  };

  const [showVolume, setShowVolume] = useState(false);

  const isAudible = playing && !muted;

  return (
    <>
      <audio ref={audioRef} src={TRACK_URL} preload="none" />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              className="bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-xl px-4 py-2.5 border border-white/10 shadow-xl max-w-[180px] text-center leading-relaxed"
            >
              🎵 Click to play ambient music
            </motion.div>
          )}
        </AnimatePresence>

        {/* Volume slider */}
        <AnimatePresence>
          {showVolume && playing && (
            <motion.div
              key="volume"
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.92 }}
              className="bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 shadow-xl flex flex-col items-center gap-2"
            >
              <span className="text-white/50 text-[10px] uppercase tracking-widest">Volume</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={muted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-28 accent-purple-400 cursor-pointer"
                style={{ writingMode: "horizontal-tb" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main button */}
        <div className="flex items-center gap-2">
          {/* Volume toggle */}
          {playing && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setShowVolume((v) => !v)}
              className="w-9 h-9 rounded-full bg-gray-900/80 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white/80 transition-colors shadow-lg"
              title="Adjust volume"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </motion.button>
          )}

          {/* Play / Mute button */}
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl overflow-hidden"
            title={!playing ? "Play music" : muted ? "Unmute" : "Mute"}
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />

            {/* Ripple rings when playing */}
            {isAudible && (
              <>
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-purple-400/40"
                    animate={{ scale: [1, 1.8 + i * 0.3], opacity: [0.6, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </>
            )}

            {/* Icon */}
            <AnimatePresence mode="wait">
              <motion.div
                key={!playing ? "music" : muted ? "muted" : "playing"}
                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 20 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 text-white"
              >
                {!playing ? (
                  <Music className="h-6 w-6" />
                ) : muted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Track label */}
        <AnimatePresence>
          {isAudible && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="flex items-center gap-1.5 bg-gray-900/80 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 shadow-lg"
            >
              {/* equaliser bars */}
              {[1, 2, 3].map((b) => (
                <motion.div
                  key={b}
                  className="w-0.5 rounded-full bg-gradient-to-t from-blue-400 to-purple-400"
                  animate={{ height: ["4px", "10px", "4px"] }}
                  transition={{ duration: 0.7, repeat: Infinity, delay: b * 0.15, ease: "easeInOut" }}
                />
              ))}
              <span className="text-white/60 text-[10px] ml-1 tracking-wide">Ambient</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
