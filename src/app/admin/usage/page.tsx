"use client";

import { useEffect, useState } from "react";
import { hasPageLoaded, markPageAsLoaded } from "@/lib/page-cache";
import { motion } from "framer-motion";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Zap,
  DollarSign,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { PageHeader } from "@/components/dashboard/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { KpiCardSkeleton, ChartCardSkeleton, PieChartSkeleton } from "@/components/dashboard/loading-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface UsageData {
  summary: {
    totalDocuments: number;
    avgProcessingTime: string;
    successRate: string;
    failedDocuments: number;
    totalTokens: number;
    totalCost: string;
  };
  charts: {
    dailyUsage: {
      date: string;
      documentsProcessed: number;
      avgProcessingTime: number;
      successRate: number;
    }[];
    weeklyUsage: {
      week: string;
      documentsProcessed: number;
      avgProcessingTime: number;
      successRate: number;
    }[];
    monthlyUsage: {
      month: string;
      documentsProcessed: number;
      avgProcessingTime: number;
      successRate: number;
    }[];
    documentTypeStats: { type: string; count: number; percentage: number }[];
    processingTimeByType: { type: string; avgTime: number }[];
    hourlyActivityHeatmap: { hour: number; activity: number }[];
    modelUsageStats: {
      model: string;
      tokens: number;
      cost: number;
      percentage: number;
    }[];
  };
  trends: {
    documentsTrend: number;
    processingTimeTrend: number;
    successRateTrend: number;
  };
}

const COLORS = ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899"];
const TYPE_COLORS = {
  Invoice: "#6366f1",
  Contract: "#8b5cf6",
  Report: "#a855f7",
  Receipt: "#d946ef",
  Other: "#ec4899",
};

const PAGE_KEY = "usage";

export default function UsagePage() {
  const [data, setData] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(!hasPageLoaded(PAGE_KEY));

  useEffect(() => {
    const fetchData = async () => {
      if (!hasPageLoaded(PAGE_KEY)) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      const res = await fetch("/api/admin/usage");
      const data = await res.json();
      setData(data);
      setLoading(false);
      markPageAsLoaded(PAGE_KEY);
    };
    fetchData();
  }, []);

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "K";
    }
    return value.toString();
  };

  if (loading || !data) {
    return (
      <div className="space-y-8">
        <PageHeader title="Usage Analytics" description="Document processing metrics and insights" />
        {/* KPI Cards Skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
          {Array.from({ length: 4 }).map((_, i) => (
            <KpiCardSkeleton key={i} index={i} />
          ))}
        </div>
        {/* Token & Cost Stats Skeleton */}
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <KpiCardSkeleton key={i} index={i + 4} />
          ))}
        </div>
        {/* Charts Skeleton */}
        <div className="grid gap-6 xl:grid-cols-2">
          <ChartCardSkeleton index={0} />
          <ChartCardSkeleton index={1} />
          <PieChartSkeleton index={2} />
          <ChartCardSkeleton index={3} height="h-64" />
          <ChartCardSkeleton index={4} height="h-32" className="xl:col-span-2" />
          <ChartCardSkeleton index={5} height="h-64" className="xl:col-span-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Usage Analytics" description="Document processing metrics and insights" />

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
        <KpiCard
          title="Documents Processed"
          value={formatNumber(data.summary.totalDocuments)}
          trend={data.trends.documentsTrend}
          icon={FileText}
          index={0}
        />
        <KpiCard
          title="Avg Processing Time"
          value={data.summary.avgProcessingTime}
          suffix="s"
          trend={data.trends.processingTimeTrend}
          icon={Clock}
          index={1}
        />
        <KpiCard
          title="Success Rate"
          value={data.summary.successRate}
          suffix="%"
          trend={data.trends.successRateTrend}
          icon={CheckCircle}
          index={2}
          variant="success"
        />
        <KpiCard
          title="Failed Documents"
          value={data.summary.failedDocuments}
          icon={XCircle}
          index={3}
          variant={data.summary.failedDocuments > 100 ? "danger" : "default"}
        />
      </div>

      {/* Token & Cost Stats */}
      <div className="grid gap-4 sm:grid-cols-2">
        <KpiCard
          title="Total Tokens Used"
          value={formatNumber(data.summary.totalTokens)}
          icon={Zap}
          index={4}
        />
        <KpiCard
          title="Total Cost"
          prefix="$"
          value={data.summary.totalCost}
          icon={DollarSign}
          index={5}
          variant="warning"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Daily Documents */}
        <ChartCard title="Documents Processed (Daily)" index={0}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.charts.dailyUsage}>
                <defs>
                  <linearGradient id="docsDaily" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => v.split("-")[2]}
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
                <Area
                  type="monotone"
                  dataKey="documentsProcessed"
                  name="Documents"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#docsDaily)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Processing Time Trend */}
        <ChartCard title="Processing Time Trend" index={1}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.charts.dailyUsage}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => v.split("-")[2]}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  domain={[1.5, 3]}
                  tickFormatter={(v) => `${v}s`}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}s`, "Avg Time"]}
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
                <Line
                  type="monotone"
                  dataKey="avgProcessingTime"
                  name="Processing Time"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: "#8b5cf6", strokeWidth: 0, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Document Types */}
        <ChartCard title="Document Types Distribution" index={2}>
          <div className="flex items-center justify-center gap-8 py-4">
            <div className="flex items-center justify-center w-full">
              <PieChart width={280} height={280}>
                <Pie
                  data={data.charts.documentTypeStats}
                  cx={140}
                  cy={140}
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={2}
                  dataKey="percentage"
                >
                    {data.charts.documentTypeStats.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Share"]}
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
              {data.charts.documentTypeStats.map((type, index) => (
                <div key={type.type} className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <div>
                    <p className="font-medium">{type.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {type.count.toLocaleString()} ({type.percentage}%)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Processing Time by Type */}
        <ChartCard title="Avg Processing Time by Type" index={3}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.charts.processingTimeByType}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}s`}
                />
                <YAxis
                  type="category"
                  dataKey="type"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}s`, "Avg Time"]}
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
                <Bar dataKey="avgTime" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Hourly Activity Heatmap */}
        <ChartCard title="Activity by Hour" index={4} className="xl:col-span-2">
          <div className="h-32">
            <div className="flex gap-1">
              {data.charts.hourlyActivityHeatmap.map((item) => (
                <motion.div
                  key={item.hour}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: item.hour * 0.02 }}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full h-16 rounded-md transition-all hover:scale-105"
                    style={{
                      backgroundColor: `rgba(99, 102, 241, ${item.activity / 100})`,
                    }}
                    title={`${item.hour}:00 - ${item.activity}% activity`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.hour}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Model Usage */}
        <ChartCard title="AI Model Usage" index={5} className="xl:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.charts.modelUsageStats}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="model"
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
                  tickFormatter={(v) => `$${v}`}
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
                <Bar
                  yAxisId="left"
                  dataKey="tokens"
                  name="Tokens"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="cost"
                  name="Cost ($)"
                  fill="#f43f5e"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
