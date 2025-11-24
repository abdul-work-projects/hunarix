import { NextResponse } from 'next/server';
import {
  currentMetrics,
  uptimeHistory,
  errorLogs,
  errorTypeDistribution,
  latencyData,
  failureRateHistory,
  systemLoad,
  queueMetrics
} from '@/data/system';

export async function GET() {
  const avgUptime = uptimeHistory.reduce((sum, d) => sum + d.uptime, 0) / uptimeHistory.length;
  const avgFailureRate = failureRateHistory.reduce((sum, d) => sum + d.rate, 0) / failureRateHistory.length;

  return NextResponse.json({
    current: currentMetrics,
    summary: {
      avgUptime: avgUptime.toFixed(2),
      uptimeTrend: 0.02,
      avgErrorRate: avgFailureRate.toFixed(2),
      errorTrend: -0.05,
      avgLatency: currentMetrics.avgLatency,
      latencyTrend: -8,
      queueSize: currentMetrics.queueSize,
      queueTrend: -15,
    },
    charts: {
      uptimeHistory,
      latencyData,
      failureRateHistory,
      systemLoad,
      queueMetrics,
      errorTypeDistribution,
    },
    recentErrors: errorLogs.slice(0, 10),
    errorStats: {
      totalErrors: errorLogs.length,
      resolvedErrors: errorLogs.filter(e => e.resolved).length,
      unresolvedErrors: errorLogs.filter(e => !e.resolved).length,
    },
  });
}
