import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { palette, radius, spacing } from '../../theme';
import { AppText, Badge, Button, Icon } from '../ui';
import { formatDateShort } from '../../data/format';
import type { Reward } from '../../data/types';
import { useLocale } from '../../i18n/useLocale';

type RewardCardProps = {
  reward: Reward;
  onRedeem: () => void;
  style?: StyleProp<ViewStyle>;
};

export function RewardCard({ reward, onRedeem, style }: RewardCardProps) {
  const { t, lang, L } = useLocale();

  return (
    <View style={[styles.card, style]}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Icon name="gift-outline" size={20} color={palette.magenta} />
        </View>
        <View style={{ flex: 1 }}>
          <AppText variant="cardTitle" numberOfLines={1}>
            {L(reward.title)}
          </AppText>
          <AppText variant="meta" color={palette.textSecondary} numberOfLines={2} style={{ marginTop: 3 }}>
            {L(reward.detail)}
          </AppText>
        </View>
        {reward.points != null && (
          <Badge label={t('business.loyaltyPoints', { points: reward.points })} color={palette.lavender} />
        )}
      </View>

      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <Icon name="checkmark-circle-outline" size={13} color={palette.textMuted} />
          <AppText variant="meta" color={palette.textMuted} style={styles.metaText} numberOfLines={1}>
            {L(reward.eligibility)}
          </AppText>
        </View>
        <View style={styles.metaItem}>
          <Icon name="time-outline" size={13} color={palette.textMuted} />
          <AppText variant="meta" color={palette.textMuted} style={styles.metaText}>
            {t('business.expires', { date: formatDateShort(reward.expires, lang) })}
          </AppText>
        </View>
      </View>

      <Button title={t('business.redeem')} variant="secondary" onPress={onRedeem} icon="qr-code-outline" style={{ marginTop: spacing.md }} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.card,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.lg,
  },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(232,121,249,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: { marginTop: spacing.md, gap: 6 },
  metaItem: { flexDirection: 'row', alignItems: 'center' },
  metaText: { marginLeft: 6, flex: 1 },
});
