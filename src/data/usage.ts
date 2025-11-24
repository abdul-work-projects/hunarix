export interface DailyUsage {
  date: string;
  documentsProcessed: number;
  avgProcessingTime: number; // in seconds
  successRate: number;
  failedDocuments: number;
  tokensUsed: number;
  cost: number;
}

export interface DocumentTypeStats {
  type: string;
  count: number;
  percentage: number;
}

export interface HourlyActivity {
  hour: number;
  activity: number; // 0-100 scale
}

export const dailyUsage: DailyUsage[] = [
  { date: "2025-11-09", documentsProcessed: 124, avgProcessingTime: 2.3, successRate: 99.2, failedDocuments: 1, tokensUsed: 372000, cost: 7.44 },
  { date: "2025-11-10", documentsProcessed: 138, avgProcessingTime: 2.1, successRate: 99.5, failedDocuments: 1, tokensUsed: 414000, cost: 8.28 },
  { date: "2025-11-11", documentsProcessed: 156, avgProcessingTime: 2.4, successRate: 98.9, failedDocuments: 2, tokensUsed: 468000, cost: 9.36 },
  { date: "2025-11-12", documentsProcessed: 142, avgProcessingTime: 2.2, successRate: 99.3, failedDocuments: 1, tokensUsed: 426000, cost: 8.52 },
  { date: "2025-11-13", documentsProcessed: 168, avgProcessingTime: 2.5, successRate: 99.1, failedDocuments: 2, tokensUsed: 504000, cost: 10.08 },
  { date: "2025-11-14", documentsProcessed: 89, avgProcessingTime: 2.0, successRate: 99.7, failedDocuments: 0, tokensUsed: 267000, cost: 5.34 },
  { date: "2025-11-15", documentsProcessed: 75, avgProcessingTime: 1.9, successRate: 99.8, failedDocuments: 0, tokensUsed: 225000, cost: 4.50 },
  { date: "2025-11-16", documentsProcessed: 153, avgProcessingTime: 2.3, successRate: 99.2, failedDocuments: 1, tokensUsed: 459000, cost: 9.18 },
  { date: "2025-11-17", documentsProcessed: 147, avgProcessingTime: 2.2, successRate: 99.4, failedDocuments: 1, tokensUsed: 441000, cost: 8.82 },
  { date: "2025-11-18", documentsProcessed: 161, avgProcessingTime: 2.4, successRate: 99.0, failedDocuments: 2, tokensUsed: 483000, cost: 9.66 },
  { date: "2025-11-19", documentsProcessed: 145, avgProcessingTime: 2.1, successRate: 99.5, failedDocuments: 1, tokensUsed: 435000, cost: 8.70 },
  { date: "2025-11-20", documentsProcessed: 172, avgProcessingTime: 2.6, successRate: 98.8, failedDocuments: 2, tokensUsed: 516000, cost: 10.32 },
  { date: "2025-11-21", documentsProcessed: 94, avgProcessingTime: 2.0, successRate: 99.6, failedDocuments: 0, tokensUsed: 282000, cost: 5.64 },
  { date: "2025-11-22", documentsProcessed: 108, avgProcessingTime: 2.1, successRate: 99.3, failedDocuments: 1, tokensUsed: 324000, cost: 6.48 },
  { date: "2025-11-23", documentsProcessed: 164, avgProcessingTime: 2.3, successRate: 99.2, failedDocuments: 1, tokensUsed: 492000, cost: 9.84 },
];

export const weeklyUsage = [
  { week: "Week 1", documentsProcessed: 892, avgProcessingTime: 2.24, successRate: 99.24, tokensUsed: 2676000, cost: 53.52 },
  { week: "Week 2", documentsProcessed: 987, avgProcessingTime: 2.31, successRate: 99.18, tokensUsed: 2961000, cost: 59.22 },
  { week: "Week 3", documentsProcessed: 1014, avgProcessingTime: 2.28, successRate: 99.32, tokensUsed: 3042000, cost: 60.84 },
  { week: "Week 4", documentsProcessed: 978, avgProcessingTime: 2.25, successRate: 99.28, tokensUsed: 2934000, cost: 58.68 },
];

export const monthlyUsage = [
  { month: "Dec 2024", documentsProcessed: 2845, avgProcessingTime: 2.8, successRate: 98.2, tokensUsed: 8535000, cost: 170.7 },
  { month: "Jan 2025", documentsProcessed: 3210, avgProcessingTime: 2.6, successRate: 98.5, tokensUsed: 9630000, cost: 192.6 },
  { month: "Feb 2025", documentsProcessed: 3520, avgProcessingTime: 2.5, successRate: 98.7, tokensUsed: 10560000, cost: 211.2 },
  { month: "Mar 2025", documentsProcessed: 3890, avgProcessingTime: 2.4, successRate: 98.9, tokensUsed: 11670000, cost: 233.4 },
  { month: "Apr 2025", documentsProcessed: 4120, avgProcessingTime: 2.3, successRate: 99.0, tokensUsed: 12360000, cost: 247.2 },
  { month: "May 2025", documentsProcessed: 4450, avgProcessingTime: 2.3, successRate: 99.1, tokensUsed: 13350000, cost: 267.0 },
  { month: "Jun 2025", documentsProcessed: 4780, avgProcessingTime: 2.2, successRate: 99.2, tokensUsed: 14340000, cost: 286.8 },
  { month: "Jul 2025", documentsProcessed: 5120, avgProcessingTime: 2.2, successRate: 99.2, tokensUsed: 15360000, cost: 307.2 },
  { month: "Aug 2025", documentsProcessed: 5480, avgProcessingTime: 2.1, successRate: 99.3, tokensUsed: 16440000, cost: 328.8 },
  { month: "Sep 2025", documentsProcessed: 5810, avgProcessingTime: 2.1, successRate: 99.3, tokensUsed: 17430000, cost: 348.6 },
  { month: "Oct 2025", documentsProcessed: 6240, avgProcessingTime: 2.0, successRate: 99.4, tokensUsed: 18720000, cost: 374.4 },
  { month: "Nov 2025", documentsProcessed: 6780, avgProcessingTime: 2.0, successRate: 99.4, tokensUsed: 20340000, cost: 406.8 },
];

export const documentTypeStats: DocumentTypeStats[] = [
  { type: "Invoice", count: 2845, percentage: 35 },
  { type: "Contract", count: 1626, percentage: 20 },
  { type: "Report", count: 2032, percentage: 25 },
  { type: "Receipt", count: 813, percentage: 10 },
  { type: "Other", count: 813, percentage: 10 },
];

export const processingTimeByType = [
  { type: "Invoice", avgTime: 1.5 },
  { type: "Contract", avgTime: 3.2 },
  { type: "Report", avgTime: 4.1 },
  { type: "Receipt", avgTime: 0.8 },
  { type: "Other", avgTime: 2.5 },
];

export const hourlyActivityHeatmap: HourlyActivity[] = [
  { hour: 0, activity: 15 },
  { hour: 1, activity: 10 },
  { hour: 2, activity: 8 },
  { hour: 3, activity: 5 },
  { hour: 4, activity: 7 },
  { hour: 5, activity: 12 },
  { hour: 6, activity: 25 },
  { hour: 7, activity: 45 },
  { hour: 8, activity: 72 },
  { hour: 9, activity: 95 },
  { hour: 10, activity: 100 },
  { hour: 11, activity: 92 },
  { hour: 12, activity: 65 },
  { hour: 13, activity: 78 },
  { hour: 14, activity: 88 },
  { hour: 15, activity: 85 },
  { hour: 16, activity: 75 },
  { hour: 17, activity: 58 },
  { hour: 18, activity: 42 },
  { hour: 19, activity: 35 },
  { hour: 20, activity: 28 },
  { hour: 21, activity: 25 },
  { hour: 22, activity: 20 },
  { hour: 23, activity: 18 },
];

export const modelUsageStats = [
  { model: "GPT-4o", tokens: 8136000, cost: 244.08, percentage: 40 },
  { model: "GPT-4o Mini", tokens: 7119000, cost: 71.19, percentage: 35 },
  { model: "Claude 3", tokens: 4068000, cost: 122.04, percentage: 20 },
  { model: "Gemini", tokens: 1017000, cost: 20.34, percentage: 5 },
];
