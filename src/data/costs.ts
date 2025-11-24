export interface MonthlyCost {
  month: string;
  totalCost: number;
  aiCost: number;
  infrastructureCost: number;
  grossProfit: number;
  grossMargin: number;
}

export interface ModelCost {
  model: string;
  tokens: number;
  cost: number;
  avgCostPer1kTokens: number;
  percentage: number;
}

export const monthlyCosts: MonthlyCost[] = [
  { month: "Dec 2024", totalCost: 398, aiCost: 171, infrastructureCost: 227, grossProfit: 752, grossMargin: 65.4 },
  { month: "Jan 2025", totalCost: 440, aiCost: 193, infrastructureCost: 247, grossProfit: 884, grossMargin: 66.8 },
  { month: "Feb 2025", totalCost: 471, aiCost: 211, infrastructureCost: 260, grossProfit: 998, grossMargin: 67.9 },
  { month: "Mar 2025", totalCost: 518, aiCost: 233, infrastructureCost: 285, grossProfit: 1109, grossMargin: 68.2 },
  { month: "Apr 2025", totalCost: 562, aiCost: 247, infrastructureCost: 315, grossProfit: 1223, grossMargin: 68.5 },
  { month: "May 2025", totalCost: 611, aiCost: 267, infrastructureCost: 344, grossProfit: 1332, grossMargin: 68.5 },
  { month: "Jun 2025", totalCost: 656, aiCost: 287, infrastructureCost: 369, grossProfit: 1432, grossMargin: 68.6 },
  { month: "Jul 2025", totalCost: 708, aiCost: 307, infrastructureCost: 401, grossProfit: 1538, grossMargin: 68.5 },
  { month: "Aug 2025", totalCost: 762, aiCost: 329, infrastructureCost: 433, grossProfit: 1642, grossMargin: 68.3 },
  { month: "Sep 2025", totalCost: 812, aiCost: 349, infrastructureCost: 463, grossProfit: 1737, grossMargin: 68.1 },
  { month: "Oct 2025", totalCost: 867, aiCost: 374, infrastructureCost: 493, grossProfit: 1840, grossMargin: 68.0 },
  { month: "Nov 2025", totalCost: 919, aiCost: 407, infrastructureCost: 512, grossProfit: 1933, grossMargin: 67.8 },
];

export const modelCosts: ModelCost[] = [
  { model: "GPT-4o", tokens: 8136000, cost: 244.08, avgCostPer1kTokens: 0.03, percentage: 40 },
  { model: "GPT-4o Mini", tokens: 7119000, cost: 71.19, avgCostPer1kTokens: 0.01, percentage: 35 },
  { model: "Claude 3", tokens: 4068000, cost: 122.04, avgCostPer1kTokens: 0.03, percentage: 20 },
  { model: "Gemini", tokens: 1017000, cost: 20.34, avgCostPer1kTokens: 0.02, percentage: 5 },
];

export const dailyModelCosts = [
  { date: "2025-11-09", gpt4o: 8.5, gpt4oMini: 3.2, claude: 4.5, gemini: 0.8 },
  { date: "2025-11-10", gpt4o: 9.2, gpt4oMini: 3.45, claude: 4.85, gemini: 0.92 },
  { date: "2025-11-11", gpt4o: 10.5, gpt4oMini: 3.9, claude: 5.5, gemini: 1.05 },
  { date: "2025-11-12", gpt4o: 8.8, gpt4oMini: 3.3, claude: 4.65, gemini: 0.88 },
  { date: "2025-11-13", gpt4o: 11.2, gpt4oMini: 4.2, claude: 5.9, gemini: 1.12 },
  { date: "2025-11-14", gpt4o: 5.8, gpt4oMini: 2.2, claude: 3.1, gemini: 0.58 },
  { date: "2025-11-15", gpt4o: 4.9, gpt4oMini: 1.85, claude: 2.6, gemini: 0.49 },
  { date: "2025-11-16", gpt4o: 10.2, gpt4oMini: 3.8, claude: 5.35, gemini: 1.02 },
  { date: "2025-11-17", gpt4o: 9.6, gpt4oMini: 3.6, claude: 5.05, gemini: 0.96 },
  { date: "2025-11-18", gpt4o: 10.8, gpt4oMini: 4.05, claude: 5.7, gemini: 1.08 },
  { date: "2025-11-19", gpt4o: 9.2, gpt4oMini: 3.45, claude: 4.85, gemini: 0.92 },
  { date: "2025-11-20", gpt4o: 11.5, gpt4oMini: 4.3, claude: 6.05, gemini: 1.15 },
  { date: "2025-11-21", gpt4o: 6.2, gpt4oMini: 2.35, claude: 3.3, gemini: 0.62 },
  { date: "2025-11-22", gpt4o: 7.2, gpt4oMini: 2.7, claude: 3.8, gemini: 0.72 },
  { date: "2025-11-23", gpt4o: 11.0, gpt4oMini: 4.1, claude: 5.8, gemini: 1.10 },
];

export const costBreakdown = {
  ai: {
    total: 407,
    percentage: 44.3,
    breakdown: [
      { category: "GPT-4o API", amount: 244, percentage: 60 },
      { category: "GPT-4o Mini API", amount: 71, percentage: 17.5 },
      { category: "Claude 3 API", amount: 122, percentage: 30 },
      { category: "Gemini API", amount: 20, percentage: 5 },
    ],
  },
  infrastructure: {
    total: 512,
    percentage: 55.7,
    breakdown: [
      { category: "Cloud Compute", amount: 281, percentage: 55 },
      { category: "Storage", amount: 102, percentage: 20 },
      { category: "Bandwidth", amount: 77, percentage: 15 },
      { category: "Other", amount: 52, percentage: 10 },
    ],
  },
};

export const tokenUsageByModel = [
  { date: "2025-11-09", gpt4o: 152000, gpt4oMini: 228000, claude: 95000, gemini: 38000 },
  { date: "2025-11-10", gpt4o: 164000, gpt4oMini: 246000, claude: 102500, gemini: 41000 },
  { date: "2025-11-11", gpt4o: 187000, gpt4oMini: 280500, claude: 117000, gemini: 46800 },
  { date: "2025-11-12", gpt4o: 157000, gpt4oMini: 235500, claude: 98000, gemini: 39200 },
  { date: "2025-11-13", gpt4o: 200000, gpt4oMini: 300000, claude: 125000, gemini: 50000 },
  { date: "2025-11-14", gpt4o: 104000, gpt4oMini: 156000, claude: 65000, gemini: 26000 },
  { date: "2025-11-15", gpt4o: 88000, gpt4oMini: 132000, claude: 55000, gemini: 22000 },
  { date: "2025-11-16", gpt4o: 182000, gpt4oMini: 273000, claude: 114000, gemini: 45600 },
  { date: "2025-11-17", gpt4o: 172000, gpt4oMini: 258000, claude: 107500, gemini: 43000 },
  { date: "2025-11-18", gpt4o: 193000, gpt4oMini: 289500, claude: 120500, gemini: 48200 },
  { date: "2025-11-19", gpt4o: 165000, gpt4oMini: 247500, claude: 103000, gemini: 41200 },
  { date: "2025-11-20", gpt4o: 205000, gpt4oMini: 307500, claude: 128000, gemini: 51200 },
  { date: "2025-11-21", gpt4o: 110000, gpt4oMini: 165000, claude: 69000, gemini: 27600 },
  { date: "2025-11-22", gpt4o: 128000, gpt4oMini: 192000, claude: 80000, gemini: 32000 },
  { date: "2025-11-23", gpt4o: 196000, gpt4oMini: 294000, claude: 122500, gemini: 49000 },
];
