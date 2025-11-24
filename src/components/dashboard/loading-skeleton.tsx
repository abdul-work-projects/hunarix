"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function KpiCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card className="relative overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-10 rounded-lg" />
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-8 w-32" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </CardContent>
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </Card>
    </motion.div>
  );
}

// Fixed heights for skeleton bars to avoid hydration mismatch
const SKELETON_BAR_HEIGHTS = [65, 45, 80, 55, 70, 40, 75, 50];

export function ChartCardSkeleton({ index = 0, height = "h-80", className }: { index?: number; height?: string; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={className}
    >
      <Card className="relative overflow-hidden">
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent>
          <div className={`${height} flex items-end justify-between gap-2 px-4`}>
            {/* Simulated bar chart skeleton */}
            {SKELETON_BAR_HEIGHTS.map((barHeight, i) => (
              <Skeleton
                key={i}
                className="flex-1 rounded-t-sm"
                style={{ height: `${barHeight}%` }}
              />
            ))}
          </div>
        </CardContent>
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </Card>
    </motion.div>
  );
}

export function TableRowSkeleton({ index = 0 }: { index?: number }) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="border-b"
    >
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </td>
      <td className="py-4 px-4"><Skeleton className="h-4 w-20" /></td>
      <td className="py-4 px-4"><Skeleton className="h-4 w-16" /></td>
      <td className="py-4 px-4"><Skeleton className="h-4 w-24" /></td>
      <td className="py-4 px-4"><Skeleton className="h-6 w-16 rounded-full" /></td>
    </motion.tr>
  );
}

export function PageSkeleton({
  title,
  description,
  kpiCount = 4,
  chartCount = 4,
}: {
  title: string;
  description: string;
  kpiCount?: number;
  chartCount?: number;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: kpiCount }).map((_, i) => (
          <KpiCardSkeleton key={i} index={i} />
        ))}
      </div>

      {/* Chart Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: chartCount }).map((_, i) => (
          <ChartCardSkeleton key={i} index={i} />
        ))}
      </div>
    </div>
  );
}

export function FunnelSkeleton({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="relative overflow-hidden">
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-end justify-between gap-4 px-4">
            {[100, 75, 55, 40, 30, 20].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end">
                <Skeleton
                  className="w-full rounded-t-lg"
                  style={{ height: `${height}%` }}
                />
                <Skeleton className="h-3 w-16 mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </Card>
    </motion.div>
  );
}

export function PieChartSkeleton({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="relative overflow-hidden">
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-8 py-4">
            <Skeleton className="h-56 w-56 rounded-full" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </Card>
    </motion.div>
  );
}
