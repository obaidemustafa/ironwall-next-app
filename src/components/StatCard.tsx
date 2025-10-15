import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  className?: string;
}

export const StatCard = ({ label, value, icon: Icon, trend, className }: StatCardProps) => {
  return (
    <div className={cn("stat-card group", className)}>
      <div className="flex items-start justify-between mb-3">
        <p className="metric-label">{label}</p>
        {Icon && (
          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <p className="metric-value">{value}</p>
        {trend && (
          <span
            className={cn(
              "text-sm font-medium",
              trend.direction === "up" ? "text-success" : "text-critical"
            )}
          >
            {trend.direction === "up" ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  );
};
