import React from 'react';
import { Animated, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { palette, radius, shadow } from '../../theme';
import { usePressScale } from './usePressScale';

type CardProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
  elevated?: boolean;
  accessibilityLabel?: string;
};

/** Base surface used across the app. Animates on press when pressable. */
export function Card({ children, onPress, style, padded, elevated, accessibilityLabel }: CardProps) {
  const { scale, onPressIn, onPressOut } = usePressScale();

  const content = (
    <Animated.View
      style={[
        styles.card,
        padded && styles.padded,
        elevated && shadow.card,
        onPress && { transform: [{ scale }] },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );

  if (!onPress) return content;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.card,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: 'hidden',
  },
  padded: {
    padding: 16,
  },
});
