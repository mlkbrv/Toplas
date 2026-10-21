import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { palette, radius, spacing } from '../../theme';
import { AppText, Badge, Icon, RemoteImage } from '../ui';
import { formatDateShort, formatPrice } from '../../data/format';
import type { Opportunity, OpportunityType } from '../../data/types';
import { useLocale } from '../../i18n/useLocale';

const TYPE_META: Record<OpportunityType, { key: string; icon: string; color: string }> = {
  mentorship: { key: 'mentorship.mentorship', icon: 'school-outline', color: '#A78BFA' },
  hackathon: { key: 'mentorship.hackathons', icon: 'code-slash-outline', color: '#22D3EE' },
  pitch: { key: 'mentorship.pitch', icon: 'megaphone-outline', color: '#E879F9' },
  skill_exchange: { key: 'mentorship.skillExchange', icon: 'swap-horizontal-outline', color: '#34D399' },
  co_founder: { key: 'mentorship.coFounder', icon: 'people-circle-outline', color: '#C084FC' },
  networking: { key: 'mentorship.networking', icon: 'people-outline', color: '#8B5CF6' },
};

type OpportunityCardProps = {
  opportunity: Opportunity;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function OpportunityCard({ opportunity, onPress, style }: OpportunityCardProps) {
  const { t, lang, L } = useLocale();
  const meta = TYPE_META[opportunity.type];
  const price = opportunity.price != null ? formatPrice(opportunity.price) : null;

  return (
    <Pressable onPress={onPress} style={[styles.card, style]} accessibilityRole="button">
      <RemoteImage uri={opportunity.cover} radius={0} style={styles.image} scrim />
      <View style={styles.imageBadge}>
        <Badge label={t(meta.key as never)} icon={meta.icon} color={meta.color} variant="glass" />
      </View>

      <View style={styles.body}>
        <AppText variant="cardTitle" numberOfLines={2}>
          {L(opportunity.title)}
        </AppText>
        <View style={styles.orgRow}>
          <Icon name="business-outline" size={13} color={palette.textSecondary} />
          <AppText variant="meta" color={palette.textSecondary} numberOfLines={1} style={{ marginLeft: 6, flex: 1 }}>
            {opportunity.org}
          </AppText>
        </View>

        {opportunity.requiredSkills.length > 0 && (
          <View style={styles.skills}>
            {opportunity.requiredSkills.slice(0, 3).map((s) => (
              <View key={s} style={styles.skill}>
                <AppText variant="tiny" color={palette.textSecondary}>
                  {s}
                </AppText>
              </View>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.meta}>
            <Icon name="time-outline" size={13} color={palette.textMuted} />
            <AppText variant="meta" color={palette.textMuted} style={{ marginLeft: 5 }} numberOfLines={1}>
              {L(opportunity.availability)}
            </AppText>
          </View>
          {price ? (
            <AppText variant="label" color={palette.lavender}>
              {t('common.priceFrom', { price: opportunity.price })}
            </AppText>
          ) : opportunity.deadline ? (
            <AppText variant="meta" color={palette.warning}>
              {t('mentorship.deadline', { date: formatDateShort(opportunity.deadline, lang) })}
            </AppText>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.card,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: 'hidden',
  },
  image: { height: 110 },
  imageBadge: { position: 'absolute', top: spacing.md, left: spacing.md },
  body: { padding: spacing.lg },
  orgRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  skills: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: spacing.md },
  skill: {
    backgroundColor: palette.surface,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: palette.border,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  meta: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: spacing.sm },
});
