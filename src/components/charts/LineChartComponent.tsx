import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Card from '../ui/Card';

interface LineDataItem {
  [key: string]: string | number;
}

interface LineConfig {
  dataKey: string;
  stroke: string;
  name?: string;
  strokeWidth?: number;
  dot?: boolean;
}

interface LineChartComponentProps {
  data: LineDataItem[];
  lines: LineConfig[];
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

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  data,
  lines,
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

  console.log('LineChartComponent data:', data);
  const chartContent = (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
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
        {lines.map((line, index) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.stroke || colors[index % colors.length]}
            name={line.name}
            strokeWidth={line.strokeWidth || 2}
            dot={line.dot !== false}
          />
        ))}
      </LineChart>
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

export default LineChartComponent;
