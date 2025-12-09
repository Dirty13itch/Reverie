export enum StrainType {
  SATIVA = 'Sativa',
  INDICA = 'Indica',
  HYBRID = 'Hybrid',
  CBD = 'CBD Only'
}

export enum ConsumptionMethod {
  FLOWER = 'Flower',
  VAPE = 'Vape',
  EDIBLE = 'Edible',
  CONCENTRATE = 'Concentrate',
  TINCTURE = 'Tincture'
}

export interface EffectRating {
  focus: number;
  relaxation: number;
  euphoria: number;
  creativity: number;
  sleepiness: number;
}

export interface Session {
  id: string;
  timestamp: number;
  productName: string;
  strainType: StrainType;
  method: ConsumptionMethod;
  dosage: string; // Free text for flexibility (e.g., "10mg", "2 puffs")
  effects: EffectRating;
  flavors: string[];
  notes: string;
  rating: number; // 1-5 stars
}

export interface InsightResult {
  summary: string;
  suggestion: string;
  caution: string;
}

export type ViewState = 'DASHBOARD' | 'JOURNAL' | 'NEW_SESSION' | 'INSIGHTS';