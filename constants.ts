
import type { SizeCategory, StyleModifier } from './types';

export const STYLE_MODIFIERS: StyleModifier[] = [
  { id: "artistic", label: "Artistic", description: "Painterly and expressive" },
  { id: "photorealistic", label: "Photorealistic", description: "Camera-quality realism" },
  { id: "abstract", label: "Abstract", description: "Conceptual and non-representational" },
  { id: "minimal", label: "Minimalist", description: "Clean and simple" },
  { id: "cinematic", label: "Cinematic", description: "Movie-quality composition" }
];

export const SIZE_CATEGORIES: SizeCategory[] = [
  {
    category: "MOBILE",
    icon: "smartphone",
    sizes: [
      { code: "PHN-STD", label: "Phone Standard", width: 1080, height: 1920, description: "Most smartphones", popular: true },
      { code: "PHN-PRO", label: "Phone Pro", width: 1284, height: 2778, description: "iPhone Pro models", popular: false },
      { code: "PHN-MAX", label: "Phone Max", width: 1440, height: 3200, description: "Android flagships", popular: false }
    ]
  },
  {
    category: "TABLET",
    icon: "tablet",
    sizes: [
      { code: "TAB-STD", label: "Tablet Standard", width: 2048, height: 2732, description: "iPad/Android tablets", popular: true },
      { code: "TAB-PRO", label: "Tablet Pro", width: 2388, height: 1668, description: "iPad Pro 11\"", popular: false },
      { code: "TAB-MAX", label: "Tablet Max", width: 2732, height: 2048, description: "iPad Pro 12.9\"", popular: false }
    ]
  },
  {
    category: "LAPTOP",
    icon: "laptop",
    sizes: [
      { code: "LAP-HD", label: "Laptop HD", width: 1920, height: 1080, description: "Standard laptops", popular: true },
      { code: "LAP-MAC", label: "MacBook", width: 2880, height: 1800, description: "MacBook Pro/Air", popular: true },
      { code: "LAP-QHD", label: "Laptop QHD", width: 2560, height: 1440, description: "High-res laptops", popular: false }
    ]
  },
  {
    category: "DESKTOP",
    icon: "monitor",
    sizes: [
      { code: "DSK-FHD", label: "Desktop FHD", width: 1920, height: 1080, description: "Standard monitors", popular: true },
      { code: "DSK-QHD", label: "Desktop QHD", width: 2560, height: 1440, description: "1440p monitors", popular: true },
      { code: "DSK-4K", label: "Desktop 4K", width: 3840, height: 2160, description: "4K displays", popular: true },
      { code: "DSK-UW", label: "Desktop UltraWide", width: 3440, height: 1440, description: "Ultrawide monitors", popular: false },
    ]
  },
  {
    category: "SPECIAL",
    icon: "grid",
    sizes: [
      { code: "DUL-MON", label: "Dual Monitor", width: 3840, height: 1080, description: "Side-by-side setup", popular: false },
      { code: "SQR-STD", label: "Square", width: 1080, height: 1080, description: "Social media", popular: false },
      { code: "CUS-TOM", label: "Custom", width: null, height: null, description: "User specified", popular: false }
    ]
  }
];

export const DEFAULT_SIZE_CODE = "PHN-STD";
