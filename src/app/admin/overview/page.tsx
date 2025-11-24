"use client";

import { useEffect, useState } from "react";
import { hasPageLoaded, markPageAsLoaded } from "@/lib/page-cache";
import {
  DollarSign,
  Users,
  FileText,
  Cpu,
  TrendingUp,
  Activity,
  Clock,
  AlertTriangle,
  Zap,
  PercentIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { PageHeader } from "@/components/dashboard/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { KpiCardSkeleton, ChartCardSkeleton, PieChartSkeleton } from "@/components/dashboard/loading-skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OverviewData {
  kpis: {
    business: {
      mrr: number;
      mrrTrend: number;
      totalRevenue: number;
      revenueTrend: number;
      activeCustomers: number;
      customerTrend: number;
      churnRate: number;
      churnTrend: number;
    };
    usage: {
      totalDocuments: number;
      documentsTrend: number;
      totalTokens: number;
      tokensTrend: number;
      totalAiCost: number;
      costTrend: number;
      grossMargin: number;
      marginTrend: number;
    };
    system: {
      successRate: number;
      successTrend: number;
      errorRate: number;
      errorTrend: number;
      avgProcessingTime: number;
      processingTrend: number;
      queueSize: number;
      queueTrend: number;
    };
  };
  charts: {
    mrrTrend: { month: string; mrr: number }[];
    documentsProcessed: { month: string; documents: number }[];
    tokenUsageCost: { month: string; tokens: number; cost: number }[];
    customerGrowth: { month: string; customers: number; newCustomers: number }[];
    modelUsage: { model: string; tokens: number; cost: number; percentage: number }[];
  };
}

const COLORS = ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef"];

const PAGE_KEY = "overview";

export default function OverviewPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(!hasPageLoaded(PAGE_KEY));
  const [selectedModel, setSelectedModel] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      // Only show loading delay on first visit
      if (!hasPageLoaded(PAGE_KEY)) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      const res = await fetch("/api/admin/overview");
      const data = await res.json();
      setData(data);
      setLoading(false);
      markPageAsLoaded(PAGE_KEY);
    };
    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Overview"
          description="Welcome back! Here's what's happening with your platform."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
          {Array.from({ length: 8 }).map((_, i) => (
            <KpiCardSkeleton key={i} index={i} />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <ChartCardSkeleton key={i} index={i} />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCardSkeleton index={4} />
          <PieChartSkeleton index={5} />
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "K";
    }
    return value.toString();
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Overview"
        description="Welcome back! Here's what's happening with your platform."
      />

      {/* Business KPIs */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-muted-foreground">
          Business Metrics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
          <KpiCard
            title="Monthly Recurring Revenue"
            value={formatCurrency(data.kpis.business.mrr)}
            trend={data.kpis.business.mrrTrend}
            icon={DollarSign}
            index={0}
            variant="success"
          />
          <KpiCard
            title="Total Revenue (YTD)"
            value={formatCurrency(data.kpis.business.totalRevenue)}
            trend={data.kpis.business.revenueTrend}
            icon={TrendingUp}
            index={1}
          />
          <KpiCard
            title="Active Customers"
            value={data.kpis.business.activeCustomers}
            trend={data.kpis.business.customerTrend}
            icon={Users}
            index={2}
          />
          <KpiCard
            title="Churn Rate"
            value={data.kpis.business.churnRate.toFixed(1)}
            suffix="%"
            trend={data.kpis.business.churnTrend}
            icon={AlertTriangle}
            index={3}
            variant={data.kpis.business.churnRate > 5 ? "danger" : "default"}
          />
        </div>
      </div>

      {/* Usage KPIs */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-muted-foreground">
          Usage Metrics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
          <KpiCard
            title="Documents Processed"
            value={formatNumber(data.kpis.usage.totalDocuments)}
            trend={data.kpis.usage.documentsTrend}
            icon={FileText}
            index={4}
          />
          <KpiCard
            title="Total Token Usage"
            value={formatNumber(data.kpis.usage.totalTokens)}
            trend={data.kpis.usage.tokensTrend}
            icon={Zap}
            index={5}
          />
          <KpiCard
            title="Total AI Cost"
            value={formatCurrency(data.kpis.usage.totalAiCost)}
            trend={data.kpis.usage.costTrend}
            icon={Cpu}
            index={6}
            variant="warning"
          />
          <KpiCard
            title="Gross Margin"
            value={data.kpis.usage.grossMargin.toFixed(1)}
            suffix="%"
            trend={data.kpis.usage.marginTrend}
            icon={PercentIcon}
            index={7}
            variant="success"
          />
        </div>
      </div>

      {/* System KPIs */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-muted-foreground">
          System Health
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
          <KpiCard
            title="Success Rate"
            value={data.kpis.system.successRate.toFixed(1)}
            suffix="%"
            trend={data.kpis.system.successTrend}
            icon={Activity}
            index={8}
            variant="success"
          />
          <KpiCard
            title="Error Rate"
            value={data.kpis.system.errorRate.toFixed(2)}
            suffix="%"
            trend={data.kpis.system.errorTrend}
            icon={AlertTriangle}
            index={9}
            variant={data.kpis.system.errorRate > 1 ? "danger" : "default"}
          />
          <KpiCard
            title="Avg Processing Time"
            value={data.kpis.system.avgProcessingTime.toFixed(1)}
            suffix="s"
            trend={data.kpis.system.processingTrend}
            icon={Clock}
            index={10}
          />
          <KpiCard
            title="Queue Size"
            value={data.kpis.system.queueSize}
            trend={data.kpis.system.queueTrend}
            icon={Activity}
            index={11}
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="MRR Trend" index={0}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.charts.mrrTrend}>
                <defs>
                  <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  className="text-muted-foreground"
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), "MRR"]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
                    opacity: 1,
                  }}
                  labelStyle={{ color: "#000000", fontWeight: 600 }}
                  itemStyle={{ color: "#000000" }}
                  cursor={false}
                  offset={30}
                />
                <Area
                  type="monotone"
                  dataKey="mrr"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#mrrGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Documents Processed" index={1}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.charts.documentsProcessed}>
                <defs>
                  <linearGradient id="docsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number) => [value.toLocaleString(), "Documents"]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
                    opacity: 1,
                  }}
                  labelStyle={{ color: "#000000", fontWeight: 600 }}
                  itemStyle={{ color: "#000000" }}
                  cursor={false}
                  offset={30}
                />
                <Area
                  type="monotone"
                  dataKey="documents"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#docsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="AI Token Usage vs Cost"
          index={2}
          action={
            <Tabs value={selectedModel} onValueChange={setSelectedModel}>
              <TabsList className="h-8">
                <TabsTrigger value="all" className="text-xs">
                  All
                </TabsTrigger>
                <TabsTrigger value="gpt4o" className="text-xs">
                  GPT-4o
                </TabsTrigger>
                <TabsTrigger value="claude" className="text-xs">
                  Claude
                </TabsTrigger>
              </TabsList>
            </Tabs>
          }
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.charts.tokenUsageCost}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
                    opacity: 1,
                  }}
                  labelStyle={{ color: "#000000", fontWeight: 600 }}
                  itemStyle={{ color: "#000000" }}
                  cursor={false}
                  offset={30}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="tokens"
                  name="Tokens"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="cost"
                  name="Cost"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Customer Growth" index={3}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.charts.customerGrowth}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
                    opacity: 1,
                  }}
                  labelStyle={{ color: "#000000", fontWeight: 600 }}
                  itemStyle={{ color: "#000000" }}
                  cursor={false}
                  offset={30}
                />
                <Legend />
                <Bar
                  dataKey="newCustomers"
                  name="New Customers"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Model Usage Distribution" index={4} className="xl:col-span-2">
          <div className="flex items-center justify-center gap-8 py-4">
            <div className="flex items-center justify-center w-full">
              <PieChart width={280} height={280}>
                <Pie
                  data={data.charts.modelUsage}
                  cx={140}
                  cy={140}
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={2}
                  dataKey="percentage"
                >
                    {data.charts.modelUsage.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Usage"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      color: "hsl(var(--popover-foreground))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
                    }}
                    labelStyle={{ color: "hsl(var(--popover-foreground))", fontWeight: 600 }}
                    itemStyle={{ color: "hsl(var(--popover-foreground))" }}
                    cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
                    offset={20}
                  />
                </PieChart>
            </div>
            <div className="space-y-3">
              {data.charts.modelUsage.map((model, index) => (
                <div key={model.model} className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <div>
                    <p className="font-medium">{model.model}</p>
                    <p className="text-sm text-muted-foreground">
                      {model.percentage}% - {formatCurrency(model.cost)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
