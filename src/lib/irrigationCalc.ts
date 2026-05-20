export const cropData = [
  { value: 1, label: "Alfalfa", ky: 1, eci: 2, etm: 1500, ym: 23, price: 209, min_ym: 15, max_ym: 30 },
  { value: 2, label: "Sugar beets", ky: 0.85, eci: 7, etm: 1050, ym: 120, price: 147, min_ym: 100, max_ym: 140 },
  { value: 3, label: "Wheat", ky: 1.05, eci: 6, etm: 620, ym: 7.5, price: 288, min_ym: 5, max_ym: 10 },
  { value: 4, label: "Bermuda Grass", ky: 0.9, eci: 6.9, etm: 1300, ym: 19, price: 200, min_ym: 15, max_ym: 25 },
  { value: 5, label: "Klein Grass", ky: 0.9, eci: 4, etm: 1350, ym: 24, price: 200, min_ym: 20, max_ym: 30 },
  { value: 6, label: "Sudan Grass", ky: 0.9, eci: 2.8, etm: 800, ym: 14, price: 200, min_ym: 10, max_ym: 20 },
  { value: 7, label: "Lettuce", ky: 1.15, eci: 1.3, etm: 320, ym: 20, price: 683.93, min_ym: 10, max_ym: 30 },
  { value: 8, label: "Carrots", ky: 1.1, eci: 1, etm: 600, ym: 110, price: 464.29, min_ym: 90, max_ym: 130 },
  { value: 9, label: "Broccoli", ky: 1, eci: 2.8, etm: 350, ym: 15, price: 919.64, min_ym: 10, max_ym: 20 },
  { value: 10, label: "Onion", ky: 1.1, eci: 1.2, etm: 800, ym: 60, price: 503.57, min_ym: 50, max_ym: 70 },
  { value: 11, label: "Spinach", ky: 1.15, eci: 2, etm: 200, ym: 14, price: 1237.5, min_ym: 10, max_ym: 20 },
  { value: 12, label: "Sweet Corn", ky: 1.1, eci: 1.7, etm: 600, ym: 27, price: 1482.14, min_ym: 20, max_ym: 40 },
];

export const soilData = [
  { value: 1, label: "Sand", m_group1: 0.1575, m_group2: 0.1795 },
  { value: 2, label: "Sand-Fine", m_group1: 0.1114, m_group2: 0.1274 },
  { value: 3, label: "Loamy Sand", m_group1: 0.202, m_group2: 0.23 },
  { value: 4, label: "Loamy Sand- Fine", m_group1: 0.1964, m_group2: 0.2244 },
  { value: 5, label: "Sandy Loam", m_group1: 0.239, m_group2: 0.273 },
  { value: 6, label: "Sandy Loam- Fine", m_group1: 0.2736, m_group2: 0.3116 },
  { value: 7, label: "Loam", m_group1: 0.376, m_group2: 0.428 },
  { value: 8, label: "Silt", m_group1: 0.4129, m_group2: 0.4709 },
  { value: 9, label: "Silty Loam", m_group1: 0.405, m_group2: 0.461 },
  { value: 10, label: "Sandy Clay Loam", m_group1: 0.3236, m_group2: 0.3676 },
  { value: 11, label: "Clay Loam", m_group1: 0.3971, m_group2: 0.4511 },
  { value: 12, label: "Silty Clay Loam", m_group1: 0.4031, m_group2: 0.4591 },
  { value: 13, label: "Sandy Clay", m_group1: 0.3855, m_group2: 0.4375 },
  { value: 14, label: "Silty Clay", m_group1: 0.4109, m_group2: 0.4669 },
  { value: 15, label: "Silty", m_group1: 0.429, m_group2: 0.487 },
];

export const irrigationSystems = [
  { value: 1, label: "Flood", ie_default: 68, k: 0.682, clz: 100 },
  { value: 2, label: "Basin", ie_default: 83, k: 0.682, clz: 100 },
  { value: 3, label: "Border", ie_default: 73, k: 0.682, clz: 100 },
  { value: 4, label: "Furrow", ie_default: 73, k: 0.682, clz: 85 },
  { value: 5, label: "Sprinkler Permanent", ie_default: 78, k: 0.769, clz: 100 },
  { value: 6, label: "Hand-Move", ie_default: 70, k: 0.769, clz: 100 },
  { value: 7, label: "Linear-Move", ie_default: 82, k: 0.769, clz: 100 },
  { value: 8, label: "Side-Roll", ie_default: 70, k: 0.769, clz: 100 },
  { value: 9, label: "Micro-Mini", ie_default: 81, k: 0.769, clz: 100 },
  { value: 10, label: "Hose-Pull", ie_default: 73, k: 0.769, clz: 100 },
  { value: 11, label: "Center-Pivot", ie_default: 80, k: 0.769, clz: 100 },
  { value: 12, label: "Drip", ie_default: 86, k: 0.883, clz: 40 },
];

export function getGroup1Crops() {
  return [1, 2, 3, 4, 5, 6, 10]; // Alfalfa, Sugar beets, Wheat, Bermuda, Klein, Sudan, Onion
}

export function calculateLeachingRequirement(ecw: number, eci: number) {
  return ecw / ((5 * eci) - ecw);
}

export function calculateSALEACHRequirement(ecw: number, eci: number, k: number, m: number) {
  return ecw / (((2 / (k * m)) * eci) - ecw);
}

export function getMValue(cropId: number, soilId: number) {
  const isGroup1 = getGroup1Crops().includes(cropId);
  const soil = soilData.find(s => s.value === soilId) || soilData[4]; // Default Sandy Loam
  return isGroup1 ? soil.m_group1 : soil.m_group2;
}

export function calculateDeficitIrrigationYieldReduction(ky: number, etm: number) {
  return [0.9, 0.8, 0.7, 0.6, 0.5].map((factor) => {
    return Number((ky * (1 - (factor * etm) / etm) * 100).toFixed(2));
  });
}
