import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import Card from '../ui/Card';

interface PieDataItem {
  name: string;
  value: number;
  [key: string]: any;
}

interface PieChartComponentProps {
  data: PieDataItem[];
  height?: number;
  width?: number;
  title?: string;
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  customTooltip?: any;
  valueKey?: string;
}

const defaultColors = [
  '#10b981',
  '#3b82f6',
  '#8b5cf6',
  '#f59e0b',
  '#ef4444',
  '#06b6d4',
  '#ec4899',
  '#84cc16',
];

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  height = 300,
  width,
  title,
  colors = defaultColors,
  innerRadius = 0,
  outerRadius = 80,
  paddingAngle = 2,
  showLegend = true,
  showTooltip = true,
  customTooltip,
  valueKey = 'value',
}) => {
  const chartContent = (
    <ResponsiveContainer width={width || '100%'} height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={paddingAngle}
          dataKey={valueKey}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color || colors[index % colors.length]}
            />
          ))}
        </Pie>
        {showTooltip && <Tooltip content={customTooltip} />}
        {showLegend && <Legend />}
      </PieChart>
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

export default PieChartComponent;
