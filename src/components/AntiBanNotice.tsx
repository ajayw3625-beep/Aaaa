import React from 'react';
import { ShieldCheck, AlertTriangle, Lock, Award, Check } from 'lucide-react';
import { Language } from '../types';

interface AntiBanNoticeProps {
  language: Language;
}

export const AntiBanNotice: React.FC<AntiBanNoticeProps> = ({ language }) => {
  return (
    <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span>{language === 'hi' ? '100% एंटी-बैन एवं सुरक्षित गाइड' : '100% Anti-Ban & Safe Play Certification'}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Garena ToS Compliant
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              {language === 'hi'
                ? 'यह टूल किसी भी गेम फ़ाइल या कोड को मॉडिफाई नहीं करता - यह पूरी तरह से लीगल सेंसिटिविटी कैलिब्रेटर है।'
                : 'Zero game files modified. Pure mathematical touch sensitivity and HUD optimization.'}
            </p>
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {/* Dangerous Hacks / Injectors (Red) */}
        <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{language === 'hi' ? 'फेक इंजेक्टर / हैक APKs (खतरनाक)' : 'Fake Injectors & Mod APKs (Dangerous)'}</span>
          </div>
          <ul className="text-xs text-zinc-400 space-y-1 pl-1">
            <li className="flex items-center gap-2 text-red-300">
              <span className="text-red-500">✕</span>
              {language === 'hi' ? 'Free Fire ID 10 साल के लिए बैन होती है' : 'Triggers permanent 10-year Free Fire account ban'}
            </li>
            <li className="flex items-center gap-2 text-red-300">
              <span className="text-red-500">✕</span>
              {language === 'hi' ? 'फोन का IMEI नंबर ब्लैकलिस्ट हो जाता है' : 'Hardware IMEI blacklist prevents new account creation'}
            </li>
            <li className="flex items-center gap-2 text-red-300">
              <span className="text-red-500">✕</span>
              {language === 'hi' ? 'फोन में वायरस और डेटा चोरी का खतरा' : 'High malware and phone security vulnerability'}
            </li>
          </ul>
        </div>

        {/* Legal Calibration (Green) */}
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Award className="w-4 h-4 shrink-0" />
            <span>{language === 'hi' ? 'यह सेंसिटिविटी पैनल (100% लीगल)' : 'This Sensitivity Optimizer (100% Safe)'}</span>
          </div>
          <ul className="text-xs text-zinc-300 space-y-1 pl-1">
            <li className="flex items-center gap-2 text-emerald-300">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              {language === 'hi' ? '0% बैन रिस्क (ऑफिशियल गेम सेटिंग्स का उपयोग)' : '0% Ban risk (Uses standard in-game settings)'}
            </li>
            <li className="flex items-center gap-2 text-emerald-300">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              {language === 'hi' ? 'टॉप ईस्पोर्ट्स प्लेयर्स (Raistar, Badge99) वाली तकनीक' : 'Real esports technique used by top competitive pros'}
            </li>
            <li className="flex items-center gap-2 text-emerald-300">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              {language === 'hi' ? 'परमानेंट मसल मेमोरी और असली गेमप्ले सुधार' : 'Develops genuine muscle memory and higher KD ratio'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
