import { useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Line, Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients, palette, radius } from '../../theme';
import { AppText } from '../ui';
import { formatPrice } from '../../data/format';
import type { EventItem } from '../../data/types';
import { useLocale } from '../../i18n/useLocale';

type StylizedMapProps = {
  events: EventItem[];
  selectedId?: string;
  onSelect: (event: EventItem) => void;
  height?: number;
};

/**
 * A flat, abstract 2D map — NOT a real map and not real GPS. Markers use each
 * event's normalized layout position so nothing fabricates a real location.
 */
export function StylizedMap({ events, selectedId, onSelect, height = 320 }: StylizedMapProps) {
  const { t } = useLocale();
  const [size, setSize] = useState({ w: 0, h: height });

  const onLayout = (e: LayoutChangeEvent) =>
    setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height });

  const gridLines = [0.2, 0.4, 0.6, 0.8];

  return (
    <View style={[styles.map, { height }]} onLayout={onLayout}>
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        {gridLines.map((p) => (
          <Line
            key={`h-${p}`}
            x1="0"
            y1={`${p * 100}%`}
            x2="100%"
            y2={`${p * 100}%`}
            stroke={palette.border}
            strokeWidth={1}
          />
        ))}
        {gridLines.map((p) => (
          <Line
            key={`v-${p}`}
            x1={`${p * 100}%`}
            y1="0"
            x2={`${p * 100}%`}
            y2="100%"
            stroke={palette.border}
            strokeWidth={1}
          />
        ))}
        <Path
          d={`M0 ${size.h * 0.7} Q ${size.w * 0.4} ${size.h * 0.55}, ${size.w} ${size.h * 0.78}`}
          stroke="rgba(139,92,246,0.35)"
          strokeWidth={2}
          fill="none"
        />
        <Path
          d={`M${size.w * 0.3} 0 Q ${size.w * 0.45} ${size.h * 0.5}, ${size.w * 0.25} ${size.h}`}
          stroke="rgba(34,211,238,0.22)"
          strokeWidth={2}
          fill="none"
        />
      </Svg>

      {size.w > 0 &&
        events.map((ev) => {
          const price = formatPrice(ev.priceFrom);
          const selected = ev.id === selectedId;
          const left = Math.min(Math.max(ev.mapX * size.w - 28, 4), size.w - 60);
          const top = Math.min(Math.max(ev.mapY * size.h - 16, 4), size.h - 36);
          return (
            <Pressable
              key={ev.id}
              onPress={() => onSelect(ev)}
              style={[styles.marker, { left, top }]}
              accessibilityRole="button"
            >
              {selected ? (
                <LinearGradient
                  colors={gradients.primaryButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.pill}
                >
                  <AppText variant="tiny" color={palette.white}>
                    {price ?? t('common.free')}
                  </AppText>
                </LinearGradient>
              ) : (
                <View style={[styles.pill, styles.pillIdle]}>
                  <AppText variant="tiny" color={palette.text}>
                    {price ?? t('common.free')}
                  </AppText>
                </View>
              )}
            </Pressable>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    backgroundColor: palette.bgSecondary,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: 'hidden',
  },
  marker: { position: 'absolute' },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillIdle: {
    backgroundColor: palette.surfaceHigh,
    borderWidth: 1,
    borderColor: palette.borderStrong,
  },
});
