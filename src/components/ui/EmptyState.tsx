import { StyleSheet, View } from 'react-native';
import { palette, spacing } from '../../theme';
import { AppText } from './AppText';
import { Icon } from './Icon';
import { Button } from './Button';
import { AmbientGlow } from './AmbientGlow';

type EmptyStateProps = {
  icon: string;
  title: string;
  hint?: string;
  ctaLabel?: string;
  onCta?: () => void;
};

export function EmptyState({ icon, title, hint, ctaLabel, onCta }: EmptyStateProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconWrap}>
        <AmbientGlow size={160} opacity={0.35} style={styles.glow} />
        <View style={styles.iconCircle}>
          <Icon name={icon} size={30} color={palette.violetBright} />
        </View>
      </View>
      <AppText variant="cardTitle" center style={{ marginTop: spacing.lg }}>
        {title}
      </AppText>
      {hint && (
        <AppText variant="body" color={palette.textSecondary} center style={{ marginTop: spacing.sm }}>
          {hint}
        </AppText>
      )}
      {ctaLabel && onCta && (
        <Button title={ctaLabel} onPress={onCta} style={{ marginTop: spacing.xl, minWidth: 200 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.huge,
    paddingHorizontal: spacing.xl,
  },
  iconWrap: {
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: { position: 'absolute' },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
