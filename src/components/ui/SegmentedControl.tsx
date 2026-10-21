import { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients, palette, radius } from '../../theme';
import { AppText } from './AppText';
import { useReduceMotion } from '../../theme';

type Option = { key: string; label: string };

type SegmentedControlProps = {
  options: Option[];
  value: string;
  onChange: (key: string) => void;
};

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  const [trackWidth, setTrackWidth] = useState(0);
  const indicatorX = useRef(new Animated.Value(0)).current;
  const reduced = useReduceMotion();
  const index = Math.max(0, options.findIndex((o) => o.key === value));
  const segmentWidth = trackWidth > 0 ? (trackWidth - 8) / options.length : 0;

  useEffect(() => {
    const to = 4 + index * segmentWidth;
    if (reduced) {
      indicatorX.setValue(to);
      return;
    }
    Animated.timing(indicatorX, {
      toValue: to,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [index, segmentWidth, reduced, indicatorX]);

  const onLayout = (e: LayoutChangeEvent) => setTrackWidth(e.nativeEvent.layout.width);

  return (
    <View style={styles.track} onLayout={onLayout}>
      {segmentWidth > 0 && (
        <Animated.View
          style={[
            styles.indicator,
            { width: segmentWidth, transform: [{ translateX: indicatorX }] },
          ]}
        >
          <LinearGradient
            colors={gradients.primaryButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      )}
      {options.map((opt) => {
        const active = opt.key === value;
        return (
          <Pressable
            key={opt.key}
            style={styles.segment}
            onPress={() => onChange(opt.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            <AppText variant="label" color={active ? palette.white : palette.textSecondary}>
              {opt.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    height: 44,
    backgroundColor: palette.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 4,
  },
  indicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
