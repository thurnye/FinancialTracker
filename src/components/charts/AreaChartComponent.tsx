import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Card from '../ui/Card';

interface AreaDataItem {
  [key: string]: string | number;
}

interface AreaConfig {
  dataKey: string;
  fill: string;
  stroke: string;
  name?: string;
  fillOpacity?: number;
}

interface AreaChartComponentProps {
  data: AreaDataItem[];
  areas: AreaConfig[];
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

const AreaChartComponent: React.FC<AreaChartComponentProps> = ({
  data,
  areas,
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
      <AreaChart data={data}>
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
        {areas.map((area, index) => (
          <Area
            key={area.dataKey}
            type="monotone"
            dataKey={area.dataKey}
            fill={area.fill || colors[index % colors.length]}
            stroke={area.stroke || colors[index % colors.length]}
            name={area.name}
            fillOpacity={area.fillOpacity || 0.6}
          />
        ))}
      </AreaChart>
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

export default AreaChartComponent;
