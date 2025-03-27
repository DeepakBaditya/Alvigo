"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

interface ComplexityGraphProps {
  complexity: string;
  title: string;
  className?: string;
}

export function ComplexityGraph({
  complexity,
  title,
  className,
}: ComplexityGraphProps) {
  const data = useMemo(() => {
    const points = [];
    const n = 10;

    for (let i = 1; i <= n; i++) {
      let value = 0;
      switch (complexity.toLowerCase()) {
        case "o(1)":
          value = 1;
          break;
        case "o(log n)":
          value = Math.log2(i);
          break;
        case "o(n)":
          value = i;
          break;
        case "o(n log n)":
          value = i * Math.log2(i);
          break;
        case "o(n^2)":
          value = i * i;
          break;
        case "o(2^n)":
          value = Math.pow(2, i);
          break;
        case "o(v log v)":
          value = i * Math.log2(i);
          break;
        case "o(min(n, m))":
          value = Math.min(i, n / 2);
          break;
        case "o(n + m)":
          value = i + n / 2;
          break;
        default:
          value = i;
      }
      points.push({
        n: i,
        value: value,
      });
    }
    return points;
  }, [complexity]);

  return (
    <div className={cn("p-6 rounded-lg shadow-lg", className)}>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="text-sm text-muted-foreground mb-2">
        Current Complexity: <span className="font-mono">{complexity}</span>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="n"
              label={{ value: "Input Size (n)", position: "bottom" }}
            />
            <YAxis
              label={{
                value: "Operations",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              formatter={(value: number) => [
                `Operations: ${value.toFixed(2)}`,
                "",
              ]}
              labelFormatter={(label) => `Input size: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
