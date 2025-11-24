"use client";

import { useEffect, useState } from "react";
import { hasPageLoaded, markPageAsLoaded } from "@/lib/page-cache";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
} from "recharts";
import { motion } from "framer-motion";
import {
  Eye,
  Users,
  Clock,
  MousePointerClick,
  TrendingDown,
  ArrowRight,
  Activity,
  Target,
  Layers,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { ChartCard } from "@/components/dashboard/chart-card";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { KpiCardSkeleton, ChartCardSkeleton, FunnelSkeleton } from "@/components/dashboard/loading-skeleton";

interface AnalyticsData {
  summary: {
    totalPageViews: number;
    totalUniqueVisitors: number;
    totalSessions: number;
    avgBounceRate: number;
    avgTimeOnSite: number;
    avgSessionDuration: number;
    avgPagesPerSession: number;
    overallConversionRate: number;
    realtimeUsers: number;
  };
  charts: {
    pageViews: Array<{
      page: string;
      path: string;
      views: number;
      uniqueVisitors: number;
      avgTimeOnPage: number;
      bounceRate: number;
      exitRate: number;
    }>;
    conversionFunnel: Array<{
      step: string;
      name: string;
      users: number;
      conversionRate: number;
      dropOffRate: number;
    }>;
    onboardingFunnel: Array<{
      step: string;
      name: string;
      users: number;
      conversionRate: number;
      dropOffRate: number;
    }>;
    sessionData: Array<{
      date: string;
      sessions: number;
      avgDuration: number;
      pagesPerSession: number;
      bounceRate: number;
    }>;
    trafficSources: Array<{
      source: string;
      users: number;
      sessions: number;
      bounceRate: number;
      conversionRate: number;
    }>;
    userSegments: Array<{
      segment: string;
      users: number;
      percentage: number;
      avgSessionDuration: number;
      pagesPerSession: number;
    }>;
    dropOffPoints: Array<{
      page: string;
      dropOffs: number;
      percentage: number;
      commonNextAction: string;
    }>;
    realtimeUsers: {
      current: number;
      pages: Array<{ page: string; users: number }>;
    };
    userJourneyPaths: Array<{
      path: string[];
      users: number;
      percentage: number;
    }>;
    featureAdoption: Array<{
      feature: string;
      adopted: number;
      total: number;
      rate: number;
    }>;
  };
}

const COLORS = ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e"];
const FUNNEL_COLORS = ["#6366f1", "#7c3aed", "#8b5cf6", "#a855f7", "#c084fc", "#d8b4fe"];

const PAGE_KEY = "analytics";

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(!hasPageLoaded(PAGE_KEY));

  useEffect(() => {
    const fetchData = async () => {
      if (!hasPageLoaded(PAGE_KEY)) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      const res = await fetch("/api/admin/analytics");
      const data = await res.json();
      setData(data);
      setLoading(false);
      markPageAsLoaded(PAGE_KEY);
    };
    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="User Analytics"
          description="Track user behavior, journeys, and conversion metrics"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <KpiCardSkeleton key={i} index={i} />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <KpiCardSkeleton key={i} index={i + 4} />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCardSkeleton index={0} />
          <ChartCardSkeleton index={1} />
        </div>
        <FunnelSkeleton index={2} />
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCardSkeleton index={3} />
          <ChartCardSkeleton index={4} />
        </div>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Analytics"
        description="Track user behavior, journeys, and conversion metrics"
      />

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Page Views"
          value={data.summary.totalPageViews.toLocaleString()}
          icon={Eye}
          trend={12.5}
          index={0}
        />
        <KpiCard
          title="Unique Visitors"
          value={data.summary.totalUniqueVisitors.toLocaleString()}
          icon={Users}
          trend={8.3}
          index={1}
        />
        <KpiCard
          title="Avg. Session Duration"
          value={formatDuration(data.summary.avgSessionDuration)}
          icon={Clock}
          trend={5.2}
          index={2}
        />
        <KpiCard
          title="Conversion Rate"
          value={`${data.summary.overallConversionRate}%`}
          icon={Target}
          trend={1.8}
          index={3}
        />
      </div>

      {/* Second row KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Bounce Rate"
          value={`${data.summary.avgBounceRate}%`}
          icon={TrendingDown}
          trend={-2.1}
          index={4}
        />
        <KpiCard
          title="Pages / Session"
          value={data.summary.avgPagesPerSession.toString()}
          icon={Layers}
          trend={4.7}
          index={5}
        />
        <KpiCard
          title="Total Sessions"
          value={data.summary.totalSessions.toLocaleString()}
          icon={MousePointerClick}
          trend={15.2}
          index={6}
        />
        <KpiCard
          title="Realtime Users"
          value={data.summary.realtimeUsers.toString()}
          icon={Activity}
          index={7}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sessions Over Time */}
        <ChartCard title="Sessions Over Time" index={0}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.charts.sessionData}>
                <defs>
                  <linearGradient id="sessionsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
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
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3)",
                  }}
                  labelStyle={{ color: "#000000", fontWeight: 600 }}
                  itemStyle={{ color: "#000000" }}
                />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#sessionsGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Top Pages */}
        <ChartCard title="Top Pages by Views" index={1}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.charts.pageViews.slice(0, 8)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="page"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3)",
                  }}
                  labelStyle={{ color: "#000000", fontWeight: 600 }}
                  itemStyle={{ color: "#000000" }}
                  cursor={false}
                />
                <Bar dataKey="views" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Conversion Funnel */}
      <ChartCard title="Conversion Funnel" index={2}>
        <div className="h-96">
          <div className="grid grid-cols-6 gap-2 h-full">
            {data.charts.conversionFunnel.map((step, index) => {
              const heightPercentage = (step.users / data.charts.conversionFunnel[0].users) * 100;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center justify-end h-full"
                >
                  <div className="text-xs text-muted-foreground mb-1">
                    {step.dropOffRate > 0 && (
                      <span className="text-red-500">-{step.dropOffRate}%</span>
                    )}
                  </div>
                  <div
                    className="w-full rounded-t-lg transition-all duration-500 flex items-end justify-center pb-2"
                    style={{
                      height: `${heightPercentage}%`,
                      backgroundColor: FUNNEL_COLORS[index],
                      minHeight: "40px",
                    }}
                  >
                    <span className="text-white text-sm font-semibold">
                      {step.users.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium truncate max-w-20">{step.name.split(" ").slice(0, 2).join(" ")}</p>
                    <p className="text-xs text-muted-foreground">{step.conversionRate}%</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ChartCard>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Drop-off Points */}
        <ChartCard title="Top Drop-off Points" index={3}>
          <div className="space-y-4">
            {data.charts.dropOffPoints.map((point, index) => (
              <motion.div
                key={point.page}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{point.page}</span>
                    <span className="text-sm text-red-500 font-semibold">
                      {point.dropOffs.toLocaleString()} ({point.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full transition-all duration-500"
                      style={{ width: `${point.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Common action: {point.commonNextAction}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>

        {/* Traffic Sources */}
        <ChartCard title="Traffic Sources" index={4}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.charts.trafficSources}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="source"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  angle={-20}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3)",
                  }}
                  labelStyle={{ color: "#000000", fontWeight: 600 }}
                  itemStyle={{ color: "#000000" }}
                  cursor={false}
                />
                <Bar dataKey="users" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* User Journey Paths & Feature Adoption */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top User Journeys */}
        <ChartCard title="Top User Journeys" index={5}>
          <div className="space-y-4">
            {data.charts.userJourneyPaths.map((journey, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">
                    {journey.users.toLocaleString()} users ({journey.percentage}%)
                  </span>
                </div>
                <div className="flex items-center flex-wrap gap-1">
                  {journey.path.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center">
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${COLORS[stepIndex % COLORS.length]}20`,
                          color: COLORS[stepIndex % COLORS.length],
                        }}
                      >
                        {step}
                      </span>
                      {stepIndex < journey.path.length - 1 && (
                        <ArrowRight className="w-3 h-3 mx-1 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>

        {/* Feature Adoption */}
        <ChartCard title="Feature Adoption Rates" index={6}>
          <div className="space-y-4">
            {data.charts.featureAdoption.map((feature, index) => (
              <motion.div
                key={feature.feature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{feature.feature}</span>
                  <span className="text-sm text-muted-foreground">
                    {feature.adopted.toLocaleString()} / {feature.total.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${feature.rate}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                </div>
                <p className="text-xs text-right text-muted-foreground mt-1">
                  {feature.rate}% adoption
                </p>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* User Segments & Realtime */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Segments */}
        <ChartCard title="User Segments" index={7}>
          <div className="space-y-4">
            {data.charts.userSegments.map((segment, index) => (
              <motion.div
                key={segment.segment}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
              >
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${COLORS[index]}20` }}
                >
                  <Users className="w-5 h-5" style={{ color: COLORS[index] }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{segment.segment}</span>
                    <span className="text-sm text-muted-foreground">
                      {segment.users.toLocaleString()} ({segment.percentage}%)
                    </span>
                  </div>
                  <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                    <span>Avg. {formatDuration(segment.avgSessionDuration)}</span>
                    <span>{segment.pagesPerSession} pages/session</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>

        {/* Realtime Users */}
        <ChartCard title="Realtime Active Users" index={8}>
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-500/10 mb-2"
            >
              <span className="text-4xl font-bold text-green-500">
                {data.charts.realtimeUsers.current}
              </span>
            </motion.div>
            <p className="text-sm text-muted-foreground">Users online right now</p>
          </div>
          <div className="space-y-3">
            {data.charts.realtimeUsers.pages.map((page, index) => (
              <motion.div
                key={page.page}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <span className="text-sm">{page.page}</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">{page.users}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Onboarding Funnel */}
      <ChartCard title="Onboarding Funnel" index={9}>
        <div className="h-80">
          <div className="grid grid-cols-5 gap-4 h-full">
            {data.charts.onboardingFunnel.map((step, index) => {
              const heightPercentage = (step.users / data.charts.onboardingFunnel[0].users) * 100;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center justify-end h-full"
                >
                  <div className="text-xs text-muted-foreground mb-1">
                    {step.dropOffRate > 0 && (
                      <span className="text-orange-500">-{step.dropOffRate}%</span>
                    )}
                  </div>
                  <div
                    className="w-full rounded-t-lg transition-all duration-500 flex items-end justify-center pb-2"
                    style={{
                      height: `${heightPercentage}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                      minHeight: "50px",
                    }}
                  >
                    <span className="text-white text-sm font-semibold">
                      {step.users.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium">{step.name}</p>
                    <p className="text-xs text-muted-foreground">{step.conversionRate}%</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ChartCard>

      {/* Page Performance Table */}
      <ChartCard title="Page Performance Details" index={10}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Page</th>
                <th className="text-right py-3 px-4 font-medium">Views</th>
                <th className="text-right py-3 px-4 font-medium">Unique Visitors</th>
                <th className="text-right py-3 px-4 font-medium">Avg. Time</th>
                <th className="text-right py-3 px-4 font-medium">Bounce Rate</th>
                <th className="text-right py-3 px-4 font-medium">Exit Rate</th>
              </tr>
            </thead>
            <tbody>
              {data.charts.pageViews.map((page, index) => (
                <motion.tr
                  key={page.path}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b hover:bg-muted/50"
                >
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{page.page}</p>
                      <p className="text-xs text-muted-foreground">{page.path}</p>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4">{page.views.toLocaleString()}</td>
                  <td className="text-right py-3 px-4">{page.uniqueVisitors.toLocaleString()}</td>
                  <td className="text-right py-3 px-4">{formatDuration(page.avgTimeOnPage)}</td>
                  <td className="text-right py-3 px-4">
                    <span className={page.bounceRate > 30 ? "text-red-500" : "text-green-500"}>
                      {page.bounceRate}%
                    </span>
                  </td>
                  <td className="text-right py-3 px-4">
                    <span className={page.exitRate > 25 ? "text-orange-500" : ""}>
                      {page.exitRate}%
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
