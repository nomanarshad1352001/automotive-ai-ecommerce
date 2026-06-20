import { createContext, useContext, useState, type ReactNode } from 'react';

export type ThemeName = 'cyber' | 'mono';

interface ThemeColors {
  name: ThemeName;
  label: string;
  bg: string;
  bgAlt: string;
  card: string;
  cardBorder: string;
  cardHover: string;
  sidebar: string;
  sidebarBorder: string;
  accent: string;
  accentBg: string;
  accentHover: string;
  accentText: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  inputBg: string;
  inputBorder: string;
  inputFocus: string;
  success: string;
  successBg: string;
  warning: string;
  warningBg: string;
  danger: string;
  dangerBg: string;
  info: string;
  infoBg: string;
  badgeBg: string;
  badgeText: string;
  tableRowHover: string;
  modalOverlay: string;
}

const themes: Record<ThemeName, ThemeColors> = {
  cyber: {
    name: 'cyber',
    label: 'Cyber Gold',
    bg: '#0a0a0a',
    bgAlt: '#111111',
    card: '#141414',
    cardBorder: '#1f1f1f',
    cardHover: '#1a1a1a',
    sidebar: '#0d0d0d',
    sidebarBorder: '#1a1a1a',
    accent: '#eab308',
    accentBg: 'rgba(234,179,8,.1)',
    accentHover: '#ca9a06',
    accentText: '#fde047',
    text: '#f5f5f5',
    textSecondary: '#a3a3a3',
    textMuted: '#525252',
    border: '#262626',
    inputBg: '#1a1a1a',
    inputBorder: '#333333',
    inputFocus: '#eab308',
    success: '#22c55e',
    successBg: 'rgba(34,197,94,.1)',
    warning: '#f59e0b',
    warningBg: 'rgba(245,158,11,.1)',
    danger: '#ef4444',
    dangerBg: 'rgba(239,68,68,.1)',
    info: '#3b82f6',
    infoBg: 'rgba(59,130,246,.1)',
    badgeBg: 'rgba(234,179,8,.15)',
    badgeText: '#fde047',
    tableRowHover: '#1a1a1a',
    modalOverlay: 'rgba(0,0,0,.7)',
  },
  mono: {
    name: 'mono',
    label: 'Mono Chrome',
    bg: '#000000',
    bgAlt: '#0a0a0a',
    card: '#111111',
    cardBorder: '#1c1c1c',
    cardHover: '#181818',
    sidebar: '#080808',
    sidebarBorder: '#1a1a1a',
    accent: '#ffffff',
    accentBg: 'rgba(255,255,255,.06)',
    accentHover: '#e5e5e5',
    accentText: '#ffffff',
    text: '#e5e5e5',
    textSecondary: '#999999',
    textMuted: '#555555',
    border: '#222222',
    inputBg: '#141414',
    inputBorder: '#2a2a2a',
    inputFocus: '#ffffff',
    success: '#4ade80',
    successBg: 'rgba(74,222,128,.08)',
    warning: '#fbbf24',
    warningBg: 'rgba(251,191,36,.08)',
    danger: '#f87171',
    dangerBg: 'rgba(248,113,113,.08)',
    info: '#60a5fa',
    infoBg: 'rgba(96,165,250,.08)',
    badgeBg: 'rgba(255,255,255,.1)',
    badgeText: '#ffffff',
    tableRowHover: '#151515',
    modalOverlay: 'rgba(0,0,0,.8)',
  },
};

interface ThemeCtx {
  theme: ThemeColors;
  themeName: ThemeName;
  setTheme: (t: ThemeName) => void;
  t: ThemeColors; // shorthand
}

const ThemeContext = createContext<ThemeCtx>({
  theme: themes.cyber,
  themeName: 'cyber',
  setTheme: () => {},
  t: themes.cyber,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('cyber');
  const theme = themes[themeName];
  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme: setThemeName, t: theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export { themes };
