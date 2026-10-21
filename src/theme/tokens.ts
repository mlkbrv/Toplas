/**
 * Toplaş design tokens.
 * Dark-first, flat 2D. Electric violet / neon purple accents.
 * All screens consume these tokens — no hard-coded colors in components.
 */

export const palette = {
  // Backgrounds & surfaces
  bg: '#0B0914',
  bgSecondary: '#100D1C',
  card: '#171323',
  surface: '#211A30',
  surfaceHigh: '#2A2140',

  // Violet / purple / magenta accent family
  violet: '#8B5CF6',
  violetBright: '#A78BFA',
  lavender: '#C084FC',
  magenta: '#E879F9',
  cyan: '#22D3EE',

  // Text
  text: '#F8F7FC',
  textSecondary: '#AAA3BA',
  textMuted: '#777087',

  // Lines
  border: 'rgba(192, 132, 252, 0.16)',
  borderStrong: 'rgba(192, 132, 252, 0.32)',

  // Status
  success: '#34D399',
  warning: '#FBBF24',
  error: '#FB7185',

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(11, 9, 20, 0.72)',
  scrim: 'rgba(11, 9, 20, 0.55)',
} as const;

/** Violet → magenta gradient used on primary CTAs and selected accents. */
export const gradients = {
  primary: ['#8B5CF6', '#C084FC', '#E879F9'] as const,
  primaryButton: ['#8B5CF6', '#A855F7'] as const,
  violetSoft: ['#211A30', '#171323'] as const,
  cyanViolet: ['#22D3EE', '#8B5CF6'] as const,
  heroScrim: ['transparent', 'rgba(11,9,20,0.35)', 'rgba(11,9,20,0.96)'] as const,
  cardScrim: ['transparent', 'rgba(11,9,20,0.85)'] as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  button: 16,
  input: 16,
  lg: 18,
  card: 22,
  xl: 24,
  pill: 999,
} as const;

export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
} as const;

/** Type scale — matches the spec's hierarchy. */
export const typography = {
  display: { fontFamily: fontFamily.extrabold, fontSize: 32, lineHeight: 38 },
  headline: { fontFamily: fontFamily.bold, fontSize: 28, lineHeight: 34 },
  title: { fontFamily: fontFamily.bold, fontSize: 22, lineHeight: 28 },
  section: { fontFamily: fontFamily.bold, fontSize: 20, lineHeight: 26 },
  cardTitle: { fontFamily: fontFamily.semibold, fontSize: 17, lineHeight: 23 },
  body: { fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 22 },
  bodyMedium: { fontFamily: fontFamily.medium, fontSize: 15, lineHeight: 22 },
  label: { fontFamily: fontFamily.semibold, fontSize: 14, lineHeight: 18 },
  meta: { fontFamily: fontFamily.medium, fontSize: 12.5, lineHeight: 16 },
  button: { fontFamily: fontFamily.semibold, fontSize: 15, lineHeight: 20 },
  tiny: { fontFamily: fontFamily.semibold, fontSize: 11, lineHeight: 14 },
} as const;

/** Soft, realistic violet shadows — restrained, applied to key elements only. */
export const shadow = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  glowViolet: {
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 10,
  },
  glowMagenta: {
    shadowColor: '#E879F9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 8,
  },
  nav: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 12,
  },
} as const;

export const layout = {
  screenPadding: 20,
  tabBarHeight: 64,
  hitSlop: { top: 8, bottom: 8, left: 8, right: 8 },
  minTouch: 44,
} as const;

export const motion = {
  fast: 180,
  base: 220,
  slow: 280,
  pressScale: 0.97,
} as const;

export type Palette = typeof palette;
