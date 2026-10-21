import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { palette, typography } from '../../theme';

type Variant = keyof typeof typography;

type AppTextProps = TextProps & {
  variant?: Variant;
  color?: string;
  center?: boolean;
  children: React.ReactNode;
};

/** Typed text with design-system variants and a default foreground color. */
export function AppText({
  variant = 'body',
  color = palette.text,
  center,
  style,
  children,
  ...rest
}: AppTextProps) {
  const base = typography[variant] as TextStyle;
  return (
    <Text
      {...rest}
      style={[base, { color }, center && { textAlign: 'center' }, style]}
    >
      {children}
    </Text>
  );
}
