import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconStyleProps {
  /** Lucide icon name, e.g. 'Wallet', 'CreditCard', 'Landmark' */
  iconName?: keyof typeof LucideIcons;
  color?: string;
  backgroundColor?: string;
  size?: number;
}

export default function IconStyle({
  iconName = 'Tag',
  color = '#0f172a',
  backgroundColor,
  size = 20,
}: IconStyleProps) {
  const LucideIcon = LucideIcons[iconName] as React.ElementType;

  if (!LucideIcon) {
    console.warn(`Lucide icon "${iconName}" not found in lucide-react`);
    return (
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-500"
      >
        ?
      </div>
    );
  }

  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center"
      style={{
        backgroundColor: backgroundColor ? `${backgroundColor}20` : '#f1f5f9',
      }}
    >
      <LucideIcon size={size} color={color} />
    </div>
  );
}
