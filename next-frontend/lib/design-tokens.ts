export const colors = {
  light: {
    background: "oklch(1 0.003 250)",
    foreground: "oklch(0.16 0.007 250)",
    card: "oklch(1 0 0)",
    cardForeground: "oklch(0.16 0.007 250)",
    popover: "oklch(1 0 0)",
    popoverForeground: "oklch(0.16 0.007 250)",
    primary: "oklch(0.42 0.04 250)",
    primaryForeground: "oklch(0.985 0.003 250)",
    secondary: "oklch(0.955 0.006 250)",
    secondaryForeground: "oklch(0.16 0.007 250)",
    muted: "oklch(0.965 0.005 250)",
    mutedForeground: "oklch(0.52 0.012 250)",
    accent: "oklch(0.945 0.008 250)",
    accentForeground: "oklch(0.16 0.007 250)",
    destructive: "oklch(0.55 0.2 20)",
    destructiveForeground: "oklch(0.985 0.003 250)",
    border: "oklch(0.91 0.008 250)",
    input: "oklch(0.91 0.008 250)",
    ring: "oklch(0.42 0.04 250)",
  },

  dark: {
    background: "oklch(0.155 0.007 250)",
    foreground: "oklch(0.97 0.003 250)",
    card: "oklch(0.195 0.007 250)",
    cardForeground: "oklch(0.97 0.003 250)",
    popover: "oklch(0.195 0.007 250)",
    popoverForeground: "oklch(0.97 0.003 250)",
    primary: "oklch(0.62 0.05 250)",
    primaryForeground: "oklch(0.15 0.005 250)",
    secondary: "oklch(0.24 0.008 250)",
    secondaryForeground: "oklch(0.97 0.003 250)",
    muted: "oklch(0.26 0.008 250)",
    mutedForeground: "oklch(0.65 0.012 250)",
    accent: "oklch(0.27 0.01 250)",
    accentForeground: "oklch(0.97 0.003 250)",
    destructive: "oklch(0.6 0.18 20)",
    destructiveForeground: "oklch(0.15 0.005 250)",
    border: "oklch(0.3 0.008 250)",
    input: "oklch(0.3 0.008 250)",
    ring: "oklch(0.55 0.05 250)",
  },
} as const;

export const chartColors = {
  light: {
    chart1: "oklch(0.62 0.08 250)",
    chart2: "oklch(0.6 0.09 190)",
    chart3: "oklch(0.58 0.08 160)",
    chart4: "oklch(0.62 0.1 60)",
    chart5: "oklch(0.55 0.12 20)",
  },
  dark: {
    chart1: "oklch(0.72 0.08 250)",
    chart2: "oklch(0.7 0.09 190)",
    chart3: "oklch(0.68 0.08 160)",
    chart4: "oklch(0.72 0.1 60)",
    chart5: "oklch(0.65 0.12 20)",
  },
} as const;

export const eventColors = {
  meeting: {
    bg: "oklch(0.65 0.09 250 / 0.15)",
    fg: "oklch(0.42 0.06 250)",
  },
  task: {
    bg: "oklch(0.62 0.08 190 / 0.15)",
    fg: "oklch(0.4 0.07 190)",
  },
  reminder: {
    bg: "oklch(0.65 0.1 60 / 0.15)",
    fg: "oklch(0.45 0.09 60)",
  },
  focus: {
    bg: "oklch(0.58 0.08 160 / 0.15)",
    fg: "oklch(0.38 0.07 160)",
  },
  break: {
    bg: "oklch(0.55 0.06 250 / 0.12)",
    fg: "oklch(0.45 0.05 250)",
  },
  deadline: {
    bg: "oklch(0.55 0.14 20 / 0.15)",
    fg: "oklch(0.45 0.13 20)",
  },
} as const;

export type EventColor = keyof typeof eventColors;

export const radii = {
  sm: "0.375rem",
  md: "0.4375rem",
  lg: "0.5rem",
  xl: "0.625rem",
  "2xl": "0.75rem",
  "3xl": "0.875rem",
  "4xl": "1rem",
} as const;

export const shadows = {
  card: "0 1px 3px 0 oklch(0 0 0 / 0.06)",
  cardHover: "0 2px 8px -2px oklch(0 0 0 / 0.08)",
  popover: "0 4px 16px -4px oklch(0 0 0 / 0.1)",
  modal: "0 8px 24px -6px oklch(0 0 0 / 0.12)",
} as const;

export const zIndices = {
  sticky: 20,
  dropdown: 30,
  modalBackdrop: 40,
  modal: 50,
  toast: 60,
  tooltip: 70,
} as const;

export const motion = {
  durations: {
    fast: "150ms",
    normal: "200ms",
    slow: "250ms",
  } as const,
  easings: {
    outExpo: "cubic-bezier(0.19, 1, 0.22, 1)",
    out: "cubic-bezier(0.16, 1, 0.3, 1)",
    inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  } as const,
};

export const typography = {
  fontFamily: {
    sans: "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "'Geist Mono', 'Fira Code', 'Consolas', 'Courier New', monospace",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
  letterSpacing: {
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
  },
} as const;

export function getToken(name: string, fallback?: string): string {
  if (typeof window === "undefined") return fallback ?? "";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

export function getCssVar(name: string): string {
  return `var(${name})`;
}
