import React from 'react';
import { Smartphone, Target, Cpu, Gauge, Zap } from 'lucide-react';
import { Language, DevicePreset, WeaponGuide, WeaponCategory } from '../types';
import { DEVICE_PRESETS, WEAPON_GUIDES } from '../utils/presets';
import { soundFx } from '../utils/audio';

interface DeviceSelectorProps {
  selectedDevice: DevicePreset;
  onSelectDevice: (device: DevicePreset) => void;
  selectedWeapon: WeaponCategory;
  onSelectWeapon: (weapon: WeaponCategory) => void;
  language: Language;
}

export const DeviceSelector: React.FC<DeviceSelectorProps> = ({
  selectedDevice,
  onSelectDevice,
  selectedWeapon,
  onSelectWeapon,
  language,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Device Hardware Card */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 backdrop-blur-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wide">
                {language === 'hi' ? 'अपना डिवाइस / फोन चुनें' : 'Select Your Device'}
              </h3>
              <p className="text-xs text-zinc-400">
                {language === 'hi' ? 'फोन के RAM और स्क्रीन रिफ्रेश रेट के अनुसार सेंसिटिविटी' : 'Hardware-specific touch response calibration'}
              </p>
            </div>
          </div>
        </div>

        {/* Device Select Tabs */}
        <div className="space-y-2">
          {DEVICE_PRESETS.map((device) => {
            const isSelected = selectedDevice.id === device.id;
            return (
              <button
                key={device.id}
                onClick={() => {
                  soundFx.playClick();
                  onSelectDevice(device);
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-zinc-800 border-red-500/80 text-white ring-1 ring-red-500/40 shadow-sm'
                    : 'bg-zinc-950/40 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-red-500 animate-pulse' : 'bg-zinc-600'}`} />
                  <div>
                    <span className="block text-sm font-semibold text-zinc-100">{device.name}</span>
                    <span className="text-xs text-zinc-400">
                      {language === 'hi' ? device.descriptionHi : device.descriptionEn}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <span className="block text-xs font-mono font-bold text-amber-400">{device.ram}</span>
                  <span className="text-[10px] text-zinc-500">{device.screenHz}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Specs Info Box */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800 text-center">
          <div className="p-2 rounded-lg bg-zinc-950/60 border border-zinc-800">
            <span className="text-[10px] uppercase text-zinc-500 block flex items-center justify-center gap-1">
              <Gauge className="w-3 h-3 text-red-400" />
              DPI Width
            </span>
            <span className="text-sm font-mono font-bold text-white">
              {selectedDevice.recommendedDpi === 0 ? 'iOS Default' : `${selectedDevice.recommendedDpi} DPI`}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-zinc-950/60 border border-zinc-800">
            <span className="text-[10px] uppercase text-zinc-500 block flex items-center justify-center gap-1">
              <Target className="w-3 h-3 text-amber-400" />
              Button Size
            </span>
            <span className="text-sm font-mono font-bold text-white">
              {selectedDevice.bestButtonSize}%
            </span>
          </div>

          <div className="p-2 rounded-lg bg-zinc-950/60 border border-zinc-800">
            <span className="text-[10px] uppercase text-zinc-500 block flex items-center justify-center gap-1">
              <Cpu className="w-3 h-3 text-emerald-400" />
              Sampling
            </span>
            <span className="text-sm font-mono font-bold text-emerald-400">
              {selectedDevice.screenHz}
            </span>
          </div>
        </div>
      </div>

      {/* Weapon Calibration Card */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 backdrop-blur-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wide">
                {language === 'hi' ? 'गन कैटेगरी और ड्रैग तकनीक' : 'Gun Category & Drag Style'}
              </h3>
              <p className="text-xs text-zinc-400">
                {language === 'hi' ? 'शॉटगन, SMG या वन-टैप के लिए स्पेशल ड्रैग फॉर्मूला' : 'Specific drag kinematics per gun type'}
              </p>
            </div>
          </div>
        </div>

        {/* Weapon Selection Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {WEAPON_GUIDES.map((weapon: WeaponGuide) => {
            const isSelected = selectedWeapon === weapon.id;
            return (
              <button
                key={weapon.id}
                onClick={() => {
                  soundFx.playClick();
                  onSelectWeapon(weapon.id);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/80 text-white ring-1 ring-amber-500/40 shadow-sm'
                    : 'bg-zinc-950/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/40'
                }`}
              >
                <div className="text-xs font-bold text-zinc-200 truncate">{weapon.name}</div>
                <div className="text-[11px] text-zinc-400 truncate">{weapon.iconWeapon}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Weapon Drag Detail */}
        {(() => {
          const currentWeapon = WEAPON_GUIDES.find((w) => w.id === selectedWeapon) || WEAPON_GUIDES[0];
          return (
            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  {language === 'hi' ? 'सीक्रेट ड्रैग तकनीक:' : 'Secret Drag Technique:'}
                </span>
                <span className="text-[11px] text-zinc-400">
                  {currentWeapon.popularGuns.join(', ')}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-zinc-300">
                {language === 'hi' ? currentWeapon.dragTechniqueHi : currentWeapon.dragTechniqueEn}
              </p>
            </div>
          );
        })()}

        {/* Pro Tip Callout */}
        <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 text-xs text-red-200 flex items-start gap-2">
          <div className="h-2 w-2 rounded-full bg-red-400 shrink-0 mt-1" />
          <p>
            {language === 'hi'
              ? 'गोली चलाने से पहले क्रॉसहेयर को हमेशा दुश्मन की छाती के बजाय उसके पास सफेद रखें, फिर ऊपर की ओर तेज ड्रैग करें। इससे 100% हेडशॉट लॉक होता है।'
              : 'Keep your crosshair white near the enemy before dragging upwards. This activates maximum aim-assist headlock in Free Fire.'}
          </p>
        </div>
      </div>
    </div>
  );
};
