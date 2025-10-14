import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Card from '../ui/Card';

interface BarDataItem {
  [key: string]: string | number;
}

interface BarConfig {
  dataKey: string;
  fill: string;
  name?: string;
  radius?: [number, number, number, number];
}

interface BarChartComponentProps {
  data: BarDataItem[];
  bars: BarConfig[];
  xAxisKey: string;
  height?: number;
  title?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  customTooltip?: any;
  colors?: string[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({
  data,
  bars,
  xAxisKey,
  height = 300,
  title,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  xAxisLabel,
  yAxisLabel,
  customTooltip,
  colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'],
}) => {
  const chartContent = (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
        <XAxis
          dataKey={xAxisKey}
          stroke="#64748b"
          style={{ fontSize: '12px' }}
          label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -5 } : undefined}
        />
        <YAxis
          stroke="#64748b"
          style={{ fontSize: '12px' }}
          label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
        />
        {showTooltip && <Tooltip content={customTooltip} />}
        {showLegend && <Legend />}
        {bars.map((bar, index) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            fill={bar.fill || colors[index % colors.length]}
            name={bar.name}
            radius={bar.radius || [4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );

  if (title) {
    return (
      <Card>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
        {chartContent}
      </Card>
    );
  }

  return chartContent;
};

export default BarChartComponent;
