import React, { useState, useRef, useEffect } from 'react';
import { Target, Flame, RotateCcw, Crosshair, Award, Sparkles } from 'lucide-react';
import { Language, SensitivityConfig } from '../types';
import { soundFx } from '../utils/audio';

interface DragAimSimulatorProps {
  sens: SensitivityConfig;
  language: Language;
}

interface FloatingDamage {
  id: number;
  damage: number;
  isHeadshot: boolean;
  x: number;
  y: number;
}

export const DragAimSimulator: React.FC<DragAimSimulatorProps> = ({ sens, language }) => {
  const [stats, setStats] = useState({
    totalShots: 0,
    headshots: 0,
    currentStreak: 0,
    bestStreak: 0,
  });

  const [lastShotFeedback, setLastShotFeedback] = useState<{
    textHi: string;
    textEn: string;
    isHead: boolean;
  } | null>(null);

  const [floatingDamages, setFloatingDamages] = useState<FloatingDamage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; time: number } | null>(null);
  const [dragCurrent, setDragCurrent] = useState<{ x: number; y: number } | null>(null);
  const [targetHitState, setTargetHitState] = useState<'idle' | 'head' | 'body'>('idle');

  const rangeRef = useRef<HTMLDivElement>(null);

  // Clear floating damages after 1.2s
  useEffect(() => {
    if (floatingDamages.length > 0) {
      const timer = setTimeout(() => {
        setFloatingDamages((prev) => prev.slice(1));
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [floatingDamages]);

  // Touch / Mouse Handlers for Dragging the Fire Button
  const handleDragStart = (clientX: number, clientY: number) => {
    soundFx.playFire();
    setIsDragging(true);
    const startPoint = { x: clientX, y: clientY, time: performance.now() };
    setDragStart(startPoint);
    setDragCurrent({ x: clientX, y: clientY });
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    setDragCurrent({ x: clientX, y: clientY });
  };

  const handleDragEnd = () => {
    if (!isDragging || !dragStart || !dragCurrent) {
      setIsDragging(false);
      return;
    }

    const deltaY = dragStart.y - dragCurrent.y; // Positive = Dragged UP
    const deltaX = Math.abs(dragCurrent.x - dragStart.x);
    const durationMs = Math.max(performance.now() - dragStart.time, 16);
    const dragSpeedY = (deltaY / durationMs) * 100; // Drag velocity

    // Sensitivity multipliers
    // Higher General & Red Dot makes drag threshold easier to reach
    const sensMultiplier = (sens.general / 100) * 1.2;
    const effectiveDrag = dragSpeedY * sensMultiplier;

    // Hit detection logic:
    // Free Fire Drag mechanism: Upward flick needs good velocity without too much horizontal drift
    let isHeadshot = false;
    let isBody = false;
    let damage = 0;

    if (effectiveDrag > 35 && deltaY > 30) {
      // Good upward flick! Check for over-drag
      if (effectiveDrag > 280) {
        // Over-drag: Recoil / Shot went above head
        setLastShotFeedback({
          textHi: 'ओवर-ड्रैग! गोली सिर के ऊपर निकल गई (धीमा ड्रैग करें)',
          textEn: 'Over-drag! Shot flew above the head (Reduce speed slightly)',
          isHead: false,
        });
        soundFx.playBodyHit();
      } else {
        // Pure RED Headshot!
        isHeadshot = true;
        damage = 550;
        soundFx.playHeadshot();
        setTargetHitState('head');
        setLastShotFeedback({
          textHi: '💥 100% शुद्ध रेड हेडशॉट! परफेक्ट ड्रैग!',
          textEn: '💥 100% PURE RED HEADSHOT! Perfect Drag Speed!',
          isHead: true,
        });
      }
    } else if (deltaY > 5 || deltaX > 5) {
      // Low drag = Chest / Body shot
      isBody = true;
      damage = 32;
      soundFx.playBodyHit();
      setTargetHitState('body');
      setLastShotFeedback({
        textHi: 'येलो बॉडी शॉट (28): फायर बटन को और तेज ऊपर खींचें!',
        textEn: 'Body Shot (32): Flick fire button faster upwards!',
        isHead: false,
      });
    } else {
      // Just a tap without drag
      isBody = true;
      damage = 27;
      soundFx.playBodyHit();
      setTargetHitState('body');
      setLastShotFeedback({
        textHi: 'सिर्फ टैप किया! हेडशॉट के लिए बटन को ऊपर ड्रैग करें।',
        textEn: 'Single tap! Drag button upwards to hit headshot.',
        isHead: false,
      });
    }

    // Update stats
    setStats((prev) => {
      const newTotal = prev.totalShots + 1;
      const newHead = isHeadshot ? prev.headshots + 1 : prev.headshots;
      const newStreak = isHeadshot ? prev.currentStreak + 1 : 0;
      const newBest = Math.max(prev.bestStreak, newStreak);
      return {
        totalShots: newTotal,
        headshots: newHead,
        currentStreak: newStreak,
        bestStreak: newBest,
      };
    });

    // Add floating damage text
    if (damage > 0) {
      setFloatingDamages((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          damage,
          isHeadshot,
          x: 50 + (Math.random() * 20 - 10),
          y: isHeadshot ? 28 : 50,
        },
      ]);
    }

    setTimeout(() => {
      setTargetHitState('idle');
    }, 400);

    setIsDragging(false);
    setDragStart(null);
    setDragCurrent(null);
  };

  const headshotRate = stats.totalShots > 0 ? Math.round((stats.headshots / stats.totalShots) * 100) : 0;

  return (
    <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
            <Crosshair className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span>{language === 'hi' ? 'ड्रैग हेडशॉट सिम्युलेटर (प्रैक्टिस रेंज)' : 'Drag Headshot Aim Simulator'}</span>
              <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-mono">Live Physics</span>
            </h3>
            <p className="text-xs text-zinc-400">
              {language === 'hi'
                ? 'नीचे दिए गए फायर बटन को अपनी उंगली या माउस से ऊपर की तरफ खींचें (ड्रैग करें) और लाइव रेड नंबर्स देखें!'
                : 'Flick the fire button upward with touch/mouse to practice muscle memory for pure red headshots!'}
            </p>
          </div>
        </div>

        {/* Reset stats */}
        <button
          onClick={() => {
            soundFx.playClick();
            setStats({ totalShots: 0, headshots: 0, currentStreak: 0, bestStreak: 0 });
            setLastShotFeedback(null);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium border border-zinc-700 transition self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'स्कोर रीसेट' : 'Reset Score'}</span>
        </button>
      </div>

      {/* Stats Display Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
          <span className="text-[11px] text-zinc-400 uppercase font-mono block">
            {language === 'hi' ? 'कुल गोलियां' : 'Total Shots'}
          </span>
          <span className="text-xl font-black text-white font-mono">{stats.totalShots}</span>
        </div>

        <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
          <span className="text-[11px] text-zinc-400 uppercase font-mono block">
            {language === 'hi' ? 'हेडशॉट रेट' : 'Headshot Rate'}
          </span>
          <span className={`text-xl font-black font-mono ${headshotRate >= 70 ? 'text-red-400' : 'text-amber-400'}`}>
            {headshotRate}%
          </span>
        </div>

        <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
          <span className="text-[11px] text-zinc-400 uppercase font-mono block flex items-center justify-center gap-1">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            {language === 'hi' ? 'वर्तमान स्ट्रीक' : 'Current Streak'}
          </span>
          <span className="text-xl font-black text-red-400 font-mono">{stats.currentStreak} 🔥</span>
        </div>

        <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
          <span className="text-[11px] text-zinc-400 uppercase font-mono block flex items-center justify-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            {language === 'hi' ? 'बेस्ट स्ट्रीक' : 'Best Streak'}
          </span>
          <span className="text-xl font-black text-amber-400 font-mono">{stats.bestStreak}</span>
        </div>
      </div>

      {/* Simulator Firing Arena */}
      <div
        ref={rangeRef}
        onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onTouchEnd={handleDragEnd}
        className="relative h-80 sm:h-96 w-full rounded-2xl bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 overflow-hidden select-none flex flex-col justify-between p-4"
      >
        {/* Arena Grid Background & Crosshair overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ff4444_1px,transparent_1px)] [background-size:20px_20px]" />
        
        {/* Enemy Mannequin / Target in the center */}
        <div className="relative flex-1 flex items-center justify-center pointer-events-none">
          <div className="relative flex flex-col items-center">
            
            {/* Target Head (Crit Zone) */}
            <div className={`relative w-16 h-16 rounded-full border-2 transition-all duration-150 flex items-center justify-center ${
              targetHitState === 'head'
                ? 'bg-red-600 border-red-300 scale-125 shadow-2xl shadow-red-500 animate-ping'
                : 'bg-zinc-800 border-red-500/70 shadow-lg'
            }`}>
              {/* Level 3 Helmet Icon */}
              <div className="w-8 h-8 rounded-full bg-zinc-700 border border-zinc-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-red-400" />
              </div>
              <span className="absolute -top-6 text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 bg-red-950/80 border border-red-500/40 px-1.5 py-0.2 rounded">
                CRIT HEAD (550)
              </span>
            </div>

            {/* Neck link */}
            <div className="w-4 h-2 bg-zinc-700" />

            {/* Target Chest / Body (Vest Zone) */}
            <div className={`relative w-28 h-28 rounded-2xl border-2 transition-all duration-150 flex items-center justify-center ${
              targetHitState === 'body'
                ? 'bg-amber-600/60 border-amber-300 scale-105 shadow-xl'
                : 'bg-zinc-800/80 border-zinc-600'
            }`}>
              <div className="text-center">
                <span className="text-xs font-mono font-bold text-zinc-400">VEST LVL 3</span>
                <span className="text-[10px] text-zinc-500 block">BODY (28)</span>
              </div>
            </div>

            {/* Target Legs */}
            <div className="flex gap-4 mt-1">
              <div className="w-8 h-12 bg-zinc-800 rounded-b-lg border border-zinc-700" />
              <div className="w-8 h-12 bg-zinc-800 rounded-b-lg border border-zinc-700" />
            </div>

            {/* Floating Damage Numbers */}
            {floatingDamages.map((dmg) => (
              <div
                key={dmg.id}
                style={{ top: `${dmg.y}%`, left: `${dmg.x}%` }}
                className={`absolute pointer-events-none font-black text-3xl sm:text-4xl animate-bounce tracking-tighter drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] z-20 ${
                  dmg.isHeadshot
                    ? 'text-red-500 scale-125'
                    : 'text-yellow-400'
                }`}
              >
                {dmg.damage}
                {dmg.isHeadshot && <span className="block text-xs font-mono tracking-normal text-red-300">HEADSHOT!</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Live Feedback Toast Banner */}
        {lastShotFeedback && (
          <div className={`mx-auto mb-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all animate-pulse ${
            lastShotFeedback.isHead
              ? 'bg-red-950/80 border-red-500/80 text-red-300 shadow-md shadow-red-500/20'
              : 'bg-zinc-800 border-zinc-700 text-amber-300'
          }`}>
            {language === 'hi' ? lastShotFeedback.textHi : lastShotFeedback.textEn}
          </div>
        )}

        {/* Bottom Interactive Fire Button Area */}
        <div className="relative flex items-center justify-between z-10 pt-2 border-t border-zinc-800/60">
          <div className="text-xs text-zinc-400 max-w-xs hidden sm:block">
            <span className="font-semibold text-zinc-200 block mb-0.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {language === 'hi' ? 'ड्रैग हेडशॉट कैसे लगाएं:' : 'How to flick:'}
            </span>
            <span>
              {language === 'hi'
                ? 'फायर बटन को दबाकर तेजी से ऊपर की ओर खींचें (Swipe Up)।'
                : 'Press & flick the fire button sharply upwards toward the head.'}
            </span>
          </div>

          {/* Interactive Fire Button (Just like Free Fire HUD) */}
          <div className="relative ml-auto">
            <button
              onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
              onTouchStart={(e) => {
                if (e.touches[0]) {
                  handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
                }
              }}
              style={{
                width: `${sens.fireButtonSize * 1.5}px`,
                height: `${sens.fireButtonSize * 1.5}px`,
                minWidth: '64px',
                minHeight: '64px',
                maxWidth: '90px',
                maxHeight: '90px',
              }}
              className={`relative rounded-full border-2 transition-transform duration-100 flex items-center justify-center shadow-2xl cursor-grab active:cursor-grabbing select-none active:scale-95 ${
                isDragging
                  ? 'bg-gradient-to-tr from-red-600 to-amber-500 border-white ring-4 ring-red-500/50 scale-105'
                  : 'bg-gradient-to-tr from-zinc-800 via-zinc-900 to-zinc-800 border-amber-500/80 hover:border-amber-400'
              }`}
            >
              {/* Outer Drag Arrow Indicator */}
              <div className="absolute -top-5 text-[11px] font-black text-amber-400 flex items-center gap-0.5 animate-bounce">
                ↑ DRAG UP
              </div>

              {/* Fire Icon in center */}
              <div className="flex flex-col items-center">
                <Flame className={`w-6 h-6 transition-colors ${isDragging ? 'text-white' : 'text-amber-400'}`} />
                <span className="text-[9px] font-black uppercase text-zinc-300">FIRE</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
