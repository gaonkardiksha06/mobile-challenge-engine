// constants/theme.ts
// Central theme tokens: dark mode palette, spacing, radii, and font families.
// Fonts are loaded via @expo-google-fonts/inter in app/_layout.tsx.

export const colors = {
  background: '#0E0E10',
  surface: '#1A1A1E',
  surfaceAlt: '#232327',
  border: '#2C2C31',
  primary: '#6C5CE7',
  primaryPressed: '#5A4BD1',
  text: '#F5F5F7',
  textMuted: '#9A9AA2',
  success: '#3DDC97',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radii = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
};

export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
};

export const shadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 5,
};

const theme = { colors, spacing, radii, fonts, shadow };
export default theme;
