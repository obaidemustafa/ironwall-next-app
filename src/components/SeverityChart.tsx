import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface SeverityData {
  name: string;
  value: number;
  color: string;
}

const data: SeverityData[] = [
  { name: "Critical", value: 12, color: "hsl(var(--critical))" },
  { name: "Warning", value: 28, color: "hsl(var(--warning))" },
  { name: "Info", value: 45, color: "hsl(var(--info))" },
  { name: "Restricted", value: 15, color: "hsl(var(--restricted))" },
];

export const SeverityChart = () => {
  return (
    <div className="w-full h-[300px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
            formatter={(value, entry: any) => (
              <span className="text-sm text-foreground-secondary">
                {value}: <span className="font-semibold text-foreground">{entry.payload.value}</span>
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="text-center">
          <p className="text-xs text-foreground-muted font-medium mono whitespace-nowrap">Active Fuzzing</p>
          <p className="text-2xl font-semibold text-foreground">100</p>
          <p className="text-xs text-foreground-muted whitespace-nowrap">Total Findings</p>
        </div>
      </div>
    </div>
  );
};
