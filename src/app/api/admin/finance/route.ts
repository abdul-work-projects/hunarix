import { NextResponse } from 'next/server';
import {
  monthlyRevenue,
  revenueByPlan,
  customerGrowth,
  avgRevenuePerUser,
  lifetimeValueByPlan
} from '@/data/revenue';
import { monthlyCosts, costBreakdown } from '@/data/costs';

export async function GET() {
  const latestRevenue = monthlyRevenue[monthlyRevenue.length - 1];
  const latestCosts = monthlyCosts[monthlyCosts.length - 1];
  const ytdRevenue = monthlyRevenue.reduce((sum, m) => sum + m.totalRevenue, 0);
  const ytdCost = monthlyCosts.reduce((sum, m) => sum + m.totalCost, 0);
  const ytdProfit = ytdRevenue - ytdCost;

  return NextResponse.json({
    summary: {
      mrr: latestRevenue.mrr,
      mrrTrend: 6.2,
      arr: latestRevenue.arr,
      arrTrend: 6.2,
      totalRevenue: ytdRevenue,
      revenueTrend: 12.8,
      totalAiCost: monthlyCosts.reduce((sum, m) => sum + m.aiCost, 0),
      costTrend: 8.5,
      netProfit: ytdProfit,
      profitTrend: 15.2,
      grossMargin: latestCosts.grossMargin,
      marginTrend: 1.5,
    },
    charts: {
      revenueOverTime: monthlyRevenue.map(m => ({
        month: m.month,
        revenue: m.totalRevenue,
        mrr: m.mrr,
      })),
      costOverTime: monthlyCosts.map(c => ({
        month: c.month,
        aiCost: c.aiCost,
        infraCost: c.infrastructureCost,
        totalCost: c.totalCost,
      })),
      profitMarginOverTime: monthlyCosts.map((c, i) => ({
        month: c.month,
        profit: c.grossProfit,
        margin: c.grossMargin,
        revenue: monthlyRevenue[i]?.totalRevenue || 0,
      })),
      revenueByPlan,
      customerGrowth,
      avgRevenuePerUser,
      lifetimeValueByPlan,
      costBreakdown,
    },
    monthlyData: monthlyRevenue.map((rev, i) => ({
      ...rev,
      ...monthlyCosts[i],
    })),
  });
}
