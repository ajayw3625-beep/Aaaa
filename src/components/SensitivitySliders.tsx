import React, { useState } from 'react';
import { Sliders, Copy, Check, RotateCcw, Target, Shield, HelpCircle } from 'lucide-react';
import { Language, SensitivityConfig } from '../types';
import { soundFx } from '../utils/audio';

interface SensitivitySlidersProps {
  sens: SensitivityConfig;
  onChangeSens: (key: keyof SensitivityConfig, value: number) => void;
  onReset: () => void;
  language: Language;
  deviceName: string;
}

export const SensitivitySliders: React.FC<SensitivitySlidersProps> = ({
  sens,
  onChangeSens,
  onReset,
  language,
  deviceName,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    soundFx.playClick();
    const textToCopy = `🔥 FREE FIRE AUTO HEADSHOT SENSITIVITY 🔥
Device: ${deviceName}
General: ${sens.general}
Red Dot: ${sens.redDot}
2X Scope: ${sens.scope2x}
4X Scope: ${sens.scope4x}
Sniper Scope: ${sens.sniperScope}
Free Look: ${sens.freeLook}
------------------------------
Fire Button Size: ${sens.fireButtonSize}%
Recommended DPI: ${sens.dpi > 0 ? sens.dpi : 'Default'}
Touch Pointer Speed: ${sens.pointerSpeed}/10
(100% Anti-Ban Calibrated)`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const sliderFields = [
    {
      key: 'general' as const,
      labelHi: 'जनरल (General)',
      labelEn: 'General Sensitivity',
      descHi: 'स्क्रीन घुमाने और ड्रैग हेडशॉट के लिए सबसे मुख्य सेटिंग।',
      descEn: 'Primary sensitivity for camera flicking and upward drag.',
      min: 50,
      max: 100,
      color: 'accent-red-500 text-red-400',
    },
    {
      key: 'redDot' as const,
      labelHi: 'रेड डॉट (Red Dot)',
      labelEn: 'Red Dot Scope',
      descHi: 'बिना स्कोप के हेडशॉट एक्यूरेसी और क्लोज रेंज एम लॉक।',
      descEn: 'Controls no-scope crosshair drag lock at close-mid range.',
      min: 50,
      max: 100,
      color: 'accent-amber-500 text-amber-400',
    },
    {
      key: 'scope2x' as const,
      labelHi: '2X स्कोप (2X Scope)',
      labelEn: '2X Scope',
      descHi: '2X स्कोप से वन-टैप और ड्रैग हेडशॉट के लिए।',
      descEn: 'Mid-range scope drag-shot precision.',
      min: 40,
      max: 100,
      color: 'accent-orange-500 text-orange-400',
    },
    {
      key: 'scope4x' as const,
      labelHi: '4X स्कोप (4X Scope)',
      labelEn: '4X Scope',
      descHi: 'लॉन्ग रेंज में दूर खड़े दुश्मन के सिर पर लॉक।',
      descEn: 'Long distance head-tracking sensitivity.',
      min: 40,
      max: 100,
      color: 'accent-emerald-500 text-emerald-400',
    },
    {
      key: 'sniperScope' as const,
      labelHi: 'स्नाइपर स्कोप (Sniper Scope)',
      labelEn: 'Sniper Scope',
      descHi: 'AWM और M82B के लिए स्थिर एम। 45-55 सबसे बेस्ट रहता है।',
      descEn: 'Heavy rifle aim stability. Kept between 40-55 for precision.',
      min: 20,
      max: 100,
      color: 'accent-sky-500 text-sky-400',
    },
    {
      key: 'freeLook' as const,
      labelHi: 'फ्री लुक (Free Look)',
      labelEn: 'Free Look',
      descHi: 'आस-पास देखने के लिए 360 डिग्री कैमरा स्पीड।',
      descEn: '360 degree situational awareness camera speed.',
      min: 20,
      max: 100,
      color: 'accent-purple-500 text-purple-400',
    },
  ];

  return (
    <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-6">
      {/* Top Header of Sliders */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wide">
              {language === 'hi' ? 'इन-गेम सेंसिटिविटी सेटिंग्स' : 'In-Game Sensitivity Values'}
            </h3>
            <p className="text-xs text-zinc-400">
              {language === 'hi'
                ? 'इन नंबरों को अपने Free Fire Settings -> Sensitivity में ठीक इसी तरह सेट करें'
                : 'Directly configure these exact numbers in Free Fire Settings -> Sensitivity'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => {
              soundFx.playClick();
              onReset();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-medium border border-zinc-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'रीसेट' : 'Reset'}</span>
          </button>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition shadow-md ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/20'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (language === 'hi' ? 'कॉपी हो गया!' : 'Copied!') : (language === 'hi' ? 'सब सेटिंग्स कॉपी करें' : 'Copy All Settings')}</span>
          </button>
        </div>
      </div>

      {/* Grid of Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        {sliderFields.map((field) => {
          const value = sens[field.key];
          return (
            <div key={field.key} className="space-y-1.5 p-3 rounded-xl bg-zinc-950/40 border border-zinc-800/80">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-zinc-200">
                    {language === 'hi' ? field.labelHi : field.labelEn}
                  </span>
                  <p className="text-[11px] text-zinc-500 line-clamp-1">
                    {language === 'hi' ? field.descHi : field.descEn}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {/* Minus button */}
                  <button
                    onClick={() => {
                      if (value > field.min) {
                        soundFx.playClick();
                        onChangeSens(field.key, value - 1);
                      }
                    }}
                    className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold flex items-center justify-center border border-zinc-700"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-base text-white">
                    {value}
                  </span>
                  {/* Plus button */}
                  <button
                    onClick={() => {
                      if (value < field.max) {
                        soundFx.playClick();
                        onChangeSens(field.key, value + 1);
                      }
                    }}
                    className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold flex items-center justify-center border border-zinc-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Slider track */}
              <div className="pt-1">
                <input
                  type="range"
                  min={field.min}
                  max={field.max}
                  value={value}
                  onChange={(e) => onChangeSens(field.key, Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 px-0.5 mt-0.5">
                  <span>{field.min}</span>
                  <span className="text-zinc-400 font-semibold">{value >= 95 ? '🔥 Peak Drag' : 'Balanced'}</span>
                  <span>{field.max}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hardware & Fire Button Calibration row */}
      <div className="pt-4 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Fire Button Size */}
        <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-amber-400" />
              {language === 'hi' ? 'फायर बटन साइज' : 'Fire Button Size'}
            </span>
            <span className="text-sm font-mono font-bold text-amber-400">{sens.fireButtonSize}%</span>
          </div>
          <input
            type="range"
            min={30}
            max={75}
            value={sens.fireButtonSize}
            onChange={(e) => onChangeSens('fireButtonSize', Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <p className="text-[11px] text-zinc-500">
            {language === 'hi' ? '44% - 50% सबसे बेस्ट रहता है' : 'Best sweetspot is 44% - 50%'}
          </p>
        </div>

        {/* Recommended DPI */}
        <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              {language === 'hi' ? 'सेफ DPI (स्मॉलेस्ट विड्थ)' : 'Safe DPI (Smallest Width)'}
            </span>
            <span className="text-sm font-mono font-bold text-emerald-400">
              {sens.dpi > 0 ? `${sens.dpi} DPI` : 'Standard'}
            </span>
          </div>
          <input
            type="range"
            min={360}
            max={500}
            value={sens.dpi > 0 ? sens.dpi : 392}
            onChange={(e) => onChangeSens('dpi', Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <p className="text-[11px] text-zinc-500">
            {language === 'hi' ? 'फोन डेवलपर ऑप्शन में सेट करें' : 'Set in Android Developer Options'}
          </p>
        </div>

        {/* Pointer Speed */}
        <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-sky-400" />
              {language === 'hi' ? 'पॉइंटर स्पीड' : 'Pointer Speed'}
            </span>
            <span className="text-sm font-mono font-bold text-sky-400">{sens.pointerSpeed}/10</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={sens.pointerSpeed}
            onChange={(e) => onChangeSens('pointerSpeed', Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
          <p className="text-[11px] text-zinc-500">
            {language === 'hi' ? 'फोन सेटिंग्स -> लैंग्वेज & इनपुट' : 'Phone Settings -> Language & Input'}
          </p>
        </div>
      </div>
    </div>
  );
};
