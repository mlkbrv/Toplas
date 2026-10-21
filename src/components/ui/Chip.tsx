import { Pressable, StyleSheet, View } from 'react-native';
import { palette, radius, spacing } from '../../theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: string;
  color?: string;
};

export function Chip({ label, selected, onPress, icon, color = palette.violet }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      style={[
        styles.chip,
        selected
          ? { backgroundColor: `${color}26`, borderColor: color }
          : { backgroundColor: palette.surface, borderColor: palette.border },
      ]}
    >
      <View style={styles.row}>
        {icon && (
          <Icon
            name={icon}
            size={15}
            color={selected ? color : palette.textSecondary}
            style={{ marginRight: 6 }}
          />
        )}
        <AppText variant="label" color={selected ? palette.text : palette.textSecondary}>
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 38,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center' },
});
