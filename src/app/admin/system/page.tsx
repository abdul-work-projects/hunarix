"use client";

import { useEffect, useState } from "react";
import { hasPageLoaded, markPageAsLoaded } from "@/lib/page-cache";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Clock,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { PageHeader } from "@/components/dashboard/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { KpiCardSkeleton, ChartCardSkeleton, PieChartSkeleton } from "@/components/dashboard/loading-skeleton";
import { cn } from "@/lib/utils";

interface SystemData {
  current: {
    uptime: number;
    errorRate: number;
    avgLatency: number;
    queueSize: number;
    activeConnections: number;
    cpuUsage: number;
    memoryUsage: number;
  };
  summary: {
    avgUptime: string;
    uptimeTrend: number;
    avgErrorRate: string;
    errorTrend: number;
    avgLatency: number;
    latencyTrend: number;
    queueSize: number;
    queueTrend: number;
  };
  charts: {
    uptimeHistory: { date: string; uptime: number }[];
    latencyData: { timestamp: string; p50: number; p90: number; p99: number }[];
    failureRateHistory: { date: string; rate: number }[];
    systemLoad: { time: string; cpu: number; memory: number; network: number }[];
    queueMetrics: { time: string; size: number; processingRate: number }[];
    errorTypeDistribution: { type: string; count: number; percentage: number }[];
  };
  recentErrors: {
    id: string;
    timestamp: string;
    type: string;
    message: string;
    endpoint: string;
    customerId?: string;
    resolved: boolean;
  }[];
  errorStats: {
    totalErrors: number;
    resolvedErrors: number;
    unresolvedErrors: number;
  };
}

const COLORS = ["#f43f5e", "#f97316", "#eab308", "#22c55e", "#6366f1"];

const errorTypeColors: Record<string, string> = {
  api_error: "bg-red-500/10 text-red-500 border-red-500/20",
  processing_error: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  timeout: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  rate_limit: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  validation_error: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

const PAGE_KEY = "system";

export default function SystemPage() {
  const [data, setData] = useState<SystemData | null>(null);
  const [loading, setLoading] = useState(!hasPageLoaded(PAGE_KEY));

  useEffect(() => {
    const fetchData = async () => {
      if (!hasPageLoaded(PAGE_KEY)) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      const res = await fetch("/api/admin/system");
      const data = await res.json();
      setData(data);
      setLoading(false);
      markPageAsLoaded(PAGE_KEY);
    };
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading || !data) {
    return (
      <div className="space-y-8">
        <PageHeader title="System Health" description="Monitor system performance and errors" />
        {/* Live Status Skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {Array.from({ length: 4 }).map((_, i) => (
            <KpiCardSkeleton key={i} index={i} />
          ))}
        </div>
        {/* KPI Cards Skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
          {Array.from({ length: 4 }).map((_, i) => (
            <KpiCardSkeleton key={i} index={i + 4} />
          ))}
        </div>
        {/* Charts Skeleton */}
        <div className="grid gap-6 xl:grid-cols-2">
          <ChartCardSkeleton index={0} height="h-64" />
          <ChartCardSkeleton index={1} height="h-64" />
          <ChartCardSkeleton index={2} height="h-64" />
          <PieChartSkeleton index={3} />
          <ChartCardSkeleton index={4} height="h-64" className="xl:col-span-2" />
        </div>
        {/* Error Summary Skeleton */}
        <div className="grid gap-6 lg:grid-cols-3">
          <KpiCardSkeleton index={5} />
          <ChartCardSkeleton index={6} height="h-48" className="xl:col-span-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="System Health" description="Monitor system performance and errors" />

      {/* Live Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch"
      >
        <Card className="bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                <Activity className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Uptime</p>
                <p className="text-2xl font-bold text-emerald-500">
                  {data.current.uptime}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                <Wifi className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Connections</p>
                <p className="text-2xl font-bold text-blue-500">
                  {data.current.activeConnections.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-500/10 to-transparent border-violet-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10">
                <Cpu className="h-5 w-5 text-violet-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CPU Usage</p>
                <p className="text-2xl font-bold text-violet-500">
                  {data.current.cpuUsage}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
                <HardDrive className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Memory</p>
                <p className="text-2xl font-bold text-amber-500">
                  {data.current.memoryUsage}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
        <KpiCard
          title="Avg Uptime"
          value={data.summary.avgUptime}
          suffix="%"
          trend={data.summary.uptimeTrend}
          icon={Activity}
          index={0}
          variant="success"
        />
        <KpiCard
          title="Error Rate"
          value={data.summary.avgErrorRate}
          suffix="%"
          trend={data.summary.errorTrend}
          icon={AlertTriangle}
          index={1}
          variant={parseFloat(data.summary.avgErrorRate) > 1 ? "danger" : "default"}
        />
        <KpiCard
          title="Avg Latency"
          value={data.summary.avgLatency}
          suffix="ms"
          trend={data.summary.latencyTrend}
          icon={Clock}
          index={2}
        />
        <KpiCard
          title="Queue Size"
          value={data.summary.queueSize}
          trend={data.summary.queueTrend}
          icon={Server}
          index={3}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Uptime History */}
        <ChartCard title="Uptime History" index={0}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.charts.uptimeHistory}>
                <defs>
                  <linearGradient id="uptimeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  domain={[99, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Uptime"]}
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
                  dataKey="uptime"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#uptimeGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Latency Percentiles */}
        <ChartCard title="Latency Percentiles" index={1}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.charts.latencyData.slice(0, 12)}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="timestamp"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => new Date(v).getHours() + ":00"}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}ms`}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}ms`, ""]}
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
                  type="monotone"
                  dataKey="p50"
                  name="P50"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="p90"
                  name="P90"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="p99"
                  name="P99"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Failure Rate */}
        <ChartCard title="Failure Rate History" index={2}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.charts.failureRateHistory}>
                <defs>
                  <linearGradient id="failureGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
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
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Failure Rate"]}
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
                  dataKey="rate"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="url(#failureGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Error Type Distribution */}
        <ChartCard title="Error Type Distribution" index={3}>
          <div className="flex items-center justify-center gap-8 py-4">
            <div className="flex items-center justify-center w-full">
              <PieChart width={220} height={220}>
                <Pie
                  data={data.charts.errorTypeDistribution}
                  cx={110}
                  cy={110}
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="count"
                >
                    {data.charts.errorTypeDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [value, "Errors"]}
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
            <div className="space-y-2">
              {data.charts.errorTypeDistribution.map((item, index) => (
                <div key={item.type} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm">
                    {item.type} ({item.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* System Load */}
        <ChartCard title="System Load" index={4} className="xl:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.charts.systemLoad}>
                <defs>
                  <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, ""]}
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
                <Area
                  type="monotone"
                  dataKey="cpu"
                  name="CPU"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#cpuGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="memory"
                  name="Memory"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fill="url(#memGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="network"
                  name="Network"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#netGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Error Summary & Recent Errors */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Error Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Errors</span>
              <span className="text-2xl font-bold">{data.errorStats.totalErrors}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="text-muted-foreground">Resolved</span>
              </div>
              <span className="text-lg font-semibold text-emerald-500">
                {data.errorStats.resolvedErrors}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-muted-foreground">Unresolved</span>
              </div>
              <span className="text-lg font-semibold text-red-500">
                {data.errorStats.unresolvedErrors}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recentErrors.slice(0, 5).map((error) => (
                  <motion.tr
                    key={error.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border-b"
                  >
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDate(error.timestamp)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={errorTypeColors[error.type] || ""}
                      >
                        {error.type.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm">
                      {error.message}
                    </TableCell>
                    <TableCell>
                      {error.resolved ? (
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
