import { StyleSheet, Switch, View } from 'react-native';
import { palette, spacing } from '../../theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

type ToggleRowProps = {
  label: string;
  hint?: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  icon?: string;
};

export function ToggleRow({ label, hint, value, onValueChange, icon }: ToggleRowProps) {
  return (
    <View style={styles.row}>
      {icon && <Icon name={icon} size={20} color={palette.textSecondary} style={{ marginRight: spacing.md }} />}
      <View style={styles.text}>
        <AppText variant="bodyMedium">{label}</AppText>
        {hint && (
          <AppText variant="meta" color={palette.textMuted} style={{ marginTop: 2 }}>
            {hint}
          </AppText>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: palette.surfaceHigh, true: palette.violet }}
        thumbColor={palette.white}
        ios_backgroundColor={palette.surfaceHigh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  text: { flex: 1, paddingRight: spacing.md },
});
