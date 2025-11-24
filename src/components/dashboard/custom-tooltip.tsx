import { cn } from "@/lib/utils";

export const tooltipContentStyle = {
  backgroundColor: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--popover-foreground))",
  padding: "10px 14px",
  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
  zIndex: 9999,
  pointerEvents: "none",
};

export const tooltipLabelStyle = {
  color: "hsl(var(--popover-foreground))",
  fontWeight: 600,
  marginBottom: "6px",
  fontSize: "13px",
};

export const tooltipItemStyle = {
  color: "hsl(var(--popover-foreground))",
  fontSize: "13px",
};

export const tooltipWrapperStyle = {
  position: "relative" as const,
  zIndex: 9999,
};
