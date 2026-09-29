import React, { useState } from 'react';
import { Header } from './components/Header';
import { AutoHeadshotToggle } from './components/AutoHeadshotToggle';
import { DeviceSelector } from './components/DeviceSelector';
import { SensitivitySliders } from './components/SensitivitySliders';
import { DragAimSimulator } from './components/DragAimSimulator';
import { HudGuide } from './components/HudGuide';
import { AntiBanNotice } from './components/AntiBanNotice';
import { Language, DevicePreset, WeaponCategory, SensitivityConfig } from './types';
import { DEVICE_PRESETS, WEAPON_GUIDES } from './utils/presets';
import { soundFx } from './utils/audio';
import { Sliders, Target, Layout, ShieldCheck, Flame } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('hi');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isActivated, setIsActivated] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'sens' | 'simulator' | 'hud' | 'safety'>('sens');
  const [activePresetMode, setActivePresetMode] = useState<'onetap' | 'smg' | 'balanced'>('onetap');

  const [selectedDevice, setSelectedDevice] = useState<DevicePreset>(DEVICE_PRESETS[0]);
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponCategory>('shotgun');

  const [sens, setSens] = useState<SensitivityConfig>({
    ...DEVICE_PRESETS[0].defaultSens,
  });

  // Handle master toggle
  const handleToggle = () => {
    setIsActivated((prev) => !prev);
  };

  // Handle device change
  const handleSelectDevice = (device: DevicePreset) => {
    setSelectedDevice(device);
    setSens({
      ...device.defaultSens,
    });
  };

  // Handle weapon change
  const handleSelectWeapon = (weaponId: WeaponCategory) => {
    setSelectedWeapon(weaponId);
    const weapon = WEAPON_GUIDES.find((w) => w.id === weaponId);
    if (weapon) {
      setSens((prev) => ({
        ...prev,
        ...weapon.sensBoost,
      }));
    }
  };

  // Handle mode presets (One tap, SMG, Balanced)
  const handleApplyPreset = (mode: 'onetap' | 'smg' | 'balanced') => {
    setActivePresetMode(mode);
    setIsActivated(true);
    soundFx.playActivate();

    if (mode === 'onetap') {
      setSelectedWeapon('shotgun');
      setSens((prev) => ({
        ...prev,
        general: 99,
        redDot: 98,
        scope2x: 92,
        scope4x: 88,
        fireButtonSize: 45,
      }));
    } else if (mode === 'smg') {
      setSelectedWeapon('smg');
      setSens((prev) => ({
        ...prev,
        general: 95,
        redDot: 99,
        scope2x: 94,
        scope4x: 86,
        fireButtonSize: 48,
      }));
    } else {
      setSelectedWeapon('ar');
      setSens((prev) => ({
        ...prev,
        general: 92,
        redDot: 90,
        scope2x: 86,
        scope4x: 82,
        fireButtonSize: 50,
      }));
    }
  };

  // Handle single slider change
  const handleChangeSens = (key: keyof SensitivityConfig, value: number) => {
    setSens((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Reset to default
  const handleReset = () => {
    setSens({ ...selectedDevice.defaultSens });
  };

  const navTabs = [
    {
      id: 'sens' as const,
      labelHi: 'सेंसिटिविटी सेटिंग्स',
      labelEn: 'Sensitivity & Tuning',
      icon: Sliders,
    },
    {
      id: 'simulator' as const,
      labelHi: 'हेडशॉट सिम्युलेटर (प्रैक्टिस)',
      labelEn: 'Aim Drag Practice',
      icon: Target,
    },
    {
      id: 'hud' as const,
      labelHi: 'HUD & DPI गाइड',
      labelEn: 'Custom HUD & DPI',
      icon: Layout,
    },
    {
      id: 'safety' as const,
      labelHi: 'एंटी-बैन सुरक्षा',
      labelEn: 'Anti-Ban Safety',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Tactical Top Bar */}
      <Header
        language={language}
        setLanguage={setLanguage}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        isActivated={isActivated}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 space-y-6">
        {/* Core Auto Headshot Toggle Banner */}
        <AutoHeadshotToggle
          isActivated={isActivated}
          onToggle={handleToggle}
          selectedWeapon={selectedWeapon}
          onSelectWeapon={handleSelectWeapon}
          language={language}
          onApplyPreset={handleApplyPreset}
          activePresetMode={activePresetMode}
        />

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-x-auto scrollbar-none">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                <span>{language === 'hi' ? tab.labelHi : tab.labelEn}</span>
                {tab.id === 'simulator' && (
                  <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        {activeTab === 'sens' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Device Hardware & Weapon selection */}
            <DeviceSelector
              selectedDevice={selectedDevice}
              onSelectDevice={handleSelectDevice}
              selectedWeapon={selectedWeapon}
              onSelectWeapon={handleSelectWeapon}
              language={language}
            />

            {/* In-Game Sliders */}
            <SensitivitySliders
              sens={sens}
              onChangeSens={handleChangeSens}
              onReset={handleReset}
              language={language}
              deviceName={selectedDevice.name}
            />
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="space-y-6 animate-fadeIn">
            <DragAimSimulator sens={sens} language={language} />
          </div>
        )}

        {activeTab === 'hud' && (
          <div className="space-y-6 animate-fadeIn">
            <HudGuide language={language} />
          </div>
        )}

        {activeTab === 'safety' && (
          <div className="space-y-6 animate-fadeIn">
            <AntiBanNotice language={language} />
          </div>
        )}

        {/* Bottom Quick-Start Guide */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-zinc-200 block">
                {language === 'hi' ? 'फ्री फायर में तुरंत कैसे अप्लाई करें?' : 'How to apply in Free Fire?'}
              </span>
              <span>
                {language === 'hi'
                  ? 'Free Fire खोलें -> सेटिंग्स -> सेंसिटिविटी -> ऊपर दी गई वैल्यूज टाइप करें -> ट्रेनिंग ग्राउंड में 5 मिनट ड्रैग प्रैक्टिस करें।'
                  : 'Open Free Fire -> Settings -> Sensitivity -> Enter the values above -> Practice in Training Grounds for 5 minutes.'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveTab('simulator');
              soundFx.playClick();
            }}
            className="shrink-0 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 font-semibold transition"
          >
            {language === 'hi' ? 'प्रैक्टिस शुरू करें →' : 'Start Practice →'}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-4 text-center text-xs text-zinc-600">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 FF Headshot Master Pro • Safe Esports Sensitivity Suite</p>
          <p className="text-[11px] text-zinc-500">
            {language === 'hi'
              ? 'यह टूल कानूनी और फेयर प्ले गाइडलाइंस का पालन करता है।'
              : 'Compliant with fair-play gaming guidelines. No game files modified.'}
          </p>
        </div>
      </footer>
    </div>
  );
}
