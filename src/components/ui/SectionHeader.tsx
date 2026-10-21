import { Pressable, StyleSheet, View } from 'react-native';
import { palette, spacing } from '../../theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <AppText variant="section">{title}</AppText>
      {actionLabel && onAction && (
        <Pressable style={styles.action} onPress={onAction} accessibilityRole="button" hitSlop={8}>
          <AppText variant="label" color={palette.violetBright}>
            {actionLabel}
          </AppText>
          <Icon name="chevron-forward" size={15} color={palette.violetBright} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  action: { flexDirection: 'row', alignItems: 'center' },
});
