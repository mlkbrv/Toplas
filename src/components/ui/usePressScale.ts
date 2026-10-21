import { useRef } from 'react';
import { Animated } from 'react-native';
import { motion, useReduceMotion } from '../../theme';

/** Gentle scale-down on press. Respects reduce-motion. */
export function usePressScale(scale = motion.pressScale) {
  const value = useRef(new Animated.Value(1)).current;
  const reduced = useReduceMotion();

  const onPressIn = () => {
    if (reduced) return;
    Animated.spring(value, {
      toValue: scale,
      useNativeDriver: true,
      speed: 40,
      bounciness: 0,
    }).start();
  };

  const onPressOut = () => {
    if (reduced) return;
    Animated.spring(value, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  return { scale: value, onPressIn, onPressOut };
}
