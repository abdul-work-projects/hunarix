"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon: LucideIcon;
  index?: number;
  prefix?: string;
  suffix?: string;
  variant?: "default" | "success" | "warning" | "danger";
}

const variantStyles = {
  default: "from-primary/10 to-primary/5 border-primary/20",
  success: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
  warning: "from-amber-500/10 to-amber-500/5 border-amber-500/20",
  danger: "from-red-500/10 to-red-500/5 border-red-500/20",
};

const iconVariantStyles = {
  default: "bg-primary/10 text-primary",
  success: "bg-emerald-500/10 text-emerald-500",
  warning: "bg-amber-500/10 text-amber-500",
  danger: "bg-red-500/10 text-red-500",
};

export function KpiCard({
  title,
  value,
  trend,
  trendLabel = "vs last period",
  icon: Icon,
  index = 0,
  prefix = "",
  suffix = "",
  variant = "default",
}: KpiCardProps) {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="group h-full"
    >
      <Card
        className={cn(
          "relative h-full overflow-hidden border bg-gradient-to-br transition-all duration-300",
          "hover:shadow-xl hover:shadow-primary/5",
          variantStyles[variant]
        )}
      >
        <CardContent className="flex h-full flex-col justify-between p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground line-clamp-2 min-h-[2.5rem]">
              {title}
            </p>
            <div
              className={cn(
                "shrink-0 rounded-lg p-2 sm:p-2.5 transition-transform duration-300 group-hover:scale-110",
                iconVariantStyles[variant]
              )}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </div>

          <div className="mt-2">
            <div className="flex items-baseline gap-0.5 flex-wrap">
              {prefix && (
                <span className="text-base sm:text-lg font-semibold text-muted-foreground">
                  {prefix}
                </span>
              )}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight break-all"
              >
                {typeof value === "number" ? value.toLocaleString() : value}
              </motion.span>
              {suffix && (
                <span className="text-base sm:text-lg font-semibold text-muted-foreground">
                  {suffix}
                </span>
              )}
            </div>

            {trend !== undefined && (
              <div className="flex items-center gap-1 mt-2 flex-wrap">
                <div
                  className={cn(
                    "flex items-center gap-0.5 text-xs font-medium whitespace-nowrap",
                    isPositive ? "text-emerald-500" : "text-red-500"
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  ) : (
                    <TrendingDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  )}
                  {isPositive ? "+" : ""}
                  {trend.toFixed(1)}%
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {trendLabel}
                </span>
              </div>
            )}
          </div>
        </CardContent>

        {/* Decorative gradient */}
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-2xl transition-all duration-300 group-hover:scale-150" />
      </Card>
    </motion.div>
  );
}
