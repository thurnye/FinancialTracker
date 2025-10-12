import React from "react";
import * as LucideIcons from "lucide-react";

interface IIconStyle {
  /** Lucide icon name, e.g. 'Wallet', 'CreditCard', 'Landmark' */
  iconName: keyof typeof LucideIcons;
  color?: string;
  backgroundColor?: string;
  size?: number;
}

export default function IconStyle({
  iconName,
  color = "#0f172a",
  backgroundColor,
  size = 20,
}: IIconStyle) {
  // Lookup icon dynamically
  const LucideIcon = LucideIcons[iconName] as React.ElementType;

  if (!LucideIcon) {
    console.warn(`Lucide icon "${iconName}" not found in lucide-react`);
    return null;
  }

  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center"
      style={{
        backgroundColor: backgroundColor ? `${backgroundColor}20` : "#f1f5f9",
        color,
      }}
    >
      <LucideIcon size={size} color={color} />
    </div>
  );
}
