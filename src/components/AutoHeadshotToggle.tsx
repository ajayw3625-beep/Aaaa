import React from 'react';
import { Power, Flame, Zap, Crosshair, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Language, WeaponCategory } from '../types';
import { soundFx } from '../utils/audio';

interface AutoHeadshotToggleProps {
  isActivated: boolean;
  onToggle: () => void;
  selectedWeapon: WeaponCategory;
  onSelectWeapon: (weapon: WeaponCategory) => void;
  language: Language;
  onApplyPreset: (mode: 'onetap' | 'smg' | 'balanced') => void;
  activePresetMode: 'onetap' | 'smg' | 'balanced';
}

export const AutoHeadshotToggle: React.FC<AutoHeadshotToggleProps> = ({
  isActivated,
  onToggle,
  language,
  onApplyPreset,
  activePresetMode,
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ${
      isActivated
        ? 'bg-gradient-to-b from-red-950/40 via-zinc-900/90 to-zinc-950 border-red-500/60 shadow-2xl shadow-red-500/10'
        : 'bg-zinc-900/80 border-zinc-800 shadow-xl'
    } p-5 md:p-6 backdrop-blur-md`}>
      
      {/* Background ambient glow effect when activated */}
      {isActivated && (
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      )}

      {/* Main Switch Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-zinc-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider ${
              isActivated ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
            }`}>
              <Sparkles className="w-3 h-3" />
              {isActivated ? (language === 'hi' ? 'एक्टिवेटेड (सक्रिय)' : 'STATUS: ACTIVATED') : (language === 'hi' ? 'ऑफ (निष्क्रिय)' : 'STATUS: DISABLED')}
            </span>
            <span className="text-zinc-500 text-xs">• 100% Red Numbers Drag Engine</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            <span>{language === 'hi' ? 'ऑटो हेडशॉट ऑप्टिमाइज़र' : 'Auto Headshot Optimizer'}</span>
            {isActivated && <Flame className="w-6 h-6 text-red-500 animate-pulse" />}
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl">
            {language === 'hi'
              ? 'एक क्लिक में फ्री फायर के लिए परफेक्ट ड्रैग सेंसिटिविटी, DPI और फायर बटन साइज अनलॉक करें ताकि हर शॉट सीधा सिर पर लगे।'
              : 'Instantly calibrate perfect drag sensitivity, DPI, and fire button size for pure red critical headshots in Free Fire.'}
          </p>
        </div>

        {/* Master ON/OFF Switch Button */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => {
              onToggle();
              if (!isActivated) {
                soundFx.playActivate();
              } else {
                soundFx.playClick();
              }
            }}
            className={`group relative flex items-center gap-3 px-6 py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-lg select-none cursor-pointer ${
              isActivated
                ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30 scale-[1.02] ring-2 ring-red-400/50'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700'
            }`}
          >
            <div className={`p-2 rounded-lg transition-transform duration-300 ${
              isActivated ? 'bg-black/30 rotate-0 text-white' : 'bg-zinc-900 rotate-90 text-zinc-500'
            }`}>
              <Power className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-mono font-medium text-zinc-300 opacity-80">
                {isActivated ? (language === 'hi' ? 'क्लिक करके बंद करें' : 'CLICK TO DISABLE') : (language === 'hi' ? 'क्लिक करके चालू करें' : 'CLICK TO ENABLE')}
              </span>
              <span className="text-base font-black text-white">
                {isActivated ? (language === 'hi' ? 'ऑटो हेडशॉट : चालू' : 'AUTO HEADSHOT: ON') : (language === 'hi' ? 'ऑटो हेडशॉट : बंद' : 'AUTO HEADSHOT: OFF')}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Preset Modes Row */}
      <div className="pt-5 space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="font-semibold uppercase tracking-wider text-zinc-300">
            {language === 'hi' ? 'हेडशॉट प्रीसेट मोड चुनें:' : 'Select Auto-Headshot Mode:'}
          </span>
          <span className="text-[11px] text-zinc-400">
            {language === 'hi' ? 'अपनी मनपसंद गन के अनुसार चुनें' : 'Tailored to your playstyle'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Preset 1: One Tap God */}
          <button
            onClick={() => onApplyPreset('onetap')}
            className={`text-left p-3.5 rounded-xl border transition-all ${
              activePresetMode === 'onetap'
                ? 'bg-red-500/15 border-red-500/70 text-white ring-1 ring-red-500/50 shadow-md shadow-red-500/10'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 font-bold text-sm text-red-400">
                <Crosshair className="w-4 h-4" />
                <span>{language === 'hi' ? 'वन-टैप हेडशॉट मोड' : 'One-Tap God Mode'}</span>
              </div>
              {activePresetMode === 'onetap' && <Check className="w-4 h-4 text-red-400" />}
            </div>
            <p className="text-xs text-zinc-400 line-clamp-2">
              {language === 'hi' ? 'M1887, Desert Eagle और Woodpecker के लिए 100% लाल नंबर ड्रैग।' : 'Tuned for M1887, Desert Eagle & Woodpecker flick shots.'}
            </p>
          </button>

          {/* Preset 2: SMG Laser */}
          <button
            onClick={() => onApplyPreset('smg')}
            className={`text-left p-3.5 rounded-xl border transition-all ${
              activePresetMode === 'smg'
                ? 'bg-red-500/15 border-red-500/70 text-white ring-1 ring-red-500/50 shadow-md shadow-red-500/10'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 font-bold text-sm text-amber-400">
                <Zap className="w-4 h-4" />
                <span>{language === 'hi' ? 'SMG लेजर स्प्रे मोड' : 'SMG Laser Lock'}</span>
              </div>
              {activePresetMode === 'smg' && <Check className="w-4 h-4 text-amber-400" />}
            </div>
            <p className="text-xs text-zinc-400 line-clamp-2">
              {language === 'hi' ? 'MP40 और UMP के लिए - एम छाती पर लॉक नहीं होगा, सीधा सिर पर जाएगा।' : 'Locks crosshair onto head with MP40 & UMP sprays.'}
            </p>
          </button>

          {/* Preset 3: Balanced All-Round */}
          <button
            onClick={() => onApplyPreset('balanced')}
            className={`text-left p-3.5 rounded-xl border transition-all ${
              activePresetMode === 'balanced'
                ? 'bg-red-500/15 border-red-500/70 text-white ring-1 ring-red-500/50 shadow-md shadow-red-500/10'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 font-bold text-sm text-emerald-400">
                <Flame className="w-4 h-4" />
                <span>{language === 'hi' ? 'ऑल-राउंडर प्रो मोड' : 'All-Rounder Pro'}</span>
              </div>
              {activePresetMode === 'balanced' && <Check className="w-4 h-4 text-emerald-400" />}
            </div>
            <p className="text-xs text-zinc-400 line-clamp-2">
              {language === 'hi' ? 'क्लैश स्क्वाड और बैटल रॉयल दोनों के लिए संतुलित प्रो सेटिंग।' : 'Perfect equilibrium for both Clash Squad and Battle Royale.'}
            </p>
          </button>
        </div>

        {/* Quick Activation Feature Specs */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-zinc-400">
            <span className="flex items-center gap-1 text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400"></span>
              {language === 'hi' ? 'एम ड्रैग बूस्ट: +35%' : 'Aim Drag Boost: +35%'}
            </span>
            <span className="flex items-center gap-1 text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              {language === 'hi' ? 'रिकॉइल स्टेबिलिटी: 94%' : 'Recoil Stability: 94%'}
            </span>
            <span className="hidden sm:flex items-center gap-1 text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
              {language === 'hi' ? 'टच रेस्पॉन्स: 0.1s' : 'Touch Response: 0.1s'}
            </span>
          </div>

          <div className="text-[11px] text-zinc-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-emerald-400" />
            <span>{language === 'hi' ? 'गेम सेटिंग्स में वैल्यूज डालें' : 'Apply values in Free Fire Settings'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
