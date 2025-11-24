import { NextResponse } from 'next/server';
import { customers } from '@/data/customers';
import { monthlyRevenue } from '@/data/revenue';
import { dailyUsage, monthlyUsage } from '@/data/usage';
import { monthlyCosts, modelCosts } from '@/data/costs';
import { currentMetrics } from '@/data/system';

export async function GET() {
  const latestRevenue = monthlyRevenue[monthlyRevenue.length - 1];
  const previousRevenue = monthlyRevenue[monthlyRevenue.length - 2];

  const totalDocuments = dailyUsage.reduce((sum, day) => sum + day.documentsProcessed, 0);
  const totalTokens = dailyUsage.reduce((sum, day) => sum + day.tokensUsed, 0);
  const totalAiCost = dailyUsage.reduce((sum, day) => sum + day.cost, 0);

  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const churnedCustomers = customers.filter(c => c.status === 'churned').length;
  const churnRate = (churnedCustomers / customers.length) * 100;

  const latestCosts = monthlyCosts[monthlyCosts.length - 1];
  const grossMargin = latestCosts.grossMargin;

  // Calculate trends (vs previous period)
  const mrrTrend = ((latestRevenue.mrr - previousRevenue.mrr) / previousRevenue.mrr) * 100;
  const customerTrend = ((latestRevenue.activeCustomers - previousRevenue.activeCustomers) / previousRevenue.activeCustomers) * 100;

  const kpis = {
    business: {
      mrr: latestRevenue.mrr,
      mrrTrend: mrrTrend,
      totalRevenue: monthlyRevenue.reduce((sum, m) => sum + m.totalRevenue, 0),
      revenueTrend: 12.5,
      activeCustomers,
      customerTrend,
      churnRate,
      churnTrend: -0.3,
    },
    usage: {
      totalDocuments,
      documentsTrend: 8.2,
      totalTokens,
      tokensTrend: 10.5,
      totalAiCost,
      costTrend: 5.8,
      grossMargin,
      marginTrend: 1.2,
    },
    system: {
      successRate: 100 - currentMetrics.errorRate,
      successTrend: 0.1,
      errorRate: currentMetrics.errorRate,
      errorTrend: -0.05,
      avgProcessingTime: currentMetrics.avgLatency / 1000,
      processingTrend: -3.2,
      queueSize: currentMetrics.queueSize,
      queueTrend: -15,
    },
  };

  const charts = {
    mrrTrend: monthlyRevenue.map(m => ({
      month: m.month,
      mrr: m.mrr,
    })),
    documentsProcessed: monthlyUsage.map(m => ({
      month: m.month,
      documents: m.documentsProcessed,
    })),
    tokenUsageCost: monthlyCosts.map((cost, index) => ({
      month: cost.month,
      tokens: monthlyUsage[index]?.tokensUsed || 0,
      cost: cost.aiCost,
    })),
    customerGrowth: monthlyRevenue.map(m => ({
      month: m.month,
      customers: m.activeCustomers,
      newCustomers: m.newCustomers,
    })),
    modelUsage: modelCosts.map(m => ({
      model: m.model,
      tokens: m.tokens,
      cost: m.cost,
      percentage: m.percentage,
    })),
  };

  return NextResponse.json({ kpis, charts });
}
