import { NextResponse } from "next/server";
import {
  pageViews,
  userFlows,
  conversionFunnel,
  onboardingFunnel,
  sessionData,
  trafficSources,
  userSegments,
  dropOffPoints,
  activityHeatmap,
  realtimeUsers,
  userJourneyPaths,
  featureAdoption,
} from "@/data/analytics";

export async function GET() {
  // Calculate summary metrics
  const totalPageViews = pageViews.reduce((sum, p) => sum + p.views, 0);
  const totalUniqueVisitors = pageViews.reduce((sum, p) => sum + p.uniqueVisitors, 0);
  const avgBounceRate = pageViews.reduce((sum, p) => sum + p.bounceRate, 0) / pageViews.length;
  const avgTimeOnSite = pageViews.reduce((sum, p) => sum + p.avgTimeOnPage, 0) / pageViews.length;

  // Calculate session metrics
  const totalSessions = sessionData.reduce((sum, s) => sum + s.sessions, 0);
  const avgSessionDuration = sessionData.reduce((sum, s) => sum + s.avgDuration, 0) / sessionData.length;
  const avgPagesPerSession = sessionData.reduce((sum, s) => sum + s.pagesPerSession, 0) / sessionData.length;

  // Conversion rate from funnel
  const overallConversionRate = (conversionFunnel[conversionFunnel.length - 1].users / conversionFunnel[0].users) * 100;

  return NextResponse.json({
    summary: {
      totalPageViews,
      totalUniqueVisitors,
      totalSessions,
      avgBounceRate: Math.round(avgBounceRate * 10) / 10,
      avgTimeOnSite: Math.round(avgTimeOnSite),
      avgSessionDuration: Math.round(avgSessionDuration),
      avgPagesPerSession: Math.round(avgPagesPerSession * 10) / 10,
      overallConversionRate: Math.round(overallConversionRate * 100) / 100,
      realtimeUsers: realtimeUsers.current,
    },
    charts: {
      pageViews,
      userFlows,
      conversionFunnel,
      onboardingFunnel,
      sessionData,
      trafficSources,
      userSegments,
      dropOffPoints,
      activityHeatmap,
      realtimeUsers,
      userJourneyPaths,
      featureAdoption,
    },
  });
}
