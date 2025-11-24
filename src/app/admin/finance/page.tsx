"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Receipt,
  PercentIcon,
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
  ComposedChart,
} from "recharts";
import { PageHeader } from "@/components/dashboard/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface FinanceData {
  summary: {
    mrr: number;
    mrrTrend: number;
    arr: number;
    arrTrend: number;
    totalRevenue: number;
    revenueTrend: number;
    totalAiCost: number;
    costTrend: number;
    netProfit: number;
    profitTrend: number;
    grossMargin: number;
    marginTrend: number;
  };
  charts: {
    revenueOverTime: { month: string; revenue: number; mrr: number }[];
    costOverTime: { month: string; aiCost: number; infraCost: number; totalCost: number }[];
    profitMarginOverTime: { month: string; profit: number; margin: number; revenue: number }[];
    revenueByPlan: { plan: string; revenue: number; customers: number; percentage: number }[];
    customerGrowth: { month: string; total: number; new: number }[];
    avgRevenuePerUser: { month: string; arpu: number }[];
    lifetimeValueByPlan: { plan: string; ltv: number; avgMonths: number }[];
    costBreakdown: {
      ai: { total: number; percentage: number; breakdown: { category: string; amount: number; percentage: number }[] };
      infrastructure: { total: number; percentage: number; breakdown: { category: string; amount: number; percentage: number }[] };
    };
  };
}

const COLORS = ["#6366f1", "#8b5cf6", "#a855f7"];

export default function FinancePage() {
  const [data, setData] = useState<FinanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/finance")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading || !data) {
    return (
      <div className="space-y-8">
        <PageHeader title="Finance" description="Revenue, costs, and profitability metrics" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Finance" description="Revenue, costs, and profitability metrics" />

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        <KpiCard
          title="Monthly Recurring Revenue"
          value={formatCurrency(data.summary.mrr)}
          trend={data.summary.mrrTrend}
          icon={DollarSign}
          index={0}
          variant="success"
        />
        <KpiCard
          title="Annual Recurring Revenue"
          value={formatCurrency(data.summary.arr)}
          trend={data.summary.arrTrend}
          icon={TrendingUp}
          index={1}
        />
        <KpiCard
          title="Total Revenue (YTD)"
          value={formatCurrency(data.summary.totalRevenue)}
          trend={data.summary.revenueTrend}
          icon={PiggyBank}
          index={2}
        />
        <KpiCard
          title="Total AI Cost (YTD)"
          value={formatCurrency(data.summary.totalAiCost)}
          trend={data.summary.costTrend}
          icon={Receipt}
          index={3}
          variant="warning"
        />
        <KpiCard
          title="Net Profit"
          value={formatCurrency(data.summary.netProfit)}
          trend={data.summary.profitTrend}
          icon={TrendingUp}
          index={4}
          variant="success"
        />
        <KpiCard
          title="Gross Margin"
          value={data.summary.grossMargin.toFixed(1)}
          suffix="%"
          trend={data.summary.marginTrend}
          icon={PercentIcon}
          index={5}
          variant="success"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Revenue Over Time */}
        <ChartCard title="Revenue Over Time" index={0}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.charts.revenueOverTime}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
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
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), ""]}
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
                  dataKey="mrr"
                  name="MRR"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Cost Breakdown Over Time */}
        <ChartCard title="Cost Breakdown Over Time" index={1}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.charts.costOverTime}>
                <defs>
                  <linearGradient id="aiCostGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="infraCostGrad" x1="0" y1="0" x2="0" y2="1">
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
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), ""]}
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
                  dataKey="aiCost"
                  name="AI Cost"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  fill="url(#aiCostGrad)"
                  stackId="1"
                />
                <Area
                  type="monotone"
                  dataKey="infraCost"
                  name="Infrastructure"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#infraCostGrad)"
                  stackId="1"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Profit Margin Trend */}
        <ChartCard title="Profit & Margin Trend" index={2}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data.charts.profitMarginOverTime}>
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
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}%`}
                  domain={[55, 70]}
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
                  dataKey="profit"
                  name="Profit"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="margin"
                  name="Margin %"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ fill: "#6366f1", strokeWidth: 0, r: 3 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Revenue by Plan */}
        <ChartCard title="Revenue by Plan" index={3}>
          <div className="flex items-center justify-center gap-8 py-4">
            <div className="flex items-center justify-center w-full">
              <PieChart width={280} height={280}>
                <Pie
                  data={data.charts.revenueByPlan}
                  cx={140}
                  cy={140}
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={2}
                  dataKey="revenue"
                >
                    {data.charts.revenueByPlan.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
                    }}
                    labelStyle={{ color: "#000000", fontWeight: 600 }}
                    itemStyle={{ color: "#000000" }}
                    wrapperStyle={{ zIndex: 1000 }}
                  />
                </PieChart>
            </div>
            <div className="space-y-4">
              {data.charts.revenueByPlan.map((plan, index) => (
                <div key={plan.plan} className="space-y-1">
                  <div className="flex items-center justify-between gap-8">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="font-medium">{plan.plan}</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(plan.revenue)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-5">
                    {plan.customers} customers ({plan.percentage}%)
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Customer Growth */}
        <ChartCard title="Customer Growth" index={4}>
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
                  dataKey="new"
                  name="New Customers"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* ARPU Trend */}
        <ChartCard title="Average Revenue Per User (ARPU)" index={5}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.charts.avgRevenuePerUser}>
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
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), "ARPU"]}
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
                  dataKey="arpu"
                  name="ARPU"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", strokeWidth: 0, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* LTV by Plan */}
        <ChartCard title="Lifetime Value by Plan" index={6} className="xl:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.charts.lifetimeValueByPlan} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <YAxis
                  type="category"
                  dataKey="plan"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={100}
                />
                <Tooltip
                  formatter={(value: number, name) => [
                    name === "ltv" ? formatCurrency(value) : `${value} months`,
                    name === "ltv" ? "LTV" : "Avg Duration",
                  ]}
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
                <Bar dataKey="ltv" name="Lifetime Value" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Cost Breakdown */}
        <ChartCard title="Cost Breakdown" index={7} className="xl:col-span-2">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="font-medium mb-4">
                AI Costs ({formatCurrency(data.charts.costBreakdown.ai.total)})
              </h4>
              <div className="space-y-3">
                {data.charts.costBreakdown.ai.breakdown.map((item, i) => (
                  <motion.div
                    key={item.category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-1"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.category}</span>
                      <span className="font-medium">{formatCurrency(item.amount)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">
                Infrastructure Costs ({formatCurrency(data.charts.costBreakdown.infrastructure.total)})
              </h4>
              <div className="space-y-3">
                {data.charts.costBreakdown.infrastructure.breakdown.map((item, i) => (
                  <motion.div
                    key={item.category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-1"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.category}</span>
                      <span className="font-medium">{formatCurrency(item.amount)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-violet-500 to-violet-400 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
