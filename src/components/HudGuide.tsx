import React, { useState } from 'react';
import { Layout, Smartphone, HelpCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { PRO_TIPS } from '../utils/presets';
import { soundFx } from '../utils/audio';

interface HudGuideProps {
  language: Language;
}

export const HudGuide: React.FC<HudGuideProps> = ({ language }) => {
  const [hudClaw, setHudClaw] = useState<'2finger' | '3finger' | '4finger'>('2finger');

  const tips = language === 'hi' ? PRO_TIPS.hi : PRO_TIPS.en;

  return (
    <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
            <Layout className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wide">
              {language === 'hi' ? 'कस्टम HUD और DPI गाइड' : 'Custom HUD & DPI Setup Guide'}
            </h3>
            <p className="text-xs text-zinc-400">
              {language === 'hi'
                ? 'फायर बटन की सही पोजीशन और फोन सेटिंग्स ताकि ड्रैग हेडशॉट मक्खन जैसा लगे'
                : 'Button placement runway & system settings for effortless headshot flicks'}
            </p>
          </div>
        </div>

        {/* Claw selector */}
        <div className="flex items-center gap-1 p-1 bg-zinc-950 rounded-lg border border-zinc-800 self-start sm:self-auto">
          {(['2finger', '3finger', '4finger'] as const).map((claw) => (
            <button
              key={claw}
              onClick={() => {
                soundFx.playClick();
                setHudClaw(claw);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                hudClaw === claw
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {claw === '2finger' ? '2-Finger' : claw === '3finger' ? '3-Finger' : '4-Finger'}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Screen Mockup */}
      <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950 p-6 overflow-hidden">
        <div className="text-xs text-zinc-400 mb-3 flex items-center justify-between">
          <span className="font-mono text-zinc-300">
            {language === 'hi' ? 'स्मार्टफोन स्क्रीन HUD लेआउट:' : 'Mobile HUD Canvas Layout:'}
          </span>
          <span className="text-[11px] text-red-400 font-semibold">
            {hudClaw === '2finger' ? '2-Finger Thumb Claw' : hudClaw === '3finger' ? '3-Finger Index Trigger' : '4-Finger Claw'}
          </span>
        </div>

        {/* Mock Screen Ratio Frame */}
        <div className="relative h-64 sm:h-72 w-full rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900 overflow-hidden flex flex-col justify-between p-4">
          
          {/* Top Edge (Left index trigger if 3/4 finger, Map, Teammates) */}
          <div className="flex items-center justify-between text-[11px] text-zinc-500">
            <div className="flex items-center gap-2">
              <div className="px-2.5 py-1 rounded bg-zinc-800/80 border border-zinc-700 text-zinc-300 text-[10px]">
                🗺️ Mini-Map
              </div>
              {hudClaw !== '2finger' && (
                <div className="px-2 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold animate-pulse">
                  Left Fire (3-Finger)
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="px-2 py-1 rounded bg-zinc-800/80 border border-zinc-700 text-zinc-400 text-[10px]">
                Backpack / Medkit
              </div>
              {hudClaw === '4finger' && (
                <div className="px-2 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-bold">
                  Scope (4-Finger)
                </div>
              )}
            </div>
          </div>

          {/* Center Crosshair Area */}
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border border-red-500/40 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            </div>
          </div>

          {/* Bottom Screen: Left Joystick & Right Action Cluster */}
          <div className="flex items-end justify-between">
            {/* Left Joystick & Gloo wall */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full border border-sky-500/40 bg-sky-950/30 flex items-center justify-center text-[10px] text-sky-400 font-bold">
                Gloo Wall
              </div>
              <div className="w-16 h-16 rounded-full border border-zinc-700 bg-zinc-900/60 flex items-center justify-center text-[10px] text-zinc-400">
                Movement
              </div>
            </div>

            {/* Right Side: Fire Button with upward runway */}
            <div className="relative flex flex-col items-center">
              {/* Upward Runway Visual Line */}
              <div className="h-16 w-1 border-r border-dashed border-red-500/60 mb-2 flex items-center justify-center relative">
                <span className="absolute -left-20 text-[9px] font-mono text-red-400 bg-red-950/70 px-1 py-0.5 rounded border border-red-500/30">
                  {language === 'hi' ? 'ड्रैग रनवे (जगह)' : 'Drag Runway'}
                </span>
                <span className="text-red-400 text-xs">↑</span>
              </div>

              {/* Fire Button Placement */}
              <div className="relative group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 border-2 border-white flex items-center justify-center shadow-lg shadow-red-500/30">
                  <span className="text-[10px] font-black text-white">FIRE</span>
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono text-amber-400">
                  Size: 45% - 48%
                </div>
              </div>
            </div>

            {/* Jump, Crouch & Prone Cluster */}
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-full border border-zinc-700 bg-zinc-800/80 flex items-center justify-center text-[9px] text-zinc-300">
                Jump
              </div>
              <div className="w-10 h-10 rounded-full border border-zinc-700 bg-zinc-800/80 flex items-center justify-center text-[9px] text-zinc-300">
                Crouch
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pro Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tips.map((tip, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{tip.title}</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed pl-6">
              {tip.text}
            </p>
          </div>
        ))}
      </div>

      {/* Android DPI Step-by-Step */}
      <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-3">
        <h4 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-red-400" />
          <span>{language === 'hi' ? 'फोन में DPI (Smallest Width) कैसे बदलें?' : 'How to set DPI in Android Settings'}</span>
        </h4>
        <ol className="text-xs text-zinc-300 space-y-1.5 list-decimal list-inside pl-1">
          <li>{language === 'hi' ? 'फोन की Settings में जाएं -> About Phone -> Build Number (या MIUI Version) पर 7 बार लगातार टैप करें।' : 'Open Settings -> About Phone -> Tap Build Number (or MIUI version) 7 times to enable Developer Options.'}</li>
          <li>{language === 'hi' ? 'अब System / Additional Settings -> Developer Options खोलें।' : 'Go to System / Additional Settings -> Developer Options.'}</li>
          <li>{language === 'hi' ? 'नीचे स्क्रॉल करके "Smallest Width" (DPI) खोजें।' : 'Scroll down to the Drawing section and find "Smallest Width".'}</li>
          <li>{language === 'hi' ? 'अपना पुराना DPI नंबर याद रखें (नोट कर लें), फिर 411 से 460 के बीच नया नंबर डालकर Save करें।' : 'Note down your original DPI first, then change it to recommended 411 - 460.'}</li>
        </ol>

        <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 flex items-center gap-2 text-xs text-amber-300">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            {language === 'hi'
              ? 'सावधानी: कभी भी DPI को 500 से ज्यादा न बढ़ाएं, वर्ना फोन की स्क्रीन ब्लैंक हो सकती है। 411 से 460 बिल्कुल सुरक्षित है।'
              : 'Warning: Never set DPI above 500 on Android. High values can cause display crashes. Stay within 411-460.'}
          </span>
        </div>
      </div>
    </div>
  );
};
