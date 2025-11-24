export interface PageView {
  page: string;
  path: string;
  views: number;
  uniqueVisitors: number;
  avgTimeOnPage: number; // seconds
  bounceRate: number; // percentage
  exitRate: number; // percentage
}

export interface UserFlow {
  from: string;
  to: string;
  users: number;
  percentage: number;
}

export interface FunnelStep {
  step: string;
  name: string;
  users: number;
  conversionRate: number;
  dropOffRate: number;
}

export interface SessionData {
  date: string;
  sessions: number;
  avgDuration: number; // seconds
  pagesPerSession: number;
  bounceRate: number;
}

export interface TrafficSource {
  source: string;
  users: number;
  sessions: number;
  bounceRate: number;
  conversionRate: number;
}

export interface UserSegment {
  segment: string;
  users: number;
  percentage: number;
  avgSessionDuration: number;
  pagesPerSession: number;
}

export interface DropOffPoint {
  page: string;
  dropOffs: number;
  percentage: number;
  commonNextAction: string;
}

export interface HeatmapData {
  hour: number;
  day: string;
  value: number;
}

// Page views data
export const pageViews: PageView[] = [
  { page: "Dashboard", path: "/dashboard", views: 12453, uniqueVisitors: 4521, avgTimeOnPage: 245, bounceRate: 12.3, exitRate: 8.2 },
  { page: "Documents", path: "/documents", views: 9876, uniqueVisitors: 3892, avgTimeOnPage: 312, bounceRate: 15.7, exitRate: 11.4 },
  { page: "Upload", path: "/documents/upload", views: 7654, uniqueVisitors: 3124, avgTimeOnPage: 89, bounceRate: 8.2, exitRate: 5.1 },
  { page: "Processing", path: "/documents/processing", views: 6789, uniqueVisitors: 2987, avgTimeOnPage: 156, bounceRate: 18.9, exitRate: 22.3 },
  { page: "Results", path: "/documents/results", views: 5432, uniqueVisitors: 2654, avgTimeOnPage: 423, bounceRate: 6.4, exitRate: 31.2 },
  { page: "Settings", path: "/settings", views: 3211, uniqueVisitors: 1876, avgTimeOnPage: 178, bounceRate: 22.1, exitRate: 15.8 },
  { page: "Billing", path: "/billing", views: 2876, uniqueVisitors: 1654, avgTimeOnPage: 134, bounceRate: 19.4, exitRate: 28.7 },
  { page: "API Docs", path: "/docs/api", views: 2543, uniqueVisitors: 1432, avgTimeOnPage: 567, bounceRate: 25.3, exitRate: 18.9 },
  { page: "Integrations", path: "/integrations", views: 1987, uniqueVisitors: 1123, avgTimeOnPage: 234, bounceRate: 31.2, exitRate: 24.5 },
  { page: "Team", path: "/settings/team", views: 1654, uniqueVisitors: 987, avgTimeOnPage: 145, bounceRate: 17.8, exitRate: 19.2 },
];

// User flow between pages
export const userFlows: UserFlow[] = [
  { from: "Landing", to: "Dashboard", users: 3245, percentage: 72.3 },
  { from: "Landing", to: "Pricing", users: 876, percentage: 19.5 },
  { from: "Landing", to: "Exit", users: 367, percentage: 8.2 },
  { from: "Dashboard", to: "Documents", users: 2876, percentage: 64.2 },
  { from: "Dashboard", to: "Upload", users: 1234, percentage: 27.6 },
  { from: "Dashboard", to: "Settings", users: 367, percentage: 8.2 },
  { from: "Documents", to: "Upload", users: 2134, percentage: 54.8 },
  { from: "Documents", to: "Results", users: 1456, percentage: 37.4 },
  { from: "Documents", to: "Exit", users: 302, percentage: 7.8 },
  { from: "Upload", to: "Processing", users: 2987, percentage: 88.4 },
  { from: "Upload", to: "Exit", users: 392, percentage: 11.6 },
  { from: "Processing", to: "Results", users: 2654, percentage: 88.9 },
  { from: "Processing", to: "Exit", users: 333, percentage: 11.1 },
  { from: "Results", to: "Documents", users: 1876, percentage: 70.7 },
  { from: "Results", to: "Download", users: 567, percentage: 21.4 },
  { from: "Results", to: "Exit", users: 211, percentage: 7.9 },
];

// Conversion funnel
export const conversionFunnel: FunnelStep[] = [
  { step: "1", name: "Visit Landing Page", users: 15234, conversionRate: 100, dropOffRate: 0 },
  { step: "2", name: "Sign Up Started", users: 4521, conversionRate: 29.7, dropOffRate: 70.3 },
  { step: "3", name: "Email Verified", users: 3892, conversionRate: 86.1, dropOffRate: 13.9 },
  { step: "4", name: "First Document Upload", users: 2987, conversionRate: 76.7, dropOffRate: 23.3 },
  { step: "5", name: "Processing Complete", users: 2654, conversionRate: 88.9, dropOffRate: 11.1 },
  { step: "6", name: "Upgrade to Paid", users: 487, conversionRate: 18.4, dropOffRate: 81.6 },
];

// Onboarding funnel
export const onboardingFunnel: FunnelStep[] = [
  { step: "1", name: "Account Created", users: 3892, conversionRate: 100, dropOffRate: 0 },
  { step: "2", name: "Profile Setup", users: 3456, conversionRate: 88.8, dropOffRate: 11.2 },
  { step: "3", name: "First Upload", users: 2987, conversionRate: 86.4, dropOffRate: 13.6 },
  { step: "4", name: "Integration Connected", users: 1876, conversionRate: 62.8, dropOffRate: 37.2 },
  { step: "5", name: "Team Member Invited", users: 987, conversionRate: 52.6, dropOffRate: 47.4 },
];

// Session data over time
export const sessionData: SessionData[] = [
  { date: "2025-11-01", sessions: 1234, avgDuration: 324, pagesPerSession: 4.2, bounceRate: 32.1 },
  { date: "2025-11-02", sessions: 1456, avgDuration: 298, pagesPerSession: 3.9, bounceRate: 35.4 },
  { date: "2025-11-03", sessions: 1123, avgDuration: 312, pagesPerSession: 4.1, bounceRate: 33.2 },
  { date: "2025-11-04", sessions: 1567, avgDuration: 287, pagesPerSession: 3.7, bounceRate: 36.8 },
  { date: "2025-11-05", sessions: 1789, avgDuration: 342, pagesPerSession: 4.5, bounceRate: 29.4 },
  { date: "2025-11-06", sessions: 1654, avgDuration: 356, pagesPerSession: 4.8, bounceRate: 27.6 },
  { date: "2025-11-07", sessions: 1432, avgDuration: 334, pagesPerSession: 4.3, bounceRate: 30.1 },
  { date: "2025-11-08", sessions: 1298, avgDuration: 318, pagesPerSession: 4.0, bounceRate: 32.5 },
  { date: "2025-11-09", sessions: 1534, avgDuration: 345, pagesPerSession: 4.4, bounceRate: 28.9 },
  { date: "2025-11-10", sessions: 1678, avgDuration: 367, pagesPerSession: 4.7, bounceRate: 26.3 },
  { date: "2025-11-11", sessions: 1823, avgDuration: 378, pagesPerSession: 4.9, bounceRate: 25.1 },
  { date: "2025-11-12", sessions: 1756, avgDuration: 356, pagesPerSession: 4.6, bounceRate: 27.8 },
  { date: "2025-11-13", sessions: 1654, avgDuration: 342, pagesPerSession: 4.4, bounceRate: 29.2 },
  { date: "2025-11-14", sessions: 1789, avgDuration: 389, pagesPerSession: 5.1, bounceRate: 24.5 },
  { date: "2025-11-15", sessions: 1432, avgDuration: 312, pagesPerSession: 4.0, bounceRate: 31.8 },
  { date: "2025-11-16", sessions: 1234, avgDuration: 298, pagesPerSession: 3.8, bounceRate: 34.2 },
  { date: "2025-11-17", sessions: 1567, avgDuration: 334, pagesPerSession: 4.3, bounceRate: 30.5 },
  { date: "2025-11-18", sessions: 1876, avgDuration: 378, pagesPerSession: 4.9, bounceRate: 25.8 },
  { date: "2025-11-19", sessions: 1923, avgDuration: 392, pagesPerSession: 5.2, bounceRate: 23.4 },
  { date: "2025-11-20", sessions: 1845, avgDuration: 367, pagesPerSession: 4.8, bounceRate: 26.1 },
  { date: "2025-11-21", sessions: 1756, avgDuration: 345, pagesPerSession: 4.5, bounceRate: 28.3 },
  { date: "2025-11-22", sessions: 1654, avgDuration: 334, pagesPerSession: 4.3, bounceRate: 29.7 },
  { date: "2025-11-23", sessions: 1987, avgDuration: 398, pagesPerSession: 5.3, bounceRate: 22.8 },
];

// Traffic sources
export const trafficSources: TrafficSource[] = [
  { source: "Organic Search", users: 5432, sessions: 7654, bounceRate: 28.4, conversionRate: 4.2 },
  { source: "Direct", users: 3876, sessions: 5234, bounceRate: 22.1, conversionRate: 5.8 },
  { source: "Referral", users: 2134, sessions: 2876, bounceRate: 35.6, conversionRate: 3.1 },
  { source: "Social Media", users: 1567, sessions: 2123, bounceRate: 42.3, conversionRate: 2.4 },
  { source: "Email", users: 1234, sessions: 1654, bounceRate: 18.9, conversionRate: 7.2 },
  { source: "Paid Search", users: 987, sessions: 1432, bounceRate: 31.2, conversionRate: 5.1 },
];

// User segments
export const userSegments: UserSegment[] = [
  { segment: "Power Users", users: 487, percentage: 12.5, avgSessionDuration: 892, pagesPerSession: 8.7 },
  { segment: "Regular Users", users: 1234, percentage: 31.7, avgSessionDuration: 456, pagesPerSession: 5.2 },
  { segment: "Casual Users", users: 1567, percentage: 40.2, avgSessionDuration: 234, pagesPerSession: 3.1 },
  { segment: "New Users", users: 608, percentage: 15.6, avgSessionDuration: 178, pagesPerSession: 2.4 },
];

// Drop-off points
export const dropOffPoints: DropOffPoint[] = [
  { page: "Pricing Page", dropOffs: 876, percentage: 42.3, commonNextAction: "Exit" },
  { page: "Sign Up Form", dropOffs: 629, percentage: 13.9, commonNextAction: "Return to Landing" },
  { page: "Document Processing", dropOffs: 333, percentage: 11.1, commonNextAction: "Refresh Page" },
  { page: "Payment Page", dropOffs: 298, percentage: 38.2, commonNextAction: "Back to Pricing" },
  { page: "Integration Setup", dropOffs: 267, percentage: 37.2, commonNextAction: "Skip" },
  { page: "Team Invite", dropOffs: 189, percentage: 47.4, commonNextAction: "Skip" },
];

// Activity heatmap (hour x day)
export const activityHeatmap: HeatmapData[] = [
  // Monday
  { hour: 0, day: "Mon", value: 12 }, { hour: 1, day: "Mon", value: 8 }, { hour: 2, day: "Mon", value: 5 },
  { hour: 3, day: "Mon", value: 3 }, { hour: 4, day: "Mon", value: 4 }, { hour: 5, day: "Mon", value: 8 },
  { hour: 6, day: "Mon", value: 23 }, { hour: 7, day: "Mon", value: 45 }, { hour: 8, day: "Mon", value: 78 },
  { hour: 9, day: "Mon", value: 92 }, { hour: 10, day: "Mon", value: 98 }, { hour: 11, day: "Mon", value: 95 },
  { hour: 12, day: "Mon", value: 67 }, { hour: 13, day: "Mon", value: 82 }, { hour: 14, day: "Mon", value: 96 },
  { hour: 15, day: "Mon", value: 94 }, { hour: 16, day: "Mon", value: 87 }, { hour: 17, day: "Mon", value: 65 },
  { hour: 18, day: "Mon", value: 45 }, { hour: 19, day: "Mon", value: 34 }, { hour: 20, day: "Mon", value: 28 },
  { hour: 21, day: "Mon", value: 23 }, { hour: 22, day: "Mon", value: 18 }, { hour: 23, day: "Mon", value: 14 },
  // Tuesday
  { hour: 0, day: "Tue", value: 11 }, { hour: 1, day: "Tue", value: 7 }, { hour: 2, day: "Tue", value: 4 },
  { hour: 3, day: "Tue", value: 3 }, { hour: 4, day: "Tue", value: 5 }, { hour: 5, day: "Tue", value: 9 },
  { hour: 6, day: "Tue", value: 25 }, { hour: 7, day: "Tue", value: 48 }, { hour: 8, day: "Tue", value: 82 },
  { hour: 9, day: "Tue", value: 95 }, { hour: 10, day: "Tue", value: 100 }, { hour: 11, day: "Tue", value: 97 },
  { hour: 12, day: "Tue", value: 72 }, { hour: 13, day: "Tue", value: 85 }, { hour: 14, day: "Tue", value: 98 },
  { hour: 15, day: "Tue", value: 96 }, { hour: 16, day: "Tue", value: 89 }, { hour: 17, day: "Tue", value: 68 },
  { hour: 18, day: "Tue", value: 48 }, { hour: 19, day: "Tue", value: 36 }, { hour: 20, day: "Tue", value: 29 },
  { hour: 21, day: "Tue", value: 24 }, { hour: 22, day: "Tue", value: 19 }, { hour: 23, day: "Tue", value: 13 },
  // Wednesday
  { hour: 0, day: "Wed", value: 10 }, { hour: 1, day: "Wed", value: 6 }, { hour: 2, day: "Wed", value: 4 },
  { hour: 3, day: "Wed", value: 2 }, { hour: 4, day: "Wed", value: 4 }, { hour: 5, day: "Wed", value: 10 },
  { hour: 6, day: "Wed", value: 27 }, { hour: 7, day: "Wed", value: 52 }, { hour: 8, day: "Wed", value: 85 },
  { hour: 9, day: "Wed", value: 96 }, { hour: 10, day: "Wed", value: 99 }, { hour: 11, day: "Wed", value: 94 },
  { hour: 12, day: "Wed", value: 70 }, { hour: 13, day: "Wed", value: 88 }, { hour: 14, day: "Wed", value: 97 },
  { hour: 15, day: "Wed", value: 95 }, { hour: 16, day: "Wed", value: 86 }, { hour: 17, day: "Wed", value: 63 },
  { hour: 18, day: "Wed", value: 44 }, { hour: 19, day: "Wed", value: 33 }, { hour: 20, day: "Wed", value: 27 },
  { hour: 21, day: "Wed", value: 22 }, { hour: 22, day: "Wed", value: 17 }, { hour: 23, day: "Wed", value: 12 },
  // Thursday
  { hour: 0, day: "Thu", value: 11 }, { hour: 1, day: "Thu", value: 7 }, { hour: 2, day: "Thu", value: 5 },
  { hour: 3, day: "Thu", value: 3 }, { hour: 4, day: "Thu", value: 5 }, { hour: 5, day: "Thu", value: 11 },
  { hour: 6, day: "Thu", value: 28 }, { hour: 7, day: "Thu", value: 54 }, { hour: 8, day: "Thu", value: 86 },
  { hour: 9, day: "Thu", value: 97 }, { hour: 10, day: "Thu", value: 100 }, { hour: 11, day: "Thu", value: 96 },
  { hour: 12, day: "Thu", value: 73 }, { hour: 13, day: "Thu", value: 89 }, { hour: 14, day: "Thu", value: 99 },
  { hour: 15, day: "Thu", value: 97 }, { hour: 16, day: "Thu", value: 90 }, { hour: 17, day: "Thu", value: 67 },
  { hour: 18, day: "Thu", value: 47 }, { hour: 19, day: "Thu", value: 35 }, { hour: 20, day: "Thu", value: 28 },
  { hour: 21, day: "Thu", value: 23 }, { hour: 22, day: "Thu", value: 18 }, { hour: 23, day: "Thu", value: 13 },
  // Friday
  { hour: 0, day: "Fri", value: 10 }, { hour: 1, day: "Fri", value: 6 }, { hour: 2, day: "Fri", value: 4 },
  { hour: 3, day: "Fri", value: 2 }, { hour: 4, day: "Fri", value: 4 }, { hour: 5, day: "Fri", value: 9 },
  { hour: 6, day: "Fri", value: 24 }, { hour: 7, day: "Fri", value: 47 }, { hour: 8, day: "Fri", value: 79 },
  { hour: 9, day: "Fri", value: 91 }, { hour: 10, day: "Fri", value: 95 }, { hour: 11, day: "Fri", value: 92 },
  { hour: 12, day: "Fri", value: 68 }, { hour: 13, day: "Fri", value: 82 }, { hour: 14, day: "Fri", value: 89 },
  { hour: 15, day: "Fri", value: 84 }, { hour: 16, day: "Fri", value: 72 }, { hour: 17, day: "Fri", value: 52 },
  { hour: 18, day: "Fri", value: 38 }, { hour: 19, day: "Fri", value: 28 }, { hour: 20, day: "Fri", value: 22 },
  { hour: 21, day: "Fri", value: 18 }, { hour: 22, day: "Fri", value: 15 }, { hour: 23, day: "Fri", value: 11 },
  // Saturday
  { hour: 0, day: "Sat", value: 9 }, { hour: 1, day: "Sat", value: 6 }, { hour: 2, day: "Sat", value: 4 },
  { hour: 3, day: "Sat", value: 2 }, { hour: 4, day: "Sat", value: 2 }, { hour: 5, day: "Sat", value: 4 },
  { hour: 6, day: "Sat", value: 8 }, { hour: 7, day: "Sat", value: 15 }, { hour: 8, day: "Sat", value: 28 },
  { hour: 9, day: "Sat", value: 42 }, { hour: 10, day: "Sat", value: 52 }, { hour: 11, day: "Sat", value: 58 },
  { hour: 12, day: "Sat", value: 54 }, { hour: 13, day: "Sat", value: 56 }, { hour: 14, day: "Sat", value: 52 },
  { hour: 15, day: "Sat", value: 48 }, { hour: 16, day: "Sat", value: 42 }, { hour: 17, day: "Sat", value: 35 },
  { hour: 18, day: "Sat", value: 28 }, { hour: 19, day: "Sat", value: 24 }, { hour: 20, day: "Sat", value: 20 },
  { hour: 21, day: "Sat", value: 16 }, { hour: 22, day: "Sat", value: 13 }, { hour: 23, day: "Sat", value: 10 },
  // Sunday
  { hour: 0, day: "Sun", value: 8 }, { hour: 1, day: "Sun", value: 5 }, { hour: 2, day: "Sun", value: 3 },
  { hour: 3, day: "Sun", value: 2 }, { hour: 4, day: "Sun", value: 2 }, { hour: 5, day: "Sun", value: 3 },
  { hour: 6, day: "Sun", value: 6 }, { hour: 7, day: "Sun", value: 12 }, { hour: 8, day: "Sun", value: 24 },
  { hour: 9, day: "Sun", value: 38 }, { hour: 10, day: "Sun", value: 48 }, { hour: 11, day: "Sun", value: 54 },
  { hour: 12, day: "Sun", value: 52 }, { hour: 13, day: "Sun", value: 54 }, { hour: 14, day: "Sun", value: 50 },
  { hour: 15, day: "Sun", value: 46 }, { hour: 16, day: "Sun", value: 42 }, { hour: 17, day: "Sun", value: 38 },
  { hour: 18, day: "Sun", value: 32 }, { hour: 19, day: "Sun", value: 28 }, { hour: 20, day: "Sun", value: 24 },
  { hour: 21, day: "Sun", value: 20 }, { hour: 22, day: "Sun", value: 16 }, { hour: 23, day: "Sun", value: 12 },
];

// Real-time active users (for display purposes)
export const realtimeUsers = {
  current: 127,
  pages: [
    { page: "Dashboard", users: 42 },
    { page: "Documents", users: 35 },
    { page: "Upload", users: 23 },
    { page: "Processing", users: 15 },
    { page: "Results", users: 8 },
    { page: "Settings", users: 4 },
  ],
};

// User journey paths (top 5 most common)
export const userJourneyPaths = [
  { path: ["Landing", "Sign Up", "Dashboard", "Upload", "Processing", "Results"], users: 1234, percentage: 31.7 },
  { path: ["Landing", "Dashboard", "Documents", "Upload", "Processing"], users: 876, percentage: 22.5 },
  { path: ["Landing", "Pricing", "Sign Up", "Dashboard"], users: 654, percentage: 16.8 },
  { path: ["Dashboard", "Documents", "Results", "Download"], users: 432, percentage: 11.1 },
  { path: ["Landing", "Sign Up", "Exit"], users: 298, percentage: 7.7 },
];

// Feature adoption rates
export const featureAdoption = [
  { feature: "Document Upload", adopted: 2987, total: 3892, rate: 76.7 },
  { feature: "Batch Processing", adopted: 1654, total: 3892, rate: 42.5 },
  { feature: "API Integration", adopted: 876, total: 3892, rate: 22.5 },
  { feature: "Team Collaboration", adopted: 987, total: 3892, rate: 25.4 },
  { feature: "Custom Templates", adopted: 654, total: 3892, rate: 16.8 },
  { feature: "Webhooks", adopted: 432, total: 3892, rate: 11.1 },
  { feature: "Export to Cloud", adopted: 1234, total: 3892, rate: 31.7 },
];
