import React from 'react';
import { StyleSheet, View } from 'react-native';
import { palette, spacing } from '../../theme';
import { AppText } from './AppText';
import { IconButton } from './IconButton';

type HeaderProps = {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
};

/** Compact top bar for detail and flow screens. */
export function Header({ title, subtitle, onBack, right }: HeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.side}>
        {onBack && <IconButton name="chevron-back" onPress={onBack} accessibilityLabel="Back" />}
      </View>
      <View style={styles.center}>
        {title && (
          <AppText variant="cardTitle" center numberOfLines={1}>
            {title}
          </AppText>
        )}
        {subtitle && (
          <AppText variant="meta" color={palette.textSecondary} center numberOfLines={1}>
            {subtitle}
          </AppText>
        )}
      </View>
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    marginBottom: spacing.md,
  },
  side: { width: 88, justifyContent: 'center' },
  right: { alignItems: 'flex-end' },
  center: { flex: 1, alignItems: 'center' },
});
