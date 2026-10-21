import { StyleSheet, View } from 'react-native';
import { palette } from '../../theme';

type StepDotsProps = {
  total: number;
  current: number; // 0-based
};

export function StepDots({ total, current }: StepDotsProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => {
        const done = i <= current;
        return (
          <View
            key={i}
            style={[
              styles.dot,
              {
                width: i === current ? 24 : 8,
                backgroundColor: done ? palette.violet : palette.surfaceHigh,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { height: 8, borderRadius: 4 },
});
