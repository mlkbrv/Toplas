import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { palette, spacing } from '../../theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

type ListRowProps = {
  icon?: string;
  label: string;
  onPress?: () => void;
  right?: React.ReactNode | string;
  danger?: boolean;
  showChevron?: boolean;
};

export function ListRow({ icon, label, onPress, right, danger, showChevron = true }: ListRowProps) {
  const color = danger ? palette.error : palette.text;
  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && onPress ? { opacity: 0.6 } : null]}
      onPress={onPress}
      accessibilityRole="button"
    >
      {icon && (
        <View style={[styles.iconWrap, danger && { backgroundColor: 'rgba(251,113,133,0.14)' }]}>
          <Icon name={icon} size={18} color={danger ? palette.error : palette.violetBright} />
        </View>
      )}
      <AppText variant="bodyMedium" color={color} style={styles.label}>
        {label}
      </AppText>
      {typeof right === 'string' ? (
        <AppText variant="meta" color={palette.textMuted}>
          {right}
        </AppText>
      ) : (
        right
      )}
      {showChevron && onPress && (
        <Icon name="chevron-forward" size={18} color={palette.textMuted} style={{ marginLeft: 6 }} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  label: { flex: 1 },
});
