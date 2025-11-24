import { NextResponse } from 'next/server';
import {
  dailyUsage,
  weeklyUsage,
  monthlyUsage,
  documentTypeStats,
  processingTimeByType,
  hourlyActivityHeatmap,
  modelUsageStats
} from '@/data/usage';

export async function GET() {
  const totalDocuments = dailyUsage.reduce((sum, day) => sum + day.documentsProcessed, 0);
  const avgProcessingTime = dailyUsage.reduce((sum, day) => sum + day.avgProcessingTime, 0) / dailyUsage.length;
  const avgSuccessRate = dailyUsage.reduce((sum, day) => sum + day.successRate, 0) / dailyUsage.length;
  const totalFailed = dailyUsage.reduce((sum, day) => sum + day.failedDocuments, 0);

  return NextResponse.json({
    summary: {
      totalDocuments,
      avgProcessingTime: avgProcessingTime.toFixed(2),
      successRate: avgSuccessRate.toFixed(2),
      failedDocuments: totalFailed,
      totalTokens: dailyUsage.reduce((sum, day) => sum + day.tokensUsed, 0),
      totalCost: dailyUsage.reduce((sum, day) => sum + day.cost, 0).toFixed(2),
    },
    charts: {
      dailyUsage,
      weeklyUsage,
      monthlyUsage,
      documentTypeStats,
      processingTimeByType,
      hourlyActivityHeatmap,
      modelUsageStats,
    },
    trends: {
      documentsTrend: 8.5,
      processingTimeTrend: -5.2,
      successRateTrend: 0.3,
    },
  });
}
