export type Language = 'hi' | 'en';

export type DeviceType = 'low_end' | 'mid_range' | 'flagship' | 'ios' | 'pc';

export type WeaponCategory = 'shotgun' | 'smg' | 'ar' | 'pistol' | 'sniper';

export interface SensitivityConfig {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniperScope: number;
  freeLook: number;
  fireButtonSize: number;
  dpi: number;
  touchResponse: string;
  pointerSpeed: number; // 1 to 10
}

export interface DevicePreset {
  id: string;
  name: string;
  category: DeviceType;
  ram: string;
  screenHz: string;
  descriptionHi: string;
  descriptionEn: string;
  recommendedDpi: number;
  bestButtonSize: number;
  defaultSens: SensitivityConfig;
}

export interface WeaponGuide {
  id: WeaponCategory;
  name: string;
  iconWeapon: string;
  popularGuns: string[];
  dragTechniqueHi: string;
  dragTechniqueEn: string;
  sensBoost: Partial<SensitivityConfig>;
}

export interface ShotResult {
  id: number;
  type: 'head' | 'body' | 'miss';
  damage: number;
  x: number;
  y: number;
  messageHi: string;
  messageEn: string;
}
