export interface SystemMetrics {
  uptime: number; // percentage
  errorRate: number; // percentage
  avgLatency: number; // ms
  queueSize: number;
  activeConnections: number;
  cpuUsage: number; // percentage
  memoryUsage: number; // percentage
}

export interface ErrorLog {
  id: string;
  timestamp: string;
  type: "api_error" | "processing_error" | "timeout" | "rate_limit" | "validation_error";
  message: string;
  endpoint: string;
  customerId?: string;
  resolved: boolean;
}

export interface LatencyData {
  timestamp: string;
  p50: number;
  p90: number;
  p99: number;
}

export const currentMetrics: SystemMetrics = {
  uptime: 99.97,
  errorRate: 0.12,
  avgLatency: 245,
  queueSize: 23,
  activeConnections: 1847,
  cpuUsage: 42,
  memoryUsage: 68,
};

export const uptimeHistory = [
  { date: "2024-01-01", uptime: 99.99 },
  { date: "2024-01-02", uptime: 99.98 },
  { date: "2024-01-03", uptime: 99.95 },
  { date: "2024-01-04", uptime: 100.00 },
  { date: "2024-01-05", uptime: 99.92 },
  { date: "2024-01-06", uptime: 100.00 },
  { date: "2024-01-07", uptime: 100.00 },
  { date: "2024-01-08", uptime: 99.97 },
  { date: "2024-01-09", uptime: 99.99 },
  { date: "2024-01-10", uptime: 99.94 },
  { date: "2024-01-11", uptime: 99.98 },
  { date: "2024-01-12", uptime: 99.96 },
  { date: "2024-01-13", uptime: 100.00 },
  { date: "2024-01-14", uptime: 99.99 },
  { date: "2024-01-15", uptime: 99.97 },
];

export const errorLogs: ErrorLog[] = [
  { id: "err_001", timestamp: "2024-01-15T14:32:15Z", type: "api_error", message: "OpenAI API rate limit exceeded", endpoint: "/api/process", customerId: "cust_003", resolved: true },
  { id: "err_002", timestamp: "2024-01-15T13:45:22Z", type: "processing_error", message: "PDF parsing failed - corrupted file", endpoint: "/api/process", customerId: "cust_001", resolved: true },
  { id: "err_003", timestamp: "2024-01-15T12:18:45Z", type: "timeout", message: "Request timeout after 30s", endpoint: "/api/analyze", customerId: "cust_005", resolved: true },
  { id: "err_004", timestamp: "2024-01-15T11:05:33Z", type: "validation_error", message: "Invalid document format", endpoint: "/api/upload", customerId: "cust_002", resolved: true },
  { id: "err_005", timestamp: "2024-01-15T10:22:18Z", type: "api_error", message: "Claude API connection error", endpoint: "/api/process", customerId: "cust_008", resolved: true },
  { id: "err_006", timestamp: "2024-01-15T09:15:42Z", type: "rate_limit", message: "Customer rate limit exceeded", endpoint: "/api/process", customerId: "cust_004", resolved: false },
  { id: "err_007", timestamp: "2024-01-14T22:45:11Z", type: "processing_error", message: "Memory limit exceeded during processing", endpoint: "/api/process", customerId: "cust_003", resolved: true },
  { id: "err_008", timestamp: "2024-01-14T18:33:27Z", type: "timeout", message: "Database connection timeout", endpoint: "/api/customers", resolved: true },
  { id: "err_009", timestamp: "2024-01-14T15:12:55Z", type: "api_error", message: "Gemini API 503 error", endpoint: "/api/process", customerId: "cust_011", resolved: true },
  { id: "err_010", timestamp: "2024-01-14T12:05:18Z", type: "validation_error", message: "File size exceeds limit (50MB)", endpoint: "/api/upload", customerId: "cust_006", resolved: true },
];

export const errorTypeDistribution = [
  { type: "API Error", count: 42, percentage: 35 },
  { type: "Processing Error", count: 28, percentage: 23 },
  { type: "Timeout", count: 24, percentage: 20 },
  { type: "Rate Limit", count: 15, percentage: 13 },
  { type: "Validation Error", count: 11, percentage: 9 },
];

export const latencyData: LatencyData[] = [
  { timestamp: "2024-01-15T00:00:00Z", p50: 180, p90: 350, p99: 820 },
  { timestamp: "2024-01-15T01:00:00Z", p50: 165, p90: 320, p99: 780 },
  { timestamp: "2024-01-15T02:00:00Z", p50: 155, p90: 290, p99: 720 },
  { timestamp: "2024-01-15T03:00:00Z", p50: 148, p90: 275, p99: 680 },
  { timestamp: "2024-01-15T04:00:00Z", p50: 152, p90: 285, p99: 700 },
  { timestamp: "2024-01-15T05:00:00Z", p50: 168, p90: 315, p99: 750 },
  { timestamp: "2024-01-15T06:00:00Z", p50: 195, p90: 380, p99: 890 },
  { timestamp: "2024-01-15T07:00:00Z", p50: 225, p90: 440, p99: 980 },
  { timestamp: "2024-01-15T08:00:00Z", p50: 265, p90: 520, p99: 1150 },
  { timestamp: "2024-01-15T09:00:00Z", p50: 295, p90: 580, p99: 1280 },
  { timestamp: "2024-01-15T10:00:00Z", p50: 310, p90: 610, p99: 1350 },
  { timestamp: "2024-01-15T11:00:00Z", p50: 298, p90: 585, p99: 1290 },
  { timestamp: "2024-01-15T12:00:00Z", p50: 255, p90: 495, p99: 1100 },
  { timestamp: "2024-01-15T13:00:00Z", p50: 275, p90: 540, p99: 1200 },
  { timestamp: "2024-01-15T14:00:00Z", p50: 285, p90: 560, p99: 1240 },
  { timestamp: "2024-01-15T15:00:00Z", p50: 270, p90: 530, p99: 1180 },
  { timestamp: "2024-01-15T16:00:00Z", p50: 248, p90: 485, p99: 1080 },
  { timestamp: "2024-01-15T17:00:00Z", p50: 220, p90: 430, p99: 960 },
  { timestamp: "2024-01-15T18:00:00Z", p50: 195, p90: 380, p99: 850 },
  { timestamp: "2024-01-15T19:00:00Z", p50: 178, p90: 345, p99: 780 },
  { timestamp: "2024-01-15T20:00:00Z", p50: 168, p90: 325, p99: 740 },
  { timestamp: "2024-01-15T21:00:00Z", p50: 175, p90: 340, p99: 760 },
  { timestamp: "2024-01-15T22:00:00Z", p50: 182, p90: 355, p99: 790 },
  { timestamp: "2024-01-15T23:00:00Z", p50: 178, p90: 345, p99: 770 },
];

export const failureRateHistory = [
  { date: "2024-01-01", rate: 0.15 },
  { date: "2024-01-02", rate: 0.12 },
  { date: "2024-01-03", rate: 0.18 },
  { date: "2024-01-04", rate: 0.10 },
  { date: "2024-01-05", rate: 0.14 },
  { date: "2024-01-06", rate: 0.08 },
  { date: "2024-01-07", rate: 0.06 },
  { date: "2024-01-08", rate: 0.13 },
  { date: "2024-01-09", rate: 0.11 },
  { date: "2024-01-10", rate: 0.16 },
  { date: "2024-01-11", rate: 0.09 },
  { date: "2024-01-12", rate: 0.17 },
  { date: "2024-01-13", rate: 0.07 },
  { date: "2024-01-14", rate: 0.10 },
  { date: "2024-01-15", rate: 0.12 },
];

export const systemLoad = [
  { time: "00:00", cpu: 25, memory: 52, network: 18 },
  { time: "04:00", cpu: 18, memory: 48, network: 12 },
  { time: "08:00", cpu: 55, memory: 68, network: 45 },
  { time: "12:00", cpu: 72, memory: 78, network: 62 },
  { time: "16:00", cpu: 65, memory: 75, network: 55 },
  { time: "20:00", cpu: 42, memory: 62, network: 35 },
];

export const queueMetrics = [
  { time: "00:00", size: 5, processingRate: 12 },
  { time: "04:00", size: 2, processingRate: 8 },
  { time: "08:00", size: 35, processingRate: 45 },
  { time: "12:00", size: 48, processingRate: 52 },
  { time: "16:00", size: 42, processingRate: 48 },
  { time: "20:00", size: 18, processingRate: 25 },
];
