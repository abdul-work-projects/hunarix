"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Users,
  FileText,
  Zap,
  DollarSign,
  TrendingUp,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { PageHeader } from "@/components/dashboard/page-header";
import { ChartCard } from "@/components/dashboard/chart-card";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CustomerData {
  customer: {
    id: string;
    name: string;
    plan: "free" | "pro" | "enterprise";
    mrr: number;
    ltv: number;
    lastActive: string;
    totalDocuments: number;
    totalTokens: number;
    aiCost: number;
    margin: number;
    users: number;
    status: "active" | "churned" | "at_risk";
    createdAt: string;
    email: string;
    industry: string;
  };
  users: {
    id: string;
    name: string;
    email: string;
    role: string;
    lastActive: string;
    documentsProcessed: number;
  }[];
  recentDocuments: {
    id: string;
    fileName: string;
    pages: number;
    type: string;
    confidenceScore: number;
    processedAt: string;
    tokensUsed: number;
    model: string;
  }[];
  charts: {
    tokenUsage: { date: string; tokens: number; cost: number }[];
    documentStats: { date: string; count: number }[];
    modelUsage: { model: string; percentage: number; tokens: number }[];
  };
  stats: {
    totalDocuments: number;
    totalTokens: number;
    totalAiCost: number;
    netMargin: number;
    avgDocumentsPerDay: number;
    avgTokensPerDocument: number;
  };
}

const COLORS = ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef"];

const planColors = {
  free: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
  pro: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  enterprise: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

const statusColors = {
  active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  churned: "bg-red-500/10 text-red-500 border-red-500/20",
  at_risk: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

export default function CustomerDetailPage() {
  const params = useParams();
  const [data, setData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/customers/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [params.id]);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading || !data) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const { customer, users, recentDocuments, charts, stats } = data;

  return (
    <div className="space-y-8">
      {/* Back Button & Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div className="flex items-start gap-4">
          <Link href="/admin/customers">
            <Button variant="ghost" size="icon" className="mt-1">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{customer.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{customer.industry}</span>
                  <span>•</span>
                  <span>{customer.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={planColors[customer.plan]}>
            {customer.plan}
          </Badge>
          <Badge variant="outline" className={statusColors[customer.status]}>
            {customer.status.replace("_", " ")}
          </Badge>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
        <KpiCard
          title="Monthly Revenue"
          value={formatCurrency(customer.mrr)}
          icon={DollarSign}
          index={0}
          variant="success"
        />
        <KpiCard
          title="Lifetime Value"
          value={formatCurrency(customer.ltv)}
          icon={TrendingUp}
          index={1}
        />
        <KpiCard
          title="Total Users"
          value={customer.users}
          icon={Users}
          index={2}
        />
        <KpiCard
          title="Member Since"
          value={formatDate(customer.createdAt)}
          icon={Calendar}
          index={3}
        />
      </div>

      {/* Usage Stats */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-muted-foreground">
          Usage Statistics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
          <KpiCard
            title="Documents Processed"
            value={formatNumber(stats.totalDocuments)}
            icon={FileText}
            index={4}
          />
          <KpiCard
            title="Token Usage"
            value={formatNumber(stats.totalTokens)}
            icon={Zap}
            index={5}
          />
          <KpiCard
            title="AI Cost"
            value={formatCurrency(stats.totalAiCost)}
            icon={DollarSign}
            index={6}
            variant="warning"
          />
          <KpiCard
            title="Net Margin"
            value={stats.netMargin.toFixed(1)}
            suffix="%"
            icon={TrendingUp}
            index={7}
            variant={stats.netMargin >= 50 ? "success" : stats.netMargin >= 0 ? "warning" : "danger"}
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Token Usage Over Time" index={0}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.tokenUsage}>
                <defs>
                  <linearGradient id="tokenGradient" x1="0" y1="0" x2="0" y2="1">
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
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  formatter={(value: number) => [value.toLocaleString(), "Tokens"]}
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
                  dataKey="tokens"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#tokenGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Documents Processed" index={1}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts.documentStats}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(value: number) => [value, "Documents"]}
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
                  dataKey="count"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: "#8b5cf6", strokeWidth: 0, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Model Usage Distribution" index={2}>
          <div className="flex items-center justify-center gap-6 py-4">
            <div className="flex items-center justify-center w-full">
              <PieChart width={220} height={220}>
                <Pie
                  data={charts.modelUsage}
                  cx={110}
                  cy={110}
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="percentage"
                >
                    {charts.modelUsage.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
            <div className="space-y-2">
              {charts.modelUsage.map((model, index) => (
                <div key={model.model} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm">
                    {model.model} ({model.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Organization Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Documents</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(user.lastActive)}
                    </TableCell>
                    <TableCell>{user.documentsProcessed.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Documents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Pages</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Processed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.fileName}</TableCell>
                    <TableCell>{doc.pages}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {doc.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "font-medium",
                          doc.confidenceScore >= 98
                            ? "text-emerald-500"
                            : doc.confidenceScore >= 95
                            ? "text-amber-500"
                            : "text-red-500"
                        )}
                      >
                        {doc.confidenceScore.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{doc.model}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(doc.processedAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
