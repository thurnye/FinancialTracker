import { Toaster as Sonner, ToasterProps } from "sonner";
import React from "react";

const Toaster: React.FC<ToasterProps> = (props) => {
  // Detect theme from the <html> tag’s class (works with your darkMode: "class" setup)
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">("light");

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    // Optional: listen for theme changes if toggled dynamically
    const observer = new MutationObserver(() => {
      const updatedDark = document.documentElement.classList.contains("dark");
      setTheme(updatedDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
