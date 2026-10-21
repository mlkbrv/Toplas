import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients, palette, spacing } from '../../theme';
import { AppText } from './AppText';
import type { MetricPoint } from '../../data/types';

type BarChartProps = {
  data: MetricPoint[];
  height?: number;
};

/** Minimal flat 2D bar chart built from Views — no 3D, restrained. */
export function BarChart({ data, height = 140 }: BarChartProps) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <View>
      <View style={[styles.plot, { height }]}>
        {data.map((d) => {
          const h = Math.max(4, (d.value / max) * (height - 8));
          return (
            <View key={d.label} style={styles.col}>
              <LinearGradient
                colors={gradients.primaryButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.bar, { height: h }]}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.labels}>
        {data.map((d) => (
          <View key={d.label} style={styles.col}>
            <AppText variant="tiny" color={palette.textMuted} center>
              {d.label}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  plot: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  col: { flex: 1, alignItems: 'center' },
  bar: {
    width: '70%',
    borderRadius: 8,
    minHeight: 4,
  },
  labels: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
});
