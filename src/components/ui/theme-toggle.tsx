import React from "react";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  theme: "dark" | "light";
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-full"
      onClick={onToggle}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-card-foreground" />
      ) : (
        <Moon className="h-5 w-5 text-card-foreground" />
      )}
    </Button>
  );
} 