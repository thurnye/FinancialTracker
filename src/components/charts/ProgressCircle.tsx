import React from "react";

interface ProgressCircleProps {
  percentage: number;
  color?: string;
  size?: number;
  trackColor?: string;
  textColor?: string;
  label?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percentage,
  color = "#22c55e", 
  size = 64,
  trackColor = "#e2e8f0",
  textColor = "#0f172a", 
  label,
}) => {
  const strokeDegrees = Math.min(Math.max(percentage, 0), 100) * 3.6;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer circular progress using conic-gradient */}
      <div
        className="rounded-full transition-all duration-700"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(${color} ${strokeDegrees}deg, ${trackColor} ${strokeDegrees}deg)`,
        }}
      ></div>

      {/* Inner white cutout */}
      <div
        className="absolute bg-white rounded-full flex items-center justify-center"
        style={{
          width: size * 0.75,
          height: size * 0.75,
        }}
      >
        <span
          className="font-semibold"
          style={{ fontSize: size * 0.25, color: textColor }}
        >
          {percentage}%
        </span>
      </div>

      {/* Optional label below */}
      {label && (
        <span
          className="absolute -bottom-6 text-xs font-medium text-slate-600 w-full text-center"
          style={{ fontSize: size * 0.18 }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default ProgressCircle;
