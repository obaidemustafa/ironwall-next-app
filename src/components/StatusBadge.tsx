import { cn } from "@/lib/utils";

type StatusType = "info" | "restricted" | "warning" | "critical" | "success";

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  info: "bg-info/10 text-info border-info/20",
  restricted: "bg-restricted/10 text-restricted border-restricted/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  critical: "bg-critical/10 text-critical border-critical/20",
  success: "bg-success/10 text-success border-success/20",
};

export const StatusBadge = ({ status, label, className }: StatusBadgeProps) => {
  return (
    <span className={cn("status-badge border", statusStyles[status], className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", `bg-${status}`)} />
      {label}
    </span>
  );
};
