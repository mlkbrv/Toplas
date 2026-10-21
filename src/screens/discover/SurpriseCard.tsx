import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette, radius, shadow, spacing } from '../../theme';
import { AppText, AmbientGlow, Button, Icon } from '../../components/ui';
import { useLocale } from '../../i18n/useLocale';

export function SurpriseCard({ onPress }: { onPress: () => void }) {
  const { t } = useLocale();
  return (
    <View style={[styles.card, shadow.glowViolet]}>
      <LinearGradient
        colors={['#1A1230', '#140F24']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <AmbientGlow size={260} color={palette.magenta} opacity={0.4} style={styles.glow} />
      <View style={styles.iconWrap}>
        <Icon name="sparkles" size={22} color={palette.lavender} />
      </View>
      <AppText variant="title" style={{ marginTop: spacing.md }}>
        {t('discover.surpriseTitle')}
      </AppText>
      <AppText variant="body" color={palette.textSecondary} style={{ marginTop: 6 }}>
        {t('discover.surpriseSubtitle')}
      </AppText>
      <Button
        title={t('discover.surpriseCta')}
        icon="dice-outline"
        onPress={onPress}
        style={{ marginTop: spacing.lg, alignSelf: 'flex-start', minWidth: 180 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: palette.borderStrong,
    overflow: 'hidden',
    padding: spacing.xl,
  },
  glow: { position: 'absolute', top: -80, right: -60 },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(192,132,252,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
