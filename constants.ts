import { Session, StrainType, ConsumptionMethod } from './types';

export const MOCK_SESSIONS: Session[] = [
  {
    id: '1',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
    productName: 'Blue Dream Haze',
    strainType: StrainType.SATIVA,
    method: ConsumptionMethod.FLOWER,
    dosage: '0.3g',
    effects: {
      focus: 8,
      relaxation: 3,
      euphoria: 7,
      creativity: 9,
      sleepiness: 2,
    },
    flavors: ['Berry', 'Sweet', 'Earthy'],
    notes: 'Great for painting. Felt very clear-headed but energetic.',
    rating: 5,
  },
  {
    id: '2',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
    productName: 'Granddaddy Purple',
    strainType: StrainType.INDICA,
    method: ConsumptionMethod.VAPE,
    dosage: '3 puffs',
    effects: {
      focus: 2,
      relaxation: 9,
      euphoria: 5,
      creativity: 4,
      sleepiness: 10,
    },
    flavors: ['Grape', 'Floral'],
    notes: 'Used for sleep aid. Out like a light within 30 mins.',
    rating: 4,
  },
  {
    id: '3',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 10, // 10 days ago
    productName: 'GSC',
    strainType: StrainType.HYBRID,
    method: ConsumptionMethod.EDIBLE,
    dosage: '10mg',
    effects: {
      focus: 4,
      relaxation: 7,
      euphoria: 8,
      creativity: 5,
      sleepiness: 4,
    },
    flavors: ['Dough', 'Mint'],
    notes: 'Social gathering. Felt giggly and relaxed, but dry mouth was annoying.',
    rating: 3,
  },
];

export const FLAVOR_TAGS = [
  'Citrus', 'Pine', 'Earthy', 'Sweet', 'Berry', 'Chemical', 'Floral', 'Spicy', 'Woody', 'Mint', 'Cheese'
];
