"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Konsep: Provider Mode Tampilan (Wrapper NextThemes untuk mendukung fitur dark mode / light mode di seluruh komponen website)
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
