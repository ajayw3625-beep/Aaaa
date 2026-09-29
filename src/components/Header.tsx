import React from 'react';
import { Crosshair, Volume2, VolumeX, ShieldCheck, Flame, Languages } from 'lucide-react';
import { Language } from '../types';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  isActivated: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  soundEnabled,
  setSoundEnabled,
  isActivated,
}) => {
  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    soundFx.enabled = newState;
    if (newState) soundFx.playClick();
  };

  const handleLangToggle = () => {
    soundFx.playClick();
    setLanguage(language === 'hi' ? 'en' : 'hi');
  };

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-red-600 shadow-lg shadow-red-500/20 text-white font-black">
            <Crosshair className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isActivated ? 'bg-red-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isActivated ? 'bg-red-500' : 'bg-amber-500'}`}></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-wider uppercase text-zinc-100 flex items-center gap-1.5">
                FF HEADSHOT <span className="text-red-500">PRO</span>
              </h1>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400">
                v8.4 Max
              </span>
            </div>
            <p className="text-xs text-zinc-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{language === 'hi' ? '100% एंटी-बैन लीगल सेंसिटिविटी पैनल' : '100% Anti-Ban Legal Sensitivity Panel'}</span>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Quick status pill */}
          <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
            isActivated
              ? 'bg-red-950/50 border-red-500/50 text-red-400 shadow-sm shadow-red-500/20'
              : 'bg-zinc-900 border-zinc-700 text-zinc-400'
          }`}>
            <Flame className={`w-3.5 h-3.5 ${isActivated ? 'text-red-500 animate-bounce' : 'text-zinc-500'}`} />
            <span>{isActivated ? (language === 'hi' ? 'रेड नंबर एक्टिव' : 'RED NUMBER ACTIVE') : (language === 'hi' ? 'स्टैंडबाय' : 'STANDBY')}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound"
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
            title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
          </button>

          {/* Language Switch */}
          <button
            onClick={handleLangToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-200 hover:text-white transition"
          >
            <Languages className="w-3.5 h-3.5 text-red-400" />
            <span>{language === 'hi' ? 'English' : 'हिंदी'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
