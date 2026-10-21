import { StyleSheet, View } from 'react-native';
import { palette, radius, spacing } from '../../theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

type StatCardProps = {
  label: string;
  value: string;
  icon?: string;
  accent?: string;
  delta?: string;
};

export function StatCard({ label, value, icon, accent = palette.violetBright, delta }: StatCardProps) {
  return (
    <View style={styles.card}>
      {icon && (
        <View style={[styles.iconWrap, { backgroundColor: `${accent}26` }]}>
          <Icon name={icon} size={16} color={accent} />
        </View>
      )}
      <AppText variant="title" style={{ marginTop: icon ? spacing.sm : 0 }}>
        {value}
      </AppText>
      <AppText variant="meta" color={palette.textSecondary}>
        {label}
      </AppText>
      {delta && (
        <AppText variant="tiny" color={palette.success} style={{ marginTop: 2 }}>
          {delta}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: palette.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.lg,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
